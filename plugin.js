/**
 * StudyForge Leaderboard Plugin — plugin.js
 * Runs on Super Productivity startup.
 * Registers a header button, hooks into task events,
 * collects today's tracked time, and syncs to the leaderboard.
 */

const LEADERBOARD_URL = 'https://productivity-leaderboard-v2.onrender.com';
const STORAGE_KEY = 'studyforge_v2';
const SYNC_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes default

// ─── Load persisted state ────────────────────────────────────────────────────
let pluginState = {
  username: null,
  syncIntervalMins: 10,
  lastSyncTs: null,
};

async function loadState() {
  try {
    const raw = await PluginAPI.loadSyncedData();
    if (raw) {
      pluginState = { ...pluginState, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn('[StudyForge] Could not load saved state:', e);
  }
}

async function saveState() {
  try {
    await PluginAPI.persistDataSynced(JSON.stringify(pluginState));
  } catch (e) {
    console.warn('[StudyForge] Could not save state:', e);
  }
}

// ─── Get today's total tracked time (ms) from all tasks ─────────────────────
async function getTodayStudyTime() {
  const tasks = await PluginAPI.getTasks();
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  let totalMs = 0;
  let doneTodayCount = 0;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  for (const task of tasks) {
    if (task.timeSpentOnDay && task.timeSpentOnDay[today]) {
      totalMs += task.timeSpentOnDay[today];
    }
    if (task.isDone && task.doneOn && task.doneOn >= todayStart.getTime()) {
      doneTodayCount++;
    }
  }

  return { totalMs, doneTodayCount, today };
}

// ─── Sync to leaderboard server ─────────────────────────────────────────────
async function syncToLeaderboard(silent = false) {
  if (!pluginState.username) {
    if (!silent) {
      PluginAPI.showSnack({
        msg: '⚠️ StudyForge: No username set. Click the 📊 button to set one.',
        type: 'WARN',
      });
    }
    return false;
  }

  const { totalMs, doneTodayCount, today } = await getTodayStudyTime();
  const hours = Math.floor(totalMs / 3600000);
  const mins = Math.floor((totalMs % 3600000) / 60000);

  const payload = {
    username: pluginState.username,
    timeSpentMs: totalMs,   // exact field the server expects
  };

  try {
      const res = await fetch(`${LEADERBOARD_URL}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok || res.status === 201) {
        pluginState.lastSyncTs = Date.now();
        await saveState();
        if (!silent) {
          PluginAPI.showSnack({
            msg: `📊 Synced! ${hours}h ${mins}m logged as "${pluginState.username}"`,
            type: 'SUCCESS',
          });
        }
        return true;
      }
  } catch (_) {}

  if (!silent) {
    PluginAPI.showSnack({
      msg: '❌ StudyForge: Sync failed. Check connection.',
      type: 'ERROR',
    });
  }
  return false;
}

// ─── Auto-sync timer ─────────────────────────────────────────────────────────
let autoSyncTimer = null;

function startAutoSync() {
  if (autoSyncTimer) clearInterval(autoSyncTimer);
  const intervalMs = (pluginState.syncIntervalMins || 10) * 60 * 1000;
  autoSyncTimer = setInterval(() => syncToLeaderboard(true), intervalMs);
}

// ─── Register header button (opens iframe panel) ─────────────────────────────
function registerUI() {
  PluginAPI.registerHeaderButton({
    id: 'studyforge-btn',
    label: '📊 LeaderBoard',
    icon: 'leaderboard',
    onClick: () => {
      PluginAPI.showIndexHtmlAsView();
    },
  });

  PluginAPI.registerSidePanelButton({
    label: 'StudyForge',
    icon: 'leaderboard',
    onClick: () => {
      PluginAPI.showIndexHtmlAsView();
    },
  });
}

// ─── Hooks ───────────────────────────────────────────────────────────────────
function registerHooks() {
  // Sync silently whenever a task is completed
  PluginAPI.registerHook(PluginAPI.Hooks.TASK_COMPLETE, () => {
    syncToLeaderboard(true);
  });

  // Sync silently at end of day
  PluginAPI.registerHook(PluginAPI.Hooks.FINISH_DAY, () => {
    syncToLeaderboard(false);
  });
}

// ─── Main entry ──────────────────────────────────────────────────────────────
(async () => {
  await loadState();
  registerUI();
  registerHooks();
  startAutoSync();

  // Show welcome snack on first run (no username set)
  if (!pluginState.username) {
    PluginAPI.showSnack({
      msg: '👋 StudyForge: Click 📊 LeaderBoard to set your username and start syncing!',
      type: 'INFO',
    });
  } else {
    // Silently sync on startup
    syncToLeaderboard(true);
  }
})();

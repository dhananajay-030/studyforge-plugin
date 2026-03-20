# 📊 StudyForge Leaderboard Plugin
### Super Productivity Plugin — Sync your study time to the leaderboard and compete with friends!

---

## 🔗 Leaderboard
👉 **[productivity-leaderboard-v2.onrender.com](https://productivity-leaderboard-v2.onrender.com)**

---

## 📦 Installation

### Step 1 — Download & Prepare the ZIP

1. Download the plugin ZIP file from this repo *(click **Code → Download ZIP** or grab the release)*
2. **Extract** the ZIP — right click → *Extract Here* (or `unzip studyforge-plugin.zip`)
3. Open the extracted folder — you will see **3 files** inside:
   ```
   index.html
   manifest.json
   plugin.js
   ```
4. **Select all 3 files** → right click → **Compress / Archive** → choose **ZIP format**
   > ⚠️ Make sure you select the 3 files themselves, NOT the folder. The ZIP must contain the files at the root, not inside a subfolder.

---

### Step 2 — Add the Plugin to Super Productivity

1. Open **Super Productivity**
2. Go to **Settings** *(gear icon, bottom left)*
3. Scroll down to **Plugins**
4. Click **"Add Plugin"** or **"Load Plugin from File"**
5. Select the **ZIP file** you created in Step 1
6. The plugin will load — you will see a **📊 LeaderBoard** button appear in the header

---

## 🚀 Using the Plugin

### Two Buttons in the Header

After loading, you'll see **2 buttons** added to Super Productivity:

| Button | What it does |
|--------|-------------|
| **📊 LeaderBoard** *(bigger)* | Opens your full profile panel inside SP |
| **🌐** *(smaller)* | Redirects to the leaderboard website for full details, rankings & challenges |

---

### Setting Up Your Profile

1. Click the **bigger 📊 LeaderBoard button** — a panel opens inside Super Productivity
2. You'll be asked to **enter your username** — this is the name that appears on the leaderboard
3. After entering your name, you'll see your **profile dashboard** with:
   - ⏱ Hours studied today
   - ✅ Tasks completed
   - 🏆 Your current rank
   - 📋 Mini leaderboard preview

---

### Syncing Your Data

> You might notice your study time and tasks don't match yet — that's because the data hasn't been synced to the server yet.

1. Simply press the **"Sync Now"** button
2. The plugin will read your tracked time from Super Productivity and upload it to the leaderboard
3. Your stats will update and you'll see your **rank** appear below

The plugin also **auto-syncs** in the background — you can set the interval (1 min, 2 min, 5 min, 10 min, etc.) from the dropdown in the panel.

---

### Viewing the Full Leaderboard

- Inside the panel → click **"🌐 Open Full Leaderboard"** at the bottom
- OR click the **smaller button** in the SP header
- This opens **[productivity-leaderboard-v2.onrender.com](https://productivity-leaderboard-v2.onrender.com)** in your browser where you can see:
  - 🏆 Full daily leaderboard with all scholars
  - 📅 Each person's study calendar (click any row)
  - ⚔️ Study War — 7-day elite challenge (10h/day)
  - 💬 Group chat
  - 🔥 Milestones and ranks

---

## ✏️ Changing Your Username

1. In the plugin panel, click the **✏️ Change** button next to your name
2. Type your new username
3. Click **Save**
4. Your **entire study history carries over** to the new name automatically — nothing is lost

---

## ⚔️ Study War Challenge

Click the **⚔️ STUDY WAR** tab on the leaderboard website to see the elite challenge.
Click the **ℹ️ button** on the war banner to read the full challenge rules, rank system, and special titles.

---

## 🛠 Troubleshooting

| Problem | Fix |
|---------|-----|
| Sync fails | Check your internet connection and press Sync Now again |
| Username conflict | Your IP already has a username — use the same name or contact admin |
| Plugin not loading | Make sure the ZIP contains the 3 files at root level, not inside a folder |
| Time not updating | Make sure you have a task running/tracked in Super Productivity |

---

## 📁 File Structure

```
📦 plugin ZIP (what you upload to SP)
├── index.html      ← Plugin UI panel
├── manifest.json   ← Plugin metadata
└── plugin.js       ← Background logic & sync
```

---

## 🔧 Built With

- **Super Productivity** plugin API
- **Node.js + Express** backend
- **PostgreSQL** database
- **Render** hosting

---

*Made with 🔥 by [dhananjay-030](https://github.com/dhananajay-030) — Study Hard, Track Honestly, Become LEGEND 👑*

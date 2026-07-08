# Play & test Starfall Frontier on your Mac (no Netlify)

This runs the game **entirely on your Mac** — nothing is uploaded or deployed.
You edit a file, save, and the browser reloads with your change. When you're
happy, deploy to Netlify as usual (see `DEPLOY.md`).

---

## One-time setup (do this once)

**1. Install Node.js** (this is what runs the game locally).
- Go to <https://nodejs.org>
- Click the big green **LTS** button, open the downloaded `.pkg`, and click through the installer. (The one installer works on both Apple-silicon and Intel Macs.)

**2. Get the game's code onto your Mac.**
- **Download ZIP** (simplest): on the GitHub repo page, click the green **`< > Code`** button → **Download ZIP**, then double-click the ZIP to unzip it. You'll get a folder named like **`Code-project-experiment-1-main`** (the `-main` is just the branch name — that's your game folder).
- **or `git clone`** if you use git. *(Choose this one if you want the double-click launcher below to work — see the note there.)*

---

## Run it — the reliable way (works no matter how you got the code)

This uses the Terminal. It's just three lines, and it always works (ZIP or clone).

1. Open **Terminal** — press **⌘-Space**, type `Terminal`, press **Return**.
2. Type `cd ` (the letters c, d, and a **space**), then **drag your game folder** from Finder onto the Terminal window and press **Return**. This points Terminal at the folder.
3. Run these:
   ```bash
   npm install     # only the first time — downloads what the game needs
   npm start        # starts the game and opens your browser
   ```
   A browser tab opens at **http://localhost:5173** — tap **Launch** and play.

**To stop:** click the Terminal window and press **Control-C**.
Next time, you only need step 1, step 2, and `npm start`.

---

## Or double-click to run (convenient — but use `git clone` for this)

The folder includes **`run.command`**, which you can double-click to start the game.

⚠️ **This works reliably only if you got the code with `git clone`.** A **Download-ZIP** copy loses the file's "runnable" flag, so double-click fails with *"permission denied."* If you downloaded the ZIP, use the Terminal way above (or see the fix in the snags table).

If you cloned the repo:
1. **Double-click `run.command`.**
2. If macOS blocks it with *"cannot be opened… unidentified developer,"* allow it once:
   - **macOS 15 (Sequoia) / 26 (Tahoe) and newer:** open **System Settings → Privacy & Security**, scroll down to the **Security** section, click **Open Anyway** next to `run.command`, and confirm (Touch ID or password).
   - **Older macOS:** **right-click** `run.command` → **Open** → **Open**.
3. A Terminal window opens, installs on the first run, and your browser opens with the game.

**To stop:** press **Control-C** in that Terminal window, or close it.

---

## See your changes live

While the game is running, open the project in a code editor (e.g. VS Code),
edit a file under `src/`, and **save**. The page **reloads automatically and
the game restarts** — so you re-tap **Launch**, but your code change is live.
No rebuild, no redeploy.

Handy things to try: ship prices in `src/ship/ShipFactory.js`, the hangar sizes
(`hangar:` in the same file), enemy laser damage in `src/combat/WeaponSystem.js`.

---

## Also test on your iPhone (same Wi-Fi, no cable)

The local server is reachable from other devices on your Wi-Fi.

1. Start the game (either way above). In the Terminal you'll see a **Local** line
   and one or more **Network** lines:
   ```
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.1.23:5173/     ← use a Network address
   ```
   Use the Network address that matches the Wi-Fi your phone is on — usually
   `192.168.x.x`, sometimes `10.x.x.x` or `172.x.x.x`. Ignore any others.
2. On your iPhone (on the **same Wi-Fi**), open Safari and type that address.
   The game runs with the on-screen touch controls.

**If the phone can't connect:**
- **Firewall:** System Settings → Network → **Firewall** → turn off, or allow incoming connections for Node.
- **VPN:** turn off any VPN on **both** the iPhone (Settings → General → VPN) **and** the Mac while testing — a VPN reroutes the request and it won't reach your Mac.
- **Keep the Mac awake:** if the Mac sleeps, the server stops. Keep it plugged in and in use, or run `caffeinate -i` in a second Terminal tab while you test.
- **Same real network:** guest/corporate Wi-Fi often blocks device-to-device traffic — use your normal home Wi-Fi.

---

## Common snags

| What you see | Fix |
| --- | --- |
| Double-click does nothing / opens in a text editor / **"permission denied"** | The "runnable" flag is missing (this happens with **Download ZIP**). Easiest: just use the Terminal way (`npm start`). To fix the double-click: in Terminal type `chmod +x ` (with a space), drag `run.command` onto the window, press **Return** — once. |
| **"…unidentified developer"** when double-clicking | macOS 15+: **System Settings → Privacy & Security → Open Anyway**. Older macOS: **right-click → Open → Open**. |
| `command not found: npm` | Node isn't installed — do the one-time setup, then **close and reopen** Terminal. |
| `Port 5173 is in use` | Another copy is running. Close the other Terminal. (If it moves to 5174, `npm start` opens the correct one automatically.) |
| Browser tab says **"can't connect"** right after starting | The server is still warming up on the first run — **reload the tab** once. |
| Blank page | Give it a second (the ships stream in) and check the address is what the Terminal printed. |
| Changes don't show up | Make sure you **saved** the file and the Terminal still shows the server running. |

## The commands, for reference

| Command | What it does |
| --- | --- |
| `npm install` | One-time: downloads what the game needs. |
| `npm start` | Runs the game locally **and opens your browser** (recommended). |
| `npm run dev` | Same, without auto-opening the browser. |
| `npm run build` | Makes the deployable `dist/` folder (for Netlify). |
| `npm run preview` | Serves the built `dist/` to double-check a production build. |

Node version is pinned to **22** via `.nvmrc` (only relevant if you use `nvm`; the plain nodejs.org install is fine).

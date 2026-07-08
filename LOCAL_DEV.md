# Play & test Starfall Frontier on your Mac (no Netlify)

This runs the game **entirely on your Mac**. Nothing is uploaded or deployed.
You edit → save → the browser refreshes instantly, so it's the fastest way to
try changes. When you're happy, you deploy to Netlify as usual (see `DEPLOY.md`).

There are two ways to do it. **Option 1 is the easy one.**

---

## One-time setup (do this once)

**1. Install Node.js** (this is what runs the game locally).
- Go to <https://nodejs.org>
- Click the big green **LTS** button, open the downloaded `.pkg`, and click through the installer.
- That's it — you never have to touch it again.

**2. Get the game's code onto your Mac.** Either:
- **Download ZIP** (simplest): on the GitHub repo page, click the green **`< > Code`** button → **Download ZIP**. Double-click the downloaded ZIP to unzip it. You'll get a folder like `Code-project-experiment-1`.
- **or** `git clone` if you already use git.

---

## Option 1 — Double-click to play (easiest)

Inside the game folder there's a file called **`run.command`**.

1. **Double-click `run.command`.**
2. The first time, macOS may say it "cannot be opened because it is from an unidentified developer." If so: **right-click** `run.command` → **Open** → **Open**. (You only do this once.)
3. A Terminal window opens and, after a few seconds, a **browser tab opens with the game**. Tap **Launch** and play.

The first launch spends about a minute installing things; after that it starts in a couple of seconds.

**To stop:** click the Terminal window and press **Control-C**, or just close it.

---

## Option 2 — Type two commands (if you prefer the Terminal)

1. Open **Terminal** (Applications → Utilities → Terminal).
2. Type `cd ` (with a space), then **drag the game folder** from Finder onto the Terminal window and press **Return**. (This points Terminal at the folder.)
3. Run:
   ```bash
   npm install     # only needed the first time
   npm start       # starts the game and opens your browser
   ```
4. If the browser doesn't open on its own, go to **http://localhost:5173** yourself.

`npm start` opens the browser for you. `npm run dev` does the same thing without auto-opening — use whichever you like.

---

## See your changes live

While the server is running, open the project in a code editor (e.g. VS Code),
edit a file under `src/`, and **save**. The browser refreshes automatically —
usually you don't even lose your place. No rebuild, no redeploy.

Handy things to try: ship prices in `src/ship/ShipFactory.js`, the hangar sizes
(`hangar:` in the same file), enemy laser damage in `src/combat/WeaponSystem.js`.

---

## Also test on your iPhone (same Wi-Fi, no cable)

The local server is reachable from other devices on your home Wi-Fi.

1. Start the game (Option 1 or 2). In the Terminal you'll see two URLs:
   ```
   ➜  Local:   http://localhost:5173/
   ➜  Network: http://192.168.1.23:5173/     ← this one
   ```
2. On your iPhone (connected to the **same Wi-Fi**), open Safari and type that
   **Network** address. The game runs with the on-screen touch controls.

If the phone can't reach it, it's almost always the Mac's firewall: **System
Settings → Network → Firewall** → turn off, or allow incoming connections for
Node. (Corporate/guest Wi-Fi sometimes blocks device-to-device traffic.)

---

## Common snags

| What you see | Fix |
| --- | --- |
| Double-clicking `run.command` does nothing / "unidentified developer" | Right-click it → **Open** → **Open** (once). |
| `command not found: npm` | Node isn't installed — do the one-time setup above, then reopen Terminal. |
| `Port 5173 is in use` | Another copy is already running. Close the other Terminal, or run `npm run dev -- --port 5174` and open that port. |
| Browser shows a blank page | Give it a second (the ships stream in), and check the address is `http://localhost:5173`. |
| Changes don't show up | Make sure you **saved** the file and the Terminal still shows the server running. |

## The commands, for reference

| Command | What it does |
| --- | --- |
| `npm install` | One-time: downloads what the game needs. |
| `npm start` | Runs the game locally **and opens your browser**. |
| `npm run dev` | Same, without auto-opening the browser. |
| `npm run build` | Makes the deployable `dist/` folder (for Netlify). |
| `npm run preview` | Serves the built `dist/` to double-check a production build. |

Node version is pinned to **22** via `.nvmrc` (only matters if you use `nvm`; the plain nodejs.org install is fine).

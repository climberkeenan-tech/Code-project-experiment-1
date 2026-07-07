# Deploying Starfall Frontier to Netlify

This guide matches **this repository exactly** and was verified end-to-end
(clean `npm install` + `npm run build`, then the built game booted in headless
Chromium with all four ship models fetched HTTP 200 and zero console errors).

- **Repo:** `climberkeenan-tech/Code-project-experiment-1`
- **Build command:** `npm run build`  (already set in `netlify.toml`)
- **Publish directory:** `dist`  (already set in `netlify.toml`)
- **Node version:** pinned to `22` in `netlify.toml`
- **Output size:** ~4.5 MB — `index.html`, one JS bundle, one CSS file, and the
  four ship models under `dist/models-glb/`.

There is nothing else to configure: `netlify.toml` at the repo root tells
Netlify how to build, so the build/publish fields auto-fill when you connect
the repo.

---

## What "the ships" are (so there are no surprises)

The game ships **four hand-modeled hulls** as binary assets, all committed under
`public/models-glb/` and copied into `dist/models-glb/` at build time:

| file | in-game name | used by |
|------|--------------|---------|
| `starter.glb` | Nebula Sentinel | SF-10 Sentinel + scout/fighter/heavy enemies |
| `gunship.glb` | Nebula Vanguard | SF-20 Gunship, SF-30 Kestrel + cruiser/destroyer enemies |
| `dreadnought.glb` | Obsidian Dreadnought | SF-85 Dreadnought + enemy warship |
| `flagship.glb` | Vanguard carrier | SF-110 Vanguard + enemy carrier/apex |

The 8-ship catalog uses these four models across five slots. Three slots
(SF-50 Aegis, SF-70 Bastion, SF-100 Sovereign) fly **procedural** hulls **by
design** — no hand-modeled asset was ever created for them, and none exists
anywhere (repo history or elsewhere). They are fully playable; they just render
a generated fighter shape instead of a GLB. See `HANDOFF.md` §1.5 and §2.

---

## Option A — Deploy from Git (recommended)

1. Go to <https://app.netlify.com> → **Add new site → Import an existing project**.
2. Choose **GitHub** and authorize, then pick
   **`climberkeenan-tech/Code-project-experiment-1`**.
3. **Branch to deploy:** pick **`claude/spaceship-assets-integration-57k8bu`**.
   - This branch is the fully verified one (it also pins Node 22 and carries the
     up-to-date docs).
   - The repository's **default** branch (`claude/3d-space-exploration-game-ogrezx`)
     also contains the identical game with all four ships and deploys correctly —
     if you'd rather not pick a branch, the default works too. The only
     difference is the default branch lacks the Node pin added on this branch.
4. Netlify reads `netlify.toml` and pre-fills **Build command** `npm run build`
   and **Publish directory** `dist`. Leave them as-is.
5. Click **Deploy**. First build takes ~1–2 minutes (install + Vite build).
6. Open the site URL, tap once to launch (this unlocks WebAudio), and fly. The
   four hulls stream in within a second or two on a normal connection.

## Option B — Zero-build drag-and-drop (fallback, no Git, no build)

If the Git build ever gives you trouble and you just want it live:

1. Download **`builds/starfall-frontier-build11.zip`** from the repo (it is a
   ready-made, verified `dist/` — `index.html` + assets + all four GLBs).
2. Unzip it locally.
3. Go to <https://app.netlify.com/drop> and drag the **unzipped folder** (the
   one containing `index.html`) onto the page.
4. It deploys instantly — no build step, no Node, no configuration.

You can also produce that folder yourself: `npm install && npm run build`, then
drag the resulting `dist/` folder to Netlify Drop.

---

## If a Git build fails, it's almost certainly one of these

- **`vite: not found` during build** → the build image skipped devDependencies
  (Vite is a devDependency). This repo already guards against it with
  `NPM_FLAGS = "--include=dev"` in `netlify.toml`. If you deploy the default
  branch (which lacks that line) and hit this, either deploy the
  `claude/spaceship-assets-integration-57k8bu` branch or add an environment
  variable `NPM_FLAGS = --include=dev` in Netlify → Site settings → Build & deploy.
- **A Node error** → set **Node version** to `22` (this branch pins it in
  `netlify.toml`; on the default branch add `NODE_VERSION = 22` under Site
  settings → Environment variables).
- **Ships don't appear but the game runs** → check the browser console. A
  `[models] … load failed` warning means a `.glb` 404'd; confirm the four files
  exist under `dist/models-glb/` in the deploy (they are committed and copied
  automatically, so this should not happen).

## Local sanity check (optional, matches what Netlify runs)

```bash
npm install
npm run build           # -> dist/ (index.html, assets/, models-glb/*.glb)
npm run preview         # serve the built dist locally to click through it
```

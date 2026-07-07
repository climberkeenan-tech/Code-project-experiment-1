# Starfall Frontier — Developer Handoff

_Last updated for the **hand-modeled-ship era** (branch `claude/spaceship-assets-integration-57k8bu`,
forked from `af3a3d9`). Working tree is clean; everything described below is committed. This
handoff was rebuilt from a full-codebase survey — every constant, event name, and
contract below was read out of the source, not remembered._

> **Deployment-verification pass (this branch).** Every claim about the ship
> assets was re-verified end-to-end, not assumed: all four GLBs are present and
> valid on GitHub's default branch, `npm ci && npm run build` produces a 4.5 MB
> `dist/` containing all four models, and the built game boots in headless
> Chromium with **all four `.glb` fetched HTTP 200, zero console errors**, and
> each model-backed hull loading its real geometry (40k–72k tris vs ~400 for the
> procedural-fallback slots). See [§14](#14-build-deploy--the-test-harness) and
> `DEPLOY.md` for the click-by-click Netlify guide.

> **Why this rewrite exists:** the game now loads four hand-authored ship models
> (GLB) that hot-swap in over the procedural hulls, and we're about to add **more
> spaceships**. The ship system is therefore documented first and in exhaustive
> detail — read [§1 The Ship System](#1-the-ship-system-read-this-first) and
> [§2 Adding a New Spaceship](#2-adding-a-new-spaceship-the-exact-process) before
> touching any hull, catalog entry, or model.

---

## Table of contents
1. [The Ship System (read this first)](#1-the-ship-system-read-this-first)
2. [Adding a New Spaceship — the exact process](#2-adding-a-new-spaceship-the-exact-process)
3. [Project goal & current state](#3-project-goal--current-state)
4. [Architecture & composition](#4-architecture--composition)
5. [Core services](#5-core-services)
6. [Save system (full schema)](#6-save-system-full-schema)
7. [World, planets & terrain](#7-world-planets--terrain)
8. [Environment & camera](#8-environment--camera)
9. [Combat & FX](#9-combat--fx)
10. [Enemy AI & population](#10-enemy-ai--population)
11. [Gameplay systems](#11-gameplay-systems-on-foot-warp-crew-fleet-economy-poi-landing)
12. [UI & audio](#12-ui--audio)
13. [EventBus catalogue](#13-eventbus-catalogue)
14. [Build, deploy & the test harness](#14-build-deploy--the-test-harness)
15. [Known bugs, stale comments & debt](#15-known-bugs-stale-comments--debt)
16. [Design decisions to respect](#16-design-decisions-to-respect)
17. [ToDo (prioritized)](#17-todo-prioritized)
18. [Instructions for the next developer](#18-instructions-for-the-next-developer)

---

## 1. The Ship System (read this first)

### 1.1 The `ShipRig` contract — the shape every ship produces
Every ship in the game (player, enemy, escort, even POI wrecks) is a **`ShipRig`**
object produced by `src/ship/ShipFactory.js`:

```
ShipRig = {
  group:      THREE.Group      // the visual mesh tree
  engines:    THREE.Vector3[]  // nozzle anchor positions in SHIP-LOCAL space (EngineGlow)
  hardpoints: THREE.Vector3[]  // weapon muzzle positions in SHIP-LOCAL space (WeaponSystem)
  radius:     number           // bounding-sphere radius (collision, camera leash, shield size)
  glowColor:  THREE.Color      // engine-glow tint (the ONLY visual catalog field a model rig keeps)
  modeled?:   boolean          // false = a procedural STAND-IN awaiting a GLB; true/absent = final
}
```

`ShipBase` (`src/ship/ShipBase.js`) wraps a rig into a flyable ship: `object3D` is the
outer physics `Group` (transform + velocity), `visual` is `rig.group` added inside it
(for banking/recoil cosmetics). `ShipBase` copies `radius`, `engines`, `hardpoints`,
`glowColor` off the rig and sets `rigModeled = rig.modeled !== false`. **Ship forward is
local `-Z`, up is `+Y`** — the global convention. Defense model: shields absorb first,
hull second; `applyDamage(amount)` returns `{shieldAbsorbed, hullDamage, destroyed}`.
`ShipBase` defaults: `hullMax 100, shieldMax 100, shieldRegenRate 9/s, shieldRegenDelay 3.5s`.

### 1.2 Two ways a rig is built
`createPlayerShip(variantId='starter')` (`ShipFactory.js:259`) decides in this order:
1. **`v.model` set → `buildModelRig(v.model, glowColor, v.modelScale ?? 1)`.** Returns
   `null` while the GLB is still loading, so it falls through.
2. **`v.capital` set →** `buildPlayerCarrier` (`capital==='carrier'`) or
   `buildPlayerBattleship` — dedicated procedural silhouettes for capitals with no model.
3. **else → the procedural fighter recipe** (cached primitive geometry: fuselage, canopy,
   wing, fins, nacelles, cannons). `radius = 3.2 * v.scale`.

Because the `PlayerShip` constructor runs **before** models finish loading, the player
**always boots on the procedural stand-in** and hot-swaps to the GLB when it arrives
(see §1.6).

### 1.3 `MODELS` registry — the four hand-authored hulls
`src/ship/ModelShips.js` is **the single place hand-authored hulls enter the game.**
The `MODELS` registry (`ModelShips.js:21-52`), verbatim:

| id | url | targetLength | yaw | pitch | in-game name |
|----|-----|-------------:|-----|------:|--------------|
| `starter` | `models-glb/starter.glb` | 9 | `-Math.PI/2` | 0 | Nebula Sentinel |
| `gunship` | `models-glb/gunship.glb` | 11 | `-Math.PI/2` | 0 | Nebula Vanguard |
| `dreadnought` | `models-glb/dreadnought.glb` | 32 | `-Math.PI/2` | 0 | Obsidian Dreadnought (mid capital) |
| `flagship` | `models-glb/flagship.glb` | 100 | `-Math.PI/2` | 0 | Star-Destroyer carrier ("vast, ~11× a fighter") |

- **`yaw: -Math.PI/2` for all four**: Meshy authors the nose along **`-X`**; the yaw
  rotates it onto game-forward **`-Z`**. Every new model authored the same way uses the
  same yaw.
- **`targetLength`** is the in-game size knob. **Caveat:** `normalize()` scales by the
  **largest** bounding dimension (`max(x,y,z)`), *not* strictly length — a hull wider
  than it is long ends up shorter than `targetLength`.
- The four files live in `public/models-glb/` (served static, **not** bundled by Vite):
  `dreadnought.glb` 1,197,304 B · `flagship.glb` 997,168 B · `gunship.glb` 795,016 B ·
  `starter.glb` 831,820 B (~3.7 MB total).

### 1.4 The GLB load pipeline (`ModelShips.js`)
- `loadModelShips()` — idempotent singleton (`loadPromise`). Uses `GLTFLoader` **with
  `loader.setMeshoptDecoder(MeshoptDecoder)`** — the GLBs are **meshopt-compressed**
  (`EXT_meshopt_compression`); a plain `GLTFLoader` will fail to parse them. Loads all
  four in parallel via `Promise.all`; **each model resolves individually** and never
  rejects — on load error it logs `[models] <id> load failed (procedural fallback stays)`
  and the stand-in stays forever (no retry).
- `onModelLoaded(cb)` — per-model arrival listener; fires as **each** model finishes (so
  the fleet upgrades hull-by-hull on a slow connection). Already-loaded ids are replayed
  synchronously when you subscribe, so **subscribe only after `player`/`enemies` exist**
  (main.js does this correctly).
- `getModelProto(id)` → normalized prototype or `null`. Consumed only by
  `buildModelRig`.
- `getEnemyModelProto(id)` → **red-faction variant**: clones the base proto once, clones
  each source material once (`matCache` by uuid), tints `color.multiply(1.05, 0.42, 0.38)`
  + `emissive.setRGB(0.22, 0.015, 0.015)`, caches in `enemyProtos`. **Every enemy clone
  of a model shares one tinted material set** — do not mutate an enemy clone's material
  per-ship or you repaint the whole faction.
- `normalize(obj, spec)` steps: `updateMatrixWorld` → Box3 → recenter (`obj.position.sub(center)`)
  → wrap in an inner `Group` with `rotation.set(pitch, yaw, 0)` (re-axises nose to `-Z`)
  → `inner.scale.setScalar(targetLength / maxDim)` → mesh `castShadow`/`receiveShadow`,
  `material.side = FrontSide`, Phong `shininess = min(shininess ?? 30, 60)` → re-measure and
  store `proto.userData.shipBounds = {length: z-size, width: x-size, height: y-size,
  rearZ: box.max.z, noseZ: box.min.z}`. **All gameplay anchors derive from `shipBounds`.**

### 1.5 `PLAYER_SHIPS` — the full catalog (`ShipFactory.js:209-250`)
Eight entries, in catalog order. `PLAYER_SHIP_BY_ID` is `Object.fromEntries(...)` at
`:252`. Multipliers scale off the 100-hull/100-shield baseline.

| id | name | Lv | cost (cr) | hull | shield | engine | crew | model / capital | flags |
|----|------|---:|----------:|-----:|-------:|-------:|-----:|-----------------|-------|
| `starter` | SF-10 Sentinel | 10 | 0 | 1 | 1 | 1 | 2 | model `starter` | — |
| `explorer` | SF-20 Nebula Gunship | 20 | 320 | 1.25 | 1.2 | 1.08 | 3 | model `gunship` | — |
| `interceptor` | SF-30 Kestrel | 30 | 800 | 1.5 | 1.45 | 1.18 | 3 | model `gunship`, **`modelScale 1.18`** | — |
| `frigate` | SF-50 Aegis | 50 | 2080 | 2.2 | 2.1 | 1.28 | 4 | **procedural** | `twinFin` |
| `battlecruiser` | SF-70 Bastion | 70 | 6400 | 3.4 | 3.1 | 1.38 | 5 | **procedural** | `twinFin`, `quadEngines` |
| `sovereign` | SF-100 Sovereign | 100 | 20800 | 5.2 | 4.6 | 1.5 | 7 | **procedural** | `twinFin`, `quadEngines` |
| `battleship` | SF-85 Obsidian Dreadnought | 85 | 12800 | 7 | 5.5 | 1.05 | 6 | model `dreadnought`, `capital 'battleship'` | `turrets 4`, **`hangar 4`** |
| `carrier` | SF-110 Vanguard | 110 | 40000 | 11 | 8 | 0.85 | 8 | model `flagship`, `capital 'carrier'` | `turrets 2`, **`hangar 15`**, **`noLanding`** |

_Prices are ×1.6 from launch, and hangars now launch generic **attack fighters** (§11 Fleet), not owned ships._

Every entry also carries `scale` (procedural-fallback size only), `hullColor`,
`accentColor` (fallback-only), and `glow: [r,g,b]` (an HDR triple — **used by EngineGlow
in BOTH the model and procedural paths**, the one visual field that survives into a model
rig).

**Which catalog fields matter where:**
- **Both paths:** `glow`, `hull`/`shield`/`engine`/`crew`/`turrets`/`hangar`/`capital`/`noLanding`, `model`/`modelScale`.
- **Procedural fallback only (dead weight once a model loads):** `scale`, `hullColor`, `accentColor`, `twinFin`, `quadEngines`.

**Note:** `frigate`/`battlecruiser`/`sovereign` (Lv 50/70/100) still fly the **procedural
fighter recipe** — comments call the loaded models "design 1..3 of 4", i.e. more
hand-modeled hulls were planned for these slots. **These are the natural slots for the
new ships.**

### 1.6 The hot-swap: how a GLB replaces a stand-in
`main.js:175-180`, run **after** `save.load()` + `player.applyUpgrades()` (so the
*restored* active ship is what swaps):
```js
loadModelShips();
onModelLoaded((id) => {
  const variant = PLAYER_SHIP_BY_ID[player.ships.active];
  if (variant?.model === id) player.refreshShip();  // rebuild the player's hull in place
  enemies.refreshModels();                           // every live enemy upgrades its hull
});
```
- **Player side:** `PlayerShip.refreshShip()` nulls `ships.active` (to defeat `setShip`'s
  same-id guard) then `setShip(id)`. `setShip` removes the old visual, disposes the old
  `ShieldEffect`, builds the new rig, swaps `radius`/`engines`/`hardpoints`/`glowColor`,
  makes a new `EngineGlow` + `ShieldEffect(radius*1.4)`, calls `applyUpgrades()`,
  **full-heals** (`hull=hullMax, shield=shieldMax`), and emits `'ship:changed'` with the
  catalog entry. Transform + velocity are preserved (seamless mid-flight swap).
  - ⚠️ Because `refreshShip` fires from `onModelLoaded`, a model arriving mid-combat
    **repairs the player for free**.
- **Enemy side:** `EnemyManager.refreshModels()` → each `EnemyShip.refreshVisual()`
  (no-op if `rigModeled` or dead; bails if the new rig is still `modeled===false`;
  otherwise swaps visual/anchors and rebuilds `EngineGlow` + `ShieldEffect(radius*1.35,
  Color(1.6,0.8,0.4))`).

### 1.7 Enemies fly the player's hulls, red-tinted
`ENEMY_MODEL_MAP` (`ShipFactory.js:451-463`) maps **all 8 enemy classes** to a hero model,
so `ENEMY_BUILDERS` (the ~180 lines of procedural enemy silhouettes) are now **pure
fallbacks** used only during a cold load or after a failed download:

| enemy class | model | scale | notes |
|-------------|-------|------:|-------|
| `scout` | `starter` | 0.85 | |
| `fighter` | `starter` | 1.05 | |
| `heavy` | `starter` | 1.5 | |
| `cruiser` | `gunship` | 1.35 | |
| `destroyer` | `gunship` | 2.1 | |
| `warship` | `dreadnought` | 0.9 | red mid capital |
| `redcarrier` | `flagship` | 0.75 | smaller than your carrier |
| `apex` | `flagship` | 1.25 | the apex — bigger than everything |

`createEnemyShip(type)` clones the tinted proto (shared materials), derives anchors from
`shipBounds` (**hardpoints `±W*0.3`, not the player's `±W*0.34`** — see gotcha), sets
`glowColor = Color(5.4,0.6,0.5)` and `modeled: true`. When the model isn't ready it builds
a procedural stand-in via `ENEMY_BUILDERS[type]` scaled by `ENEMY_SCALE` (`scout 1.6,
fighter 1.5, heavy 1.4, cruiser 1.35, destroyer/warship/redcarrier 1.0, apex 1.3`) and
flags `rig.modeled = !mm` so `refreshVisual` upgrades it later. **`apex` has no builder** —
it falls back to the `destroyer` builder.

### 1.8 Anchor derivation (why muzzles/nozzles land where they do)
`buildModelRig` (`ShipFactory.js:346-365`), all in ship-local space off `shipBounds`:
- `engines = [ (±W*0.16, 0, rearZ*scale*0.92) ]`
- `hardpoints = [ (±W*0.34, 0, noseZ*scale*0.45) ]`
- `radius = (length*scale) / 2.6` → e.g. flagship ≈ 60/2.6 ≈ 23.
There is **no per-model anchor metadata** — nozzle/muzzle positions are pure
bounds-formula guesses. A `MODELS` field for authored anchors is the obvious extension
point if a new hull's guns/engines land wrong.

### 1.9 Every system that touches ships (the coupling map)
A new ship added to `PLAYER_SHIPS` is picked up automatically by all of these — but this
is the list to check when reorganizing:

| Consumer | What it reads / does | File |
|----------|----------------------|------|
| `PlayerShip` | `statMult` = active catalog entry; `setShip`/`refreshShip`/`applyUpgrades`; `statMult.engine` multiplies thrust & max speed | `ship/PlayerShip.js` |
| `Shop` (Ships tab) | renders every `PLAYER_SHIPS` entry; `_buyShip`/`_selectShip` → `player.setShip` | `ui/Shop.js:143,277` |
| `SaveGame` | validates `owned`/`active` against `PLAYER_SHIP_BY_ID`; fallback id `'starter'` | `core/SaveGame.js:91` |
| `CombatSystem` | on death, switches to **cheapest owned** by `PLAYER_SHIP_BY_ID[id].cost`; fallback `'starter'` | `combat/CombatSystem.js:69` |
| `EncounterDirector` | difficulty tiers from `PLAYER_SHIP_BY_ID[active].level` | `ai/EncounterDirector.js:206` |
| `Reinforcements` | same `level`-based veteran scaling | `ai/Reinforcements.js:81` |
| `LandingSystem` | `statMult.noLanding` blocks landing (`tooLarge`) | `ship/LandingSystem.js:40` |
| `FleetSystem` | `statMult.hangar` gates launch; wing = N generic attack fighters | `fleet/FleetSystem.js` |
| `EscortShip` | `createPlayerShip(variantId)`, `PLAYER_SHIP_BY_ID[variantId] ?? starter` | `fleet/EscortShip.js:36` |
| `CrewManager` | `statMult.crew` (capacity), `statMult.turrets` (gunner stations); fires from `player.hardpoints` | `crew/CrewManager.js` |
| `ChaseCamera` | leash `hullScale = max(1, radius/3.2)` — capitals get a longer boom | `camera/ChaseCamera.js:79` |
| `Radar` | `ENEMY_BLIP` size keyed by `enemy.type` (fallback 2.6) | `ui/Radar.js:26` |
| `TargetOverlay` | boss bracket for `type==='destroyer'` or `stats.apex` | `ui/TargetOverlay.js:145` |
| `POIFactory` | `createWreck` builds its hulk from `createEnemyShip('heavy')` scaled 2.6 | `exploration/POIFactory.js:90` |
| `main.js` | the hot-swap hook (`variant.model === id`) | `main.js:177` |

### 1.10 Ship gotchas (learn these before editing)
- **Hardpoints must be manually scaled; engines must not.** `hardpoints` are consumed in
  **world-space** math without the group transform, so every scale must
  `multiplyScalar` them (`ShipFactory.js:313,504`). Engine anchors are **not** scaled
  because `EngineGlow` sprites are parented inside the scaled visual group. Get this wrong
  and muzzle flashes/laser origins silently drift.
- **`setShip` has a same-id guard** (`PlayerShip.js:252`). Any in-place rebuild must go
  through `refreshShip` (which nulls `ships.active` first). `setShip(active)` is a silent
  no-op.
- **`setShip`/`refreshShip` full-heal** — a model arriving mid-combat repairs the player.
- **`normalize()` scales by the largest bounding dimension**, not length.
- **`shipBounds` is measured after re-axising** (`length = z`, `rearZ = +Z` stern,
  `noseZ` negative). Enemy clones share the **same** `shipBounds` reference.
- **GLBs need `setMeshoptDecoder(MeshoptDecoder)`** — any new load site must register it.
- **Model load failures never retry** and surface only as `console.warn`.
- **Removing/renaming a catalog id is a save hazard** — `SaveGame` silently drops unknown
  owned ids (and their purchase cost). If all owned ids become invalid, the collection
  resets to `['starter']`. The literal `'starter'` is hard-coded as the fallback in
  `SaveGame`, `CombatSystem`, and `EscortShip`.
- **`geometryCache`/`materialCache` in `ShipFactory` and the `EngineGlow`/`ShieldEffect`
  caches are never evicted** — mutating a returned geometry/material affects every ship of
  that class. Ship `dispose()` deliberately keeps shared geometry (only disposes `shieldFx`).
- **Stale FBX-era comments to ignore:** `ShipFactory.js:210-216` says `/models/starter.fbx`;
  `ModelShips.js:134` says "raw FBX scene"; `main.js:172` says "86MB of FBX". Reality: 4
  meshopt GLBs under `public/models-glb/` totaling ~3.7 MB, loaded with `GLTFLoader`.

---

## 2. Adding a New Spaceship — the exact process

This is the "how do we organize things for the new spaceships" answer. Adding a
model-backed player ship touches **exactly two files plus one asset**; everything else
(Shop, save, respawn, escorts, difficulty) is generic over the catalog.

### 2.1 Steps
1. **Author & compress the model.** In Meshy (or any tool), author the hull with the
   **nose along `-X`, up `+Y`** (the registry's `yaw:-Math.PI/2` rotates it onto game-forward
   `-Z`). Export FBX, then run the compression pipeline (§2.2) to a **meshopt GLB**
   (~1 MB target). Aim for the whole-game budget: currently ~4.5 MB.
2. **Drop the file** at `public/models-glb/<id>.glb`.
3. **Register the model** in `src/ship/ModelShips.js` `MODELS` (`:21-52`):
   ```js
   <id>: { url: 'models-glb/<id>.glb', targetLength: <in-game length>, yaw: -Math.PI/2, pitch: 0 },
   ```
   Remember `targetLength` scales the **largest** bounding dimension. Class bands today:
   fighters 9–11, mid capital 32, flagship 60.
4. **Add the catalog entry** in `src/ship/ShipFactory.js` `PLAYER_SHIPS` (`:209-250`):
   ```js
   { id: '<id>', name: 'SF-XX Name', level: <N>, cost: <cr>,
     hull: <mult>, shield: <mult>, engine: <mult>, crew: <n>,
     model: '<id>',            // or reuse an existing model + `modelScale: <k>`
     scale: <k>,               // procedural-fallback size (used until the GLB lands)
     hullColor: 0x……, accentColor: 0x……,   // fallback-only
     glow: [r, g, b],          // HDR triple — USED in both paths (EngineGlow)
     // optional: twinFin, quadEngines (fallback-only),
     //           turrets, hangar, capital: 'battleship'|'carrier', noLanding
   },
   ```
5. **(Optional) Give enemies the hull.** Add an `ENEMY_MODEL_MAP` entry
   (`ShipFactory.js:451`). If it's a **new enemy class** (not just a new skin), also add an
   `ENEMY_TYPES` stat block (`ai/EnemyShip.js:20`), an `ENEMY_SCALE` fallback entry, an
   `ENEMY_BUILDERS` fallback silhouette, a `Radar` `ENEMY_BLIP` size, and — if it deploys
   in encounters — a `TIER_SQUADS` (`ai/EncounterDirector.js:34`) and/or `REPLACEMENT`
   (`ai/Reinforcements.js:25`) entry.
6. **Nothing else.** Shop, save validation, cheapest-ship respawn, escort deployability,
   and the hot-swap are all generic. Bump the start-screen build stamp
   (`src/ui/Screens.js:37`) for the playtest.

### 2.2 The model-compression pipeline (dev deps are already installed)
No conversion script is committed — the invocation was run ad hoc. The pipeline that took
the four hulls from 86 MB of FBX to 3.7 MB of GLB (commit `3321fc4`):
- **`fbx2gltf`** (dev dep `fbx2gltf@0.9.7-p1`): FBX → glTF.
- **`@gltf-transform/cli`** + **`@gltf-transform/extensions`** (`4.4.1`): meshopt
  compression + mesh simplification (~10× fewer triangles) + 1K WebP textures → ~1 MB GLB.
- Result loads via `GLTFLoader` + `MeshoptDecoder` (already wired in `loadModelShips`).
- **Writing a committed `tools/` conversion script is an open TODO** — the raw FBX sources
  were deleted from the repo; they survive only inside `builds/starfall-frontier-build8.zip`
  at commit `9a17b4d`, or from the original Meshy exports.

### 2.3 Known pain points when adding ships (candidates for the "reorganize" work)
- **Anchor derivation is duplicated** between `buildModelRig` (player, hardpoints `±W*0.34`)
  and `createEnemyShip`'s model path (`±W*0.3`) with divergent constants — a shared helper
  would remove drift risk.
- **Two size knobs** are easy to desync: `modelScale` scales the loaded model, `scale`
  scales only the procedural fallback.
- **Fallback-only fields** (`hullColor`/`accentColor`/`twinFin`/`quadEngines`) are dead
  weight once a model loads but still required for a plausible stand-in.
- **`createMaterials` is called before the model check** (`ShipFactory.js:262`), so a
  material set is built/cached even for model ships (harmless, wasted work).
- **Very large hulls** stress three ship-size couplings: the shadow ortho box is only
  ±60 units (Sun.js), the asteroid spatial-hash `sphereHit` assumes a small radius vs
  `cellSize 96`, and the landing touchdown gate uses `radius`. A hull much larger than the
  flagship needs `noLanding` and a look at those.

---

## 3. Project goal & current state

**Goal:** a seamless, mobile-browser 3D space-exploration + combat game — fly a 6DOF
fighter through open space, descend through a planet's atmosphere to its surface and back
**with no loading screens**, explore a procedurally generated single-star system, mine,
trade, fight pirates, command a fleet. Tone: a simplified No Man's Sky / Elite / Star Wars
blend, exploration-first with combat as punctuation. Every subsystem is written to expand
without rewriting the core.

**Current state (all verified via the headless harness — boot → cruise → combat →
planetfall, zero console errors):** full flight model, chase camera, 8 enemy classes +
apex boss + reinforcement swarms, pooled laser/missile combat with cursor-aim assist, a
9-planet procedural system with seamless planetfall, quadtree cube-sphere LOD terrain,
atmosphere/cloud/haze shaders, day/night, on-foot walking + tiered mining, an Outpost
Exchange shop (sell/upgrades/ships/crew/repair), hireable crew, a carrier fleet of AI
escorts, hyperdrive, auto-landing, settlements/POIs, wildlife, four hand-modeled hulls
that hot-swap in, and a fully synthesized WebAudio soundscape. Persistence is
`localStorage` only.

---

## 4. Architecture & composition

Vite single-page app; all game code under `src/` (~9,000 lines JS + `src/ui/hud.css`).
Architecture is a **service/system composition**: `Game` owns shared services and an
ordered list of systems, each with an `update(dt, elapsed)` method. **Registration order
in `main.js` IS update order.**

### `main.js` registration order (simulation → camera → dressing → UI)
`player → universe → onfoot → warp → landing → approach → settlements → poi → director →
enemies → apex → reinforcements → weapons → combat → crew → fleet → explosions → pickups →
sun → camera → starfield → nebulas → dust → ship-sounds → music → hud → radar → targets →
shop`, then `TouchControls` + `Screens` (constructed, not registered as update systems).
After that: a `visibilitychange` audio suspend hook, `SaveGame.load()` + `applyUpgrades()`,
then `loadModelShips()` + the `onModelLoaded` hot-swap hook, `game.start()`, and
`window.__game = game` for the harness/console.

### `Game` service container (`core/Game.js`)
- **Services:** `engine, events, input, audio, origin` (`FloatingOrigin(8192)`), `quality`.
- **Cross-system slots** (wired via `Game`, not singletons): `player, universe, enemies,
  weapons, poi, sun, explosions, pickups, obstacles[]` (`{position, radius, planet?}`
  sphere colliders), `asteroidFields[]`, `entryHeat` (0..1), plus `onfoot, warp, crew,
  fleet, landing, approach, apexSystem, reinforcements`.
- **`mode`:** `'flight' | 'onfoot'` (set by the on-foot controller). **`rebaseAnchor`:**
  `Vector3|null` — floating-origin anchor override (on-foot points it at the avatar).
- **`paused`:** `true` initially. When paused, systems don't update but `quality.update`
  still runs.
- **Per-frame `_update`:** `input.update()` → each `system.update(dt, elapsed)` if not
  paused → `origin.update(rebaseAnchor || player.position)` → `quality.update(dt)`.

---

## 5. Core services

### Engine (`core/Engine.js`)
- `WebGLRenderer`: `antialias:false` (MSAA on the composer target instead),
  **`logarithmicDepthBuffer:true`**, `powerPreference:'high-performance'`, `stencil:false`.
  `ACESFilmicToneMapping`, exposure `1.1`, shadows on (`PCFSoftShadowMap`).
- Camera: `fov 68, near 0.1, far 2,000,000` — the log depth buffer exists precisely for
  this range.
- Post chain: HalfFloat MSAA target (samples 2 mobile / 4 desktop) → `RenderPass` →
  `UnrealBloomPass(res 512², strength 0.65, radius 0.5, threshold 0.85)` → `OutputPass`.
  **Bloom threshold 0.85 → engine-glow emissives must exceed it to bloom.**
- Dynamic resolution: `pixelRatio = min(devicePixelRatio, 2) * resolutionScale`; initial
  scale `0.85` mobile / `1.0` desktop.
- Frame tick: `dt = min((now-last)/1000, 0.05)`, first frame `1/60`. `setAnimationLoop`.

### EventBus (`core/EventBus.js`)
`on/once/emit` only, fully synchronous, `Map<string, Set<fn>>`. `emit` iterates a copy so
handlers may unsubscribe mid-dispatch. **No error isolation** — one throwing handler aborts
the rest of that emit. Event names live at their emit sites (see [§13](#13-eventbus-catalogue)).

### Input (`core/Input.js`) — complete key map
- **Flight axes** (all `[-1,1]`): `pitch` (+up), `yaw` (+right), `roll` (+right), `throttle`,
  `strafeX`, `strafeY`, plus `boost`, `brake`, `fire`.
- **Flight keys:** `W/S` throttle ±1 · `A/D` roll −1/+1 · `Q/E` strafeX −1/+1 · `R/F`
  strafeY +1/−1 · Arrows pitch/yaw (`Up`=pitch+1, `Down`=pitch−1, `Left`=yaw−1,
  `Right`=yaw+1) · `Shift` boost · `X` brake · `Space`/LMB fire.
- **Edge-triggered (consume-once):** `E` interact/mine/board/disembark · `T` trade/hail ·
  `C` countermeasure · `J` warp engage · `B` warp cycle target · `L` auto-land toggle ·
  `G` fleet launch/recall · `V` fleet focus-fire.
- **On-foot keys:** `WASD` walk · Arrows look (`Left/Right`=lookX, `Up`=lookY−1,
  `Down`=lookY+1) · `Space` jump · `Shift` sprint; mouse = look **rate**.
- Priority: virtual (touch) axes → mouse → keyboard override. Mouse steering normalizes
  over `min(vw,vh)*0.42`, dead zone `0.06`, smoothstep-squared response. `blur` clears all
  keys/buttons so thrust/fire never latch. Ctrl/Meta combos are ignored entirely.
- ⚠️ **Mode-string mismatch:** `game.mode` uses `'onfoot'`; `input.mode` compares against
  `'foot'`. They're separate fields — a mode switch must set both (`game.mode='onfoot'`,
  `input.mode='foot'`).

### FloatingOrigin (`core/FloatingOrigin.js`)
Rebases the world when `|anchor|² ≥ 8192²`: passes a **shared scratch** `delta` to every
`onShift(cb)` subscriber, which must **subtract** it from every world position it tracks
(velocities unaffected). Consume `delta` immediately — never retain the reference.
`offset` accumulates total shift so `absolute = render + offset` (used by radar/respawn).
**Forgetting to subscribe is the #1 source of teleport/jitter bugs** — check it whenever
you add anything positioned in the world.

### AudioEngine (`core/AudioEngine.js`)
Fully procedural WebAudio — **zero audio assets.** Graph: source → per-bus gain
(`sfx 0.9, engine 0.55, music 0.5, ambient 0.6`) → master → compressor → destination.
`unlock()` must run from a user gesture (start-screen tap); every method no-ops until
`ctx.state==='running'`. Primitives: `playTone`, `playNoise` (2 s shared white-noise loop),
`createLoop` (persistent loop → `{gain, filter, stop()}`, returns `null` before unlock).
`setMuted()` exists but nothing calls it (no volume UI).

### QualityManager (`core/QualityManager.js`)
Tunes `resolutionScale` to hold frame rate. Over ≥1 s windows: below 42 fps → `−0.1`
(floor `0.55`, cooldown 2 s); above 57 fps → `+0.05` (cap `0.9` mobile / `1.0` desktop,
cooldown 3 s). Runs even while paused. Smoothed `fps` (EMA α=0.05) is exposed for the
`?debug` HUD.

### ObjectPool (`core/ObjectPool.js`)
`acquire`/`release` (double-release guarded), optional `reset` callback, `prewarm`,
`releaseAll`, `forEachActive` (iterates a snapshot so items can be released mid-iteration).
Pools in play: 24 bolts, 12 pickups, 4 explosions (all pre-attached to the scene once).

### Math (`core/math/rng.js`, `noise.js`)
`Rng(seed)` = `mulberry32(hash32(seed))` with `range/int/chance/pick/unitVector/gaussian`.
**Convention: one `Rng` per procedural domain** (child seeds `hash32(seed + ':label')`),
so consumption order in one system never perturbs another's — adding a shared-stream
consumer changes the universe for existing seeds. `SimplexNoise(seed).noise3/fbm/ridged/
billow` (each planet gets its own permutation). Exports `smoothstep, lerp, clamp,
damp(rate,dt)=1-e^(-rate·dt)` — integrators use `damp`, never raw per-frame lerps.

---

## 6. Save system (full schema)

`core/SaveGame.js` — the whole persistence layer. `KEY = 'starfall-frontier-save-v1'`
(the key literal keeps `v1` even though `SCHEMA_VERSION = 2` — the key is the identity,
version lives inside the payload). Default `LocalStorageAdapter` ({read, write}) is
**swappable** for a future cloud adapter (pure `serialize()` snapshot + `rev`/`savedAt`
for last-write-wins).

**`serialize()` shape** (`:107-125`), exactly:
```
{ version: 2, rev: ++_rev, savedAt: Date.now(),
  resources, credits,
  inventory:  { ...player.inventory },           // shallow copy
  upgrades:   player.upgrades,                    // LIVE REFERENCE, not copied
  crew:       [ { role, name, stars } ],          // ids NOT persisted
  ships:      { owned: [...owned], active },
  discoveredSites: [ poi.site.id … ] }
```
**Autosave triggers** (1500 ms debounce): `poi:discovered, enemy:killed, player:respawned,
pickup:collected, shop:purchase, crew:changed, ship:changed, onfoot:left`. `visibilitychange`
(hidden) and `pagehide` force an immediate `flush()`.

**Load** (`:59-104`), called once from `main.js:168`: restores `rev`/`resources`/`credits`;
copies only `RARITY_IDS` inventory keys and only `engine`/`weapon`/`shield` upgrade keys;
`CrewManager.restore`; **`ships.owned` filtered through `PLAYER_SHIP_BY_ID`** (unknown ids
dropped, empty → `['starter']`), `active` must be valid and owned else `owned[0]`, then
`player.setShip(active)`; POI discovery restored (accepts v2 `discoveredSites` or legacy
`discovered` — the **only** migration handling). **`version` is never read.**

**Does NOT persist:** position/velocity, hull/shield values, escort fleet, enemy state,
world/POI positions (only discovery booleans), settings, crew ids, on-foot state.

⚠️ `serialize()` bumps `_rev` (not pure). `upgrades` is a live reference. Storage failures
are fully silent. Up to 1.5 s of progress can be lost on a hard crash.

---

## 7. World, planets & terrain

- **Seed:** `UNIVERSE_SEED = 'starfall-7741'` (`world/constants.js`). `SUN_POSITION = (0,0,0)`,
  `SUN_RADIUS = 5000`, `PLAYER_SPAWN = (1200, 800, 46000)`. Determinism: everything derives
  from the seed with a suffix (`:planet:N`, `:field:inner`, `:civilizations`, per-planet
  noise fields `:continent`/`:hill`/`:mountain`/…).
- **9 planets:** hand-tuned terran homeworld "Veridian Prime" at `(11200, 1600, 37500)`
  (radius 3200, gravity 26, atmosphere 340, ocean) + 8 generated on a golden-angle spiral
  (55k–235k out), `ARCHETYPE_DECK = ['ocean','ice','desert','volcanic','rocky','terran',
  'ice','desert']`. Archetype modifiers tune gravity, craters, haze, clouds, ocean color;
  `rocky` worlds are airless.
- **The single terrain sampler** — `createTerrainSampler(descriptor)` (`world/terrainHeight.js`)
  is the **single source of truth for height/normal/color**, shared by the quadtree mesher,
  `Planet.getAltitude`/`getSurfaceNormal` collision, `Settlements` placement, and scatter.
  **"What you see is exactly what you hit." Do not add a second height source.** 8 layered
  simplex fields: continents → hills → ridged mountains → plateaus → canyons → analytic
  craters → detail.
- **Quadtree cube-sphere LOD** (`world/terrain/QuadtreeSphere.js`): 6-face,
  `resolution 17`, `maxDepth 8`, `splitFactor 3.0`, **`buildBudgetMs 3.5`** (always builds
  ≥1 patch even over budget). Pooled geometries + shared Uint16 index; skirts for
  crack-free LOD. Descending fast sharpens over a few frames — expected, not a bug.
- **Gameplay coupling** (`world/Universe.js`, per frame): inverse-square gravity with
  3-radii fade; exponential atmospheric drag; **`envSpeedScale`** = `clamp(altitude/700, 1,
  24)` written to `player.envSpeedScale` — the seamless-planetfall trick (fighter speed at
  the deck, 24× in deep space, **no mode switch — don't replace with a hard cap**); entry
  heat → `game.entryHeat`; wind audio; terrain collision for player + enemies;
  grounded/disembark detection. Autopilot touchdowns are damage-free.
- **Day/night:** each planet sweeps a shared `sunDir` vector around its tilted polar axis
  (day length 540–900 s). **The terrain mesh NEVER rotates** — collision samplers assume a
  static local frame; the terminator sweeps "for free" from `sunDir`. `Sun.js` rotates the
  ground light by the same `spinAngle` to match.
- **Custom shaders (`Atmosphere`, `Clouds`, `hazeShader`) all include the four
  `logdepthbuf` chunks** — mandatory against the logarithmic depth buffer. Their uniforms
  hold **live references** to `planet.group.position` / `planet.sunDir` — mutate in place,
  never clone/replace.
- **`ApproachScatter`** builds a forest patch under the ship below 1500 u (teardown 2200,
  rebuild-dist 300), parented to `planet.group`; `adopt()` hands the live patch to the
  on-foot controller on disembark (no double forests). **`Settlements`** places up to 3 lit
  towns on atmosphere worlds (built within `radius*3`, discovered within `radius*0.5`).

---

## 8. Environment & camera

- **Sun** (`environment/Sun.js`): the game's **single real light** — a `DirectionalLight`
  (0xfff0dc, intensity 3.4) with the **only shadow camera**, a tight **±60-unit ortho box**
  that tracks the player (⚠️ ships/terrain beyond ~120 u won't shadow correctly — relevant
  for very large capitals). Plus a HemisphereLight fill and HDR disc + corona sprites.
- **Sky dressing** (`Starfield` 5200+2800 stars, `Nebulas` 5 painted sprites + 4 galaxies,
  `SpaceDust` 220 wrap points) is **glued to `camera.position` each frame** at optical
  infinity, and each also subscribes to `onShift` — both are required or the sky pops for
  one frame on every rebase. Starfield shader includes `logdepthbuf`.
- **AsteroidField** (`environment/AsteroidField.js`): hundreds of rocks as **3
  InstancedMeshes** (one shared material) with a CPU uniform-grid spatial hash (`cellSize
  96`). `sphereHit(pos, radius)` (checks **one** cell — correct only for small query radii)
  serves both player collision/bounce and `WeaponSystem` bolts (spark + **14% salvage drop
  = "mining"**). 3 fields: inner cluster near spawn + 2 outer.
- **SpaceEnvMap**: one-shot PMREM cubemap baked at startup for `scene.environment` — sun
  highlight fixed to the spawn-relative direction, never re-baked.
- **ChaseCamera** (`camera/ChaseCamera.js`): lagged-quaternion chase, `baseOffset (0, 2.4,
  10.0)`, `baseFov 68`. **Leash scales with hull:** `hullScale = max(1, player.radius/3.2)`
  multiplies the whole offset + speed pull-back — this is how capitals get a longer boom
  (3.2 is the fighter baseline radius). Trauma² shake (from `camera:shake` events), dynamic
  FOV (+9 boost, +22 warp, +speed). Early-returns on foot (first-person owns the camera).

---

## 9. Combat & FX

- **`WeaponSystem`** owns **every** projectile in one 24-entry `ObjectPool` (each entry
  holds player/enemy/missile meshes; `bolt.mesh` is a pointer). Constants:
  `PLAYER_BOLT_SPEED 950`, `ENEMY_BOLT_SPEED 480`, `PLAYER_DAMAGE 50` (× `upgrades.weapon`),
  `PLAYER_FIRE_INTERVAL 0.13`, `HIT_FORGIVENESS 1.35`, `ASSIST_CONE 0.12 rad`,
  `ASSIST_RANGE 1600`, heat +5.5/shot cooling 26/s (overheat 100, unlock ≤30). Missiles:
  speed 300, life 6 s, turn 1.6 rad/s, 6-unit proximity fuse.
- **Aim:** desktop cursor-aim unprojects the mouse ray (1400 u out); **magnetic assist**
  snaps to a lead-predicted intercept within a ~7° cone (`assistTarget` is read by
  `TargetOverlay` and `FleetSystem`). Touch fires straight ahead.
- **Hit resolution** is **swept** (segment prevPos→pos vs sphere): enemies `radius*1.35`,
  escorts `*1.1`, player exact, missiles fixed 6. **Terrain test:** a bolt inside an
  `obstacle.radius` dies only if `obstacle.planet.getAltitude(pos) <= 0` (the single-sampler
  contract — this is what makes low-altitude combat possible). Bolt `prevPos` **must** be
  rebased in `onShift` alongside `position`.
- **`CombatSystem`**: `'ship:destroyed'` fans out to three independent listeners
  (rewards/removal, `Pickups` drop, `Explosions`). **Death economy** (`_respawnPlayer`):
  **lost** = active ship (removed from `owned`), inventory, 30% of resources; **kept** =
  stored ships + credits; switches to the **cheapest owned** ship; respawn at
  `PLAYER_SPAWN − origin.offset`. Ramming: per-enemy 0.6 s cooldown, damage
  `clamp(relSpeed*0.12, 8, 40)` (enemy takes 1.4×). Iterates a **copy** of the enemies
  array (the destroyed handler splices it).
- **FX** (all pooled/cached, all `onShift`-aware where world-positioned): `Explosions`
  (4-layer pooled), `EngineGlow` (per-nozzle sprite + crossed plume, materials cached by
  color, parented into the ship visual), `ShieldEffect` (per-ship fresnel bubble at
  `radius*1.4`, geometry cached by radius, `uHitPos` stored **ship-local** so the highlight
  rides the hull, shader includes `logdepthbuf`), `textures.js` (procedural canvas
  glow/plume/bolt textures cached by key — zero image assets).
- **Gunner/escort fire** calls `game.weapons.fire(..., {fromPlayer:true})` — the flag is
  **both** the "which targets" switch **and** the "kill credit" switch, so their kills pay
  the player. Changing it silently breaks the reward economy.

---

## 10. Enemy AI & population

- **`ENEMY_TYPES`** (`ai/EnemyShip.js:20`) — 8 stat blocks:

  | type | Lv | credits | weapon | hull | shield | dmg | fireRange | notes |
  |------|---:|--------:|--------|-----:|-------:|----:|----------:|-------|
  | scout | 10 | 20 | bolt | 28 | 12 | 9 | 300 | fast, fragile |
  | fighter | 20 | 50 | bolt | 50 | 25 | 15 | 360 | baseline |
  | heavy | 40 | 160 | bolt | 150 | 70 | 28 | 460 | Heavy Assault |
  | cruiser | 60 | 420 | missile | 240 | 130 | 48 | 1100 | kites at 620 |
  | warship | 75 | 1500 | bolt | 900 | 400 | 18 | 700 | turret (no alignment) |
  | redcarrier | 90 | 4000 | missile | 1500 | 700 | 55 | 1300 | turret, deploys fighters |
  | destroyer | 100 | 10000 | missile | 2200 | 1000 | 70 | 1500 | Planet Destroyer boss |
  | apex | 120 | 25000 | missile | 6000 | 2500 | 85 | 1600 | turret, deploys, never despawns |

- **FSM:** `PATROL / CHASE / ATTACK / EVADE / RETREAT` with proportional steering,
  sphere-obstacle avoidance (`game.obstacles`), reactive dodging (chance = `evadeSkill`),
  and retreat below 28% hull (apex exempt). Same `integrate()`/thrust physics as the player.
- **`EncounterDirector`**: `GLOBAL_CAP 10` (non-apex), `CHECK_INTERVAL 2s`,
  `DESPAWN_RANGE 14000`. Territorial regions (POI guards, 5 pirate territories, capital
  patrols tiers 6/7, 1 Destroyer patrol, ~35% of planets contested). One tier-scaled squad
  per eligible region per check (`TIER_SQUADS` 1→7); difficulty tier + veteran hull/shield/
  damage scaling from `PLAYER_SHIP_BY_ID[active].level` (**default 10 if a new ship omits
  `level`**). Spawn ring 1000–1700 u from the player.
- **`ApexHunter`**: one Lv120 "Ravager Dreadnought" spawned 60 km out after a 90 s delay;
  `detectRange 1e9` so it always chases; excluded from caps/despawn/reinforcements; above
  5000 u it **teleport-cruises** toward the player at `clamp(dist*0.012, 140, 1400)/s`; pays
  25,000 cr then respawns after 600 s. Drawn as a red radar rim-arc at any distance.
- **`Reinforcements`**: every non-apex kill queues **2 replacements** (3.5–8 s delay, cap
  16 live). `redcarrier→warship`, `destroyer→heavy`; anything else sends two of itself.
  **Engaging the hyperdrive or dying clears the queue** — the only escape.
- ⚠️ Three different live caps coexist (director 10, carrier-deploy 14, reinforce 16);
  reinforcements can push population past the director cap. `EncounterDirector`'s header
  comment ("cap of 6", "1.6–2.4 km") is **stale** — trust the constants.

---

## 11. Gameplay systems (on-foot, warp, crew, fleet, economy, POI, landing)

- **On-foot** (`onfoot/OnFootController.js`, `game.onfoot`): land → **`E` disembark** →
  first-person sphere-walk (`EYE_HEIGHT 1.75`, `WALK_SPEED 17`, `SPRINT 1.9×`, `JUMP 11`,
  `GRAVITY 24`, radial up) → **`E` mine** rocks within 6.5 u → **`E` board** within 12 u.
  Avatar is the rebase anchor (`game.rebaseAnchor = avatar.position`). `SurfaceScatter`
  dresses the site (60 mineable rocks, 420 trees, 800 grass, ≤10 critters, 6 birds — one
  shared material per rarity tier, parented to `planet.group`, airless worlds lifeless).
- **Economy** (`economy/Rarity.js`): 7 tiers — `gray` Common Ore 1 cr, `green` Verdite 2,
  `blue` Cobalt Cryst 10, `red` Pyronite 20, `purple` Void Amethyst 50, `white` Lumen Shard
  100, `gold` Aurum Core 500 (weights fall 60→0.12). **Rarity ids are inventory + save
  keys — renaming corrupts saves.**
- **Warp** (`warp/WarpSystem.js`, `game.warp`): `J` = charge (0.9 s) → cruise; `B` cycles
  target planet. Cruise **owns `player.velocity`** (ramps to `MAX_CRUISE 42000 u/s`; player
  skips its own thrust/damping). Auto-drops only for planets in a tight ~26° ahead-cone
  (`dot > 0.9`) — deliberately narrow so the planet you just left doesn't yank you back.
  `engaged` gives +22 camera FOV and clears reinforcements.
- **Crew** (`crew/CrewManager.js`, `game.crew`): engineer auto-repairs (`1.2 + stars*1.6`
  hp/s); gunners auto-fire pooled bolts (`fromPlayer:true`), one per turret station
  (`statMult.turrets`), each on a different target within 700 u. `crewCost = round(20 +
  (stars-1)*70)` → 20/90/160/230/300 (the "20→500" JSDoc is **stale**). Capacity
  `statMult.crew ?? 3`. **Roster wiped on `player:respawned`** (crew die with the ship);
  persisted otherwise.
- **Fleet** (`fleet/FleetSystem.js` + `EscortShip.js`, `game.fleet`): on a capital hull,
  **`G`** / the **Deploy** button launches a fresh wing of generic AI **attack fighters**
  (`ATTACK_FIGHTER = 'starter'`), up to `statMult.hangar` (**battleship 4, carrier 15**), in
  formation; **`V`** / **Focus** issues focus-fire (aim-assist lock else nearest ≤3000 u);
  `G` again recalls (fly home → dock). Auto-recall on atmosphere/death/foot. Hangar fighters
  are **expendable** — `onEscortDestroyed` just removes the craft (no owned-collection loss).
  Non-capital hulls (`hangar 0`) emit `fleet:denied`.
- **POIs** (`exploration/POISystem.js` + `POIFactory.js`, `game.poi`): 2 stations, 3
  wrecks, ≤4 satellites, 3 anomalies, caches in outer asteroid fields. Signal ping (6000 u)
  → build (12000) → discovery (300). Anomalies grant **permanent** `+0.12` to an
  engine/shield/weapon upgrade; others drop salvage. Seeded `${UNIVERSE_SEED}:poi`, ids
  `${kind}:${index}` (persistence-stable — changing counts/order breaks `restoreDiscovered`).
- **Landing** (`ship/LandingSystem.js`, `game.landing`): **`L`** below 3200 u → autopilot
  bleeds tangential speed, descends `clamp(alt*0.6, 6, 120)`, levels with terrain,
  damage-free touchdown at `altitude ≤ radius+0.8 && speed<14`. Strong stick cancels.
  **Airless worlds are landable** (no atmosphere check — a playtest fix, don't re-add it).
  `statMult.noLanding` blocks it (only the carrier) with the "FLAGSHIP TOO LARGE TO LAND"
  hint.

---

## 12. UI & audio

- **HUD** (`ui/HUD.js`): DOM over a fixed `#ui-root` (`pointer-events:none`, z-index 10).
  Readouts: hull/shield bars (`transform:scaleX`), speed, altitude, location, credits,
  resources, cargo, **fleet count** (`game.fleet.escorts.length`), hostile contacts
  (enemies within 3500 u), boost, **heat bar (inverted — full = cool)**, banner, alerts
  (missiles → terrain pull-up → hull/shield), warp readout, land hint, damage vignette,
  entry glow. Subscribes to ~20 events. `?debug` adds fps/scale/draws/tris.
- **Radar** (`ui/Radar.js`): ship-oriented minimap on a 236² canvas (shown 118², 2×
  supersample), 20 Hz. Disc range 3200 u, planet rings to 40000. `ENEMY_BLIP` size per
  `enemy.type`; apex drawn as a throbbing red rim-arc at any distance.
- **TargetOverlay** (`ui/TargetOverlay.js`): full-screen canvas — enemy brackets +
  `Lv{n} {class}` labels + health pips, off-screen arrows, incoming-missile markers, cyan
  warp-destination marker, mouse reticle. Boss pulse for `destroyer`/`apex`. `MAX_RANGE
  12000`, `APEX_REVEAL 2600`.
- **TouchControls** (`ui/TouchControls.js`): two dynamic virtual sticks + 10 buttons
  (Fire, Boost, Defend=`C`, Nav=`B`, Warp=`J`, Land=`L`, Fleet=`G`, Attack=`V`, Use=`E`,
  Jump). Revealed on first touch; swaps flight↔foot button sets on mode change.
- **Screens** (`ui/Screens.js`): start (audio unlock + **BUILD stamp**) and death/respawn.
  ⚠️ **The build stamp is a hand-edited string at `Screens.js:37`** —
  `'BUILD 11 — bigger flagship · deploy attack ships · scaled engine flames'` — no build-time injection; bump it
  manually per playtest.
- **Shop** (`ui/Shop.js`): pause-the-game modal, hailed with **`T`** (interim — no physical
  station yet). Tabs: **Sell Ore** (per-tier, Sell All), **Upgrades** (engine/weapon/shield,
  `+0.15`/level, cost `40 + 35*level`), **Ships** (renders `PLAYER_SHIPS`; Active/Select/
  Buy), **Crew** (hire/dismiss, 4 rotating recruits), **Repair** (`ceil(missing*0.8)` cr).
- **Audio**: `Music.js` (generative 3-voice pad + echo melody + combat drone that rises
  when an enemy is chasing/attacking within 2200 u; ducks with atmosphere density) and
  `ShipSounds.js` (2 detuned saws + sine sub + noise wash tracking throttle/speed/boost;
  speed normalized against `240 * envSpeedScale`).

---

## 13. EventBus catalogue

Named events emitted across the game (subscribe/emit sites in parentheses where useful):

**Combat/ships:** `ship:destroyed {ship, byPlayer}` · `combat:hit-confirmed {target, killed}`
· `combat:reward {credits, name}` · `combat:contact {count, label}` · `enemy:killed` ·
`enemy:detected-player` · `enemy:retreating` · `player:hit {damage}` · `player:died` ·
`player:respawn-requested` · `player:respawned` · `missile:incoming {count}` ·
`missile:cleared` · `missile:destroyed` · `ship:changed` (payload = catalog entry) ·
`shop:purchase`.

**Movement/world:** `planet:entered` / `planet:left` · `player:can-disembark` /
`player:cannot-disembark` · `camera:shake` (number) · `player:boost-start` /
`player:boost-end`.

**On-foot/warp/fleet/landing:** `onfoot:entered` / `onfoot:left` / `onfoot:prompt` /
`onfoot:mined` · `warp:target` / `warp:charging` / `warp:engaged` / `warp:aborted` /
`warp:dropped {reason, planet}` · `fleet:launched` / `fleet:recalling` / `fleet:recalled` /
`fleet:focus` / `fleet:free` / `fleet:no-wing` / `fleet:denied` / `fleet:empty` /
`fleet:ship-lost` · `landing:hint` / `landing:engaged` / `landing:disengaged` /
`player:autolanded`.

**Economy/exploration/crew/UI:** `pickup:collected` · `poi:signal` / `poi:discovered` ·
`crew:changed` · `game:started` · `shop:open` / `shop:closed`.

⚠️ Some HUD strings hard-code key names (`'press C'`, `'[J]'`, `'[B]'`) — rebinding a key
means editing those strings too.

---

## 14. Build, deploy & the test harness

- **Stack:** `three ^0.170.0` (only runtime dep), `vite ^6.0.0`. Dev deps:
  `playwright-core` (harness), `fbx2gltf` + `@gltf-transform/cli` + `@gltf-transform/
  extensions` (the model-compression pipeline). Node 22 verified. Package is `private`,
  `type:module`, v1.0.0.
- **Scripts:** `npm install`; `npm run dev` (LAN-exposed via `server.host:true` for phone
  testing); `npm run build` (→ `dist/`); `npm run preview`. No test/lint script.
- **Vite config:** `base: './'` (host from any sub-path), `target es2020`,
  `chunkSizeWarningLimit 1200`.
- **`index.html`:** the only HTML file — `<canvas id="game-canvas">` + `<div id="ui-root">`,
  `viewport-fit=cover`, inline critical CSS only; inline SVG favicon (no binary). Everything
  else is `src/ui/hud.css`.
- **Models are served from `public/`** (static copy, not bundled) via relative URLs — works
  because `base:'./'`. Renaming/moving a GLB breaks at **runtime**, not build time.
- **Netlify** (`netlify.toml`): `command = "npm run build"`, `publish = "dist"`. Alternative:
  drag `builds/starfall-frontier-build11.zip` into Netlify Drop.
- **`builds/starfall-frontier-build11.zip`** (3.6 MB): a committed ready-to-serve `dist`
  (index.html + JS/CSS + the 4 GLBs). Convention: one zip per published build, old one
  deleted. **Don't gitignore `builds/` or `public/models-glb/`.**
- **Harness** (`tools/screenshot.mjs`): `node tools/screenshot.mjs <url> <out.png> <waitMs>
  '<actionsJson>'`. Actions: `tap` (clicks fixed 450,250 — assumes 900×500 `VIEWPORT`),
  `key {code, ms}`, `wait {ms}`, `eval {js}`, `evalFile {path}` (undocumented in the
  header), `shot {path}`. Env: `CHROMIUM_PATH` (default `/opt/pw-browsers/chromium`),
  `VIEWPORT` (`WxH`). SwiftShader software GL — perf is not representative. `window.__game`
  is the live `Game`.
- **Git:** branch `claude/focused-meitner-73h1gk`, HEAD `af3a3d9`, clean. Repo owner
  `climberkeenan-tech`. The last HANDOFF update was `e99aabf`; since then 11 commits landed
  the hero-model era (4 Meshy hulls, enemy remap, apex hunter, reinforcements, ~70% price
  cut, Netlify config, build stamp, and the 86 MB→3.7 MB meshopt-GLB compression).

---

## 15. Known bugs, stale comments & debt
_Only issues substantiated by the code._
- **Stale FBX/count comments:** `ShipFactory.js:210-216` (`/models/*.fbx`),
  `ModelShips.js:134` ("raw FBX scene"), `main.js:172` ("86MB of FBX") — all now 4 GLBs.
  `EncounterDirector` header ("cap of 6", "1.6–2.4 km") vs constants (10, 1000–1700).
  `CrewManager` cost JSDoc ("20→500" vs formula max 300). Enemy-type JSDoc annotations
  ("scout|fighter|heavy" — 8 types exist).
- **README is partially stale:** "bundle ships no binary assets" is no longer true (4 GLBs);
  the desktop key table omits `V` (fleet focus) and `T` (shop).
- **No committed FBX→GLB conversion script** — the pipeline was ad hoc; raw FBX sources
  were deleted (recoverable only from `builds/…build8.zip` in git history).
- **Anchor derivation duplicated** with divergent hardpoint constants (`0.34` vs `0.3`).
- **Shop is hailable from anywhere** (`T`) — interim until a physical callable carrier.
- **No audio mute/volume/pause/settings UI** — `AudioEngine.setMuted()` exists, unused.
- **No tests, no CI** — verification is manual via the screenshot harness only.
- **Real-device iOS/Android testing has not been done** — only headless Chromium.
- **Single-cell `sphereHit`** degrades asteroid collision for very large ship radii.
- **Shadow ortho box is ±60 u** — hulls beyond ~120 u clip their own shadow.

---

## 16. Design decisions to respect
- **Floating origin** rebases at 8192 u — any system storing a world position **must**
  subscribe to `game.origin.onShift(delta)` and subtract it. #1 source of subtle bugs.
- **One terrain sampler per planet** feeds mesher + collision + AI + scatter — never add a
  second height source, and never rotate terrain geometry (day/night is a sun-sweep).
- **Everything is procedural except the 4 hero ship GLBs** — no other binary assets; keep
  the soundscape, FX textures, planets, and enemy fallbacks procedural.
- **`logarithmicDepthBuffer` is ON** — every custom `ShaderMaterial` must include the four
  `logdepthbuf` chunks.
- **Ship convention:** forward `-Z`, up `+Y`. Input axes map to angular rates in `PlayerShip`.
- **Frame-rate independence:** `dt` clamped to 0.05 s; use `damp()`, not raw lerps.
- **Speed is altitude-scaled** (`envSpeedScale`) — the mechanism behind seamless planetfall.
  Don't replace with a hard cap.
- **Encounters are territory-based and capped** by design (exploration-first).
- **Determinism:** all procedural content derives from `UNIVERSE_SEED`; one `Rng` per domain.
- **`fromPlayer:true`** on gunner/escort bolts is load-bearing for kill credit — don't flip it.

---

## 17. ToDo (prioritized)
1. **More hand-modeled player hulls** for the Lv 50/70/100 slots (frigate/battlecruiser/
   sovereign still fly the procedural fighter recipe) — this is the "new spaceships" work;
   follow [§2](#2-adding-a-new-spaceship-the-exact-process).
2. **Commit a `tools/` FBX→GLB conversion script** so the model pipeline is reproducible
   (dev deps are already installed).
3. **Refactor the duplicated anchor derivation** (`buildModelRig` vs `createEnemyShip`) into
   a shared helper, and optionally add authored anchor metadata to `MODELS` so a new hull's
   guns/engines don't rely on bounds guesses.
4. **Callable outpost carrier + first-person interior** (reuse the `Shop` modal on dock;
   reuse the on-foot controller) — the biggest remaining vision piece.
5. **Slow planet rotation is done; polish per-planet lighting for distant worlds.**
6. **Settings/pause UI** — wire `AudioEngine.setMuted()` + volume.
7. **Automated smoke test + CI** — promote the harness into a GitHub Actions build.
8. **Update README + the stale comments** listed in [§15](#15-known-bugs-stale-comments--debt).

---

## 18. Instructions for the next developer
1. **Start here:** `npm install && npm run dev`, open the printed URL, tap to launch, fly.
   Then read `src/main.js` (composition), `src/core/Game.js` (services), and
   `src/world/Universe.js` (how planets couple to gameplay) — those three give you the whole
   mental model. For ships, read [§1](#1-the-ship-system-read-this-first) then
   `src/ship/ShipFactory.js` + `src/ship/ModelShips.js`.
2. **Before changing anything positioned in the world,** understand the floating-origin
   contract — forgetting `onShift` is the #1 way to introduce teleport/jitter bugs.
3. **To add a ship, follow [§2](#2-adding-a-new-spaceship-the-exact-process) exactly** — two
   files + one GLB. Verify orientation with a four-angle turntable via the harness before
   trusting the nose/scale.
4. **Verify with the harness, not just by reading code:**
   `node tools/screenshot.mjs http://localhost:5173 out.png 4000 '[{"type":"tap"},{"type":"key","code":"KeyW","ms":2000}]'`,
   then look at the PNG. Check the console for zero errors.
5. **Keep the constraints** in [§16](#16-design-decisions-to-respect): floating origin, one
   terrain sampler, `logdepthbuf` chunks, determinism, mobile budget (pool, instance, avoid
   per-frame allocation), and the ~1 MB-per-ship / ~4.5 MB whole-game download budget.
6. **Commit discipline:** work on the existing feature branch, commit in focused units,
   re-run the harness before pushing, and bump the build stamp (`src/ui/Screens.js:37`) +
   `builds/…zip` for playtest builds. There are no tests to lean on.

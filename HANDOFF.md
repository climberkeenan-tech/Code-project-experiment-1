# Starfall Frontier — Developer Handoff

_Last updated after the "playable half" expansion, branch `claude/3d-space-exploration-handoff-tbt0ss`. Working tree is clean; everything described below is committed and pushed._

## ⭐ Playable-Half Expansion (added this cycle)
The base was exploration + flight + light combat. This cycle added the core
**gameplay loop** from the design bible, in six verified, separately-committed
phases. Each is built on the existing service/system + floating-origin +
single-terrain-sampler contracts.

1. **On-foot + mining + economy** (`src/economy/Rarity.js`, `src/onfoot/*`):
   land → **disembark (E)** → first-person walk on the sphere (radial gravity,
   jump, ground-follow via the one terrain sampler) → **mine rarity-tiered
   rocks** (gray1…gold500) into a typed inventory → board. Procedural instanced
   trees/grass around the landing site. `game.mode` ('flight'|'onfoot') gates
   the flight model, chase camera, and input scheme; the floating-origin rebase
   anchor follows the active body (`game.rebaseAnchor`).
2. **Outpost Exchange shop** (`src/ui/Shop.js`): paused modal, hailable with
   **T**/TRADE button. Sell ore for credits, buy engine/weapon/**shield**
   upgrades (shield mult now wired via `PlayerShip.applyUpgrades()`), repair hull.
3. **Combat overhaul — classes** (`ENEMY_TYPES`, `ShipFactory` builder map):
   five classes (Scout/Fighter/Heavy Assault/Missile Cruiser/Planet Destroyer)
   with levels (10→100), credit rewards (20→10,000), distinct procedural hulls,
   a balance pass (all slower than the player, hittable, actually accurate), red
   lasers, and a **death economy** (lose the ship's ore + crew, keep credits).
4. **Combat overhaul — feel** (`WeaponSystem`, `src/ui/TargetOverlay.js`):
   pooled **homing missiles** (Cruiser/Destroyer) + incoming warning + **C**
   anti-missile countermeasure; a full-screen **threat overlay** (red target
   boxes with `Lv{n} {class}` + health pips, off-screen arrows, missile markers).
5. **Warp + navigation** (`src/warp/WarpSystem.js`): lock a planet (**B**/Nav),
   **warp (J)** — charge → jump to just outside the target's atmosphere → arrive.
   HUD warp readout + a cyan destination marker/arrow in the overlay.
6. **Crew** (`src/crew/CrewManager.js`): hire an **Engineer** (auto-repairs
   hull) and **Gunner** (auto-fires, star-scaled accuracy), 1–5★, priced 20→500
   cr, in the shop's Crew tab. Persisted; lost with the ship on death.

**Save schema is v2**: credits + typed inventory + crew persist alongside the
originals, behind a swappable storage adapter + pure `serialize()` snapshot with
`rev`/`savedAt` (cloud-sync-ready; no backend yet). Autosaves on more events and
flushes on tab hide/close.

## ⭐⭐ Playtest-fix + bible-completion cycle (second pass)
Driven by structured playtest feedback; all verified via the harness:
1. **Combat readability**: enemies scaled up per class (scout 1.6×…), much
   slower than the player, less HP/evade, brighter liveries, red bolts slowed
   to 480, spawns closer (1000–1700u).
2. **Cursor aim + assist** (`WeaponSystem`): bolts fly toward the mouse cursor
   (camera-ray unproject); magnetic assist snaps to a lead-predicted intercept
   within a ~7° cone; player dmg 13; 1.35× forgiving hitboxes; aim reticle +
   lock highlight + white-hot hit flash in `TargetOverlay`.
3. **Hyperdrive rework** (`WarpSystem`): now a *flight mode* — J charges then
   cruises to ~42k u/s **along the nose** (steerable; camera dir = travel dir);
   auto-drop only for planets genuinely ahead (~26° cone — the "sent me back to
   the same planet" bug is fixed); soft assist bends the track onto the
   B-locked planet; `PlayerShip` yields thrust/cap while engaged.
4. **Auto-landing** (`src/ship/LandingSystem.js`): L (or LAND button) below
   3,200u → autopilot bleeds tangential speed, descends, levels with terrain,
   damage-free touchdown; strong stick input cancels; airless worlds landable
   (grounded check de-atmosphered).
5. **Living planets**: scatter density tripled; `src/world/ApproachScatter.js`
   builds forests under the ship below 1,500u in flight (on-foot adopts the
   patch on disembark); terrain sampler adds continent-scale forest patches on
   vegetated worlds (biomes readable from orbit).
6. **Ship collection** (`PLAYER_SHIPS`, Shop "Ships" tab): six ships Lv 10→100
   (Sparrow→Sovereign), buy/select/swap hulls in place (`PlayerShip.setShip`),
   catalog multipliers bake into hull/shield/engine + crew capacity; death
   destroys only the ACTIVE ship, stored ships survive; persisted.
7. **Day/night**: planets "spin" via sun-direction sweep around the polar axis
   (9–16-min day) + the global light rotates by the local planet's spin —
   geometry never rotates so collision stays exact; sun crosses the sky on foot.
8. **Wildlife**: grazing critters (wander/flee, terrain-snapped) + circling
   birds per scatter patch; airless worlds lifeless.
9. **Civilizations** (`src/world/Settlements.js`): seeded settlements on three
   atmosphere worlds — lit procedural buildings + beacon, discovery banner.

## ⭐⭐⭐ Capital ships + carrier fleet (third pass)
- **Player capitals**: SF-85 Warlord battleship (4 turret stations) and SF-110
  Vanguard carrier (hangar 4, twin flight decks). Camera leash scales with hull.
- **Fleet command** (`src/fleet/`): on a carrier, **G** launches your stored
  ships as AI escorts (wedge formation → break to dogfight, fromPlayer fire,
  draw enemy fire); G recalls (fly home, dock, repaired). Destroyed escort =
  permanently lost from the collection. Auto-recall on atmosphere/death/foot.
- **Gunner turret stations**: each hired gunner mans one station, independent
  cooldowns, different targets.
- **Enemy red capitals**: Lv75 Battlecruiser (turret fire, no alignment
  needed) + Lv90 Dreadcarrier (deploys fighters mid-battle); capital patrol
  territories (tiers 6/7); rewards 1.5k/4k cr under the 10k Destroyer.

**Still TODO from the bible**: walk-in first-person carrier interior (the shop
is hailed via T; the owned carrier is flyable but not walkable inside);
fish/ocean life; research; diplomacy; multi-system galaxy; deeper player-ship
visual polish. Controls: **L** auto-land, **J** hyperdrive, **B** cycle
destination, **C** anti-missile, **G** fleet launch/recall; touch has
LAND/WARP/NAV/DEFEND/FLEET buttons.

---


## Project Goal
A seamless, mobile-browser 3D space-exploration and combat game. The intended experience: fly a fully maneuverable fighter (6DOF) through open space, descend through a planet's atmosphere down to its surface and back out **with no loading screens**, explore a procedurally generated single-star system of unique worlds, discover hidden sites, and fight occasional pirate encounters — exploration-first, combat as punctuation. Tone is a simplified blend of No Man's Sky / Elite Dangerous / Star Wars space combat. Every subsystem is written to be expandable (more planets, factions, missions, upgrades) without rewriting the core.

## Current State (implemented and working)
All ten planned build phases are complete and verified via a headless Chromium harness (boot → cruise → encounter → combat → planetfall, zero console errors). Working features:
- **Flight**: 6DOF physics-inspired flight with momentum, flight-assist damping, brake, boost with an energy budget, banking cosmetics, engine glow + plume, procedural engine audio.
- **Chase camera**: orientation-lag smoothing, speed-based pullback, dynamic FOV, trauma-based screen shake.
- **Enemies**: three classes (scout/fighter/heavy) with a 5-state FSM (patrol/chase/attack/evade/retreat), steering with obstacle avoidance, reactive dodging, retreat below 28% hull.
- **Combat**: pooled laser bolts with swept hit detection, shield/hull damage model with recharge, weapon heat/overheat, GPU-ish particle explosions, hit markers, shield-impact shader, magnetic salvage pickups, ramming.
- **Universe**: 9 procedurally generated planets (archetypes: terran/ocean/ice/desert/volcanic/rocky) on a golden-angle spiral, each with unique terrain/palette/atmosphere/clouds/gravity. Quadtree cube-sphere LOD terrain with time-sliced streaming, atmosphere scattering shader, ocean, cloud shell, aerial-perspective haze, gravity, altitude-scaled speed, terrain collision. Seamless space↔surface transition confirmed.
- **Environment**: starfield (custom shader, twinkle, galactic band), nebula/galaxy billboards, instanced asteroid fields with spatial-hash collision + laser mining, camera-local space dust, single sun with shadow-casting directional light + corona, PMREM env map for reflections.
- **Exploration**: POI system with stations, wrecks, orbiting satellites, anomalies (grant permanent ship upgrades), asteroid caches. Signal ping → visual build → discovery reward flow. localStorage persistence of resources/upgrades/discoveries.
- **Encounters**: `EncounterDirector` spawns territory-based squads (guarding high-value sites and in pirate regions), global cap of 6, despawn when far, rare ambient patrols.
- **UI/Audio**: DOM HUD (hull/shield/speed/boost/weapon heat/location/altitude/contacts), canvas radar/minimap, touch controls (dual virtual sticks + fire/boost), start/death screens, fully synthesized WebAudio (engines, lasers, wind, explosions, generative ambient music with a combat tension layer), adaptive resolution QualityManager, HDR + bloom + ACES pipeline.

## Project Structure
Vite single-page app; all game code under `src/` (~8,000 lines JS + `src/ui/hud.css`). Architecture is a service/system composition: `Game` owns shared services and an ordered list of systems, each with an `update(dt, elapsed)` method; registration order in `main.js` is update order.
- `src/core/` — `Game` (orchestrator), `Engine` (renderer + HDR/bloom post pipeline + frame loop), `EventBus`, `Input`, `AudioEngine` (WebAudio synth core), `FloatingOrigin`, `QualityManager`, `ObjectPool`, `SaveGame`, `math/` (`rng.js` seeded PRNG, `noise.js` simplex/fBm/ridged/billow + `clamp`/`lerp`/`damp`/`smoothstep`).
- `src/ship/` — `ShipBase` (chassis: transform, velocity, health/shield model), `ShipFactory` (procedural meshes, cached materials), `PlayerShip` (flight model).
- `src/ai/` — `EnemyShip` (FSM + steering), `EnemyManager` (lifecycle), `EncounterDirector` (population).
- `src/combat/` — `WeaponSystem` (all bolts for player + enemies), `CombatSystem` (death/respawn/ramming), `Pickups`.
- `src/world/` — `Universe` (couples planets to gameplay: gravity, speed scale, collision, atmosphere effects), `UniverseGenerator`, `Planet`, `PlanetDescriptor`, `terrainHeight.js` (terrain sampler — single source of truth for surface), `terrain/QuadtreeSphere.js` (LOD mesher), `Atmosphere`, `Clouds`, `hazeShader.js`, `names.js`, `constants.js`.
- `src/environment/` — `Sun`, `Starfield`, `Nebulas`, `AsteroidField`, `SpaceDust`, `SpaceEnvMap`.
- `src/exploration/` — `POISystem`, `POIFactory`.
- `src/fx/` — `EngineGlow`, `ShieldEffect`, `Explosions`, `textures.js` (procedural FX texture atlas).
- `src/ui/` — `HUD`, `Radar`, `TouchControls`, `Screens`, `hud.css`.
- `src/camera/` — `ChaseCamera` (early-returns on foot).
- `src/economy/` — `Rarity.js` (rock tiers + values, the economy's single source of truth).
- `src/onfoot/` — `OnFootController` (disembark/board, sphere walking, mining, FP camera), `SurfaceScatter` (mineable rocks + instanced trees/grass).
- `src/warp/` — `WarpSystem` (target-lock + light-speed jump).
- `src/crew/` — `CrewManager` (engineer/gunner effects + roster).
- `src/ui/` also now — `Shop` (Outpost Exchange modal), `TargetOverlay` (combat/nav overlay canvas).
- `tools/screenshot.mjs` — headless Chromium render/smoke-test + screenshot harness (used for all verification; supports `tap`/`key`/`wait`/`eval`/`evalFile`/`shot`; `window.__game` is the live Game).

## Important Files (entry points & key modules)
- `index.html` — page shell; loads `src/main.js` as a module; contains critical inline CSS and mobile viewport meta.
- `src/main.js` — **the bootstrap**; the single place the whole game is composed. Instantiates `Game`, builds the env map, then registers systems in order: player → universe → poi → director → enemies → weapons → combat → explosions → pickups → sun → camera → starfield/nebulas/dust → ship-sounds/music → HUD → radar, then `TouchControls`/`Screens`/`SaveGame`. Exposes `window.__game` for debugging/harness.
- `src/core/Game.js` — owns `engine, events, input, audio, origin, quality` and cross-system references (`player, universe, enemies, weapons, poi, sun, explosions, pickups, obstacles[], asteroidFields[], entryHeat`).
- `src/world/constants.js` — `SUN_POSITION`, `PLAYER_SPAWN (1200,800,46000)`, `UNIVERSE_SEED ('starfall-7741')`.
- `src/world/terrainHeight.js` — terrain sampler used by mesher, collision, AND AI ground avoidance (keep these in agreement).
- `vite.config.js` — `base: './'`, es2020 target.

## Files Currently In Flight
**None.** The working tree is clean and every change is committed and pushed. There is no partially-implemented or uncommitted work. (`tools/screenshot.mjs` is a stable dev harness, not in-flight.)

## Recent Changes
Most recent commit fixed 14 issues from an adversarial code review:
- Laser bolts no longer die instantly during low-altitude flight (planet obstacles now carry a back-reference so the weapon system does a precise terrain-altitude test inside the padded sphere instead of killing bolts at the sphere).
- Lethal collision with a station/wreck now triggers the death flow (was a soft-lock).
- Camera-followers (starfield, nebulas, space dust) and built POI meshes now subscribe to floating-origin shifts (no more one-frame world jumps on rebase).
- Quadtree build queue skips pruned/dead nodes; enemy terrain cheap-reject band raised to `2×relief`; `ship:destroyed` handlers no longer splice arrays mid-iteration (ram + ground-impact iterate copies).
- Shield impact highlight moved to ship-local space; bolt-vs-asteroid samples 3 points along travel; asteroid spatial-hash padded; start-screen keyboard listener removed on tap launch.
- Resource-lifecycle: POI meshes built once and toggled in/out of scene (no rebuild/leak); ship class + exhaust materials/geometry and shield bubble geometry shared via caches; per-enemy shield material disposed on removal; nebula/galaxy sprites depth-test again.

## Known Bugs / Rough Edges
_Only issues substantiated by the code are listed._
- **~~Navigation~~ / ~~enemies hard to find~~ / ~~scout balance~~ — ADDRESSED this cycle** (warp + target-lock + overlay arrows; global cap 10, tier-4/5 squads, ambient every 30s @16%; scout radius 3.0, all classes slower than the player, accuracy raised). Left here for history.
- **Slow planet rotation / day-night is NOT implemented (deliberately deferred).** The safe path: rotate an *inner* terrain group about `planet.up` and apply the **inverse** rotation to the local direction inside the four sampler methods (`getAltitude`/`getSurfaceNormal`/`getAtmosphereDensity`/`getAltitudeSpherical`) AND to the camera-local vector the LOD mesher uses (`Planet.update`'s `this._local` before `terrain.update`). Do NOT rotate the outer `group` (samplers subtract only its position, not its rotation — see the caution below), or see≠hit. Landed entities must be co-rotated (add the per-frame spin about `planet.up` to the parked ship + on-foot avatar) so they ride the surface. The terminator already sweeps from `uSunDir` once the ground turns, so day/night comes "for free" after that.
- **Shop is hailable from anywhere (interim).** `T`/TRADE opens the Outpost Exchange with no physical station to fly to. Intentional stopgap until the callable carrier (ToDo #1) exists; the modal is built to be reused on dock.
- **No audio mute / volume / pause / settings UI.** `AudioEngine.setMuted()` exists but nothing calls it; `game.paused` is now used by the shop modal too, but there's still no dedicated pause/settings menu.
- **Directional light is approximate for distant planets** (one sun light tracks sun→player). This is intentional but means a planet far from the player can be lit from a slightly wrong angle; per-planet atmosphere/cloud sun direction is exact, so the mismatch is subtle.
- **No tests and no CI.** There is no automated test suite and no `.github/` workflows; correctness has only been verified manually through the screenshot harness.

## Design Decisions (already made — respect these)
- **Floating origin**: the world rebases when the player exceeds 8,192 units from origin. Any system storing a world-space position across frames MUST subscribe to `game.origin.onShift(delta)` and subtract the delta. This is the single most common source of subtle bugs — check it whenever adding a positioned object.
- **One terrain sampler per planet** (`terrainHeight.js`) feeds the mesher, collision, and AI so what you see equals what you hit. Do not add a second height source.
- **Everything is procedural** — ship meshes, planet surfaces, nebulas, FX textures, and the entire soundscape (WebAudio). The bundle ships **no binary assets**; keep it that way unless there is a strong reason.
- **DOM-based HUD** (crisp at any resolution, cheap); bars animate via `transform: scaleX()`, text only writes on change.
- **Ship convention**: forward is local `-Z`, up `+Y`. Input axes: pitch +1 = nose up, yaw +1 = nose right, roll +1 = roll right; `PlayerShip` maps these to angular rates (x=+pitch, y=−yaw, z=−roll).
- **Frame-rate independence**: `dt` is clamped to 0.05s; integrators use exponential damping (`damp()`), not raw per-frame lerps.
- **`logarithmicDepthBuffer` is ON** — every custom `ShaderMaterial` must include the `logdepthbuf` chunks (see existing shaders for the pattern) or it will z-fight/deform.
- **Speed is altitude-scaled** (`envSpeedScale`, 1 near surface → 24 in deep space) — this is the mechanism that makes seamless planetfall work without a mode switch. Don't replace it with a hard cap.
- **Encounters are territory-based and capped** by deliberate design (exploration-first). Combat frequency is intentionally low.
- **Determinism**: all procedural content derives from `UNIVERSE_SEED`; the same seed reproduces the same universe. Preserve seeded RNG usage.

## Build Information
- **Stack**: three.js `^0.170.0` (only runtime dep), Vite `^6.0.0`, `playwright-core` (dev, for the screenshot harness). Node 22 verified.
- **Commands**: `npm install`; `npm run dev` (dev server, LAN-exposed for phone testing); `npm run build` (production bundle → `dist/`, ~653 kB JS / ~174 kB gzip); `npm run preview` (serve the built bundle).
- **Config**: `vite.config.js` uses `base: './'` so the build can be hosted from any sub-path.
- **Debug**: append `?debug` to the URL for an FPS/draw-call/triangle overlay. `window.__game` is the live `Game` instance.
- **Screenshot harness**: `node tools/screenshot.mjs <url> <out.png> <waitMs> '<actionsJson>'` — supports `tap`, `key`, `wait`, `eval`, `evalFile`, `shot` actions; set `VIEWPORT=WxH` env for resolution. Chromium path defaults to `/opt/pw-browsers/chromium`.
- **Controls (flight)**: desktop — mouse steer, `W/S` throttle, `A/D` roll, `Q/E`+`R/F` strafe, `Shift` boost, `Space`/click fire, `X` brake, **`C` anti-missile**, **`B` cycle warp target**, **`J` warp**, **`T` open shop**, **`E` disembark (when landed)**. Touch — left stick steer, right stick throttle/roll, FIRE/BOOST/Defend + Warp/Nav buttons, TRADE button.
- **Controls (on-foot)**: desktop — `W/A/S/D` walk, mouse look, `Space` jump, `Shift` sprint, `E` mine / board. Touch — left stick walk, right stick look, Use/Jump buttons. Mode switches automatically on disembark/board.

## ToDo (prioritized) — post-expansion
_Items 1–3, 5 from the old list are now DONE (navigation/warp, combat frequency
+ overlay, enemy balance, upgrade/shop UX). Remaining, roughly by bible priority:_
1. **Callable outpost carrier + first-person interior**: a summonable station
   you dock with and walk inside (reuse the `Shop` modal on dock; reuse the
   on-foot controller with flat-floor collision). Currently the shop is hailed
   from anywhere (interim). This is the biggest remaining vision piece.
2. **Owned-ship collection / buy new ships / ship levels 10→100**: add a
   `PLAYER_SHIPS` table + hull swap (preserve the rig shape) + a Ships shop tab
   + persistence; respawn should let you pick a stored ship. (Stat upgrades and
   the death-drop-ship rule already exist.)
3. **Slow planet rotation + day/night** (deferred; see Known Bugs for the exact
   collision-safe approach) — user explicitly wants "the sun moving through."
4. **Wildlife + fish + civilizations/buildings**: extend `SurfaceScatter` with
   simple instanced fauna and, on select worlds, procedural settlements.
5. **Player-ship visual polish**: the *player* hull is unchanged from the base
   (a top playtest complaint); enemy hulls were expanded but the hero ship
   deserves greebles/detail. Also an upgrade→mesh hook.
6. **Settings/pause UI**: wire `AudioEngine.setMuted()` to a mute button; volume.
7. **Automated tests / CI**: promote the screenshot harness into a smoke test +
   a GitHub Actions build.
8. **Fleet command / research / diplomacy / multi-system galaxy**: the bible's
   endgame — large, later.

## Important Notes / Technical Debt
- The bootstrap (`main.js`) is the only place composition is visible; when adding a system, register it in the correct update-order slot and, if it holds world positions, add the `onShift` subscription.
- Terrain streaming is time-boxed (`buildBudgetMs` on `QuadtreeSphere`); descending very fast sharpens detail over a few frames rather than stalling — this is expected, not a bug.
- Audio requires a user gesture to start (`AudioEngine.unlock()` is called from the start-screen tap); anything audio-related no-ops before that.
- Mobile performance relies on: object pooling, instanced asteroids, dynamic resolution scaling, one shadow light with a tight frustum, and a half-float MSAA composer target. Be careful adding per-frame allocations or extra shadow-casters.
- No server, no multiplayer, no backend — persistence is `localStorage` only (`starfall-frontier-save-v1`), and can silently no-op in private-browsing mode.
- `iOS`/Safari quirks are partially handled (orientationchange re-measure, WebAudio unlock, viewport-fit), but have only been validated in headless Chromium — **real-device testing on iOS/Android has not been done** and should be a priority before shipping.

## Instructions for the Next AI / Developer
1. **Start here**: run `npm install && npm run dev`, open the printed URL, tap to launch, and fly. Then read `src/main.js` (composition), `src/core/Game.js` (services), and `src/world/Universe.js` (how planets couple to gameplay). Those three give you the whole mental model.
2. **Before changing anything positioned in the world**, understand the floating-origin contract (`src/core/FloatingOrigin.js` + every existing `onShift` subscriber). Forgetting it is the #1 way to introduce jitter/teleport bugs.
3. **Verify changes with the harness**, not just by reading code: `node tools/screenshot.mjs http://localhost:5173 out.png 4000 '[{"type":"tap"},{"type":"key","code":"KeyW","ms":2000}]'`, then look at the PNG. For surface/planet work, the harness supports `eval`/`evalFile` to teleport the player (see how `window.__game` is used). Check the browser console for zero errors.
4. **Tackle the ToDo list top-down.** #1 (navigation aids) is the single highest-leverage improvement and directly fixes the most-felt gameplay problem; it is also low-risk (additive HUD/logic, no core rewrite).
5. **Keep the constraints**: no binary assets (procedural only), keep `logdepthbuf` chunks in custom shaders, keep terrain reads going through the one sampler, keep determinism through `UNIVERSE_SEED`, and keep mobile cost in mind (pool, instance, avoid per-frame allocation).
6. **Commit discipline**: work on the existing feature branch, commit in focused units, and re-run the harness before pushing. There are no tests to lean on, so manual verification of the affected flow is mandatory.

# Starfall Frontier — Developer Handoff

_Last updated against commit `e82286f` ("Fix 14 issues from adversarial code review"), branch `claude/3d-space-exploration-game-ogrezx`. Working tree is clean; everything described below is committed._

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
- `src/camera/` — `ChaseCamera`.
- `tools/screenshot.mjs` — headless Chromium render/smoke-test + screenshot harness (used for all verification).

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
- **Navigation to specific planets is hard (UX gap, not speed).** Planets are 55,000–235,000 world units apart; the homeworld is hardcoded near spawn. There is **no target-lock, waypoint, autopilot, or off-screen planet indicator**. The radar only draws planet rim-arcs within 40,000 units. So deliberately reaching a chosen distant planet means aligning by eye over a long empty flight. Actual top speed is not the problem (deep-space cap ≈ `240 × 24 × 2.4 ≈ 13,800` u/s under boost), but the ramp-in (`damp(1.8)`) and the deliberate drop to `240` u/s near a body make travel *feel* slow at both ends.
- **Enemies can be hard to find.** They only exist inside `EncounterDirector` regions (guard squads on stations/caches/anomalies, plus a few pirate territories); global cap is 6; the wandering "ambient" patrol requires >90s elapsed, zero live enemies, deep space, and a 4.5%/2s roll. Away from territories you may see none, and there's no on-HUD cue pointing to combat regions.
- **Scouts read as small/hard to hit.** Scout collision radius is 2.2 (vs player 3.2), maxSpeed 310, `evadeSkill 0.85` — small, fast, jinky targets. (Heavies are the opposite: large, `evadeSkill 0.2`.) Damage math is fine — player fire is ~69 dmg/s; scout has 50 effective HP — so scouts are killable but evasive; heavies (250 HP) take ~3.6s of sustained fire.
- **No audio mute / volume / pause / settings UI.** `AudioEngine.setMuted()` exists but nothing calls it; there is no pause menu (`game.paused` is only used by start/death screens).
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
- **Controls**: desktop — mouse steer, `W/S` throttle, `A/D` roll, `Q/E`+`R/F` strafe, `Shift` boost, `Space`/click fire, `X` brake. Touch — left stick steer, right stick throttle/roll, FIRE/BOOST buttons.

## ToDo (prioritized)
1. **Navigation aids** (highest gameplay impact): add a target-lock / "nearest discovered planet" indicator, off-screen direction arrows on the HUD, and/or a system map. This directly addresses the "hard to travel between planets" problem.
2. **Combat discoverability**: surface a cue (radar region highlight, "contacts in sector" prompt) so players can find the territory-based encounters; consider a slightly higher ambient-patrol chance.
3. **Enemy readability/balance pass**: reconsider scout size/evade so it isn't frustrating to hit; playtest heavy time-to-kill.
4. **Settings/pause UI**: wire `AudioEngine.setMuted()` to a mute button; add a pause screen and basic volume control.
5. **Ship upgrades UX**: upgrades exist (engine/shield/weapon multipliers from anomalies) and persist, but nothing in the UI shows current levels or lets the player spend collected resources — add a progression surface.
6. **Automated tests / CI**: add at least smoke-level checks (the screenshot harness is a good basis) and a GitHub Actions build so regressions are caught.
7. **Content expansion**: more POI variety, missions/objectives, factions — the architecture is built for this.

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

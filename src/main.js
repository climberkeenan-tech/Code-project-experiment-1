import * as THREE from 'three';
import './ui/hud.css';
import { Game } from './core/Game.js';
import { PLAYER_SPAWN, SUN_POSITION } from './world/constants.js';
import { PlayerShip } from './ship/PlayerShip.js';
import { PLAYER_SHIP_BY_ID } from './ship/ShipFactory.js';
import { loadModelShips, onModelLoaded } from './ship/ModelShips.js';
import { EnemyManager } from './ai/EnemyManager.js';
import { EncounterDirector } from './ai/EncounterDirector.js';
import { ApexHunter } from './ai/ApexHunter.js';
import { Leviathan } from './ai/Leviathan.js';
import { Reinforcements } from './ai/Reinforcements.js';
import { FriendlyTraffic } from './ai/FriendlyTraffic.js';
import { WeaponSystem } from './combat/WeaponSystem.js';
import { CombatSystem } from './combat/CombatSystem.js';
import { CrewManager } from './crew/CrewManager.js';
import { FleetSystem } from './fleet/FleetSystem.js';
import { MissionSystem } from './missions/MissionSystem.js';
import { Pickups } from './combat/Pickups.js';
import { Explosions } from './fx/Explosions.js';
import { ChaseCamera } from './camera/ChaseCamera.js';
import { Sun } from './environment/Sun.js';
import { Starfield } from './environment/Starfield.js';
import { Nebulas } from './environment/Nebulas.js';
import { createSpaceEnvironment } from './environment/SpaceEnvMap.js';
import { Universe } from './world/Universe.js';
import { generateUniverse } from './world/UniverseGenerator.js';
import { OnFootController } from './onfoot/OnFootController.js';
import { getForestAssets } from './world/forest/ForestAssets.js';
import { WarpSystem } from './warp/WarpSystem.js';
import { LandingSystem } from './ship/LandingSystem.js';
import { ApproachScatter } from './world/ApproachScatter.js';
import { Settlements } from './world/Settlements.js';
import { POISystem } from './exploration/POISystem.js';
import { SaveGame } from './core/SaveGame.js';
import { Progression } from './core/Progression.js';
import { ShipSounds } from './audio/ShipSounds.js';
import { Music } from './audio/Music.js';
import { HUD } from './ui/HUD.js';
import { Radar } from './ui/Radar.js';
import { TargetOverlay } from './ui/TargetOverlay.js';
import { Shop } from './ui/Shop.js';
import { TouchControls } from './ui/TouchControls.js';
import { Screens } from './ui/Screens.js';

/**
 * Application bootstrap.
 *
 * Assembles the game from its systems in explicit update order:
 * simulation first (player, AI, combat, FX), then environment anchored to
 * the sun/camera, then the chase camera, then camera-relative dressing and
 * UI. This file is the single place where the game's composition is
 * visible at a glance.
 */
const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);
const scene = game.engine.scene;

// Prefiltered environment for PBR reflections (highlight aligned with sun).
const sunward = SUN_POSITION.clone().sub(PLAYER_SPAWN).normalize();
scene.environment = createSpaceEnvironment(game.engine.renderer, sunward);

// --- Simulation systems ---
const player = new PlayerShip(game);
player.position.copy(PLAYER_SPAWN);
// Spawn facing across the system (asteroid belt ahead, sun off to port).
player.quaternion.setFromUnitVectors(
  new THREE.Vector3(0, 0, -1),
  new THREE.Vector3(0.75, 0.05, -0.66).normalize(),
);
game.player = player;
game.addSystem('player', player);

// --- Universe (planets, asteroid fields, gravity, planetary flight) ---
const universe = new Universe(game);
game.universe = universe;
generateUniverse(game, universe);
game.addSystem('universe', universe);

// --- Player level: XP from kills/missions/ore → ship unlocks every 10 ---
game.addSystem('progression', new Progression(game));

// --- On-foot: disembark, walk a planet surface in first person, mine ---
game.addSystem('onfoot', new OnFootController(game));

// --- Warp: directional hyperdrive (steer it; drops at planets ahead) ---
game.addSystem('warp', new WarpSystem(game));

// --- Auto-landing: L guides the ship down to a soft touchdown ---
game.addSystem('landing', new LandingSystem(game));

// --- Low-altitude vegetation: forests appear under the ship in flight ---
game.addSystem('approach', new ApproachScatter(game));

// --- Civilizations: settlements on three chosen worlds ---
game.addSystem('settlements', new Settlements(game));

// --- Exploration: discoverable sites + persistence ---
const poi = new POISystem(game);
game.poi = poi;
game.addSystem('poi', poi);

// --- Population: encounters emerge from territory, not spawn timers ---
game.addSystem('director', new EncounterDirector(game));

const enemies = new EnemyManager(game);
game.enemies = enemies;
game.addSystem('enemies', enemies);

// --- The apex predator: one avoidable, always-visible roaming dreadnought ---
const apex = new ApexHunter(game);
game.apexSystem = apex;
game.addSystem('apex', apex);

// --- The enemy HUB: the Obsidian Leviathan fortress + its endless garrison ---
game.leviathan = game.addSystem('leviathan', new Leviathan(game));

// --- Escalation: every kill calls in two replacements; warp out to escape ---
const reinforcements = new Reinforcements(game);
game.reinforcements = reinforcements;
game.addSystem('reinforcements', reinforcements);

// --- Ambient allies: friendly civilian/patrol ships cruising the area ---
game.addSystem('traffic', new FriendlyTraffic(game));

const weapons = new WeaponSystem(game);
game.weapons = weapons;
game.addSystem('weapons', weapons);

game.addSystem('combat', new CombatSystem(game));

// --- Crew: engineer repairs, gunners man the turrets ---
game.addSystem('crew', new CrewManager(game));

// --- Fleet: carrier-launched AI escorts from your stored ships ---
game.addSystem('fleet', new FleetSystem(game));

// --- Missions: bounty ladder started from the Exchange ---
game.addSystem('missions', new MissionSystem(game));

const explosions = new Explosions(game);
game.explosions = explosions;
game.addSystem('explosions', explosions);

const pickups = new Pickups(game);
game.pickups = pickups;
game.addSystem('pickups', pickups);

// --- Environment ---
const sun = new Sun(game);
game.sun = sun;
game.addSystem('sun', sun);

// --- Camera, then camera-relative dressing ---
const chaseCamera = new ChaseCamera(game);
game.addSystem('camera', chaseCamera);

game.addSystem('starfield', new Starfield(game));
game.addSystem('nebulas', new Nebulas(game));

// --- Audio + UI ---
game.addSystem('ship-sounds', new ShipSounds(game));
game.addSystem('music', new Music(game));
const hud = new HUD(game);
game.addSystem('hud', hud);
game.addSystem('radar', new Radar(game, hud.refs.radar));
game.addSystem('targets', new TargetOverlay(game));
game.addSystem('shop', new Shop(game));

new TouchControls(game);
new Screens(game);

// Suspend audio while the tab is hidden (rendering stops automatically).
document.addEventListener('visibilitychange', () => {
  const ctx = game.audio.ctx;
  if (!ctx) return;
  if (document.hidden) ctx.suspend();
  else ctx.resume();
});

// Restore progression (resources, credits, inventory, upgrades, discoveries).
const save = new SaveGame(game);
game.save = save; // Screens' "Reset progress" needs it
save.load();
// Bake restored upgrade multipliers into stat caps (shield capacity/regen).
player.applyUpgrades();

// Hand-modeled ships stream in async (86MB of FBX — slow connections take a
// while). Upgrade hulls model-by-model AS each one lands: the player's ship
// hot-swaps, and every live enemy trades its stand-in for the real thing.
loadModelShips();
onModelLoaded((id) => {
  const variant = PLAYER_SHIP_BY_ID[player.ships.active];
  if (variant?.model === id) player.refreshShip();
  enemies.refreshModels();
});

// Photoreal forest scans stream in the background (not start-gated like the
// ship hulls — the first landing joins this load if it's still in flight).
getForestAssets().load();

game.start();

// Expose for the smoke-test harness and console debugging.
window.__game = game;

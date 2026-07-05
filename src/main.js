import * as THREE from 'three';
import './ui/hud.css';
import { Game } from './core/Game.js';
import { PLAYER_SPAWN, SUN_POSITION } from './world/constants.js';
import { PlayerShip } from './ship/PlayerShip.js';
import { EnemyManager } from './ai/EnemyManager.js';
import { WeaponSystem } from './combat/WeaponSystem.js';
import { CombatSystem } from './combat/CombatSystem.js';
import { Pickups } from './combat/Pickups.js';
import { Explosions } from './fx/Explosions.js';
import { ChaseCamera } from './camera/ChaseCamera.js';
import { Sun } from './environment/Sun.js';
import { Starfield } from './environment/Starfield.js';
import { Nebulas } from './environment/Nebulas.js';
import { SpaceDust } from './environment/SpaceDust.js';
import { AsteroidField } from './environment/AsteroidField.js';
import { createSpaceEnvironment } from './environment/SpaceEnvMap.js';
import { Universe } from './world/Universe.js';
import { Planet } from './world/Planet.js';
import { createTerranDescriptor } from './world/PlanetDescriptor.js';
import { ShipSounds } from './audio/ShipSounds.js';
import { HUD } from './ui/HUD.js';
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

// --- Universe (planets, gravity, planetary flight coupling) ---
const universe = new Universe(game);
game.universe = universe;
universe.addPlanet(new Planet(
  game,
  createTerranDescriptor(),
  new THREE.Vector3(11200, 1600, 37500), // ahead of the spawn heading
));
game.addSystem('universe', universe);

const enemies = new EnemyManager(game);
game.enemies = enemies;
game.addSystem('enemies', enemies);

// TEMP (until Phase 9's encounter director): a patrol squad near spawn.
enemies.spawnSquad(
  PLAYER_SPAWN.clone().add(new THREE.Vector3(0, 0, -700)),
  ['fighter', 'scout'], 200, 600,
);

const weapons = new WeaponSystem(game);
game.weapons = weapons;
game.addSystem('weapons', weapons);

game.addSystem('combat', new CombatSystem(game));

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

// A dense mining cluster in the inner system, shootable and hazardous.
const belt = new AsteroidField(game, {
  center: PLAYER_SPAWN.clone().add(new THREE.Vector3(3400, 300, -2600)),
  radius: 1500,
  count: 320,
  seed: 'inner-belt',
  shape: 'cluster',
});
game.asteroidFields.push(belt);
game.addSystem('asteroid-belt', belt);

// --- Camera, then camera-relative dressing ---
const chaseCamera = new ChaseCamera(game);
game.addSystem('camera', chaseCamera);

game.addSystem('starfield', new Starfield(game));
game.addSystem('nebulas', new Nebulas(game));
game.addSystem('dust', new SpaceDust(game));

// --- Audio + UI ---
game.addSystem('ship-sounds', new ShipSounds(game));
game.addSystem('hud', new HUD(game));

new TouchControls(game);
new Screens(game);

game.start();

// Expose for the smoke-test harness and console debugging.
window.__game = game;

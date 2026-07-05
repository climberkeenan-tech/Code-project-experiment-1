import * as THREE from 'three';
import './ui/hud.css';
import { Game } from './core/Game.js';
import { PlayerShip } from './ship/PlayerShip.js';
import { EnemyManager } from './ai/EnemyManager.js';
import { ChaseCamera } from './camera/ChaseCamera.js';
import { Starfield } from './environment/Starfield.js';
import { createSpaceEnvironment } from './environment/SpaceEnvMap.js';
import { ShipSounds } from './audio/ShipSounds.js';
import { HUD } from './ui/HUD.js';
import { TouchControls } from './ui/TouchControls.js';
import { Screens } from './ui/Screens.js';

/**
 * Application bootstrap.
 *
 * Assembles the game from its systems in explicit update order:
 * simulation first (player), then camera, then camera-relative environment,
 * then UI. Each phase of development plugs new systems into this file —
 * it is the single place where the game's composition is visible at a
 * glance.
 */
const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);
const scene = game.engine.scene;

// --- Sun & ambient lighting ---
// One real star lights the whole universe (its position is refined by the
// universe system in later phases). Direction only matters for now.
const sunDirection = new THREE.Vector3(0.35, 0.18, 0.55).normalize();
const sunLight = new THREE.DirectionalLight(0xfff1de, 3.0);
sunLight.position.copy(sunDirection).multiplyScalar(1000);
scene.add(sunLight);

// Faint cool fill so shadowed hull sides aren't pure black.
const fill = new THREE.HemisphereLight(0x1a2436, 0x0a0c14, 0.5);
scene.add(fill);

// Prefiltered environment for PBR reflections.
scene.environment = createSpaceEnvironment(game.engine.renderer, sunDirection);

// --- Systems (registration order = update order) ---
const player = new PlayerShip(game);
game.player = player;
game.addSystem('player', player);

const enemies = new EnemyManager(game);
game.enemies = enemies;
game.addSystem('enemies', enemies);

// TEMP (Phase 3 verification): a patrol squad near spawn. The encounter
// director replaces this with organic placement in Phase 9.
enemies.spawnSquad(new THREE.Vector3(0, 0, -400), ['fighter', 'scout'], 150, 500);

const chaseCamera = new ChaseCamera(game);
game.addSystem('camera', chaseCamera);

// Camera-relative environment updates after the camera has settled.
game.addSystem('starfield', new Starfield(game));

game.addSystem('ship-sounds', new ShipSounds(game));
game.addSystem('hud', new HUD(game));

// --- UI chrome (not per-frame systems) ---
new TouchControls(game);
new Screens(game);

game.start();

// Expose for the smoke-test harness and console debugging.
window.__game = game;

import * as THREE from 'three';
import { Game } from './core/Game.js';

/**
 * Application entry point.
 *
 * NOTE (Phase 1): this currently boots the engine with a temporary
 * pipeline-validation scene (lit sphere + emissive core) to prove out the
 * HDR/bloom/render loop. Phase 2 replaces this with the real game bootstrap.
 */
const canvas = document.getElementById('game-canvas');
const game = new Game(canvas);

// --- Temporary pipeline test scene ---
const sun = new THREE.DirectionalLight(0xfff4e0, 3);
sun.position.set(4, 2, 3);
game.engine.scene.add(sun);
game.engine.scene.add(new THREE.AmbientLight(0x223344, 0.6));

const sphere = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.4, 3),
  new THREE.MeshStandardMaterial({ color: 0x8899aa, roughness: 0.4, metalness: 0.6, flatShading: true }),
);
game.engine.scene.add(sphere);

const core = new THREE.Mesh(
  new THREE.IcosahedronGeometry(0.5, 2),
  new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 2.2, 0.9) }), // HDR color → blooms
);
core.position.set(2.4, 0.6, -1);
game.engine.scene.add(core);

game.engine.camera.position.set(0, 0.8, 5);
game.paused = false;

game.addSystem('pipeline-test', {
  update(dt, elapsed) {
    sphere.rotation.y = elapsed * 0.6;
    sphere.rotation.x = elapsed * 0.23;
  },
});

game.start();

import * as THREE from 'three';
import { getGlowTexture } from '../fx/textures.js';

/**
 * Camera-local motion dust.
 *
 * A small cloud of faint points that wraps around the camera in a fixed
 * cube: when the ship moves, dust streams past and the player *feels* the
 * velocity even in empty space (the classic space-game trick). The
 * particles have no simulation of their own — they only re-wrap; cost is
 * ~200 modulo ops per frame and one draw call.
 */

const COUNT = 220;
const EXTENT = 170; // half-size of the wrap cube

export class SpaceDust {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) {
      positions[i] = (Math.random() * 2 - 1) * EXTENT;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.points = new THREE.Points(geometry, new THREE.PointsMaterial({
      map: getGlowTexture(64, 2.6),
      color: 0x9fb8cc,
      size: 1.3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    }));
    this.points.frustumCulled = false;
    game.engine.scene.add(this.points);

    this._lastCam = new THREE.Vector3();
    this._initialized = false;

    // Shift with the world on rebase so the dust cloud (and its delta
    // tracking) never sees a phantom 8km camera jump.
    game.origin.onShift((delta) => {
      this.points.position.sub(delta);
      this._lastCam.sub(delta);
    });
  }

  update() {
    const camera = this.game.engine.camera;
    const positionAttr = this.points.geometry.getAttribute('position');
    const array = positionAttr.array;

    if (!this._initialized) {
      this._initialized = true;
      this.points.position.copy(camera.position);
      this._lastCam.copy(camera.position);
      return;
    }

    // Keep the cloud centered on the camera; wrap particles that fall
    // outside the cube back to the opposite face (in cloud-local space).
    const delta = this._lastCam.subVectors(camera.position, this.points.position);
    this.points.position.copy(camera.position);

    for (let i = 0; i < COUNT; i++) {
      let x = array[i * 3] - delta.x;
      let y = array[i * 3 + 1] - delta.y;
      let z = array[i * 3 + 2] - delta.z;
      // Wrap into [-EXTENT, EXTENT).
      x = ((x + EXTENT) % (EXTENT * 2) + EXTENT * 2) % (EXTENT * 2) - EXTENT;
      y = ((y + EXTENT) % (EXTENT * 2) + EXTENT * 2) % (EXTENT * 2) - EXTENT;
      z = ((z + EXTENT) % (EXTENT * 2) + EXTENT * 2) % (EXTENT * 2) - EXTENT;
      array[i * 3] = x;
      array[i * 3 + 1] = y;
      array[i * 3 + 2] = z;
    }
    positionAttr.needsUpdate = true;
    this._lastCam.copy(camera.position);
  }
}

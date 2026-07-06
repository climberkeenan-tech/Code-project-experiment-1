import * as THREE from 'three';
import { SimplexNoise, damp, lerp, clamp } from '../core/math/noise.js';

/**
 * Cinematic chase camera.
 *
 * The camera's orientation *lags* the ship's using a smoothed quaternion:
 * when the player snaps into a turn, the ship visibly rotates ahead of the
 * camera before the frame catches up — this sells rotation far better than
 * a rigidly attached camera. Position is derived from the smoothed frame,
 * pulled back with speed, with a subtle look-ahead toward travel direction.
 *
 * Screen shake uses the "trauma" model (Squirrel Eiserloh, GDC): events add
 * trauma in [0,1]; shake magnitude is trauma², decaying linearly. Shake is
 * sampled from smooth noise, not random jumps, and applied as small
 * rotations — which reads as impact, not jitter.
 */
export class ChaseCamera {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.camera = game.engine.camera;

    this.baseOffset = new THREE.Vector3(0, 2.4, 10.0);
    this.baseFov = 68;

    this.smoothedQuat = new THREE.Quaternion();
    this.smoothedPos = new THREE.Vector3();
    this.initialized = false;

    this.trauma = 0;
    this.noise = new SimplexNoise('camera-shake');

    this._offset = new THREE.Vector3();
    this._lookTarget = new THREE.Vector3();
    this._shakeEuler = new THREE.Euler();
    this._shakeQuat = new THREE.Quaternion();
    this._fwd = new THREE.Vector3();
    this._fovCurrent = this.baseFov;

    // External systems (weapons, explosions, collisions) request shake here.
    game.events.on('camera:shake', (amount) => this.addTrauma(amount));

    game.origin.onShift((delta) => {
      this.smoothedPos.sub(delta);
      this.camera.position.sub(delta);
    });
  }

  /** @param {number} amount trauma to add, roughly 0.2 light / 0.6 heavy */
  addTrauma(amount) {
    this.trauma = clamp(this.trauma + amount, 0, 1);
  }

  update(dt, elapsed) {
    const player = this.game.player;
    if (!player) return;

    // On foot, the first-person camera owns game.engine.camera.
    if (this.game.mode === 'onfoot') {
      this.initialized = false; // re-seat smoothly when we re-board
      return;
    }

    if (!this.initialized) {
      this.smoothedQuat.copy(player.quaternion);
      this.smoothedPos.copy(player.position);
      this.initialized = true;
    }

    // --- Orientation lag ---
    // Faster catch-up while boosting keeps the ship centered at speed.
    const rotRate = player.boostActive ? 7.5 : 5.5;
    this.smoothedQuat.slerp(player.quaternion, damp(rotRate, dt));

    // --- Position ---
    const speed01 = clamp(player.speed / 600, 0, 1);
    // Bigger hulls need a longer leash (capitals are 3-4x the fighter).
    const hullScale = Math.max(1, player.radius / 3.2);
    this._offset.copy(this.baseOffset).multiplyScalar(hullScale);
    this._offset.z += speed01 * 3.2 * hullScale; // pull back as speed rises
    this._offset.applyQuaternion(this.smoothedQuat);

    this.smoothedPos.lerp(player.position, damp(30, dt));
    this.camera.position.copy(this.smoothedPos).add(this._offset);

    // --- Aim: look ahead of the ship along its nose ---
    player.getForward(this._fwd);
    this._lookTarget.copy(player.position).addScaledVector(this._fwd, 28);
    // Up vector follows the smoothed ship frame for full 6DOF rolling.
    this.camera.up.set(0, 1, 0).applyQuaternion(this.smoothedQuat);
    this.camera.lookAt(this._lookTarget);

    // --- Trauma shake (rotational, noise-driven) ---
    if (this.trauma > 0.001) {
      const shake = this.trauma * this.trauma;
      const t = elapsed * 24;
      this._shakeEuler.set(
        this.noise.noise3(t, 0, 0) * 0.045 * shake,
        this.noise.noise3(0, t, 100) * 0.045 * shake,
        this.noise.noise3(100, 0, t) * 0.06 * shake,
      );
      this._shakeQuat.setFromEuler(this._shakeEuler);
      this.camera.quaternion.multiply(this._shakeQuat);
      this.trauma = Math.max(0, this.trauma - dt * 1.4);
    }

    // --- Dynamic FOV: widen under boost, cruise speed, and hyperdrive ---
    const targetFov = this.baseFov
      + (player.boostActive ? 9 : 0)
      + (this.game.warp?.engaged ? 22 : 0) // light-speed stretch
      + speed01 * 5;
    this._fovCurrent = lerp(this._fovCurrent, targetFov, damp(4.5, dt));
    if (Math.abs(this._fovCurrent - this.camera.fov) > 0.01) {
      this.camera.fov = this._fovCurrent;
      this.camera.updateProjectionMatrix();
    }
  }
}

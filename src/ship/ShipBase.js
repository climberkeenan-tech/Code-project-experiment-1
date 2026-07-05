import * as THREE from 'three';

/**
 * Shared spacecraft chassis: transform, velocity, and the defense model
 * (shields that absorb damage and recharge, hull that doesn't).
 *
 * Both the player ship and every enemy build on this class, so combat rules
 * (damage flow, shield regen timing) live in exactly one place.
 */
export class ShipBase {
  /** @param {import('./ShipFactory.js').ShipRig} rig */
  constructor(rig) {
    /** Outer group: physics position + orientation. */
    this.object3D = new THREE.Group();
    /** Inner group: the visual mesh, free for cosmetic banking/recoil. */
    this.visual = rig.group;
    this.object3D.add(this.visual);

    this.position = this.object3D.position;
    this.quaternion = this.object3D.quaternion;
    this.velocity = new THREE.Vector3();

    /** Local angular rates (pitch, yaw, roll) in rad/s, smoothed. */
    this.angularRates = new THREE.Vector3();

    this.radius = rig.radius;
    this.engines = rig.engines;
    this.hardpoints = rig.hardpoints;
    this.glowColor = rig.glowColor;

    // --- Defense model (tuned per ship class) ---
    this.hullMax = 100;
    this.hull = 100;
    this.shieldMax = 100;
    this.shield = 100;
    this.shieldRegenRate = 9; // points per second
    this.shieldRegenDelay = 3.5; // seconds after last hit
    this.alive = true;

    this._sinceDamage = Infinity;

    this._tmpQuat = new THREE.Quaternion();
    this._tmpEuler = new THREE.Euler();
    this._tmpVec = new THREE.Vector3();
  }

  /** World-space forward direction (-Z), written into `target`. */
  getForward(target) {
    return target.set(0, 0, -1).applyQuaternion(this.quaternion);
  }

  /** World-space up direction (+Y), written into `target`. */
  getUp(target) {
    return target.set(0, 1, 0).applyQuaternion(this.quaternion);
  }

  get speed() {
    return this.velocity.length();
  }

  /**
   * Apply incoming damage: shields absorb first, spill hits the hull.
   * @param {number} amount
   * @returns {{ shieldAbsorbed: number, hullDamage: number, destroyed: boolean }}
   */
  applyDamage(amount) {
    if (!this.alive) return { shieldAbsorbed: 0, hullDamage: 0, destroyed: false };
    this._sinceDamage = 0;

    const shieldAbsorbed = Math.min(this.shield, amount);
    this.shield -= shieldAbsorbed;
    const hullDamage = amount - shieldAbsorbed;
    this.hull = Math.max(0, this.hull - hullDamage);

    const destroyed = this.hull <= 0;
    if (destroyed) this.alive = false;
    return { shieldAbsorbed, hullDamage, destroyed };
  }

  /**
   * Integrate rotation from the smoothed angular rates and translate by
   * velocity. Shared by player and AI ships.
   */
  integrate(dt) {
    // Local angular rates → incremental rotation.
    // +x = pitch up, -y = yaw right, -z = roll right (see Input semantics).
    this._tmpEuler.set(
      this.angularRates.x * dt,
      this.angularRates.y * dt,
      this.angularRates.z * dt,
      'XYZ',
    );
    this._tmpQuat.setFromEuler(this._tmpEuler);
    this.quaternion.multiply(this._tmpQuat).normalize();

    this.position.addScaledVector(this.velocity, dt);
  }

  /** Shield recharge tick. */
  updateDefense(dt) {
    this._sinceDamage += dt;
    if (this.alive && this._sinceDamage > this.shieldRegenDelay && this.shield < this.shieldMax) {
      this.shield = Math.min(this.shieldMax, this.shield + this.shieldRegenRate * dt);
    }
  }
}

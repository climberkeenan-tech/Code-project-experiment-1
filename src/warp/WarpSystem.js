import * as THREE from 'three';
import { clamp } from '../core/math/noise.js';

/**
 * Warp / light-speed travel — the fix for "planets are too far away."
 *
 * The player locks a destination planet (cycle with B / a touch button), then
 * engages warp (J / button): a brief charge, a jump that relocates the ship to
 * just outside the target's atmosphere, then a smooth arrival. The jump simply
 * sets player.position in render space; the floating-origin rebase that runs
 * after all systems re-centers the world, so a 150k-unit hop is free and never
 * shows the GPU large coordinates (same mechanism respawn uses).
 *
 * Guardrails: no warping from inside an atmosphere, while grounded, or on foot.
 */

const CHARGE_TIME = 1.4;
const ARRIVE_TIME = 0.6;

export class WarpSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.state = 'idle'; // idle | charging | arriving
    this.timer = 0;
    this.targetIndex = 0;
    this._arrival = new THREE.Vector3();
    this._dir = new THREE.Vector3();
    game.warp = this;
  }

  /** @returns {import('../world/Planet.js').Planet|null} */
  get target() {
    const planets = this.game.universe?.planets;
    if (!planets || planets.length === 0) return null;
    this.targetIndex %= planets.length;
    return planets[this.targetIndex];
  }

  /** Distance to the locked target's surface (for the HUD). */
  get targetDistance() {
    const t = this.target;
    if (!t) return Infinity;
    return this.game.player.position.distanceTo(t.group.position) - t.radius;
  }

  get charge01() {
    return this.state === 'charging' ? 1 - this.timer / CHARGE_TIME : 0;
  }

  /** True when warp is currently allowed. */
  canWarp() {
    const g = this.game;
    if (g.mode !== 'flight' || !g.player?.alive) return false;
    const ctx = g.universe?.playerContext;
    if (ctx && (ctx.inAtmosphere || ctx.grounded)) return false;
    return !!this.target;
  }

  cycleTarget() {
    const planets = this.game.universe?.planets;
    if (!planets || planets.length === 0) return;
    this.targetIndex = (this.targetIndex + 1) % planets.length;
    this.game.events.emit('warp:target', this.target);
    this.game.audio?.playTone?.({ type: 'sine', freq: 700, freqEnd: 900, duration: 0.08, gain: 0.1 });
  }

  engage() {
    if (this.state !== 'idle' || !this.canWarp()) {
      if (this.state === 'idle') this.game.audio?.playTone?.({ type: 'square', freq: 160, freqEnd: 110, duration: 0.16, gain: 0.1 });
      return;
    }
    this.state = 'charging';
    this.timer = CHARGE_TIME;
    this.game.events.emit('warp:charging', this.target);
    this.game.audio?.playTone?.({ type: 'sawtooth', freq: 120, freqEnd: 900, duration: CHARGE_TIME, gain: 0.14 });
  }

  update(dt) {
    const game = this.game;
    // Input (flight only).
    if (game.mode === 'flight') {
      if (game.input.consumeWarpCycle()) this.cycleTarget();
      if (game.input.consumeWarp()) this.engage();
    }

    if (this.state === 'charging') {
      this.timer -= dt;
      game.events.emit('camera:shake', 0.03);
      // Abort if the player enters an atmosphere mid-charge.
      if (!this.canWarp()) { this.state = 'idle'; game.events.emit('warp:aborted'); return; }
      if (this.timer <= 0) this._jump();
    } else if (this.state === 'arriving') {
      this.timer -= dt;
      if (this.timer <= 0) this.state = 'idle';
    }
  }

  _jump() {
    const game = this.game;
    const player = game.player;
    const target = this.target;
    if (!target) { this.state = 'idle'; return; }

    // Arrive just outside the target's influence, on the side we came from.
    this._dir.copy(player.position).sub(target.group.position);
    if (this._dir.lengthSq() < 1) this._dir.set(1, 0.15, 0);
    this._dir.normalize();
    const standoff = target.influenceRadius * 1.15;
    this._arrival.copy(target.group.position).addScaledVector(this._dir, standoff);

    player.position.copy(this._arrival);
    // Face the planet, kill velocity so we don't slam the atmosphere.
    this._dir.copy(target.group.position).sub(player.position).normalize();
    player.quaternion.setFromUnitVectors(FORWARD, this._dir);
    player.velocity.set(0, 0, 0);
    player.boostActive = false;

    this.state = 'arriving';
    this.timer = ARRIVE_TIME;
    game.events.emit('camera:shake', 0.5);
    game.events.emit('warp:arrived', target);
    game.audio?.playTone?.({ type: 'sine', freq: 1200, freqEnd: 300, duration: 0.5, gain: 0.2 });
  }
}

const FORWARD = new THREE.Vector3(0, 0, -1);

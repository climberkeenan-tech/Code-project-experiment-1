import * as THREE from 'three';
import { clamp, damp, lerp } from '../core/math/noise.js';

/**
 * Hyperdrive — true directional light-speed travel (playtest rework).
 *
 * The old system teleported to a locked planet, which read as "a short burst
 * that sends me somewhere I wasn't looking." Now the hyperdrive is a flight
 * mode: press J → short charge → the ship accelerates to tens of thousands of
 * units/second ALONG ITS NOSE. You steer it (gently) the whole time, so where
 * the camera points is exactly where you travel. Approaching any planet
 * automatically drops you out of hyperdrive just outside its influence, so
 * "fly at the planet, arrive at the planet" always holds. Press J again to
 * drop manually.
 *
 * The B key still cycles a locked destination — that drives the cyan HUD
 * marker/arrow you can align with, and while cruising the drive gently bends
 * your track onto the lock when you're pointing near it (soft nav assist).
 *
 * While engaged, the PlayerShip skips its own thrust/damping/speed-cap and
 * this system owns the velocity vector — floating origin handles the huge
 * per-frame displacements exactly as designed.
 */

const CHARGE_TIME = 0.9;
const MAX_CRUISE = 42000; // u/s — crosses the whole system in ~6s
const RAMP = 1.1; // exponential ramp rate toward max speed
const DROP_SPEED = 520; // exit velocity, safely below entry-heat range
const ASSIST_CONE = 0.985; // dot: ~10° — lock assist engages when aimed near it

export class WarpSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.state = 'idle'; // idle | charging | cruise
    this.timer = 0;
    this.cruiseSpeed = 0;
    this.targetIndex = 0;
    this._fwd = new THREE.Vector3();
    this._toPlanet = new THREE.Vector3();
    game.warp = this;
  }

  /** True while the drive owns the ship's velocity. */
  get engaged() {
    return this.state === 'cruise';
  }

  /**
   * Everything the hyperdrive can lock and auto-drop on: every planet plus
   * the Obsidian Leviathan fortress (a planet-shaped nav adapter) while it
   * stands. Without this the fortress was unreachable — warp only stopped
   * at planets, so players overshot it at 42 km/s and never saw it.
   */
  get destinations() {
    const planets = this.game.universe?.planets ?? [];
    const fortress = this.game.leviathan?.navTarget;
    return fortress ? [...planets, fortress] : planets;
  }

  /** @returns {import('../world/Planet.js').Planet|null} */
  get target() {
    const destinations = this.destinations;
    if (destinations.length === 0) return null;
    this.targetIndex %= destinations.length;
    return destinations[this.targetIndex];
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

  canEngage() {
    const g = this.game;
    if (g.mode !== 'flight' || !g.player?.alive || g.player.autolanding) return false;
    const ctx = g.universe?.playerContext;
    if (ctx && (ctx.inAtmosphere || ctx.grounded)) return false;
    return true;
  }

  cycleTarget() {
    const destinations = this.destinations;
    if (destinations.length === 0) return;
    this.targetIndex = (this.targetIndex + 1) % destinations.length;
    this.game.events.emit('warp:target', this.target);
    this.game.audio?.playTone?.({ type: 'sine', freq: 700, freqEnd: 900, duration: 0.08, gain: 0.1 });
  }

  toggle() {
    if (this.state === 'idle') {
      if (!this.canEngage()) {
        this.game.audio?.playTone?.({ type: 'square', freq: 160, freqEnd: 110, duration: 0.16, gain: 0.1 });
        return;
      }
      this.state = 'charging';
      this.timer = CHARGE_TIME;
      this.game.events.emit('warp:charging');
      this.game.audio?.playTone?.({ type: 'sawtooth', freq: 120, freqEnd: 900, duration: CHARGE_TIME, gain: 0.14 });
    } else {
      this._drop('manual');
    }
  }

  update(dt) {
    const game = this.game;
    const player = game.player;

    if (game.mode === 'flight') {
      if (game.input.consumeWarpCycle()) this.cycleTarget();
      if (game.input.consumeWarp()) this.toggle();
    }

    if (this.state === 'charging') {
      this.timer -= dt;
      game.events.emit('camera:shake', 0.03);
      if (!this.canEngage()) { this.state = 'idle'; game.events.emit('warp:aborted'); return; }
      if (this.timer <= 0) {
        this.state = 'cruise';
        this.cruiseSpeed = Math.max(player.speed, 900);
        game.events.emit('warp:engaged');
        game.events.emit('camera:shake', 0.35);
        game.audio?.playTone?.({ type: 'sine', freq: 300, freqEnd: 1400, duration: 0.5, gain: 0.2 });
      }
      return;
    }

    if (this.state !== 'cruise') return;

    // Safety drops.
    if (!player.alive || game.mode !== 'flight') { this._drop('state'); return; }
    const ctx = game.universe?.playerContext;
    if (ctx && ctx.inAtmosphere) { this._drop('atmosphere'); return; }

    // Ramp speed toward max, exponentially — feels like punching through.
    this.cruiseSpeed = lerp(this.cruiseSpeed, MAX_CRUISE, 1 - Math.exp(-RAMP * dt));

    player.getForward(this._fwd);

    // Soft nav assist: if the locked planet is within ~10° of the nose, bend
    // the track onto it so "aim at the marker, arrive at the planet" is easy.
    const target = this.target;
    if (target) {
      this._toPlanet.copy(target.group.position).sub(player.position).normalize();
      if (this._fwd.dot(this._toPlanet) > ASSIST_CONE) {
        this._fwd.lerp(this._toPlanet, damp(2.5, dt)).normalize();
        // Nudge the ship's actual orientation along too, so the camera agrees.
        const q = _tmpQuat.setFromUnitVectors(_FORWARD, this._fwd);
        player.quaternion.slerp(q, damp(1.5, dt));
      }
    }

    // The drive owns the velocity: full speed along the nose, every frame.
    player.velocity.copy(this._fwd).multiplyScalar(this.cruiseSpeed);

    // Auto-drop when a destination looms AHEAD — arrive where you were
    // looking. The cone is tight (~26°): a planet beside or behind you
    // (e.g. the one you just left) must never yank you out of hyperdrive —
    // that was the playtest "sends me back to the same planet" bug.
    // Destinations include the Leviathan fortress, so warping at it drops
    // you ~19 km out — inside its garrison's wake-up range.
    for (const dest of this.destinations) {
      this._toPlanet.copy(dest.group.position).sub(player.position);
      const dist = this._toPlanet.length();
      const dropRadius = dest.influenceRadius * 1.6 + this.cruiseSpeed * 0.22;
      if (dist < dropRadius && this._toPlanet.normalize().dot(this._fwd) > 0.9) {
        this._drop('arrival', dest);
        return;
      }
    }

    // Subtle continuous rumble sells the speed.
    game.events.emit('camera:shake', 0.012);
  }

  _drop(reason, planet = null) {
    const game = this.game;
    const player = game.player;
    this.state = 'idle';
    this.cruiseSpeed = 0;
    player.getForward(this._fwd);
    player.velocity.copy(this._fwd).multiplyScalar(DROP_SPEED);
    game.events.emit('warp:dropped', { reason, planet });
    game.events.emit('camera:shake', 0.4);
    game.audio?.playTone?.({ type: 'sine', freq: 1200, freqEnd: 260, duration: 0.5, gain: 0.2 });
  }
}

const _FORWARD = new THREE.Vector3(0, 0, -1);
const _tmpQuat = new THREE.Quaternion();

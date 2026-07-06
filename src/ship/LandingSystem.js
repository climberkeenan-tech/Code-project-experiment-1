import * as THREE from 'three';
import { clamp, damp } from '../core/math/noise.js';

/**
 * Auto-landing (playtest fix: "attempting to land results in crashing").
 *
 * When the ship is inside an atmosphere below the approach ceiling, press L
 * (or the LAND touch button) and the autopilot takes over: it bleeds the
 * tangential speed, descends at an altitude-proportional rate, levels the
 * ship with the terrain (up = radial), and sets it down softly. Ground
 * impacts are damage-free while the autopilot is flying. Any strong stick
 * input hands control back to the pilot.
 *
 * Registered after the universe system so it reads a same-frame playerContext.
 */

const APPROACH_CEILING = 3200; // can engage below this altitude
const CANCEL_INPUT = 0.5; // stick deflection that cancels the autopilot

export class LandingSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.active = false;

    this._radial = new THREE.Vector3();
    this._desired = new THREE.Vector3();
    this._fwdT = new THREE.Vector3();
    this._m = new THREE.Matrix4();
    this._q = new THREE.Quaternion();
    this._hint = '';

    game.landing = this;

    game.events.on('player:died', () => this._disengage(false));
  }

  /** True when only the hull size prevents landing (drives the HUD hint). */
  get tooLarge() {
    return !!this.game.player?.statMult?.noLanding;
  }

  get eligible() {
    // Near any planet below the approach ceiling — atmosphere NOT required
    // (thin-atmosphere and airless worlds must be landable too; requiring
    // atmosphere made the option appear so late that descents ended in
    // crashes, which was the playtest complaint).
    const g = this.game;
    const ctx = g.universe?.playerContext;
    return g.mode === 'flight'
      && g.player?.alive
      && !g.warp?.engaged
      && !this.tooLarge
      && !!ctx?.planet
      && !ctx.grounded
      && ctx.altitude < APPROACH_CEILING;
  }

  /** Eligible-except-size: used to explain WHY the flagship can't land. */
  get blockedBySize() {
    const g = this.game;
    const ctx = g.universe?.playerContext;
    return this.tooLarge
      && g.mode === 'flight'
      && g.player?.alive
      && !g.warp?.engaged
      && !!ctx?.planet
      && ctx.altitude < APPROACH_CEILING * 2;
  }

  update(dt) {
    const game = this.game;
    const player = game.player;

    if (game.input.consumeLand()) {
      if (this.active) this._disengage(true);
      else if (this.eligible) this._engage();
      else game.audio?.playTone?.({ type: 'square', freq: 160, freqEnd: 110, duration: 0.14, gain: 0.1 });
    }

    // Landing hint on its own HUD line (never fights the on-foot prompt).
    const hint = this.active ? 'AUTO-LAND ENGAGED — L to cancel'
      : this.eligible ? 'Press L — Auto-Land'
        : this.blockedBySize ? 'FLAGSHIP TOO LARGE TO LAND — switch ships (T → Ships)' : '';
    if (hint !== this._hint) {
      this._hint = hint;
      game.events.emit('landing:hint', hint);
    }

    if (!this.active) return;

    const ctx = game.universe?.playerContext;
    if (!ctx?.planet || !player.alive) { this._disengage(false); return; }

    // Pilot override: strong input takes the stick back.
    const input = game.input.state;
    if (Math.abs(input.throttle) > CANCEL_INPUT
      || Math.abs(input.pitch) > CANCEL_INPUT
      || Math.abs(input.yaw) > CANCEL_INPUT) {
      this._disengage(true);
      return;
    }

    const planet = ctx.planet;
    const altitude = ctx.altitude;
    this._radial.copy(player.position).sub(planet.group.position).normalize();

    // --- Velocity: strip tangential speed, descend proportionally ---
    const vRadial = player.velocity.dot(this._radial);
    // Tangential component decays; descent rate eases as the ground nears.
    const descend = clamp(altitude * 0.6, 6, 120);
    this._desired.copy(player.velocity)
      .addScaledVector(this._radial, -vRadial) // tangential part
      .multiplyScalar(Math.exp(-1.6 * dt)); // bleed it
    this._desired.addScaledVector(this._radial, -descend);
    player.velocity.lerp(this._desired, 1 - Math.exp(-3.2 * dt));

    // --- Orientation: level with the terrain, keep current heading ---
    player.getForward(this._fwdT);
    this._fwdT.addScaledVector(this._radial, -this._fwdT.dot(this._radial));
    if (this._fwdT.lengthSq() < 1e-5) this._fwdT.set(1, 0, 0).cross(this._radial);
    this._fwdT.normalize();
    this._m.lookAt(_ZERO, this._fwdT, this._radial); // forward −Z convention
    this._q.setFromRotationMatrix(this._m);
    player.quaternion.slerp(this._q, damp(2.4, dt));

    // --- Touchdown ---
    if (altitude <= player.radius + 0.8 && player.speed < 14) {
      player.velocity.set(0, 0, 0);
      this._disengage(false);
      game.events.emit('player:autolanded', planet);
      game.events.emit('camera:shake', 0.1);
      game.audio?.playNoise?.({ duration: 0.3, gain: 0.25, filterFreq: 420, filterEnd: 90 });
    }
  }

  _engage() {
    this.active = true;
    this.game.player.autolanding = true;
    this.game.events.emit('landing:engaged');
    this.game.audio?.playTone?.({ type: 'sine', freq: 520, freqEnd: 390, duration: 0.25, gain: 0.16 });
  }

  _disengage(byPilot) {
    if (!this.active && !this.game.player?.autolanding) return;
    this.active = false;
    if (this.game.player) this.game.player.autolanding = false;
    this.game.events.emit('landing:disengaged', byPilot);
  }
}

// Matrix4.lookAt(origin, target, up) yields a basis whose -Z points at
// `target` — exactly the ship's forward convention, so no negation needed.
const _ZERO = new THREE.Vector3();

import * as THREE from 'three';
import { clamp, damp, lerp } from '../core/math/noise.js';
import { SurfaceScatter } from './SurfaceScatter.js';

/**
 * First-person, on-foot mode.
 *
 * When the ship is landed and slow, the player can disembark: the ship parks,
 * this system spawns a walking avatar on the terrain, takes over the camera,
 * and lets the player explore and mine rocks. Boarding returns control to the
 * ship. Walking uses a sphere-aware frame (radial "up", tangent movement) and
 * queries the one terrain sampler via `planet.getAltitude`, so what you walk
 * on exactly matches what you see.
 *
 * Registered right after the universe system so it reads the same-frame
 * `playerContext`; it writes `game.engine.camera` at the end of its own update
 * (the chase camera early-returns while on foot), keeping the camera late.
 */

const EYE_HEIGHT = 1.75;
const WALK_SPEED = 17;
const SPRINT_MULT = 1.9;
const JUMP_SPEED = 11;
const GRAVITY = 24;
const YAW_RATE = 2.1; // rad/s at full look deflection
const PITCH_RATE = 1.8;
const MINE_RANGE = 6.5;
const BOARD_RANGE = 12;

export class OnFootController {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    /** Avatar state (world-space feet position + tangent frame). */
    this.avatar = {
      position: new THREE.Vector3(),
      forward: new THREE.Vector3(0, 0, -1),
      up: new THREE.Vector3(0, 1, 0),
      pitch: 0,
      vVel: 0,
      grounded: false,
    };

    this.planet = null;
    this.scatter = null;
    this._active = false;

    // Scratch vectors.
    this._right = new THREE.Vector3();
    this._move = new THREE.Vector3();
    this._eye = new THREE.Vector3();
    this._look = new THREE.Vector3();
    this._lookTarget = new THREE.Vector3();
    this._tmp = new THREE.Vector3();
    this._prompt = '';

    // Expose for the HUD / debugging.
    game.onfoot = this;

    // The avatar is the rebase anchor while on foot, so it must shift with the
    // world like every other positioned entity (mirrors PlayerShip).
    game.origin.onShift((delta) => {
      this.avatar.position.sub(delta);
    });
  }

  get active() { return this._active; }

  /** Total rocks the player is carrying (for HUD). */
  get carrying() {
    let n = 0;
    const inv = this.game.player?.inventory || {};
    for (const id in inv) n += inv[id];
    return n;
  }

  update(dt) {
    const game = this.game;
    const interact = game.input.consumeInteract();

    if (!this._active) {
      // In flight: offer disembark when grounded.
      const ctx = game.universe?.playerContext;
      if (ctx && ctx.grounded) {
        this._emitPrompt('Press E — Disembark');
        if (interact) this._disembark(ctx.groundedPlanet);
      } else if (this._prompt) {
        this._emitPrompt('');
      }
      return;
    }

    this._walk(dt);

    // Interaction: mine a nearby rock, or board the ship if next to it.
    const near = this.scatter?.nearestRock(this.avatar.position, MINE_RANGE);
    const player = game.player;
    const distToShip = this._tmp.copy(player.position).distanceTo(this.avatar.position);

    if (near) {
      this._emitPrompt(`Press E — Mine ${near.rock.rarity.name}`);
      if (interact) this._mine(near.rock);
    } else if (distToShip < BOARD_RANGE) {
      this._emitPrompt('Press E — Board Ship');
      if (interact) this._board();
    } else {
      this._emitPrompt('');
    }

    this._updateCamera(dt);
  }

  // --- Transitions ---

  _disembark(planet) {
    const game = this.game;
    const player = game.player;
    if (!planet) return;

    const a = this.avatar;
    // Stand where the ship landed, snapped to the surface.
    a.position.copy(player.position);
    a.up.copy(a.position).sub(planet.group.position).normalize();
    const alt = planet.getAltitude(a.position);
    a.position.addScaledVector(a.up, -alt + 0.05);
    // Face along the ship's nose, flattened into the tangent plane.
    player.getForward(a.forward);
    a.forward.addScaledVector(a.up, -a.forward.dot(a.up)).normalize();
    a.pitch = 0;
    a.vVel = 0;
    a.grounded = true;

    this.planet = planet;
    // Adopt the flight-time vegetation patch when we land inside one (no
    // double forests, no pop); otherwise build fresh around the landing site.
    const adopted = game.approach?.adopt?.() ?? null;
    this.scatter = adopted || new SurfaceScatter(game, planet, a.position);

    this._active = true;
    game.mode = 'onfoot';
    game.input.mode = 'foot';
    game.rebaseAnchor = a.position;

    game.events.emit('onfoot:entered', planet);
    game.audio?.playTone?.({ type: 'sine', freq: 320, freqEnd: 220, duration: 0.25, gain: 0.16 });
  }

  _board() {
    const game = this.game;
    this._active = false;
    game.mode = 'flight';
    game.input.mode = 'flight';
    game.rebaseAnchor = null;
    this._emitPrompt('');

    if (this.scatter) { this.scatter.dispose(); this.scatter = null; }
    this.planet = null;

    game.events.emit('onfoot:left');
    game.audio?.playTone?.({ type: 'sine', freq: 220, freqEnd: 360, duration: 0.25, gain: 0.16 });
  }

  _mine(rock) {
    const game = this.game;
    const inv = game.player.inventory;
    const id = rock.rarity.id;
    inv[id] = (inv[id] || 0) + 1;
    this.scatter.removeRock(rock);

    // Rising chime pitched by rarity value so rare finds sound sweeter.
    const base = 500 + Math.min(rock.rarity.value, 500) * 1.2;
    game.audio?.playTone?.({ type: 'triangle', freq: base, freqEnd: base * 1.5, duration: 0.16, gain: 0.2 });
    game.events.emit('pickup:collected', { rarity: id });
    game.events.emit('onfoot:mined', { rarity: rock.rarity });
  }

  // --- Movement on the sphere ---

  _walk(dt) {
    const a = this.avatar;
    const planet = this.planet;
    const center = planet.group.position;
    const w = this.game.input.walk;

    // Radial up at the current position.
    a.up.copy(a.position).sub(center).normalize();

    // Yaw: rotate forward around up; keep it tangent.
    if (w.lookX) {
      this._tmp.copy(a.forward).applyAxisAngle(a.up, -w.lookX * YAW_RATE * dt);
      a.forward.copy(this._tmp);
    }
    a.forward.addScaledVector(a.up, -a.forward.dot(a.up));
    if (a.forward.lengthSq() < 1e-6) a.forward.set(0, 0, -1); // degenerate guard
    a.forward.normalize();

    // Pitch (look up/down), clamped.
    a.pitch = clamp(a.pitch - w.lookY * PITCH_RATE * dt, -1.35, 1.35);

    // Right vector for strafing.
    this._right.crossVectors(a.forward, a.up).normalize();

    // Horizontal movement in the tangent plane.
    this._move.set(0, 0, 0)
      .addScaledVector(a.forward, w.moveZ)
      .addScaledVector(this._right, w.moveX);
    if (this._move.lengthSq() > 1) this._move.normalize();
    const speed = WALK_SPEED * (w.sprint ? SPRINT_MULT : 1);
    a.position.addScaledVector(this._move, speed * dt);

    // Gravity + ground following along the radial.
    a.vVel -= GRAVITY * dt;
    a.position.addScaledVector(a.up, a.vVel * dt);

    const alt = planet.getAltitude(a.position);
    if (alt <= 0) {
      a.position.addScaledVector(a.up, -alt); // pop back to the surface
      a.grounded = true;
      a.vVel = 0;
      if (w.jump) a.vVel = JUMP_SPEED;
    } else {
      a.grounded = false;
    }
  }

  _updateCamera(dt) {
    const cam = this.game.engine.camera;
    const a = this.avatar;

    // Eye above the feet.
    this._eye.copy(a.position).addScaledVector(a.up, EYE_HEIGHT);

    // Look direction = forward pitched around the right axis.
    this._look.copy(a.forward).applyAxisAngle(this._right, a.pitch).normalize();
    this._lookTarget.copy(this._eye).add(this._look);

    cam.position.copy(this._eye);
    cam.up.copy(a.up);
    cam.lookAt(this._lookTarget);

    // A grounded, human FOV that's a touch tighter than the flight cam.
    const targetFov = 72;
    if (Math.abs(cam.fov - targetFov) > 0.1) {
      cam.fov = lerp(cam.fov, targetFov, damp(6, dt));
      cam.updateProjectionMatrix();
    }
  }

  _emitPrompt(text) {
    if (text === this._prompt) return;
    this._prompt = text;
    this.game.events.emit('onfoot:prompt', text);
  }
}

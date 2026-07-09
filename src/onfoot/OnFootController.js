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
const SWIM_SPEED = 8; // water is slow going (playtest)
const AIR_SECONDS = 22; // how long you can hold your breath
const AVATAR_RADIUS = 0.45; // for prop collision
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

    /** 0..1 breath meter; drains underwater, drowning drops your ore. */
    this.air = 1;
    this.swimming = false;
    this.eyeUnder = false;
    /**
     * Ore dropped on drowning: floats at the surface where you sank,
     * marked by the overlay until recovered with E.
     * @type {{planet: object, local: THREE.Vector3, up: THREE.Vector3, mesh: THREE.Mesh, items: Object, phase: number}|null}
     */
    this.oreBag = null;

    // Scratch vectors.
    this._push = new THREE.Vector3();
    this._local2 = new THREE.Vector3();
    this._swim = new THREE.Vector3();
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
    this.scatter?.update(dt, this.avatar.position); // wildlife wanders/flees
    this._updateBreath(dt);

    // Dropped-ore bag: bob at the surface; recover it with E when close.
    let nearBag = false;
    if (this.oreBag && this.oreBag.planet === this.planet) {
      const bag = this.oreBag;
      bag.phase += dt;
      bag.mesh.position.copy(bag.local).addScaledVector(bag.up, Math.sin(bag.phase * 1.6) * 0.3);
      bag.mesh.rotation.y += dt * 0.8;
      this._tmp.copy(bag.local).add(this.planet.group.position);
      nearBag = this._tmp.distanceTo(this.avatar.position) < 9;
    }

    // Interaction: recover dropped ore, mine a nearby rock, or board the ship.
    const near = this.scatter?.nearestRock(this.avatar.position, MINE_RANGE);
    const player = game.player;
    const distToShip = this._tmp.copy(player.position).distanceTo(this.avatar.position);

    if (nearBag) {
      this._emitPrompt('Press E — Recover your ore');
      if (interact) this._recoverBag();
    } else if (near) {
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

  /** Drain/refill breath; drowning drops the ore and puts you at the ship. */
  _updateBreath(dt) {
    if (this.eyeUnder) {
      this.air = Math.max(0, this.air - dt / AIR_SECONDS);
    } else {
      this.air = Math.min(1, this.air + dt / 2.5);
    }
    // Emit against the last-SENT state (per-frame deltas are tiny — comparing
    // to the previous frame never crossed any threshold, so the bubbles and
    // the underwater overlay silently never updated).
    if (this._sentUnder !== this.eyeUnder
      || Math.abs(this.air - (this._sentAir ?? -1)) > 0.01) {
      this._sentUnder = this.eyeUnder;
      this._sentAir = this.air;
      this.game.events.emit('onfoot:air', { air01: this.air, under: this.eyeUnder });
    }
    if (this.air <= 0) this._drown();
  }

  _drown() {
    const game = this.game;
    const player = game.player;
    const a = this.avatar;
    const planet = this.planet;

    // Your ore floats to the surface where you sank, in a glowing bag.
    const inv = player.inventory;
    if (Object.keys(inv).some((k) => inv[k] > 0)) {
      const center = planet.group.position;
      const up = this._tmp.copy(a.position).sub(center).normalize().clone();
      const local = up.clone().multiplyScalar(planet.radius + 0.9);
      const mesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.9, 0),
        new THREE.MeshStandardMaterial({
          color: 0xffcf4a,
          emissive: new THREE.Color(1.6, 1.1, 0.25),
          roughness: 0.4,
        }),
      );
      mesh.position.copy(local);
      planet.group.add(mesh);
      if (this.oreBag) { // a second drowning replaces the old bag's contents
        this.oreBag.planet.group.remove(this.oreBag.mesh);
      }
      this.oreBag = { planet, local, up, mesh, items: { ...inv }, phase: 0 };
      player.inventory = {};
    }

    // Wake up back at the ship — no ships lost, just your dropped cargo.
    a.position.copy(player.position);
    a.up.copy(a.position).sub(planet.group.position).normalize();
    const alt = planet.getAltitude(a.position);
    a.position.addScaledVector(a.up, -alt + 0.05);
    a.vVel = 0;
    this.air = 1;
    this.eyeUnder = false;

    game.events.emit('onfoot:drowned');
    game.events.emit('onfoot:air', { air01: 1, under: false });
    game.audio?.playNoise?.({ duration: 0.7, gain: 0.4, filterFreq: 300, filterEnd: 60 });
  }

  _recoverBag() {
    const game = this.game;
    const bag = this.oreBag;
    if (!bag) return;
    const inv = game.player.inventory;
    for (const id in bag.items) inv[id] = (inv[id] || 0) + bag.items[id];
    bag.planet.group.remove(bag.mesh);
    bag.mesh.geometry.dispose();
    bag.mesh.material.dispose();
    this.oreBag = null;
    game.audio?.playTone?.({ type: 'triangle', freq: 620, freqEnd: 980, duration: 0.25, gain: 0.22 });
    game.events.emit('pickup:collected', { rarity: 'recovered' });
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

    // Swimming? (feet at/below the ocean surface)
    const hasOcean = planet.descriptor.hasOcean;
    const seaLevel = planet.radius + 0.5;
    let radial = this._tmp.copy(a.position).sub(center).length();
    this.swimming = hasOcean && radial <= seaLevel + 0.05;

    if (this.swimming) {
      // Swim along the LOOK direction — pitch down to dive, up to rise.
      this._swim.copy(a.forward).applyAxisAngle(this._right, a.pitch).normalize();
      this._move.set(0, 0, 0)
        .addScaledVector(this._swim, w.moveZ)
        .addScaledVector(this._right, w.moveX * 0.7);
      if (this._move.lengthSq() > 1) this._move.normalize();
      a.position.addScaledVector(this._move, SWIM_SPEED * dt);
      // Buoyancy: slow sink at rest, jump-key kicks toward the surface.
      a.vVel += (-1.4 - a.vVel) * Math.min(1, dt * 2.2);
      if (w.jump) a.vVel = 6;
      a.position.addScaledVector(a.up, a.vVel * dt);
      // Can't swim above the surface.
      radial = this._tmp.copy(a.position).sub(center).length();
      if (radial > seaLevel) {
        a.position.addScaledVector(a.up, seaLevel - radial);
        if (a.vVel > 0) a.vVel = 0;
      }
    } else {
      // Horizontal movement in the tangent plane.
      this._move.set(0, 0, 0)
        .addScaledVector(a.forward, w.moveZ)
        .addScaledVector(this._right, w.moveX);
      if (this._move.lengthSq() > 1) this._move.normalize();
      const speed = WALK_SPEED * (w.sprint ? SPRINT_MULT : 1);
      a.position.addScaledVector(this._move, speed * dt);

      // Gravity along the radial.
      a.vVel -= GRAVITY * dt;
      a.position.addScaledVector(a.up, a.vVel * dt);
    }

    // Solid props: trees, palms and ore rocks can't be walked through.
    const colliders = this.scatter?.colliders;
    if (colliders) {
      this._local2.copy(a.position).sub(center);
      for (const c of colliders) {
        if (c.dead) continue;
        this._push.copy(this._local2).sub(c.local);
        const along = this._push.dot(a.up);
        if (Math.abs(along) > 10) continue; // above the canopy
        this._push.addScaledVector(a.up, -along); // trunk-style side push
        const d = this._push.length();
        const rr = c.r + AVATAR_RADIUS;
        if (d < rr && d > 1e-4) {
          a.position.addScaledVector(this._push.divideScalar(d), rr - d);
          this._local2.copy(a.position).sub(center);
        }
      }
    }

    // Ground follow against the TRUE terrain (unclamped: under the ocean this
    // is the seabed, so you can wade in and swim instead of walking on water).
    this._tmp.copy(a.position).sub(center);
    const rNow = this._tmp.length();
    this._tmp.divideScalar(rNow);
    const groundH = planet.sampler.height(this._tmp.x, this._tmp.y, this._tmp.z);
    const surfaceR = planet.radius + groundH;
    if (rNow <= surfaceR) {
      a.position.addScaledVector(a.up, surfaceR - rNow);
      a.grounded = true;
      a.vVel = 0;
      if (w.jump && !this.swimming) a.vVel = JUMP_SPEED;
    } else {
      a.grounded = false;
    }

    // Head under? (drives breath + the underwater overlay)
    const eyeR = this._tmp.copy(a.position).sub(center).length() + EYE_HEIGHT;
    this.eyeUnder = this.swimming && hasOcean && eyeR < seaLevel - 0.1;
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

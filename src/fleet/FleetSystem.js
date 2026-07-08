import * as THREE from 'three';
import { EscortShip } from './EscortShip.js';

/**
 * Fleet command (bible endgame): capital ships carry a hangar of AI attack
 * fighters. Press G (or the DEPLOY button) to launch the wing, press again to
 * recall it. Fighters stream out of the hangar a pair at a time, ring the hull,
 * dogfight hostiles on their own initiative (fire credited to you), and fly
 * back to the launch port to dock when recalled. They are hangar craft — NOT
 * the player's owned ships — so a lost fighter costs nothing from the collection.
 *
 * Deployment rules:
 *  - only capital hulls with a hangar can launch (battleship: 4, carrier: 15)
 *  - the wing is spawned fresh each launch, up to the hangar capacity, released
 *    two-at-a-time from the flanks (carrier) or belly (battleship)
 *  - auto-recall on atmosphere entry, death, or going on foot
 */

/** Hull the hangar-launched attack fighters fly (a light, expendable craft). */
const ATTACK_FIGHTER = 'starter';
const DOCK_RANGE = 45;
/** Seconds between hangar-launch waves (two fighters per wave). */
const LAUNCH_INTERVAL = 0.32;

export class FleetSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {EscortShip[]} */
    this.escorts = [];

    /**
     * Focus-fire order (V / ATTACK button): the hostile every escort must
     * prioritize. null = free engage — the wing hunts on its own initiative.
     * @type {import('../ai/EnemyShip.js').EnemyShip|null}
     */
    this.focusTarget = null;

    /**
     * Staggered launch state: slot indices still waiting to be ejected, a
     * countdown to the next wave, the launch port for this hull, and the
     * planned wing size (so each fighter knows its place in the ring).
     */
    this._launchQueue = [];
    this._launchTimer = 0;
    this._launchPort = 'side';
    this._wingSize = 0;
    this._scratchA = new THREE.Vector3();
    this._scratchB = new THREE.Vector3();

    game.fleet = this;

    game.origin.onShift((delta) => {
      for (const esc of this.escorts) esc.position.sub(delta);
    });

    game.events.on('player:died', () => this._despawnAll());
    game.events.on('onfoot:entered', () => this.recall(true));
  }

  get deployed() { return this.escorts.length > 0 || this._launchQueue.length > 0; }

  /** Hangar capacity of the active ship (0 = not a carrier). */
  get hangar() {
    return this.game.player?.statMult?.hangar ?? 0;
  }

  /** Stored ships available to launch (owned minus the one being flown). */
  get stored() {
    const player = this.game.player;
    return player.ships.owned.filter((id) => id !== player.ships.active);
  }

  update(dt) {
    const game = this.game;

    if (game.mode === 'flight' && game.input.consumeFleet()) {
      if (this.deployed) this.recall(false);
      else this.launch();
    }

    // Focus-fire command: V with a target under your aim (or the nearest
    // hostile in front) directs the whole wing onto it; V with nothing in
    // reach releases them back to free engage.
    if (game.mode === 'flight' && game.input.consumeFleetFocus()) {
      this._commandFocus();
    }

    // A dead or despawned focus target releases the wing automatically.
    if (this.focusTarget
      && (!this.focusTarget.alive || !game.enemies.enemies.includes(this.focusTarget))) {
      this.focusTarget = null;
      if (this.deployed) game.events.emit('fleet:free');
    }

    // Auto-recall when the flagship dives into an atmosphere.
    if (this.deployed && game.universe?.playerContext?.inAtmosphere) {
      this.recall(true);
    }

    // Sequential hangar launch: eject a pair of fighters per wave so the wing
    // streams out of the deck instead of all popping into existence at once.
    if (this._launchQueue.length) {
      this._launchTimer -= dt;
      if (this._launchTimer <= 0) {
        this._launchTimer = LAUNCH_INTERVAL;
        for (let n = 0; n < 2 && this._launchQueue.length; n++) {
          this._spawnEscort(this._launchQueue.shift());
        }
      }
    }

    // Tick escorts; dock the ones that flew home to their bay slot (or close
    // enough to the hull) while recalling.
    for (const esc of [...this.escorts]) {
      esc.update(dt);
      if (esc.recalling
        && (esc.docked || esc.position.distanceTo(game.player.position) < DOCK_RANGE)) {
        this._dock(esc);
      }
    }
  }

  launch() {
    const game = this.game;
    const hangar = this.hangar;
    if (hangar <= 0) {
      game.audio?.playTone?.({ type: 'square', freq: 160, freqEnd: 110, duration: 0.14, gain: 0.1 });
      game.events.emit('fleet:denied');
      return;
    }
    // Queue a fresh wing up to the hangar capacity; `update` releases it two at
    // a time. The carrier ejects from its flank hangars, the smaller battleship
    // drops fighters out of its belly.
    this._launchPort = game.player.statMult?.capital === 'battleship' ? 'bottom' : 'side';
    this._wingSize = hangar;
    this._launchQueue = [];
    for (let i = 0; i < hangar; i++) this._launchQueue.push(i);
    this._launchTimer = 0; // first wave on the next tick
    game.events.emit('fleet:launched', hangar);
    game.audio?.playTone?.({ type: 'sine', freq: 500, freqEnd: 840, duration: 0.3, gain: 0.16 });
  }

  /**
   * Eject one fighter from the launch port with an outward kick, then hand it
   * to its ring slot. Even slots leave the port side, odd slots the starboard
   * side, so a wave shows one fighter out of each flank (single file per side).
   */
  _spawnEscort(slot) {
    const game = this.game;
    const player = game.player;
    const esc = new EscortShip(game, ATTACK_FIGHTER, slot);
    esc.wingSize = this._wingSize;
    esc.launchPort = this._launchPort;

    const side = slot % 2 === 0 ? -1 : 1;
    const rank = Math.floor(slot / 2);
    const R = player.radius;
    const local = this._scratchA;
    const kick = this._scratchB;
    if (this._launchPort === 'bottom') {
      local.set(side * R * 0.22, -R * 0.75, R * 0.12 - rank * 3);
      kick.set(side * 0.3, -1, 0);
    } else {
      local.set(side * R * 0.85, 0, R * 0.1 - rank * 3);
      kick.set(side, 0, 0);
    }
    esc.position.copy(local.applyQuaternion(player.quaternion)).add(player.position);
    esc.velocity.copy(player.velocity)
      .addScaledVector(kick.applyQuaternion(player.quaternion).normalize(), 80);
    this.escorts.push(esc);
    game.audio?.playTone?.({ type: 'triangle', freq: 600, freqEnd: 900, duration: 0.1, gain: 0.08 });
  }

  /**
   * Resolve and issue the focus-fire order. Target priority: whatever the
   * aim assist has locked, else the nearest hostile within command range.
   */
  _commandFocus() {
    const game = this.game;
    if (!this.deployed) {
      game.events.emit('fleet:no-wing');
      return;
    }
    let target = game.weapons?.assistTarget ?? null;
    if (!target || !target.alive) {
      target = null;
      let bestSq = 3000 * 3000;
      for (const enemy of game.enemies?.enemies ?? []) {
        if (!enemy.alive) continue;
        const d = enemy.position.distanceToSquared(game.player.position);
        if (d < bestSq) { bestSq = d; target = enemy; }
      }
    }
    if (target) {
      this.focusTarget = target;
      game.events.emit('fleet:focus', target);
      game.audio?.playTone?.({ type: 'sine', freq: 620, freqEnd: 980, duration: 0.16, gain: 0.14 });
    } else {
      this.focusTarget = null;
      game.events.emit('fleet:free');
      game.audio?.playTone?.({ type: 'sine', freq: 560, freqEnd: 440, duration: 0.14, gain: 0.12 });
    }
  }

  /** Order the wing home. `instant` skips the fly-back (mode changes). */
  recall(instant) {
    if (!this.deployed) return;
    this._launchQueue = []; // stop any waves still queued to launch
    if (instant) {
      this._despawnAll();
      this.game.events.emit('fleet:recalled');
      return;
    }
    for (const esc of this.escorts) esc.recalling = true;
    this.game.events.emit('fleet:recalling');
    this.game.audio?.playTone?.({ type: 'sine', freq: 700, freqEnd: 460, duration: 0.25, gain: 0.14 });
  }

  /** An escort reached the carrier: dock it (stored again, fully repaired). */
  _dock(esc) {
    const i = this.escorts.indexOf(esc);
    if (i !== -1) this.escorts.splice(i, 1);
    esc.dispose();
    this.game.audio?.playTone?.({ type: 'triangle', freq: 620, freqEnd: 880, duration: 0.12, gain: 0.12 });
    if (this.escorts.length === 0) {
      this.focusTarget = null;
      this.game.events.emit('fleet:recalled');
    }
  }

  /** A wingman went down. Hangar fighters are expendable — no collection loss. */
  onEscortDestroyed(esc) {
    const i = this.escorts.indexOf(esc);
    if (i !== -1) this.escorts.splice(i, 1);
    esc.dispose();
    this.game.events.emit('fleet:ship-lost', esc.variantId);
  }

  _despawnAll() {
    for (const esc of this.escorts) esc.dispose();
    this.escorts.length = 0;
    this._launchQueue = [];
    this.focusTarget = null;
  }
}

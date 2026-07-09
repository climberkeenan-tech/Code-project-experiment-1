import * as THREE from 'three';
import { EscortShip } from './EscortShip.js';

/**
 * Fleet command (bible endgame): capital ships carry a hangar of AI attack
 * craft. Press G (or the DEPLOY button) to launch the wing, press again to
 * recall it. Craft stream out of the hangar a pair at a time and split into
 * roles: GUARDS form a protective shell around the flagship while SCOUTS sweep
 * wide patrol orbits hunting for hostiles. Every craft locks one target and
 * stays on it until it dies (fire credited to you), then flies back to the
 * launch port to dock when recalled. They are hangar craft — NOT the player's
 * owned ships — so a lost one costs nothing from the collection.
 *
 * Deployment rules:
 *  - only capital hulls with a hangar can launch (battleship: 4, carrier: 15)
 *  - the wing is spawned fresh each launch, up to the hangar capacity, released
 *    two-at-a-time from the flanks (carrier) or belly (battleship)
 *  - auto-recall on atmosphere entry, death, or going on foot
 */

/** Hull the hangar-launched attack fighters fly (a light, expendable craft). */
const ATTACK_FIGHTER = 'starter';
/** Hull the heavier hangar-launched gunner ships fly (gunnerHangar craft). */
const GUNNER_SHIP = 'frigate';
/** Seconds between hangar-launch waves (two craft per wave). */
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
      if (game.player.statMult?.fleetCall) {
        // Star Destroyer special: G opens the fleet-composition call.
        game.events.emit('fleetcall:prompt');
      } else if (game.player.statMult?.reinforce) {
        // Night Hawk special: G calls in allied reinforcements instead.
        game.events.emit('reinforce:prompt');
      } else if (this.deployed) this.recall(false);
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

    // Tick escorts; dock ONLY the ones that actually reached their bay mouth
    // (no mid-approach vanishing — the craft visibly flies into the hangar).
    for (const esc of [...this.escorts]) {
      esc.update(dt);
      if (esc.recalling && esc.docked) {
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
    // Queue a fresh wing; `update` releases it two craft at a time. Capitals
    // with a `gunnerHangar` (the Aethelred) add heavier gunner ships after the
    // light fighters. Launch port comes from the catalog (`launchPort`), else
    // the belly for a battleship / the flanks for a carrier.
    //
    // Roles: ~1/3 of the fighters become SCOUTS (wide patrol orbits, hunting);
    // the remaining fighters plus every gunner ship are GUARDS (the protective
    // shell around the flagship). Guards launch first so the screen forms,
    // then the scouts streak out to their patrols.
    // Only launch craft you actually OWN: the wing is drawn from the
    // player's hangar stock (bought at the Exchange), capped by this hull's
    // slot counts. Losses in battle deplete the stock permanently.
    const stock = game.player.hangarStock ?? (game.player.hangarStock = { fighter: 15, gunner: 5 });
    const fighters = Math.min(hangar, Math.max(0, stock.fighter));
    const gunners = Math.min(game.player.statMult?.gunnerHangar ?? 0, Math.max(0, stock.gunner));
    if (fighters + gunners <= 0) {
      game.audio?.playTone?.({ type: 'square', freq: 160, freqEnd: 110, duration: 0.14, gain: 0.1 });
      game.events.emit('fleet:empty');
      return;
    }
    this._launchPort = game.player.statMult?.launchPort
      ?? (game.player.statMult?.capital === 'battleship' ? 'bottom' : 'side');
    const scouts = fighters >= 3 ? Math.max(1, Math.floor(fighters / 3)) : 0;
    const guardFighters = fighters - scouts;
    const guardCount = guardFighters + gunners;
    this._wingSize = fighters + gunners;
    this._launchQueue = [];
    let slot = 0;
    let g = 0;
    for (let i = 0; i < guardFighters; i++) {
      this._launchQueue.push({ variant: ATTACK_FIGHTER, slot: slot++, role: 'guard', roleIndex: g++, roleCount: guardCount });
    }
    for (let i = 0; i < gunners; i++) {
      this._launchQueue.push({ variant: GUNNER_SHIP, slot: slot++, role: 'guard', roleIndex: g++, roleCount: guardCount });
    }
    for (let i = 0; i < scouts; i++) {
      this._launchQueue.push({ variant: ATTACK_FIGHTER, slot: slot++, role: 'scout', roleIndex: i, roleCount: scouts });
    }
    this._launchTimer = 0; // first wave on the next tick
    game.events.emit('fleet:launched', this._wingSize);
    game.audio?.playTone?.({ type: 'sine', freq: 500, freqEnd: 840, duration: 0.3, gain: 0.16 });
  }

  /**
   * Eject one craft from the launch port with an outward kick, then hand it to
   * its role slot. Even slots leave the port side, odd slots the starboard
   * side, so a wave shows one craft out of each flank (single file per side).
   * @param {{variant: string, slot: number, role: string, roleIndex: number, roleCount: number}} entry
   */
  _spawnEscort(entry) {
    const game = this.game;
    const player = game.player;
    const { variant, slot } = entry;
    const esc = new EscortShip(game, variant, slot);
    esc.wingSize = this._wingSize;
    esc.launchPort = this._launchPort;
    esc.role = entry.role ?? 'guard';
    esc.roleIndex = entry.roleIndex ?? slot;
    esc.roleCount = entry.roleCount ?? this._wingSize;
    // Every second guard is a DEFENDER: it holds the sphere shell around the
    // player and only breaks off for hostiles at the flagship's doorstep.
    esc.defender = esc.role === 'guard' && esc.roleIndex % 2 === 0;
    // Spread scout patrols evenly around the compass from the start.
    if (esc.role === 'scout') {
      esc._orbitAng = (esc.roleIndex / Math.max(1, esc.roleCount)) * Math.PI * 2;
    }

    const side = slot % 2 === 0 ? -1 : 1;
    const rank = Math.floor(slot / 2);
    const R = player.radius;
    const local = this._scratchA;
    const kick = this._scratchB;
    if (this._launchPort === 'bottom') {
      local.set(side * R * 0.22, -R * 0.75, R * 0.12 - rank * 3);
      kick.set(side * 0.3, -1, 0);
    } else if (this._launchPort === 'lowerside') {
      // Out of the flanks but low on the hull, by the belly spikes.
      local.set(side * R * 0.7, -R * 0.32, R * 0.1 - rank * 3);
      kick.set(side, -0.5, 0);
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
    // A destroyed hangar craft is gone for good — buy a replacement at the
    // Exchange (Hangar tab).
    const stock = this.game.player?.hangarStock;
    if (stock) {
      const key = esc.variantId === GUNNER_SHIP ? 'gunner' : 'fighter';
      stock[key] = Math.max(0, (stock[key] ?? 0) - 1);
    }
    this.game.events.emit('fleet:ship-lost', esc.variantId);
  }

  _despawnAll() {
    for (const esc of this.escorts) esc.dispose();
    this.escorts.length = 0;
    this._launchQueue = [];
    this.focusTarget = null;
  }
}

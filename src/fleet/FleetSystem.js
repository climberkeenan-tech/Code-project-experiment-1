import { EscortShip } from './EscortShip.js';

/**
 * Fleet command (bible endgame): when flying a carrier, the ships stored in
 * your collection can be LAUNCHED as AI escorts — press G (or the FLEET
 * button) to deploy the wing, press again to recall. Escorts hold formation,
 * engage hostiles with turret fire credited to you, and dock (despawn, fully
 * repaired) when they return to the carrier. A destroyed escort is removed
 * from the collection permanently — fleet combat has real stakes.
 *
 * Deployment rules:
 *  - only the active ship's hangar capacity can be launched (carrier: 4)
 *  - stored ships (owned minus active) fill the wing in catalog order
 *  - auto-recall on atmosphere entry, death, or going on foot
 */

const DOCK_RANGE = 45;

export class FleetSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {EscortShip[]} */
    this.escorts = [];

    game.fleet = this;

    game.origin.onShift((delta) => {
      for (const esc of this.escorts) esc.position.sub(delta);
    });

    game.events.on('player:died', () => this._despawnAll());
    game.events.on('onfoot:entered', () => this.recall(true));
  }

  get deployed() { return this.escorts.length > 0; }

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

    // Auto-recall when the flagship dives into an atmosphere.
    if (this.deployed && game.universe?.playerContext?.inAtmosphere) {
      this.recall(true);
    }

    // Tick escorts; dock the ones that made it home while recalling.
    for (const esc of [...this.escorts]) {
      esc.update(dt);
      if (esc.recalling
        && esc.position.distanceTo(game.player.position) < DOCK_RANGE + game.player.radius) {
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
    const wing = this.stored.slice(0, hangar);
    if (wing.length === 0) {
      game.audio?.playTone?.({ type: 'square', freq: 160, freqEnd: 110, duration: 0.14, gain: 0.1 });
      game.events.emit('fleet:empty');
      return;
    }
    wing.forEach((id, i) => {
      const esc = new EscortShip(game, id, i);
      // Launch from alongside the carrier deck.
      esc.position.copy(game.player.position);
      esc.position.x += (i % 2 === 0 ? -1 : 1) * (game.player.radius + 8);
      esc.velocity.copy(game.player.velocity);
      this.escorts.push(esc);
    });
    game.events.emit('fleet:launched', wing.length);
    game.audio?.playTone?.({ type: 'sine', freq: 500, freqEnd: 840, duration: 0.3, gain: 0.16 });
  }

  /** Order the wing home. `instant` skips the fly-back (mode changes). */
  recall(instant) {
    if (!this.deployed) return;
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
    if (this.escorts.length === 0) this.game.events.emit('fleet:recalled');
  }

  /** A wingman went down: the ship is permanently lost from the collection. */
  onEscortDestroyed(esc) {
    const i = this.escorts.indexOf(esc);
    if (i !== -1) this.escorts.splice(i, 1);
    const owned = this.game.player.ships.owned;
    const j = owned.indexOf(esc.variantId);
    if (j !== -1) owned.splice(j, 1);
    esc.dispose();
    this.game.events.emit('fleet:ship-lost', esc.variantId);
    this.game.events.emit('ship:changed'); // autosave the loss
  }

  _despawnAll() {
    for (const esc of this.escorts) esc.dispose();
    this.escorts.length = 0;
  }
}

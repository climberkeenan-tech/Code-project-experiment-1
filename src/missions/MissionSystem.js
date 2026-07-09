import * as THREE from 'three';

/**
 * Bounty missions: a ladder of "destroy one marked hostile" contracts,
 * started from the Outpost Exchange (Missions tab). Starting one spawns the
 * target just ahead of the player — you watch it warp in, then fight.
 * Completing a mission pays credits and unlocks the next rung. Progress
 * (`index`) persists in the save.
 */

const LADDER = [
  { type: 'scout', label: 'Destroy a Lv10 Scout', reward: 60 },
  { type: 'fighter', label: 'Destroy a Lv20 Fighter', reward: 150 },
  { type: 'heavy', label: 'Destroy a Lv40 Heavy Assault', reward: 450 },
  { type: 'cruiser', label: 'Destroy a Lv60 Missile Cruiser', reward: 1100 },
  { type: 'warship', label: 'Destroy a Lv75 Warship', reward: 3600 },
  { type: 'redcarrier', label: 'Destroy a Lv90 Carrier', reward: 9000 },
  { type: 'destroyer', label: 'Destroy the Lv100 Planet Destroyer', reward: 24000 },
];

export class MissionSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** Next rung of the ladder to attempt (persisted). */
    this.index = 0;
    /** @type {{def: object, ship: object}|null} the live contract */
    this.active = null;
    this._fwd = new THREE.Vector3();
    game.missions = this;

    game.events.on('ship:destroyed', ({ ship }) => {
      if (this.active && ship === this.active.ship) this._complete();
    });
    game.events.on('player:respawned', () => { this.active = null; });
  }

  get ladder() { return LADDER; }
  get completedAll() { return this.index >= LADDER.length; }

  /** Spawn the current rung's target ahead of the player. */
  start() {
    const game = this.game;
    if (this.active || this.completedAll || !game.player?.alive) return false;
    const def = LADDER[this.index];
    game.player.getForward(this._fwd);
    const pos = game.player.position.clone()
      .addScaledVector(this._fwd, 1500);
    pos.y += 140;
    const ship = game.enemies?.spawn(def.type, pos);
    if (!ship) return false;
    this.active = { def, ship };
    game.events.emit('mission:started', { index: this.index, ...def });
    return true;
  }

  update() {
    // Target vanished without dying (despawned out of range): re-offer it.
    if (this.active
      && !this.game.enemies.enemies.includes(this.active.ship)
      && this.active.ship.alive) {
      this.active = null;
      this.game.events.emit('mission:lost');
    }
  }

  _complete() {
    const game = this.game;
    const { def } = this.active;
    this.active = null;
    this.index += 1;
    game.player.credits += def.reward;
    game.events.emit('mission:completed', { reward: def.reward, label: def.label });
    game.audio?.playTone?.({ type: 'triangle', freq: 660, freqEnd: 1180, duration: 0.4, gain: 0.22 });
  }
}

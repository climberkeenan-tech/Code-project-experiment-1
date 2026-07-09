import * as THREE from 'three';

/**
 * Bounty missions: a ladder of "destroy one marked hostile" contracts,
 * started from the Outpost Exchange (Missions tab). Starting one spawns the
 * target just ahead of the player — you watch it warp in, then fight.
 * Completing a mission pays credits and unlocks the next rung. Progress
 * (`index`) persists in the save.
 */

const LADDER = [
  { ships: ['scout'], label: 'Destroy a Lv10 Scout', reward: 60 },
  { ships: ['fighter'], label: 'Destroy a Lv20 Fighter', reward: 150 },
  { ships: ['heavy'], label: 'Destroy a Lv40 Heavy Assault', reward: 450 },
  { ships: ['scout', 'scout', 'scout', 'fighter', 'fighter'], label: 'Destroy a small pirate fleet (5 ships)', reward: 900 },
  { ships: ['cruiser'], label: 'Destroy an enemy Gunner Ship', reward: 1400 },
  { ships: ['cruiser', 'cruiser', 'cruiser'], label: 'Destroy a fleet of Gunner Ships (3)', reward: 4200 },
  { ships: ['cruiser'], requiresShip: 'starter', label: 'Destroy a Gunner Ship — flying the SF-10 Sentinel', reward: 6000 },
  { ships: ['warship'], label: 'Destroy a Lv75 Warship', reward: 3600 },
  { ships: ['redcarrier'], label: 'Destroy a Lv90 Carrier', reward: 9000 },
  { ships: ['destroyer'], label: 'Destroy the Lv100 Planet Destroyer', reward: 24000 },
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
      if (!this.active || !this.active.remaining.has(ship)) return;
      this.active.remaining.delete(ship);
      if (this.active.remaining.size === 0) this._complete();
      else {
        game.events.emit('mission:progress', {
          left: this.active.remaining.size, total: this.active.def.ships.length,
        });
      }
    });
    game.events.on('player:respawned', () => { this.active = null; });
  }

  get ladder() { return LADDER; }
  get completedAll() { return this.index >= LADDER.length; }

  /** Some contracts must be flown in a specific hull. */
  wrongShip() {
    const def = LADDER[this.index];
    return !!(def?.requiresShip && this.game.player?.ships.active !== def.requiresShip);
  }

  /** Spawn the current rung's target group ahead of the player. */
  start() {
    const game = this.game;
    if (this.active || this.completedAll || !game.player?.alive) return false;
    const def = LADDER[this.index];
    if (this.wrongShip()) return false;
    game.player.getForward(this._fwd);
    const remaining = new Set();
    def.ships.forEach((type, i) => {
      const pos = game.player.position.clone()
        .addScaledVector(this._fwd, 1500 + i * 90);
      pos.x += (i % 2 === 0 ? 1 : -1) * i * 70;
      pos.y += 140 + (i % 3) * 60;
      const ship = game.enemies?.spawn(type, pos);
      if (ship) remaining.add(ship);
    });
    if (!remaining.size) return false;
    this.active = { def, remaining };
    game.events.emit('mission:started', { index: this.index, ...def, count: remaining.size });
    return true;
  }

  update() {
    // Any target that vanished without dying (despawned) voids the contract.
    if (!this.active) return;
    for (const ship of this.active.remaining) {
      if (!this.game.enemies.enemies.includes(ship) && ship.alive) {
        this.active = null;
        this.game.events.emit('mission:lost');
        return;
      }
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
    // Finishing the WHOLE ladder unlocks the Night Hawk — the first is free.
    if (this.completedAll) {
      const owned = game.player.ships.owned;
      if (!owned.includes('nighthawk')) owned.push('nighthawk');
      game.events.emit('mission:allcomplete');
    }
  }
}

import * as THREE from 'three';

/**
 * The apex hunter: one Ravager Dreadnought that exists outside the normal
 * encounter economy. It spawns far out, shows on the radar like a planet
 * (a deep-red rim arc, no HUD arrows), and closes in relentlessly. The
 * player can always see it coming and always choose to run — that choice
 * is the feature. Only inside weapons range does it resolve into a normal
 * target with brackets.
 *
 * The director never despawns it and it never counts against the global
 * enemy cap. Killing it pays enormously and buys a long quiet before the
 * next one starts hunting.
 */

const SPAWN_DISTANCE = 60000;
const RESPAWN_COOLDOWN = 600; // seconds of peace after a kill
const FIRST_SPAWN_DELAY = 90; // let a new session breathe first
const CRUISE_START = 5000; // beyond this the hunter burns its pursuit drive

export class ApexHunter {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {import('./EnemyShip.js').EnemyShip|null} */
    this.hunter = null;
    this._cooldown = FIRST_SPAWN_DELAY;
    this._dir = new THREE.Vector3();

    // A fresh start after death: shove the hunter back to the horizon.
    game.events.on('player:respawned', () => {
      if (this.hunter?.alive) this._placeFar(this.hunter.position);
    });
  }

  update(dt) {
    const game = this.game;
    const player = game.player;
    if (!player || !player.alive) return;
    // The hunt waits while a mission contract is live (a hunter already in
    // play keeps hunting — only NEW arrivals pause).
    if (game.missions?.active && !this.hunter) return;

    // Detect death/removal (the manager splices it out of the live list).
    if (this.hunter && (!this.hunter.alive || !game.enemies.enemies.includes(this.hunter))) {
      this.hunter = null;
      this._cooldown = RESPAWN_COOLDOWN;
    }

    if (!this.hunter) {
      this._cooldown -= dt;
      if (this._cooldown <= 0) this._spawn();
      return;
    }

    // Pursuit drive: far beyond combat range the dreadnought closes at a
    // speed proportional to distance (minutes of warning, not hours), on
    // top of its normal flight AI. Inside CRUISE_START the regular engine
    // takes over and the fight is honest.
    const dist = this.hunter.position.distanceTo(player.position);
    if (dist > CRUISE_START) {
      const cruise = Math.min(1400, Math.max(140, dist * 0.012));
      this._dir.copy(player.position).sub(this.hunter.position).normalize();
      this.hunter.position.addScaledVector(this._dir, cruise * dt);
    }
  }

  _spawn() {
    const game = this.game;
    const pos = new THREE.Vector3();
    this._placeFar(pos);
    this.hunter = game.enemies.spawn('apex', pos, pos.clone(), 4000);
    game.events.emit('combat:contact', { count: 1, label: 'APEX SIGNATURE — Ravager Dreadnought' });
  }

  /** Write a point SPAWN_DISTANCE from the player, random bearing, into `out`. */
  _placeFar(out) {
    const a = Math.random() * Math.PI * 2;
    const y = (Math.random() - 0.5) * 0.3;
    this._dir.set(Math.cos(a), y, Math.sin(a)).normalize();
    out.copy(this.game.player.position).addScaledVector(this._dir, SPAWN_DISTANCE);
  }
}

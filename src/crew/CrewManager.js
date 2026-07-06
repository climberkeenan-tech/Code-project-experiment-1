import * as THREE from 'three';

/**
 * Crew system: hireable specialists that work while you fly.
 *
 *  - Engineer repairs the hull over time (rate scales with star rating).
 *  - Gunner auto-fires at the nearest hostile (accuracy + cadence scale with
 *    stars): a 1★ misses often, a 5★ almost never does.
 *
 * Crew are rated 1–5 stars, hired/fired at the Outpost Exchange, cost more at
 * higher ratings, persist in the save, and are lost with the ship on death
 * (the design bible's death economy). Registered after the weapon system so
 * the gunner can fire the same pooled bolts as the player.
 */

const FIRST = ['Vex', 'Cael', 'Rho', 'Nix', 'Mira', 'Juno', 'Dax', 'Sable', 'Orin', 'Wren', 'Kade', 'Lyra'];
const LAST = ['Okonkwo', 'Reyes', 'Tan', 'Volkov', 'Adeyemi', 'Cho', 'Marek', 'Idris', 'Sato', 'Nakamura'];

const GUNNER_RANGE = 700;

let nextCrewId = 1;

/** Credit cost of a crew member by star rating (20 → 500). */
export function crewCost(stars) {
  return Math.round(20 + (stars - 1) * 120);
}

export class CrewManager {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {Array<{id:number, role:string, name:string, stars:number}>} */
    this.roster = [];

    this._gunnerCooldown = 0;
    this._muzzle = new THREE.Vector3();
    this._toTarget = new THREE.Vector3();
    this._dir = new THREE.Vector3();
    this._jEuler = new THREE.Euler();
    this._jQuat = new THREE.Quaternion();

    // Crew go down with the ship.
    game.events.on('player:respawned', () => { this.roster.length = 0; this._announce(); });

    game.crew = this;
  }

  get engineer() { return this.roster.find((c) => c.role === 'engineer') || null; }
  get gunner() { return this.roster.find((c) => c.role === 'gunner') || null; }

  /** Roster capacity follows the active ship (bigger ships, bigger crews). */
  get capacity() {
    return this.game.player?.statMult?.crew ?? 3;
  }

  hire(recruit) {
    if (this.roster.length >= this.capacity) return false;
    this.roster.push({ id: nextCrewId++, role: recruit.role, name: recruit.name, stars: recruit.stars });
    this._announce();
    return true;
  }

  fire(id) {
    const i = this.roster.findIndex((c) => c.id === id);
    if (i === -1) return;
    this.roster.splice(i, 1);
    this._announce();
  }

  _announce() { this.game.events.emit('crew:changed', this.roster); }

  /** Restore from a save. */
  restore(list) {
    if (!Array.isArray(list)) return;
    this.roster = list
      .filter((c) => c && (c.role === 'engineer' || c.role === 'gunner') && c.stars >= 1)
      .map((c) => ({ id: nextCrewId++, role: c.role, name: String(c.name || 'Crew'), stars: c.stars | 0 }));
  }

  /** Generate a fresh recruit for the shop pool. */
  static makeRecruit(rand = Math.random) {
    const role = rand() < 0.5 ? 'engineer' : 'gunner';
    // Weight toward lower stars; 5★ are rare.
    const roll = rand();
    const stars = roll < 0.4 ? 1 : roll < 0.7 ? 2 : roll < 0.88 ? 3 : roll < 0.97 ? 4 : 5;
    const name = FIRST[(rand() * FIRST.length) | 0] + ' ' + LAST[(rand() * LAST.length) | 0];
    return { role, stars, name };
  }

  update(dt) {
    const game = this.game;
    const player = game.player;
    if (!player || !player.alive || game.mode !== 'flight') return;

    // --- Engineer: repair hull over time ---
    const eng = this.engineer;
    if (eng && player.hull < player.hullMax) {
      const rate = 1.2 + eng.stars * 1.6; // hp/s, 2.8 → 9.2
      player.hull = Math.min(player.hullMax, player.hull + rate * dt);
    }

    // --- Gunner: auto-fire at the nearest hostile ---
    this._gunnerCooldown -= dt;
    const gun = this.gunner;
    if (gun && this._gunnerCooldown <= 0 && game.enemies && game.weapons) {
      const enemy = this._nearestEnemy(player.position, GUNNER_RANGE);
      if (enemy) this._gunnerFire(player, enemy, gun);
    }
  }

  _nearestEnemy(pos, range) {
    let best = null;
    let bestSq = range * range;
    for (const e of this.game.enemies.enemies) {
      if (!e.alive) continue;
      const d = e.position.distanceToSquared(pos);
      if (d < bestSq) { bestSq = d; best = e; }
    }
    return best;
  }

  _gunnerFire(player, enemy, gun) {
    const weapons = this.game.weapons;
    // Cadence: 5★ ~0.35s, 1★ ~0.85s.
    this._gunnerCooldown = 0.95 - gun.stars * 0.12;

    // Muzzle from a player hardpoint.
    const hp = player.hardpoints[Math.floor(Math.random() * player.hardpoints.length)];
    this._muzzle.copy(hp).applyQuaternion(player.quaternion).add(player.position);

    // Lead the target; accuracy jitter shrinks with stars (5★ ≈ never miss).
    const dist = this._toTarget.copy(enemy.position).sub(this._muzzle).length();
    const lead = dist / 950;
    this._toTarget.copy(enemy.position).addScaledVector(enemy.velocity, lead).sub(this._muzzle).normalize();
    const jitter = (1 - gun.stars / 5) * 0.06 + 0.004;
    this._jEuler.set((Math.random() - 0.5) * jitter, (Math.random() - 0.5) * jitter, 0);
    this._jQuat.setFromEuler(this._jEuler);
    this._toTarget.applyQuaternion(this._jQuat);

    weapons.fire(this._muzzle, this._toTarget, {
      fromPlayer: true, // credited to the player → kill rewards apply
      damage: (6 + gun.stars * 2) * player.upgrades.weapon,
      speed: 950,
      source: player,
      inheritVel: player.velocity,
    });
  }
}

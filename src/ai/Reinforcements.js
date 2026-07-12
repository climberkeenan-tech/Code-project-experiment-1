import * as THREE from 'three';
import { PLAYER_SHIP_BY_ID } from '../ship/ShipFactory.js';

/**
 * Kill-escalation: every hostile the player destroys calls in TWO
 * replacements a few seconds later, spawning just outside visual range.
 * Stand and fight and the swarm keeps growing until it overwhelms you —
 * the intended escape hatch is the hyperdrive: engaging warp cancels every
 * pending reinforcement (and the despawner cleans up whatever you outran).
 *
 * Exceptions that keep it fair:
 *  - killing the apex hunter buys peace, never war
 *  - a hard ceiling on live hostiles so the swarm stays fightable (and
 *    the frame rate survives)
 *  - capital kills call in smaller escorts, not more capitals
 */

const REINFORCE_CAP = 16; // live-hostile ceiling during an escalation
const DELAY_MIN = 3.5;
const DELAY_MAX = 8;
const SPAWN_MIN = 950;
const SPAWN_MAX = 1500;

/** What answers a kill; anything unlisted sends two of itself. */
const REPLACEMENT = { redcarrier: 'warship', destroyer: 'heavy' };

export class Reinforcements {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {Array<{type: string, timer: number}>} */
    this.queue = [];
    this._dir = new THREE.Vector3();

    game.events.on('enemy:killed', (ship) => {
      if (!ship?.stats || ship.stats.apex) return;
      // Leviathan garrison kills don't escalate — the fortress itself is
      // already streaming endless replacements out of its hangars.
      if (ship.hubGuard) return;
      // Mission kills don't call for revenge — the contract is the fight.
      if (game.missions?.active) return;
      const type = REPLACEMENT[ship.type] ?? ship.type;
      const firstWave = this.queue.length === 0;
      for (let i = 0; i < 2; i++) {
        this.queue.push({ type, timer: DELAY_MIN + Math.random() * (DELAY_MAX - DELAY_MIN) });
      }
      if (firstWave) {
        game.events.emit('combat:contact', { count: 2, label: 'reinforcements — warp out to escape' });
      }
    });
  }

  update(dt) {
    if (this.queue.length === 0) return;
    const game = this.game;
    const player = game.player;

    // The escape hatch: hitting the hyperdrive (or dying) calls off the hunt.
    if (!player || !player.alive || game.warp?.engaged) {
      this.queue.length = 0;
      return;
    }

    for (let i = this.queue.length - 1; i >= 0; i--) {
      const r = this.queue[i];
      r.timer -= dt;
      if (r.timer > 0) continue;
      this.queue.splice(i, 1);
      const live = game.enemies.enemies.filter((e) => !e.stats?.apex).length;
      if (live >= REINFORCE_CAP) continue; // swarm is already at ceiling
      this._spawn(r.type);
    }
  }

  _spawn(type) {
    const game = this.game;
    const player = game.player;
    const a = Math.random() * Math.PI * 2;
    this._dir.set(Math.cos(a), (Math.random() - 0.5) * 0.5, Math.sin(a)).normalize();
    const pos = player.position.clone()
      .addScaledVector(this._dir, SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN));

    const enemy = game.enemies.spawn(type, pos, player.position.clone(), 3000);

    // Same veteran scaling the director applies to regular squads.
    const level = PLAYER_SHIP_BY_ID[player.ships?.active]?.level ?? 10;
    enemy.damageScale = 1 + Math.max(0, level - 10) / 150;
    const toughness = 1 + Math.max(0, level - 10) / 120;
    enemy.hullMax = Math.round(enemy.hullMax * toughness);
    enemy.hull = enemy.hullMax;
    enemy.shieldMax = Math.round(enemy.shieldMax * toughness);
    enemy.shield = enemy.shieldMax;
  }
}

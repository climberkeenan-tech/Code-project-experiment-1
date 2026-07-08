import * as THREE from 'three';
import { clamp } from '../core/math/noise.js';
import { PLAYER_SPAWN } from '../world/constants.js';
import { PLAYER_SHIP_BY_ID } from '../ship/ShipFactory.js';

/**
 * Combat orchestration: death handling, ship-vs-ship ramming, respawn.
 *
 * WeaponSystem resolves projectiles; this system owns everything that
 * happens *between* ships and after a kill:
 *  - enemy destroyed → remove from play (explosion/pickups react to the
 *    same event on their own)
 *  - player destroyed → hide ship, announce death (Screens shows overlay)
 *  - respawn → restore the player at the spawn anchor with a salvage tax
 *  - ramming → mutual damage + elastic separation
 */
export class CombatSystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    /** Per-enemy ram cooldown so a graze doesn't tick damage every frame. */
    this._ramCooldowns = new Map();

    this._delta = new THREE.Vector3();

    game.events.on('ship:destroyed', ({ ship, byPlayer }) => {
      if (ship === game.player) {
        this._onPlayerDestroyed();
      } else if (ship.isEscort) {
        // A deployed wingman went down — the fleet handles the loss.
        game.fleet?.onEscortDestroyed(ship);
      } else if (ship.isFriendly) {
        // An allied traffic ship was shot down — no reward, no reinforcement.
        game.traffic?.onTrafficDestroyed(ship);
      } else {
        // Kill reward: credits scaled by enemy class (level).
        if (byPlayer) {
          const reward = ship.stats?.credits ?? 0;
          game.player.credits += reward;
          game.events.emit('enemy:killed', ship);
          game.events.emit('combat:reward', {
            credits: reward, name: ship.stats?.displayName ?? 'Hostile',
          });
        }
        game.enemies.remove(ship);
      }
    });

    game.events.on('player:respawn-requested', () => this._respawnPlayer());
  }

  _onPlayerDestroyed() {
    const game = this.game;
    game.player.object3D.visible = false;
    game.events.emit('camera:shake', 1);
    game.events.emit('player:died');
  }

  _respawnPlayer() {
    const game = this.game;
    const player = game.player;

    // Death economy: the ACTIVE ship, its hold (mined ore) and onboard crew
    // are lost; stored ships and banked credits survive. Legacy salvage
    // counter still takes a tax.
    player.inventory = {};
    player.resources = Math.floor(player.resources * 0.7);
    const lost = player.ships.active;
    const i = player.ships.owned.indexOf(lost);
    if (i !== -1) player.ships.owned.splice(i, 1);
    delete player.upgradesByShip[lost]; // its upgrades die with the hull
    if (player.ships.owned.length === 0) player.ships.owned.push('starter');
    const cheapest = [...player.ships.owned]
      .sort((a, b) => (PLAYER_SHIP_BY_ID[a]?.cost ?? 0) - (PLAYER_SHIP_BY_ID[b]?.cost ?? 0))[0];
    if (cheapest !== lost) player.setShip(cheapest);

    // Respawn at the universe spawn anchor, expressed in current render
    // space (absolute = render + origin offset).
    player.position.copy(PLAYER_SPAWN).sub(game.origin.offset);
    player.quaternion.identity();
    player.respawn();
    game.events.emit('player:respawned');
  }

  update(dt) {
    this._updateRamming(dt);
  }

  _updateRamming(dt) {
    const game = this.game;
    const player = game.player;
    if (!player || !player.alive || !game.enemies) return;

    for (const [enemy, cooldown] of this._ramCooldowns) {
      const remaining = cooldown - dt;
      if (remaining <= 0) this._ramCooldowns.delete(enemy);
      else this._ramCooldowns.set(enemy, remaining);
    }

    // Copy: a lethal ram emits 'ship:destroyed', whose handler splices the
    // live array we'd otherwise be iterating.
    for (const enemy of [...game.enemies.enemies]) {
      if (!enemy.alive || this._ramCooldowns.has(enemy)) continue;

      const minDist = player.radius + enemy.radius;
      this._delta.copy(player.position).sub(enemy.position);
      const dist = this._delta.length();
      if (dist >= minDist || dist < 1e-4) continue;

      this._ramCooldowns.set(enemy, 0.6);

      // Damage scales with closing speed along the contact axis: glancing
      // bumps sting, head-on collisions hurt.
      this._delta.normalize();
      const relSpeed = Math.abs(
        player.velocity.dot(this._delta) - enemy.velocity.dot(this._delta),
      );
      const damage = clamp(relSpeed * 0.12, 8, 40);

      const playerResult = player.applyDamage(damage);
      const enemyResult = enemy.applyDamage(damage * 1.4);
      if (player.shieldFx) player.shieldFx.flash(enemy.position, 1);
      if (enemy.shieldFx) enemy.shieldFx.flash(player.position, 1);

      // Elastic-ish separation: push both apart along the contact axis.
      const push = this._delta;
      player.velocity.addScaledVector(push, 30);
      enemy.velocity.addScaledVector(push, -30);
      // De-penetrate immediately.
      player.position.addScaledVector(push, (minDist - dist) * 0.6);

      game.events.emit('player:hit', { damage });
      game.events.emit('camera:shake', 0.5);
      game.audio.playNoise({ duration: 0.4, gain: 0.5, filterFreq: 900, filterEnd: 120 });

      if (enemyResult.destroyed) {
        game.events.emit('ship:destroyed', { ship: enemy, byPlayer: true });
      }
      if (playerResult.destroyed) {
        game.events.emit('ship:destroyed', { ship: player, byPlayer: false });
      }
    }
  }
}

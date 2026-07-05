import * as THREE from 'three';
import { clamp } from '../core/math/noise.js';

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
      } else {
        game.enemies.remove(ship);
        if (byPlayer) game.events.emit('enemy:killed', ship);
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

    // Salvage tax: losing the ship costs a share of carried resources.
    player.resources = Math.floor(player.resources * 0.7);

    // Respawn at the universe spawn anchor (absolute origin), expressed in
    // the current render space.
    player.position.copy(game.origin.offset).negate();
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

    for (const enemy of game.enemies.enemies) {
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

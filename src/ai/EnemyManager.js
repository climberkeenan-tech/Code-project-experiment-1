import * as THREE from 'three';
import { EnemyShip } from './EnemyShip.js';

/**
 * Owns every live enemy: spawning, per-frame updates, floating-origin
 * shifts, and removal on death or despawn.
 *
 * Higher-level population logic (where and when squads appear) lives in the
 * EncounterDirector (Phase 9); this manager is the mechanical layer both
 * the director and the combat system talk to.
 */
export class EnemyManager {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {EnemyShip[]} */
    this.enemies = [];

    game.origin.onShift((delta) => {
      for (const enemy of this.enemies) {
        enemy.position.sub(delta);
        enemy.homeCenter.sub(delta);
        enemy.waypoint.sub(delta);
      }
    });
  }

  /**
   * Spawn a single enemy.
   * @param {'scout'|'fighter'|'heavy'} type
   * @param {THREE.Vector3} position render-space spawn point
   * @param {THREE.Vector3} [homeCenter] patrol anchor (defaults to spawn)
   * @param {number} [patrolRadius]
   */
  spawn(type, position, homeCenter = null, patrolRadius = 600) {
    const enemy = new EnemyShip(this.game, type, homeCenter ?? position, patrolRadius);
    enemy.position.copy(position);
    // Face a random direction so squads don't spawn in lockstep.
    enemy.quaternion.setFromEuler(new THREE.Euler(
      0, Math.random() * Math.PI * 2, 0,
    ));
    this.game.engine.scene.add(enemy.object3D);
    this.enemies.push(enemy);
    return enemy;
  }

  /**
   * Spawn a loose squad around a center point.
   * @param {THREE.Vector3} center
   * @param {Array<'scout'|'fighter'|'heavy'>} types
   * @param {number} [spread]
   * @param {number} [patrolRadius]
   */
  spawnSquad(center, types, spread = 250, patrolRadius = 700) {
    const squad = [];
    for (const type of types) {
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 2 * spread,
        (Math.random() - 0.5) * 2 * spread * 0.4,
        (Math.random() - 0.5) * 2 * spread,
      );
      squad.push(this.spawn(type, offset.add(center), center, patrolRadius));
    }
    return squad;
  }

  /** Remove an enemy from play (death or despawn). */
  remove(enemy) {
    const index = this.enemies.indexOf(enemy);
    if (index === -1) return;
    this.enemies.splice(index, 1);
    this.game.engine.scene.remove(enemy.object3D);
  }

  /** Count of enemies within a radius of a point (used by the director). */
  countNear(position, radius) {
    let count = 0;
    for (const enemy of this.enemies) {
      if (enemy.position.distanceTo(position) < radius) count++;
    }
    return count;
  }

  update(dt, elapsed) {
    for (const enemy of this.enemies) {
      enemy.update(dt, elapsed);
    }
  }
}

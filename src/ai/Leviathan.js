import * as THREE from 'three';
import { getEnemyModelProto } from '../ship/ModelShips.js';

/**
 * The Obsidian Leviathan: the enemy faction's HUB — a fortress the size of
 * a small planet, parked in deep space far beyond the outermost orbit.
 *
 * Design (from playtest direction):
 *  - it never moves and can't be landed on: it is a battle station, not a ship
 *  - 150,000 hull — a raid boss, not a dogfight
 *  - it is wrapped in a spherical guard shell ("boreto") with scouts screening
 *    far out, exactly like the player's own capital fleet formation
 *  - the garrison is ENDLESS: ships keep streaming out of the fortress to
 *    replace losses, so you can never simply whittle the guards to zero —
 *    kill the Leviathan itself to stop the flow
 *
 * The design ratios call for ~1,000 escorts; a browser can't simulate that,
 * so the shell holds GUARD_CAP live ships and the stream instantly refills
 * losses — the same "endless supply" read without melting the frame rate.
 *
 * The hub itself is a pseudo-enemy pushed into the EnemyManager's list so
 * player/ally bolts hit it, the radar draws it as a threat rim-arc (via
 * stats.apex, like the Ravager), and the normal kill flow pays out. It is
 * also registered in game.obstacles so AI steers around it and enemy bolts
 * die against its hull.
 */

const HUB_POSITION = new THREE.Vector3(430000, 26000, -380000); // absolute
const HUB_HULL = 150000;
const GUARD_CAP = 70; // live guards at once — the stream refills losses
const ACTIVE_RANGE = 26000; // stream while the player is this close
const RELEASE_RANGE = 34000; // beyond this the garrison stands down
const STREAM_INTERVAL = 0.6; // seconds between launches while under cap
// First fill is FAST (the shell must already be swarming when the player
// arrives from a warp drop ~19 km out); losses refill at the normal pace.
const FILL_INTERVAL = 0.12;

// Endless-supply mix — scout-heavy, echoing the design ratios (1,000 lv10 /
// 50 lv30–40 / 25 lv50–60 / 10 of each capital class) at simulatable scale.
const STREAM_MIX = [
  'scout', 'scout', 'scout', 'scout', 'scout', 'scout', 'scout',
  'scout', 'scout', 'scout', 'scout', 'scout', 'scout', 'scout',
  'scout', 'scout', 'scout', 'scout', 'scout', 'scout',
  'fighter', 'fighter', 'fighter', 'heavy', 'heavy', 'heavy',
  'cruiser', 'cruiser', 'warship', 'redcarrier', 'destroyer',
];

/** The stationary fortress: just enough enemy interface to be shootable. */
class HubFortress {
  /** @param {THREE.Group} proto normalized leviathan model prototype */
  constructor(proto) {
    this.object3D = new THREE.Group();
    this.visual = proto.clone(true);
    this.object3D.add(this.visual);

    // This hull was exported with inverted winding: with front-face culling
    // it is invisible from outside. Render both sides (one mesh — cheap;
    // three.js flips the shading normal for back faces automatically).
    this.visual.traverse((child) => {
      if (!child.isMesh) return;
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      for (const m of mats) if (m) m.side = THREE.DoubleSide;
    });

    this.position = this.object3D.position;
    this.quaternion = this.object3D.quaternion;
    this.velocity = new THREE.Vector3(); // rams nudge it; nothing integrates it

    const b = proto.userData.shipBounds;
    this.radius = Math.max(b.length, b.width, b.height) / 2.4;

    this.id = 'leviathan-hub';
    this.type = 'leviathan';
    this.stats = {
      displayName: 'Obsidian Leviathan', level: 200, credits: 150000,
      resources: 150, apex: true, fireRange: 0,
    };
    this.hullMax = this.hull = HUB_HULL;
    this.shieldMax = this.shield = 0; // raw hull: damage always sticks
    this.alive = true;
    this.hitFlash = 0;

    // EnemyManager's origin-shift handler touches these on every enemy.
    this.homeCenter = new THREE.Vector3();
    this.waypoint = new THREE.Vector3();
    this.hardpoints = [];
  }

  getForward(target) { return target.set(0, 0, -1).applyQuaternion(this.quaternion); }
  getUp(target) { return target.set(0, 1, 0).applyQuaternion(this.quaternion); }
  get speed() { return 0; }

  applyDamage(amount) {
    if (!this.alive) return { shieldAbsorbed: 0, hullDamage: 0, destroyed: false };
    this.hull = Math.max(0, this.hull - amount);
    const destroyed = this.hull <= 0;
    if (destroyed) this.alive = false;
    return { shieldAbsorbed: 0, hullDamage: amount, destroyed };
  }

  // Enemy-interface no-ops: the fortress never moves, regens, or shoots.
  update() {}
  updateDefense() {}
  notifyHit() {}
  notifyNearMiss() {}
  refreshVisual() {}
  dispose() {}
}

export class Leviathan {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    // Render-space anchor (offset is zero at boot; onShift keeps it true).
    this.center = HUB_POSITION.clone();
    game.origin.onShift((delta) => this.center.sub(delta));

    /** @type {HubFortress|null} */
    this.hub = null;
    this.obstacle = null;
    /**
     * Planet-shaped adapter so the hyperdrive can lock/cycle/auto-drop on
     * the fortress exactly like a planet (B to lock, J to travel, arrive).
     * Null until the hub is built and after it falls.
     */
    this.navTarget = null;
    /** @type {import('./EnemyShip.js').EnemyShip[]} */
    this.guards = [];
    this._streamTimer = 0;
    this._mixCursor = 0;
    this._announced = false;
    this._fallen = false;
    this._filled = false;
    this._dir = new THREE.Vector3();
  }

  update(dt) {
    const game = this.game;
    if (this._fallen) return;

    if (!this.hub) {
      const proto = getEnemyModelProto('leviathan');
      if (!proto) return; // model still streaming in
      this._build(proto);
    }
    const hub = this.hub;

    // Destroyed? (CombatSystem already removed it from the manager.)
    if (!hub.alive || !game.enemies.enemies.includes(hub)) {
      this._onDestroyed();
      return;
    }

    const player = game.player;
    if (!player || !player.alive) return;

    // Prune guards that died or were despawned elsewhere.
    this.guards = this.guards.filter((g) => g.alive && game.enemies.enemies.includes(g));

    const dist = player.position.distanceTo(hub.position);
    if (dist > RELEASE_RANGE) {
      // Player left: stand the garrison down (and stop burning CPU on it).
      for (const g of this.guards) game.enemies.remove(g);
      this.guards.length = 0;
      this._announced = false;
      this._filled = false; // next visit re-fills the shell fast again
      return;
    }

    if (!this._announced && dist < ACTIVE_RANGE) {
      this._announced = true;
      game.events.emit('leviathan:contact');
    }

    // Missions are private fights — the stream holds while one is live.
    if (game.missions?.active) return;
    if (dist > ACTIVE_RANGE) return;

    if (this.guards.length >= GUARD_CAP) {
      if (!this._filled) { this._filled = true; this._streamTimer = STREAM_INTERVAL; }
      return;
    }
    this._streamTimer -= dt;
    if (this._streamTimer > 0) return;
    this._streamTimer = this._filled ? STREAM_INTERVAL : FILL_INTERVAL;
    this._launchGuard();
  }

  _build(proto) {
    const game = this.game;
    const hub = new HubFortress(proto);
    hub.position.copy(this.center);
    hub.homeCenter.copy(this.center);
    hub.waypoint.copy(this.center);
    game.engine.scene.add(hub.object3D);
    // In the enemy list: shootable, radar rim-arc (stats.apex), kill payout.
    game.enemies.enemies.push(hub);
    // In the obstacle list: AI steers around it, enemy bolts die on the hull.
    // (Player bolts test the enemy list FIRST, so the hub stays hittable.)
    this.obstacle = { position: hub.position, radius: hub.radius * 1.04 };
    game.obstacles.push(this.obstacle);
    // Hyperdrive destination: same shape the warp/HUD code reads off a
    // planet (group.position is the LIVE hub position — shifts included).
    this.navTarget = {
      group: { position: hub.position },
      radius: hub.radius,
      influenceRadius: 6000,
      descriptor: { name: '☠ OBSIDIAN LEVIATHAN' },
      leviathan: true,
    };
    this.hub = hub;
  }

  _launchGuard() {
    const game = this.game;
    const hub = this.hub;
    const type = STREAM_MIX[this._mixCursor % STREAM_MIX.length];
    this._mixCursor++;

    // Out of the fortress itself ("they come out of the ship"): surface
    // point, flying outward, then a shell slot — scouts screen far out, the
    // rest wrap the hull like a boreto, exactly like the player's fleet.
    this._dir.set(Math.random() - 0.5, (Math.random() - 0.5) * 0.7, Math.random() - 0.5);
    if (this._dir.lengthSq() < 1e-4) this._dir.set(0, 1, 0);
    this._dir.normalize();
    const spawnPos = hub.position.clone().addScaledVector(this._dir, hub.radius * 1.02);

    const scoutScreen = this._mixCursor % 5 === 0;
    const patrolRadius = scoutScreen
      ? hub.radius + 4200 + Math.random() * 2400
      : hub.radius + 400 + Math.random() * 1600;

    const guard = game.enemies.spawn(type, spawnPos, hub.position, patrolRadius);
    guard.hubGuard = true; // outside the ambient encounter/reinforcement economy
    guard.velocity.copy(this._dir).multiplyScalar(70);
    this.guards.push(guard);
  }

  _onDestroyed() {
    const game = this.game;
    this._fallen = true;
    const hub = this.hub;
    this.hub = null;

    // Cinematic chain of secondary blasts across the hull volume.
    if (game.explosions) {
      for (let i = 0; i < 14; i++) {
        this._dir.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
        if (this._dir.lengthSq() < 1e-4) this._dir.set(0, 1, 0);
        const p = hub.position.clone()
          .addScaledVector(this._dir.normalize(), Math.random() * hub.radius * 0.9);
        game.explosions.spawn(p, 2.6);
      }
    }

    // The garrison dies with its fortress.
    for (const g of this.guards) {
      if (g.alive && game.enemies.enemies.includes(g)) game.enemies.remove(g);
    }
    this.guards.length = 0;

    const i = game.obstacles.indexOf(this.obstacle);
    if (i !== -1) game.obstacles.splice(i, 1);
    this.obstacle = null;
    this.navTarget = null; // no more warp lock / nav marker

    game.events.emit('leviathan:destroyed');
  }
}

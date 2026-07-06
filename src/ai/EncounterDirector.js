import * as THREE from 'three';
import { Rng } from '../core/math/rng.js';
import { UNIVERSE_SEED } from '../world/constants.js';

/**
 * Encounter director: decides where and when hostiles appear.
 *
 * Design intent: exploration first, combat as punctuation. Enemies are
 * never sprinkled uniformly through space — they hold *territory*:
 *
 *  - guard squads around the richest discoveries (stations, caches,
 *    anomalies), so the best rewards are contested
 *  - pirate territories in a few deep-space volumes
 *  - contested planets with occasional orbital patrols
 *  - rare wandering patrols that cross a quiet flight path
 *
 * Discipline rules that keep encounters special:
 *  - global cap of 6 live enemies, ever
 *  - one squad per region, respawning only after a long cooldown once
 *    wiped — clearing a region buys real quiet
 *  - squads spawn 1.6–2.4 km out (outside detection range) and approach
 *    on patrol, so contacts emerge rather than materialize
 *  - enemies far behind the player despawn silently
 */

const GLOBAL_CAP = 10;
const SPAWN_MIN = 1000; // close enough that contacts appear on the overlay fast
const SPAWN_MAX = 1700;
const DESPAWN_RANGE = 14000;
const CHECK_INTERVAL = 2;

/** Squad composition by danger tier. */
const TIER_SQUADS = {
  1: ['scout', 'scout'],
  2: ['fighter', 'scout', 'scout'],
  3: ['heavy', 'fighter', 'fighter'],
  4: ['cruiser', 'fighter', 'fighter', 'scout'],
  5: ['destroyer', 'heavy', 'fighter'],
};

export class EncounterDirector {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.rng = new Rng(`${UNIVERSE_SEED}:encounters`);

    /**
     * @type {Array<{center: THREE.Vector3, radius: number, tier: number,
     *   cooldown: number, label: string}>}
     */
    this.regions = [];
    this._checkTimer = 0;
    this._ambientTimer = 0;
    this._dir = new THREE.Vector3();

    this._buildRegions();

    game.origin.onShift((delta) => {
      for (const region of this.regions) region.center.sub(delta);
    });
  }

  _buildRegions() {
    const game = this.game;
    const rng = this.rng;

    // Guard squads on high-value discoveries.
    if (game.poi) {
      for (const site of game.poi.sites) {
        if (site.kind === 'station') this._addRegion(site.position, 5000, 2, site.name);
        else if (site.kind === 'cache') this._addRegion(site.position, 4000, 3, site.name);
        else if (site.kind === 'anomaly') this._addRegion(site.position, 5000, 2, site.name);
      }
    }

    // Free-space pirate territories (more of them, and tougher).
    for (let i = 0; i < 5; i++) {
      const angle = rng.range(0, Math.PI * 2);
      const distance = rng.range(45000, 200000);
      this._addRegion(
        new THREE.Vector3(
          Math.cos(angle) * distance, rng.gaussian() * 6000, Math.sin(angle) * distance,
        ),
        11000,
        rng.chance(0.3) ? 4 : (rng.chance(0.5) ? 3 : 2),
        `territory ${i}`,
      );
    }

    // A single Planet Destroyer patrol far out — a late-game boss encounter.
    {
      const angle = rng.range(0, Math.PI * 2);
      const distance = rng.range(150000, 240000);
      this._addRegion(
        new THREE.Vector3(
          Math.cos(angle) * distance, rng.gaussian() * 8000, Math.sin(angle) * distance,
        ),
        14000, 5, 'Destroyer patrol',
      );
    }

    // Contested planets: orbital patrols around a third of the worlds.
    if (game.universe) {
      const contested = game.universe.planets.filter(() => rng.chance(0.35));
      for (const planet of contested) {
        this._addRegion(
          planet.group.position, // live reference not safe (shifts) — copy below
          planet.radius * 4,
          1,
          planet.descriptor.name,
          planet,
        );
      }
    }
  }

  _addRegion(center, radius, tier, label, planet = null) {
    this.regions.push({
      // Copy; if tied to a planet we re-sync from the planet each check
      // (planet group positions already handle origin shifts).
      center: center.clone(),
      planet,
      radius,
      tier,
      cooldown: 0,
      label,
    });
  }

  update(dt) {
    this._checkTimer -= dt;
    if (this._checkTimer > 0) return;
    this._checkTimer = CHECK_INTERVAL;

    const game = this.game;
    const player = game.player;
    const enemies = game.enemies;
    if (!player || !player.alive || !enemies) return;

    // Despawn stragglers the player has left behind.
    for (const enemy of [...enemies.enemies]) {
      if (enemy.position.distanceTo(player.position) > DESPAWN_RANGE) {
        enemies.remove(enemy);
      }
    }

    // Region bookkeeping: live counts + cooldowns.
    const liveTotal = enemies.enemies.length;
    for (const region of this.regions) {
      if (region.planet) region.center.copy(region.planet.group.position);
      if (region.cooldown > 0) region.cooldown -= CHECK_INTERVAL;
    }

    if (liveTotal >= GLOBAL_CAP) return;

    // One eligible region may deploy per check.
    for (const region of this.regions) {
      if (region.cooldown > 0) continue;
      const dist = player.position.distanceTo(region.center);
      if (dist > region.radius) continue;
      // Region already has forces in the field?
      const alive = enemies.enemies.filter((e) => e.region === region).length;
      if (alive > 0) continue;

      this._deploySquad(region);
      return;
    }

    // Ambient wandering patrol: keeps deep space from feeling empty. More
    // frequent than before (playtest: "flew for ages and saw no one").
    this._ambientTimer += CHECK_INTERVAL;
    const nearPlanet = game.universe?.playerContext.planet;
    if (liveTotal < 2 && !nearPlanet && this._ambientTimer > 30 && Math.random() < 0.16) {
      this._ambientTimer = 0;
      this._deploySquad({
        center: player.position, radius: 6000,
        tier: this.rng.chance(0.4) ? 2 : 1, cooldown: 0, label: 'wanderers',
      });
    }
  }

  _deploySquad(region) {
    const game = this.game;
    const player = game.player;
    const types = TIER_SQUADS[region.tier];

    // Spawn point: a ring around the player, biased toward the region
    // center so squads come from "their" space.
    const [x, y, z] = this.rng.unitVector();
    this._dir.set(x, y, z);
    const spawnCenter = player.position.clone()
      .addScaledVector(this._dir, this.rng.range(SPAWN_MIN, SPAWN_MAX));

    const squad = game.enemies.spawnSquad(spawnCenter, types, 220, region.radius * 0.4);
    for (const enemy of squad) {
      enemy.region = region;
      enemy.homeCenter.copy(region.center);
    }

    // Wiping the squad silences the region for minutes.
    region.cooldown = 160 + this.rng.range(0, 80);

    game.events.emit('combat:contact', { count: types.length, label: region.label });
  }
}

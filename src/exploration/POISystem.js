import * as THREE from 'three';
import { Rng } from '../core/math/rng.js';
import { clamp } from '../core/math/noise.js';
import { POI_BUILDERS } from './POIFactory.js';
import { generateSiteName } from '../world/names.js';
import { UNIVERSE_SEED } from '../world/constants.js';

/**
 * Points of interest: the reason to wander.
 *
 * Seeded generation scatters derelict stations, wrecked ships, orbiting
 * satellites, anomalies and asteroid-field caches across the system. Each
 * site has three ranges:
 *
 *   signal (6 km)    — "unknown signal" ping + radar blip appears
 *   visual (12 km)   — mesh instantiated (lazily; disposed when far)
 *   discovery (300m) — banner, reward, permanent discovery
 *
 * Rewards: salvage bursts for most sites; anomalies grant permanent ship
 * upgrades (engine/shield/weapon), the long-term progression loop.
 *
 * Emits 'poi:signal' and 'poi:discovered'.
 */

const SIGNAL_RANGE = 6000;
const BUILD_RANGE = 12000;
const DISCOVERY_RANGE = 300;

export class POISystem {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {Array<Site>} */
    this.sites = [];

    this._generate();

    game.origin.onShift((delta) => {
      for (const site of this.sites) {
        site.position.sub(delta);
        // Built meshes are repositioned every update, but that already ran
        // this frame — shift them too or they lag the world by one frame.
        if (site.built && site.inScene) site.built.group.position.sub(delta);
      }
    });
  }

  _generate() {
    const game = this.game;
    const rng = new Rng(`${UNIVERSE_SEED}:poi`);
    const planets = game.universe.planets;

    const addSite = (kind, position, reward, orbit = null) => {
      this.sites.push({
        id: `${kind}:${this.sites.length}`,
        kind,
        name: generateSiteName(rng, kind),
        position, // render-space (== absolute at boot)
        reward,
        orbit,
        discovered: false,
        signalSent: false,
        built: null,
        inScene: false,
      });
    };

    // Derelict stations in deep space between orbits.
    for (let i = 0; i < 2; i++) {
      const angle = rng.range(0, Math.PI * 2);
      const distance = rng.range(40000, 150000);
      addSite('station', new THREE.Vector3(
        Math.cos(angle) * distance, rng.gaussian() * 5000, Math.sin(angle) * distance,
      ), { resources: 30 });
    }

    // Wrecks drifting near random planets (2–4 radii out).
    for (let i = 0; i < 3; i++) {
      const planet = rng.pick(planets);
      const [x, y, z] = rng.unitVector();
      const offset = new THREE.Vector3(x, y, z)
        .multiplyScalar(planet.radius * rng.range(2, 4));
      addSite('wreck', planet.group.position.clone().add(offset), { resources: 18 });
    }

    // Satellites in orbit around planets with atmospheres.
    const orbitable = planets.filter((p) => p.descriptor.hasAtmosphere).slice(0, 4);
    for (const planet of orbitable) {
      addSite('satellite',
        planet.group.position.clone().add(new THREE.Vector3(planet.radius * 1.7, 0, 0)),
        { resources: 10 },
        {
          planet,
          radius: planet.radius * rng.range(1.5, 1.9),
          speed: rng.range(0.008, 0.02),
          phase: rng.range(0, Math.PI * 2),
          incline: rng.range(-0.4, 0.4),
        });
    }

    // Anomalies: far out, best rewards.
    const upgrades = ['engine', 'shield', 'weapon'];
    for (let i = 0; i < 3; i++) {
      const angle = rng.range(0, Math.PI * 2);
      const distance = rng.range(90000, 220000);
      addSite('anomaly', new THREE.Vector3(
        Math.cos(angle) * distance, rng.gaussian() * 9000, Math.sin(angle) * distance,
      ), { upgrade: upgrades[i % upgrades.length] });
    }

    // Caches tucked inside the outer asteroid fields.
    for (const field of game.asteroidFields.slice(1)) {
      const [x, y, z] = rng.unitVector();
      addSite('cache',
        field.center.clone().add(new THREE.Vector3(x, y, z).multiplyScalar(field.radius * 0.3)),
        { resources: 24 });
    }
  }

  /** Restore discovery state from a save. */
  restoreDiscovered(ids) {
    for (const site of this.sites) {
      if (ids.includes(site.id)) {
        site.discovered = true;
        site.signalSent = true;
      }
    }
  }

  update(dt, elapsed) {
    const game = this.game;
    const player = game.player;
    if (!player) return;

    for (const site of this.sites) {
      // Satellites ride their orbit (positions live in render space, so
      // deriving from the planet's shifting group handles origin rebases).
      if (site.orbit) {
        const orbit = site.orbit;
        const angle = orbit.phase + elapsed * orbit.speed;
        site.position.set(
          Math.cos(angle) * orbit.radius,
          Math.sin(angle * 0.7) * orbit.radius * Math.sin(orbit.incline) * 0.4,
          Math.sin(angle) * orbit.radius,
        ).add(orbit.planet.group.position);
      }

      const distSq = site.position.distanceToSquared(player.position);

      // Lazy mesh lifecycle: built once on first approach, then just
      // toggled in/out of the scene — geometry is never recreated, so
      // repeated visits cost nothing and leak nothing.
      if (distSq < BUILD_RANGE * BUILD_RANGE) {
        if (!site.built) site.built = POI_BUILDERS[site.kind]();
        if (!site.inScene) {
          site.inScene = true;
          this.game.engine.scene.add(site.built.group);
        }
        site.built.group.position.copy(site.position);
        site.built.animate(dt, elapsed);
      } else if (site.inScene) {
        site.inScene = false;
        this.game.engine.scene.remove(site.built.group);
      }

      // Signal ping.
      if (!site.signalSent && distSq < SIGNAL_RANGE * SIGNAL_RANGE) {
        site.signalSent = true;
        game.events.emit('poi:signal', site);
        game.audio.playTone({ type: 'sine', freq: 1180, freqEnd: 880, duration: 0.5, gain: 0.16 });
        game.audio.playTone({ type: 'sine', freq: 1770, freqEnd: 1320, duration: 0.5, gain: 0.08 });
      }

      // Discovery.
      if (!site.discovered && distSq < DISCOVERY_RANGE * DISCOVERY_RANGE) {
        this._discover(site);
      }

      // Gentle collision with big structures.
      if (site.inScene && (site.kind === 'station' || site.kind === 'wreck')) {
        this._collide(site, player);
      }
    }
  }

  _discover(site) {
    const game = this.game;
    site.discovered = true;

    let subtitle;
    if (site.reward.upgrade) {
      const player = game.player;
      player.upgrades[site.reward.upgrade] += 0.12;
      subtitle = `${site.reward.upgrade} systems enhanced`;
    } else {
      // Salvage scatters from the site for the player to sweep up.
      game.pickups.spawnBurst(site.position, site.reward.resources);
      subtitle = 'salvage released';
    }

    game.events.emit('poi:discovered', {
      site,
      title: site.name,
      subtitle: `${subtitle}`,
    });

    // Discovery fanfare: rising fifth.
    game.audio.playTone({ type: 'sine', freq: 523, duration: 0.7, gain: 0.22 });
    game.audio.playTone({ type: 'sine', freq: 784, duration: 0.9, gain: 0.18, attack: 0.15 });
  }

  _collide(site, player) {
    const minDist = site.built.radius + player.radius;
    const distSq = site.position.distanceToSquared(player.position);
    if (distSq >= minDist * minDist || distSq < 1e-6) return;

    const dist = Math.sqrt(distSq);
    const normal = this._normal.copy(player.position).sub(site.position).divideScalar(dist);
    player.position.addScaledVector(normal, minDist - dist + 0.5);
    const into = player.velocity.dot(normal);
    if (into < 0) {
      player.velocity.addScaledVector(normal, -into * 1.5);
      const impact = -into;
      if (impact > 20) {
        const damage = clamp((impact - 20) * 0.4, 4, 30);
        const result = player.applyDamage(damage);
        this.game.events.emit('player:hit', { damage });
        this.game.events.emit('camera:shake', 0.4);
        this.game.audio.playNoise({ duration: 0.4, gain: 0.4, filterFreq: 800, filterEnd: 100 });
        if (result.destroyed) {
          this.game.events.emit('ship:destroyed', { ship: player, byPlayer: false });
        }
      }
    }
  }

  _normal = new THREE.Vector3();
}

/**
 * @typedef {object} Site
 * @property {string} id stable identifier for persistence
 * @property {string} kind
 * @property {string} name
 * @property {THREE.Vector3} position render-space
 * @property {{resources?: number, upgrade?: string}} reward
 * @property {object|null} orbit satellite orbit params
 * @property {boolean} discovered
 * @property {boolean} signalSent
 * @property {{group: THREE.Group, radius: number, animate: Function}|null} built
 */

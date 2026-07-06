import * as THREE from 'three';
import { createTerrainSampler } from './terrainHeight.js';
import { QuadtreeSphere } from './terrain/QuadtreeSphere.js';
import { Atmosphere } from './Atmosphere.js';
import { Clouds } from './Clouds.js';
import { applyAtmosphericHaze } from './hazeShader.js';
import { clamp } from '../core/math/noise.js';

/**
 * A complete planet: LOD terrain, optional ocean, atmosphere shell, cloud
 * deck, and the shared per-planet uniforms (center, sun direction, haze)
 * that keep all of its materials in sync.
 *
 * The planet owns its terrain sampler, so collision queries
 * (`getAltitude`, `getSurfaceNormal`) are guaranteed to agree with the
 * rendered surface.
 */
export class Planet {
  /**
   * @param {import('../core/Game.js').Game} game
   * @param {import('./PlanetDescriptor.js').PlanetDescriptor} descriptor
   * @param {THREE.Vector3} absoluteCenter position in absolute universe coords
   */
  constructor(game, descriptor, absoluteCenter) {
    this.game = game;
    this.descriptor = descriptor;
    this.radius = descriptor.radius;

    this.group = new THREE.Group();
    // Render-space position (absolute minus current origin offset).
    this.group.position.copy(absoluteCenter).sub(game.origin.offset);
    game.engine.scene.add(this.group);

    /** Polar axis (tilted); drives biome latitude and could drive rings. */
    this.up = new THREE.Vector3(
      Math.sin(descriptor.axialTilt), Math.cos(descriptor.axialTilt), 0,
    ).normalize();

    this.sampler = createTerrainSampler(descriptor);

    /** Live planet→sun unit vector shared by all planet materials. */
    this.sunDir = new THREE.Vector3(0, 1, 0);

    /**
     * Slow planetary rotation → day/night cycle (bible ask). The terrain
     * mesh itself NEVER rotates (the collision samplers assume a static
     * local frame — rotating geometry would silently desync see-vs-hit).
     * Instead the sun direction sweeps around the polar axis: the terminator,
     * atmosphere, clouds and — via the Sun system — the ground lighting all
     * follow, which reads as the planet turning. Day length ≈ 9–16 real
     * minutes, deterministic per planet.
     */
    this.spinAngle = 0;
    this.spinRate = (Math.PI * 2) / (540 + (descriptor.radius % 7) * 60);

    this.hazeUniforms = {
      uHazeColor: { value: descriptor.hazeColor },
      uHazeDensity: { value: 0 },
      uPlanetCenter: { value: this.group.position },
      uSunDirPlanet: { value: this.sunDir },
    };

    // --- Terrain ---
    const terrainMaterial = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.94,
      metalness: 0.0,
    });
    if (descriptor.hasAtmosphere) {
      applyAtmosphericHaze(terrainMaterial, this.hazeUniforms);
    }
    this.terrain = new QuadtreeSphere({
      radius: this.radius,
      sampler: this.sampler,
      material: terrainMaterial,
      up: this.up,
    });
    this.group.add(this.terrain.group);

    // --- Ocean ---
    this.ocean = null;
    this.oceanLow = null;
    if (descriptor.hasOcean) {
      const oceanMaterial = new THREE.MeshStandardMaterial({
        color: descriptor.oceanColor,
        roughness: descriptor.oceanRoughness ?? 0.12,
        metalness: 0.0,
        transparent: true,
        opacity: 0.94,
        envMapIntensity: 1.2,
      });
      if (descriptor.hasAtmosphere) {
        applyAtmosphericHaze(oceanMaterial, this.hazeUniforms);
      }
      // Two LODs: dense sphere for surface flight, light one for orbit+.
      this.ocean = new THREE.Mesh(
        new THREE.SphereGeometry(this.radius + 0.5, 160, 110),
        oceanMaterial,
      );
      this.ocean.receiveShadow = true;
      this.ocean.visible = false;
      this.oceanLow = new THREE.Mesh(
        new THREE.SphereGeometry(this.radius + 0.5, 48, 32),
        oceanMaterial,
      );
      this.group.add(this.ocean, this.oceanLow);
    }

    // --- Atmosphere + clouds ---
    this.atmosphere = null;
    this.clouds = null;
    if (descriptor.hasAtmosphere) {
      this.atmosphere = new Atmosphere(descriptor, this.group.position, this.sunDir);
      this.group.add(this.atmosphere.mesh);
      if (descriptor.clouds) {
        this.clouds = new Clouds(descriptor, this.sunDir);
        this.group.add(this.clouds.mesh);
      }
    }

    // Register as a nav obstacle (AI avoidance + projectile occlusion).
    // The `planet` back-reference lets the weapon system fall through to a
    // precise terrain-altitude test instead of killing bolts at the padded
    // sphere — otherwise low-altitude combat would be impossible.
    game.obstacles.push({
      position: this.group.position,
      radius: this.radius + descriptor.relief * 2,
      planet: this,
    });

    game.origin.onShift((delta) => {
      this.group.position.sub(delta);
    });

    this._local = new THREE.Vector3();
    this._dir = new THREE.Vector3();
  }

  /** Outer radius including atmosphere (or relief for airless worlds). */
  get influenceRadius() {
    return this.radius + (this.descriptor.hasAtmosphere
      ? this.descriptor.atmosphereHeight
      : this.descriptor.relief);
  }

  /**
   * Signed altitude of a world-space point above the collidable surface
   * (terrain, or the ocean surface on water worlds).
   */
  getAltitude(worldPos) {
    this._local.copy(worldPos).sub(this.group.position);
    const dist = this._local.length();
    // Far away: spherical approximation, no noise sampling.
    if (dist > this.radius + this.descriptor.relief + 600) {
      return dist - this.radius;
    }
    this._dir.copy(this._local).divideScalar(dist);
    let ground = this.sampler.height(this._dir.x, this._dir.y, this._dir.z);
    if (this.descriptor.hasOcean) ground = Math.max(ground, 0.5);
    return dist - (this.radius + ground);
  }

  /**
   * Surface normal beneath a world-space point (radial over water).
   * @param {THREE.Vector3} worldPos
   * @param {THREE.Vector3} target
   */
  getSurfaceNormal(worldPos, target) {
    this._local.copy(worldPos).sub(this.group.position);
    this._dir.copy(this._local).normalize();
    if (this.descriptor.hasOcean) {
      const h = this.sampler.height(this._dir.x, this._dir.y, this._dir.z);
      if (h < 0.5) return target.copy(this._dir); // over water: radial
    }
    return this.sampler.normal(this._dir, 3, target);
  }

  /**
   * @param {number} dt
   * @param {number} elapsed
   * @param {THREE.Vector3} cameraWorldPos
   * @param {THREE.Vector3} sunRenderPos
   */
  update(dt, elapsed, cameraWorldPos, sunRenderPos) {
    // Planet→sun direction feeds atmosphere, clouds and haze tinting.
    // The spin offset makes the lit hemisphere sweep slowly around the
    // polar axis — the day/night cycle.
    this.spinAngle = (this.spinAngle + this.spinRate * dt) % (Math.PI * 2);
    this.sunDir.copy(sunRenderPos).sub(this.group.position).normalize()
      .applyAxisAngle(this.up, this.spinAngle);

    // Terrain LOD in planet-local space.
    this._local.copy(cameraWorldPos).sub(this.group.position);
    this.terrain.update(this._local);

    if (this.clouds) this.clouds.update(dt, elapsed);

    // Ocean LOD swap around 1.6 radii out.
    if (this.ocean) {
      const nearOcean = this._local.lengthSq() < (this.radius * 1.6) ** 2;
      if (this.ocean.visible !== nearOcean) {
        this.ocean.visible = nearOcean;
        this.oceanLow.visible = !nearOcean;
      }
    }

    // Aerial-perspective density from camera altitude: thick at the deck,
    // gone in orbit, with a faint floor so the day side reads hazy from
    // space.
    if (this.descriptor.hasAtmosphere) {
      const altitude = Math.max(0, this._local.length() - this.radius);
      const H = this.descriptor.atmosphereHeight * 0.85;
      const density = 1.5e-4 * this.descriptor.hazeDensity * Math.exp(-altitude / H);
      this.hazeUniforms.uHazeDensity.value = Math.max(density, 2e-6);
    }
  }

  /** Atmospheric density (0..1) at a world position, for flight physics. */
  getAtmosphereDensity(worldPos) {
    if (!this.descriptor.hasAtmosphere) return 0;
    const altitude = this.getAltitudeSpherical(worldPos);
    if (altitude > this.descriptor.atmosphereHeight * 1.5) return 0;
    return Math.exp(-Math.max(0, altitude) / (this.descriptor.atmosphereHeight * 0.35));
  }

  /** Cheap altitude above sea level (no terrain sampling). */
  getAltitudeSpherical(worldPos) {
    return this._local.copy(worldPos).sub(this.group.position).length() - this.radius;
  }
}

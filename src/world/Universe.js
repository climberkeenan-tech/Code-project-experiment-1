import * as THREE from 'three';
import { clamp, lerp, damp, smoothstep } from '../core/math/noise.js';

/**
 * The universe system: owns every planet and couples them to gameplay.
 *
 * Per frame it:
 *  - updates each planet (LOD, atmosphere uniforms, clouds)
 *  - finds the player's nearest planet → `playerContext` (consumed by the
 *    HUD, radar and audio)
 *  - applies gravity that ramps up on approach, plus atmospheric drag
 *  - scales the player's speed envelope: fighter-speed at the deck,
 *    cruise velocity in deep space — this is what makes planetfall
 *    seamless without any loading or mode switch
 *  - resolves ship-vs-terrain collisions for player and enemies
 *  - drives atmospheric-entry heat (HUD glow, rumble, shake) and the
 *    wind loop when inside an atmosphere
 *
 * Events: 'planet:entered' / 'planet:left' with the planet instance.
 */
export class Universe {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {import('./Planet.js').Planet[]} */
    this.planets = [];

    this.playerContext = {
      planet: null,
      altitude: Infinity,
      inAtmosphere: false,
      density: 0,
      /** True when the ship is resting on a surface, slow enough to disembark. */
      grounded: false,
      /** The planet the ship is grounded on (for on-foot spawning). */
      groundedPlanet: null,
    };

    this._gravity = new THREE.Vector3();
    this._normal = new THREE.Vector3();
    this._dir = new THREE.Vector3();
    this._entryHeatSmooth = 0;
    this._wind = null;
    this._speedScale = 1;
  }

  addPlanet(planet) {
    this.planets.push(planet);
    return planet;
  }

  update(dt, elapsed) {
    const game = this.game;
    const cameraPos = game.engine.camera.position;
    const sunPos = game.sun ? game.sun.position : ZERO;
    this._updateSystemTransit(dt);

    for (const planet of this.planets) {
      planet.update(dt, elapsed, cameraPos, planet.starRender ?? sunPos);
    }

    this._updatePlayer(dt);
    this._updateEnemies(dt);
  }

  _nearestPlanet(position) {
    let nearest = null;
    let nearestAltitude = Infinity;
    for (const planet of this.planets) {
      const altitude = planet.getAltitudeSpherical(position);
      if (altitude < nearestAltitude) {
        nearestAltitude = altitude;
        nearest = planet;
      }
    }
    return nearest;
  }

  _updatePlayer(dt) {
    const game = this.game;
    const player = game.player;
    if (!player) return;

    const context = this.playerContext;
    const planet = this._nearestPlanet(player.position);

    if (!planet) {
      player.gravity.set(0, 0, 0);
      return;
    }

    // Precise altitude only when near enough to matter.
    const sphericalAlt = planet.getAltitudeSpherical(player.position);
    const altitude = sphericalAlt < planet.descriptor.relief + 900
      ? planet.getAltitude(player.position)
      : sphericalAlt;

    const wasInAtmosphere = context.inAtmosphere;
    const density = planet.getAtmosphereDensity(player.position);

    context.planet = altitude < planet.radius * 3 ? planet : null;
    context.altitude = altitude;
    context.density = density;
    context.inAtmosphere = density > 0.02;

    if (context.inAtmosphere !== wasInAtmosphere) {
      game.events.emit(context.inAtmosphere ? 'planet:entered' : 'planet:left', planet);
    }

    // --- Gravity: inverse-square, fading out past ~3 radii ---
    const R = planet.radius;
    const distToCenter = R + Math.max(altitude, 0);
    const falloff = (R / distToCenter) ** 2;
    const fade = smoothstep(R * 3, R * 1.5, Math.max(altitude, 0));
    const g = planet.descriptor.gravity * falloff * fade;
    this._dir.copy(planet.group.position).sub(player.position).normalize();
    player.gravity.copy(this._dir).multiplyScalar(g);

    // --- Atmospheric drag ---
    if (density > 0.001) {
      player.velocity.multiplyScalar(Math.exp(-density * 0.22 * dt));
    }

    // --- Environment speed scaling: the seamless-scale trick ---
    const targetScale = clamp(Math.max(altitude, 0) / 700, 1, 24);
    this._speedScale = lerp(this._speedScale, targetScale, damp(1.8, dt));
    player.envSpeedScale = this._speedScale;

    // --- Atmospheric entry heat ---
    const speed01 = clamp(player.speed / 520, 0, 1.25);
    const entryBand = density * (1 - density) * 4; // peaks mid-atmosphere
    const heat = clamp(speed01 * entryBand * smoothstep(0.35, 1, speed01), 0, 1);
    this._entryHeatSmooth = lerp(this._entryHeatSmooth, heat, damp(3, dt));
    game.entryHeat = this._entryHeatSmooth;
    if (this._entryHeatSmooth > 0.08) {
      game.events.emit('camera:shake', this._entryHeatSmooth * 0.05);
    }

    // --- Wind audio inside atmospheres ---
    this._updateWind(density, player.speed);

    // --- Terrain collision ---
    if (altitude < player.radius && player.alive) {
      this._resolveGroundHit(player, planet, altitude, true);
    }

    // --- Landed check: resting on a surface at a COMPLETE stop ---
    // (No atmosphere requirement: airless worlds are walkable too. You can't
    // hop out of a ship that's still moving — per playtest.)
    const grounded = context.planet !== null
      && !player.statMult?.noLanding // the flagship never touches down
      && altitude < player.radius + 8
      && player.speed < 2
      && player.alive;
    if (grounded !== context.grounded) {
      context.grounded = grounded;
      context.groundedPlanet = grounded ? planet : null;
      game.events.emit(grounded ? 'player:can-disembark' : 'player:cannot-disembark', planet);
    }
  }

  _resolveGroundHit(ship, planet, altitude, isPlayer) {
    const game = this.game;

    planet.getSurfaceNormal(ship.position, this._normal);
    this._dir.copy(ship.position).sub(planet.group.position).normalize();

    // De-penetrate radially.
    ship.position.addScaledVector(this._dir, ship.radius - altitude + 0.2);

    const into = ship.velocity.dot(this._normal);
    if (into < 0) {
      // Gentle touchdown → the ship SETTLES: velocity dies completely, no
      // bounce, no sliding (playtest: "full stop when you land").
      const tangential = Math.sqrt(Math.max(0, ship.velocity.lengthSq() - into * into));
      if (isPlayer && -into < 14 && tangential < 24) {
        ship.velocity.set(0, 0, 0);
        return;
      }
      // Hard contact: reflect the inward component with a little restitution;
      // the tangential component survives → fast ships skim and slide.
      ship.velocity.addScaledVector(this._normal, -into * 1.3);

      // Autopilot touchdowns are always damage-free (playtest fix).
      if (isPlayer && ship.autolanding) return;

      const impact = -into;
      if (impact > 26) {
        const damage = (impact - 26) * 0.55;
        const result = ship.applyDamage(damage);
        if (isPlayer) {
          game.events.emit('player:hit', { damage });
          game.events.emit('camera:shake', clamp(impact / 120, 0.2, 0.9));
          game.audio.playNoise({ duration: 0.5, gain: 0.55, filterFreq: 800, filterEnd: 70 });
        }
        if (result.destroyed) {
          game.events.emit('ship:destroyed', { ship, byPlayer: false });
        }
      } else if (isPlayer && impact > 6) {
        // Firm landing bump.
        game.events.emit('camera:shake', 0.12);
        game.audio.playNoise({ duration: 0.2, gain: 0.2, filterFreq: 500, filterEnd: 100 });
      }
    }
  }

  /**
   * Which star system is the player in? Crossing to a new nearest star
   * (with 20% hysteresis) fires the Leaving/Entering popups.
   */
  _updateSystemTransit(dt) {
    const systems = this.game.starSystems;
    if (!systems || systems.length < 2) return;
    this._transitTimer = (this._transitTimer ?? 0) - dt;
    if (this._transitTimer > 0) return;
    this._transitTimer = 1;
    const p = this.game.player.position;
    let nearest = systems[0];
    let nearestSq = Infinity;
    for (const sys of systems) {
      const d = sys.render.distanceToSquared(p);
      if (d < nearestSq) { nearestSq = d; nearest = sys; }
    }
    if (!this._currentSystem) { this._currentSystem = nearest; return; }
    if (nearest !== this._currentSystem
      && nearestSq < this._currentSystem.render.distanceToSquared(p) * 0.64) {
      this.game.events.emit('system:entered', {
        name: nearest.name, from: this._currentSystem.name,
      });
      this._currentSystem = nearest;
    }
  }

  _updateEnemies(dt) {
    const enemies = this.game.enemies;
    if (!enemies) return;
    // Copy: a lethal ground impact removes the enemy mid-iteration.
    for (const enemy of [...enemies.enemies]) {
      if (!enemy.alive) continue;
      for (const planet of this.planets) {
        // Cheap reject before any noise sampling. Terrain layers can stack
        // past `relief` (it scales the layers rather than capping them),
        // so the reject band is 2× relief to clear the tallest summits.
        const spherical = planet.getAltitudeSpherical(enemy.position);
        if (spherical > planet.descriptor.relief * 2 + 60) continue;
        const altitude = planet.getAltitude(enemy.position);
        if (altitude < enemy.radius) {
          this._resolveGroundHit(enemy, planet, altitude, false);
        }
      }
    }
  }

  _updateWind(density, speed) {
    const audio = this.game.audio;
    if (!audio.ready) return;
    if (!this._wind) {
      this._wind = audio.createLoop({ bus: 'ambient', filterFreq: 400, gain: 0 });
      if (!this._wind) return;
    }
    const t = audio.time;
    const gain = density > 0.01
      ? clamp(density * clamp(speed / 240, 0, 1.2), 0, 1) * 0.5
      : 0;
    this._wind.gain.gain.setTargetAtTime(gain, t, 0.25);
    this._wind.filter.frequency.setTargetAtTime(300 + clamp(speed, 0, 900) * 4, t, 0.25);
  }
}

const ZERO = new THREE.Vector3();

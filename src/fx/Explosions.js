import * as THREE from 'three';
import { ObjectPool } from '../core/ObjectPool.js';
import { getGlowTexture } from './textures.js';
import { clamp } from '../core/math/noise.js';

/**
 * Pooled ship-destruction explosions.
 *
 * Each explosion instance layers four cheap elements:
 *   1. a core flash sprite (HDR, blooms hard, collapses fast)
 *   2. a fireball of CPU-animated point particles (orange → ember fade)
 *   3. a handful of fast white-hot sparks
 *   4. an expanding shockwave ring sprite
 *
 * ~40 particles per explosion; with the pool capped at 8 concurrent
 * explosions the whole system costs a fraction of a millisecond.
 */

const FIREBALL_COUNT = 26;
const SPARK_COUNT = 14;
const DURATION = 1.35;

export class Explosions {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    const glowTex = getGlowTexture(128, 2.0);

    this.pool = new ObjectPool(
      () => this._createInstance(glowTex),
      (instance) => {
        instance.root.visible = false;
      },
      4,
    );
    this.pool.free.forEach((instance) => game.engine.scene.add(instance.root));

    game.events.on('ship:destroyed', ({ ship, byPlayer }) => {
      const scale = clamp(ship.radius / 2.2, 0.9, 3.2); // beefier per playtest
      this.spawn(ship.position, scale);
    });

    game.origin.onShift((delta) => {
      this.pool.forEachActive((instance) => instance.root.position.sub(delta));
    });
  }

  _createInstance(glowTex) {
    const root = new THREE.Group();
    root.visible = false;

    // 1. Core flash.
    const flash = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex,
      color: new THREE.Color(6, 3.2, 1.4),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    root.add(flash);

    // 2 + 3. Fireball + sparks share one Points geometry; sparks are the
    // tail entries with higher speeds and whiter color.
    const total = FIREBALL_COUNT + SPARK_COUNT;
    const positions = new Float32Array(total * 3);
    const colors = new Float32Array(total * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const points = new THREE.Points(geometry, new THREE.PointsMaterial({
      map: glowTex,
      size: 3.2,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    }));
    points.frustumCulled = false;
    root.add(points);

    // 4. Shockwave ring: a flat glow sprite stretched thin.
    const ring = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex,
      color: new THREE.Color(1.4, 1.1, 0.7),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.6,
    }));
    root.add(ring);

    return {
      root,
      flash,
      points,
      ring,
      velocities: new Float32Array(total * 3),
      time: 0,
      scale: 1,
    };
  }

  /**
   * @param {THREE.Vector3} position world position
   * @param {number} [scale] 1 = fighter-sized
   */
  spawn(position, scale = 1) {
    const instance = this.pool.acquire();
    if (!instance.root.parent) this.game.engine.scene.add(instance.root);

    instance.root.position.copy(position);
    instance.root.visible = true;
    instance.time = 0;
    instance.scale = scale;

    // Seed particle velocities: fireball slow & clumpy, sparks fast.
    const positions = instance.points.geometry.getAttribute('position');
    const colors = instance.points.geometry.getAttribute('color');
    const velocities = instance.velocities;
    const total = FIREBALL_COUNT + SPARK_COUNT;
    for (let i = 0; i < total; i++) {
      const isSpark = i >= FIREBALL_COUNT;
      // Random direction (cube-rejection is overkill here; normalize noise).
      let x = Math.random() * 2 - 1;
      let y = Math.random() * 2 - 1;
      let z = Math.random() * 2 - 1;
      const inv = 1 / Math.max(0.2, Math.hypot(x, y, z));
      const speed = (isSpark ? 55 + Math.random() * 65 : 10 + Math.random() * 26) * scale;
      velocities[i * 3] = x * inv * speed;
      velocities[i * 3 + 1] = y * inv * speed;
      velocities[i * 3 + 2] = z * inv * speed;
      positions.setXYZ(i, 0, 0, 0);
      if (isSpark) colors.setXYZ(i, 3.5, 3.2, 2.6);
      else colors.setXYZ(i, 2.6, 1.1, 0.3);
    }
    positions.needsUpdate = true;
    colors.needsUpdate = true;

    instance.flash.scale.setScalar(0.1);
    instance.flash.material.opacity = 1;
    instance.ring.scale.setScalar(0.1);
    instance.ring.material.opacity = 0.6;

    // Audio: distance-attenuated boom (deep thump + noise burst).
    const dist = this.game.player
      ? position.distanceTo(this.game.player.position)
      : 0;
    const gain = clamp(1 - dist / 2800, 0, 1);
    if (gain > 0.02) {
      this.game.audio.playNoise({
        duration: 1.1, gain: gain * 0.55, filterFreq: 2600, filterEnd: 60, attack: 0.005,
      });
      this.game.audio.playTone({
        type: 'sine', freq: 110, freqEnd: 32, duration: 0.9, gain: gain * 0.4,
      });
    }

    // Nearby blasts rattle the camera.
    this.game.events.emit('camera:shake', clamp(1 - dist / 900, 0, 1) * 0.55 * scale);
  }

  update(dt) {
    this.pool.forEachActive((instance) => {
      instance.time += dt;
      const t = instance.time / DURATION;
      if (t >= 1) {
        this.pool.release(instance);
        return;
      }

      // Flash: violent expansion then rapid collapse.
      const flashT = Math.min(1, instance.time / 0.22);
      instance.flash.scale.setScalar(
        (2 + flashT * 14) * instance.scale,
      );
      instance.flash.material.opacity = Math.max(0, 1 - flashT) ** 1.4;

      // Ring: steady expansion, linear fade.
      instance.ring.scale.setScalar((1 + t * 40) * instance.scale);
      instance.ring.material.opacity = 0.6 * (1 - t);

      // Particles: integrate with drag; embers dim over life.
      const positions = instance.points.geometry.getAttribute('position');
      const velocities = instance.velocities;
      const drag = Math.exp(-1.6 * dt);
      const total = FIREBALL_COUNT + SPARK_COUNT;
      for (let i = 0; i < total; i++) {
        velocities[i * 3] *= drag;
        velocities[i * 3 + 1] *= drag;
        velocities[i * 3 + 2] *= drag;
        positions.array[i * 3] += velocities[i * 3] * dt;
        positions.array[i * 3 + 1] += velocities[i * 3 + 1] * dt;
        positions.array[i * 3 + 2] += velocities[i * 3 + 2] * dt;
      }
      positions.needsUpdate = true;
      instance.points.material.opacity = 1 - t * t;
      instance.points.material.size = (3.2 + t * 2.5) * instance.scale;
    });
  }
}

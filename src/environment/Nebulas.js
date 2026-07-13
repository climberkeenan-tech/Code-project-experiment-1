import * as THREE from 'three';
import { SimplexNoise } from '../core/math/noise.js';
import { Rng } from '../core/math/rng.js';

/**
 * Deep-sky dressing: nebulas and distant galaxies.
 *
 * Both are camera-following billboards at "optical infinity" (like the
 * starfield), textured with canvases painted once at startup:
 *  - nebulas: multi-octave simplex clouds with hue-shifted cores
 *  - galaxies: two-arm logarithmic spirals stippled with soft dots
 *
 * Additive blending over the starfield gives the sky depth without any
 * texture downloads or per-frame cost beyond a position copy.
 */
export class Nebulas {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.group = new THREE.Group();
    game.engine.scene.add(this.group);

    const rng = new Rng('deep-sky');

    // --- Nebulas ---
    const nebulaPalettes = [
      { r: 0.55, g: 0.25, b: 0.75 }, // violet
      { r: 0.2, g: 0.5, b: 0.7 }, // teal
      { r: 0.65, g: 0.25, b: 0.45 }, // magenta rose
      { r: 0.2, g: 0.3, b: 0.75 }, // deep blue
      { r: 0.7, g: 0.4, b: 0.25 }, // ember
    ];
    for (let i = 0; i < 5; i++) {
      const palette = nebulaPalettes[i % nebulaPalettes.length];
      const texture = createNebulaTexture(`nebula:${i}`, palette);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: rng.range(0.16, 0.3),
      }));
      const [x, y, z] = rng.unitVector();
      sprite.position.set(x, y, z).multiplyScalar(1.30e6);
      sprite.scale.setScalar(rng.range(3.6e5, 7.5e5));
      this.group.add(sprite);
    }

    // --- Galaxies ---
    for (let i = 0; i < 4; i++) {
      const texture = createGalaxyTexture(`galaxy:${i}`);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: rng.range(0.5, 0.8),
      }));
      const [x, y, z] = rng.unitVector();
      sprite.position.set(x, y, z).multiplyScalar(1.34e6);
      sprite.scale.setScalar(rng.range(5e4, 1.1e5));
      sprite.material.rotation = rng.range(0, Math.PI * 2);
      this.group.add(sprite);
    }

    this.group.renderOrder = -99; // just after the starfield

    // Camera-followers update before the origin rebase runs; shift with
    // the world so there's never a one-frame offset of the whole sky.
    game.origin.onShift((delta) => this.group.position.sub(delta));
  }

  _collectSprites() {
    const out = [];
    this.group?.traverse?.((o) => {
      if (o.isSprite) out.push({ material: o.material, base: o.material.opacity });
    });
    return out;
  }

  update() {
    // Nebulas wash out inside a daylit atmosphere, same as the stars.
    const daylight = this.game?.sun?.daylight ?? 0;
    for (const s of this._fadeSprites ?? (this._fadeSprites = this._collectSprites())) {
      s.material.opacity = s.base * (1 - daylight * 0.95);
    }
    this.group.position.copy(this.game.engine.camera.position);
  }
}

/** Paint an fBm cloud blob with a brighter core and soft alpha edges. */
function createNebulaTexture(seed, palette) {
  const size = 192;
  const noise = new SimplexNoise(seed);
  const rng = new Rng(seed);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(size, size);

  const offsetX = rng.range(0, 100);
  const offsetY = rng.range(0, 100);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = x / size - 0.5;
      const ny = y / size - 0.5;
      const radial = Math.max(0, 1 - Math.hypot(nx, ny) * 2.2);

      // Domain-warped fBm for wispy structure.
      const warp = noise.fbm(nx * 3 + offsetX, ny * 3 + offsetY, 0, 3);
      let cloud = noise.fbm(
        nx * 4 + warp * 0.9 + offsetX,
        ny * 4 + warp * 0.9 + offsetY,
        7.3,
        5,
      );
      cloud = Math.max(0, cloud * 0.5 + 0.5 - 0.28);

      const intensity = cloud * radial;
      const core = Math.pow(radial, 3) * cloud * 1.6;
      const i = (y * size + x) * 4;
      image.data[i] = Math.min(255, (palette.r * intensity + core * 0.9) * 255);
      image.data[i + 1] = Math.min(255, (palette.g * intensity + core * 0.8) * 255);
      image.data[i + 2] = Math.min(255, (palette.b * intensity + core * 0.9) * 255);
      image.data[i + 3] = Math.min(255, intensity * 340);
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Paint a two-arm spiral galaxy with a warm core. */
function createGalaxyTexture(seed) {
  const size = 128;
  const rng = new Rng(seed);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const center = size / 2;

  ctx.globalCompositeOperation = 'lighter';

  // Core.
  const core = ctx.createRadialGradient(center, center, 0, center, center, size * 0.16);
  core.addColorStop(0, 'rgba(255, 240, 214, 0.9)');
  core.addColorStop(1, 'rgba(255, 240, 214, 0)');
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, size, size);

  // Arms: stippled logarithmic spirals.
  const tilt = rng.range(0.55, 1); // ellipse squash = viewing angle
  for (let arm = 0; arm < 2; arm++) {
    const phase = arm * Math.PI + rng.range(-0.2, 0.2);
    for (let t = 0.4; t < 3.4 * Math.PI; t += 0.05) {
      const r = 2.6 * Math.exp(0.23 * t);
      if (r > center * 0.95) break;
      const jitterR = r + rng.range(-2.5, 2.5);
      const x = center + Math.cos(t + phase) * jitterR;
      const y = center + Math.sin(t + phase) * jitterR * tilt;
      const alpha = 0.10 * (1 - r / center);
      const dot = ctx.createRadialGradient(x, y, 0, x, y, 3.6);
      dot.addColorStop(0, `rgba(200, 215, 255, ${alpha})`);
      dot.addColorStop(1, 'rgba(200, 215, 255, 0)');
      ctx.fillStyle = dot;
      ctx.fillRect(x - 4, y - 4, 8, 8);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

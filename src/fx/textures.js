import * as THREE from 'three';

/**
 * Procedural texture atlas for effects.
 *
 * All FX textures (glows, particles, plumes, streaks) are generated once on
 * a canvas at startup and shared across every effect instance — zero image
 * assets and zero duplicate GPU uploads.
 */

const cache = new Map();

/**
 * Soft radial glow: white core fading to transparent.
 * @param {number} size texture resolution
 * @param {number} falloff 1 = linear halo, higher = tighter core
 */
export function getGlowTexture(size = 128, falloff = 2.2) {
  const key = `glow:${size}:${falloff}`;
  if (cache.has(key)) return cache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(size, size);
  const half = size / 2;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (x - half + 0.5) / half;
      const dy = (y - half + 0.5) / half;
      const d = Math.min(1, Math.sqrt(dx * dx + dy * dy));
      const a = Math.pow(Math.max(0, 1 - d), falloff);
      const i = (y * size + x) * 4;
      image.data[i] = 255;
      image.data[i + 1] = 255;
      image.data[i + 2] = 255;
      image.data[i + 3] = Math.round(a * 255);
    }
  }
  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, texture);
  return texture;
}

/**
 * Elongated exhaust plume gradient: bright at the nozzle (top of texture),
 * fading down its length, soft across its width.
 */
export function getPlumeTexture(size = 128) {
  const key = `plume:${size}`;
  if (cache.has(key)) return cache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    const along = y / (size - 1); // 0 at nozzle → 1 at tail
    const lengthFade = Math.pow(1 - along, 1.7);
    for (let x = 0; x < size; x++) {
      const across = Math.abs(x / (size - 1) - 0.5) * 2;
      const widthFade = Math.pow(Math.max(0, 1 - across), 2.4);
      const i = (y * size + x) * 4;
      const a = lengthFade * widthFade;
      image.data[i] = 255;
      image.data[i + 1] = 255;
      image.data[i + 2] = 255;
      image.data[i + 3] = Math.round(a * 255);
    }
  }
  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, texture);
  return texture;
}

/**
 * Thin bright streak with a hot core — used for laser bolts.
 */
export function getBoltTexture(size = 64) {
  const key = `bolt:${size}`;
  if (cache.has(key)) return cache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    const along = Math.abs(y / (size - 1) - 0.5) * 2;
    const lengthFade = Math.pow(Math.max(0, 1 - along), 0.7);
    for (let x = 0; x < size; x++) {
      const across = Math.abs(x / (size - 1) - 0.5) * 2;
      const core = Math.pow(Math.max(0, 1 - across), 4.0);
      const halo = Math.pow(Math.max(0, 1 - across), 1.6) * 0.5;
      const i = (y * size + x) * 4;
      image.data[i] = 255;
      image.data[i + 1] = 255;
      image.data[i + 2] = 255;
      image.data[i + 3] = Math.round(Math.min(1, core + halo) * lengthFade * 255);
    }
  }
  ctx.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, texture);
  return texture;
}

import * as THREE from 'three';
import { Rng } from '../core/math/rng.js';

/**
 * Distant starfield: thousands of point stars on a far sphere that follows
 * the camera (no parallax — these are light-years away), with a denser
 * "galactic band" tilted across the sky, subtle per-star color temperature
 * and gentle twinkle.
 *
 * Rendered with a custom points shader so each star controls its own size
 * and color; includes the log-depth chunks to coexist with the engine's
 * logarithmic depth buffer.
 */

const VERT = /* glsl */ `
  #include <common>
  #include <logdepthbuf_pars_vertex>
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    // Slow per-star twinkle: two incommensurate sines look organic.
    float tw = 0.78
      + 0.14 * sin(uTime * 1.7 + aPhase * 13.0)
      + 0.08 * sin(uTime * 3.3 + aPhase * 29.0);
    vAlpha = tw;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * tw;
    #include <logdepthbuf_vertex>
  }
`;

const FRAG = /* glsl */ `
  #include <common>
  #include <logdepthbuf_pars_fragment>
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    #include <logdepthbuf_fragment>
    // Soft round point.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    float a = smoothstep(1.0, 0.25, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * vAlpha, a);
  }
`;

/** Star color palette by "temperature" — cool red through hot blue-white. */
const STAR_COLORS = [
  [1.0, 0.72, 0.55], // K/M orange
  [1.0, 0.85, 0.7], // G warm white
  [1.0, 0.97, 0.9], // F white
  [0.85, 0.9, 1.0], // A blue-white
  [0.65, 0.78, 1.0], // B blue
];

export class Starfield {
  /**
   * @param {import('../core/Game.js').Game} game
   * @param {object} [opts]
   */
  constructor(game, { starCount = 5200, bandCount = 2800, radius = 1.4e6 } = {}) {
    this.game = game;
    const rng = new Rng('starfield');
    const total = starCount + bandCount;

    const positions = new Float32Array(total * 3);
    const sizes = new Float32Array(total);
    const colors = new Float32Array(total * 3);
    const phases = new Float32Array(total);

    // Galactic band orientation: a tilted great circle.
    const bandNormal = new THREE.Vector3(0.35, 0.85, 0.4).normalize();
    const bandU = new THREE.Vector3(1, 0, 0).cross(bandNormal).normalize();
    const bandV = new THREE.Vector3().crossVectors(bandNormal, bandU);

    const v = new THREE.Vector3();
    for (let i = 0; i < total; i++) {
      if (i < starCount) {
        // Uniform sky coverage.
        const [x, y, z] = rng.unitVector();
        v.set(x, y, z);
      } else {
        // Band stars: hug the galactic plane with gaussian spread.
        const angle = rng.range(0, Math.PI * 2);
        const spread = rng.gaussian() * 0.09;
        v.copy(bandU).multiplyScalar(Math.cos(angle))
          .addScaledVector(bandV, Math.sin(angle))
          .addScaledVector(bandNormal, spread)
          .normalize();
      }
      positions[i * 3] = v.x * radius;
      positions[i * 3 + 1] = v.y * radius;
      positions[i * 3 + 2] = v.z * radius;

      // Size distribution: mostly faint, a scattering of bright beacons.
      const magnitude = Math.pow(rng.next(), 3);
      sizes[i] = 1.0 + magnitude * 3.4 + (rng.chance(0.01) ? 2.2 : 0);

      const tint = STAR_COLORS[rng.int(0, STAR_COLORS.length - 1)];
      const brightness = 0.5 + magnitude * 0.7;
      colors[i * 3] = tint[0] * brightness;
      colors[i * 3 + 1] = tint[1] * brightness;
      colors[i * 3 + 2] = tint[2] * brightness;

      phases[i] = rng.next();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(geometry, this.material);
    this.points.frustumCulled = false; // always surrounds the camera
    this.points.renderOrder = -100; // draw first, behind everything
    game.engine.scene.add(this.points);

    // Stay glued to the camera through floating-origin rebases (the camera
    // shifts after this system's update has already run for the frame).
    game.origin.onShift((delta) => this.points.position.sub(delta));
  }

  update(dt, elapsed) {
    // Follow the camera exactly: stars are at optical infinity.
    this.points.position.copy(this.game.engine.camera.position);
    this.material.uniforms.uTime.value = elapsed;
    this.material.uniforms.uPixelRatio.value = this.game.engine.renderer.getPixelRatio();
  }
}

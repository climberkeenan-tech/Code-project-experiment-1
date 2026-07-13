import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

/**
 * Subtle photographic grade applied after tone mapping (LDR sRGB space):
 * a touch of saturation and a gentle smoothstep S-curve. Without it the
 * ACES output reads slightly pastel/washed — "game", not "photo".
 */
const ColorGradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uSaturation: { value: 1.14 },
    uCurve: { value: 0.22 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uSaturation;
    uniform float uCurve;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 x = clamp(mix(vec3(l), c.rgb, uSaturation), 0.0, 1.0);
      vec3 curved = x * x * (3.0 - 2.0 * x);
      gl_FragColor = vec4(mix(x, curved, uCurve), c.a);
    }
  `,
};

/**
 * Rendering engine and frame loop.
 *
 * Owns the WebGL renderer, scene, camera and the HDR post-processing chain
 * (linear half-float render → bloom → tone map + sRGB output).
 *
 * Key renderer choices for this game:
 *  - `logarithmicDepthBuffer`: the camera sees from 0.1 units (cockpit) to
 *    ~2,000,000 units (distant planets). A classic depth buffer would
 *    z-fight catastrophically across that range.
 *  - Half-float composer target with MSAA: gives HDR headroom for bloom and
 *    antialiasing without a separate FXAA pass.
 *  - ACES tone mapping in the OutputPass for filmic highlight rolloff.
 */
export class Engine {
  /** @param {HTMLCanvasElement} canvas */
  constructor(canvas) {
    this.canvas = canvas;
    this.isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
      || (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.userAgent)); // iPadOS masquerades as Mac

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false, // MSAA happens on the composer target instead
      logarithmicDepthBuffer: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      68,
      window.innerWidth / window.innerHeight,
      0.1,
      2_000_000,
    );

    // --- Post-processing chain ---
    const target = new THREE.WebGLRenderTarget(1, 1, {
      type: THREE.HalfFloatType,
      samples: this.isMobile ? 2 : 4,
    });
    this.composer = new EffectComposer(this.renderer, target);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(512, 512),
      0.65, // strength
      0.5, // radius
      0.85, // threshold — only genuinely bright pixels bloom
    );
    this.outputPass = new OutputPass();
    this.gradePass = new ShaderPass(ColorGradeShader);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(this.outputPass);
    this.composer.addPass(this.gradePass);

    /**
     * Dynamic resolution: effective pixel ratio = min(devicePixelRatio, cap)
     * × resolutionScale. The QualityManager tunes the scale at runtime to
     * hold frame rate.
     */
    this.pixelRatioCap = 2;
    this.resolutionScale = this.isMobile ? 0.85 : 1.0;

    /** @type {Array<(dt: number, elapsed: number) => void>} */
    this.updateCallbacks = [];

    this.elapsed = 0;
    this._lastTime = -1;
    this._running = false;

    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
    // iOS fires orientationchange without resize in some cases.
    window.addEventListener('orientationchange', this._onResize);

    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.warn('[Engine] WebGL context lost');
    });
    canvas.addEventListener('webglcontextrestored', () => {
      console.warn('[Engine] WebGL context restored');
      this._applySize();
    });

    this._applySize();
  }

  /** Register a per-frame update callback. */
  onUpdate(callback) {
    this.updateCallbacks.push(callback);
  }

  /** Adjust render resolution at runtime (called by QualityManager). */
  setResolutionScale(scale) {
    if (Math.abs(scale - this.resolutionScale) < 0.01) return;
    this.resolutionScale = scale;
    this._applySize();
  }

  _applySize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, this.pixelRatioCap) * this.resolutionScale;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setPixelRatio(ratio);
    this.renderer.setSize(width, height, false);
    this.composer.setPixelRatio(ratio);
    this.composer.setSize(width, height);
  }

  _onResize() {
    // Some mobile browsers report stale dimensions immediately after
    // orientation change; re-measure on the next frame as well.
    this._applySize();
    requestAnimationFrame(() => this._applySize());
  }

  start() {
    if (this._running) return;
    this._running = true;
    this._lastTime = -1;
    this.renderer.setAnimationLoop((timeMs) => this._tick(timeMs));
  }

  stop() {
    this._running = false;
    this.renderer.setAnimationLoop(null);
  }

  _tick(timeMs) {
    // Clamp dt: after a tab-switch or GC hitch, simulate at most 50ms so
    // physics never explodes.
    const dt = this._lastTime < 0 ? 1 / 60 : Math.min((timeMs - this._lastTime) / 1000, 0.05);
    this._lastTime = timeMs;
    this.elapsed += dt;

    for (const callback of this.updateCallbacks) {
      callback(dt, this.elapsed);
    }

    this.composer.render();
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('orientationchange', this._onResize);
    this.composer.dispose();
    this.renderer.dispose();
  }
}

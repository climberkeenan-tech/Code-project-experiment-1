import * as THREE from 'three';

/**
 * Energy-shield impact visual: an invisible fresnel bubble around a ship
 * that flashes when hit, brightest around the impact point.
 *
 * The impact point is stored in *ship-local* space, so the highlight rides
 * the hull through rotation and survives floating-origin rebases. One
 * low-poly sphere per ship (geometry cached by radius); the shader is
 * additive and log-depth aware. Cost when idle: one uniform check.
 */

const VERT = /* glsl */ `
  #include <common>
  #include <logdepthbuf_pars_vertex>
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  void main() {
    vNormal = normalize(mat3(modelMatrix) * normal);
    vObjPos = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
    #include <logdepthbuf_vertex>
  }
`;

const FRAG = /* glsl */ `
  #include <common>
  #include <logdepthbuf_pars_fragment>
  uniform vec3 uColor;
  uniform float uFlash;
  uniform vec3 uHitPos; // ship-local space
  uniform float uRadius;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  void main() {
    #include <logdepthbuf_fragment>
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - abs(dot(viewDir, normalize(vNormal))), 2.4);
    // Local brightening around the impact point.
    float d = distance(vObjPos, uHitPos) / uRadius;
    float impact = exp(-d * d * 5.0);
    float intensity = uFlash * (fresnel * 0.85 + impact * 1.6);
    gl_FragColor = vec4(uColor * intensity, intensity);
  }
`;

/** Bubble geometry cache keyed by rounded radius. */
const geometryCache = new Map();

function getBubbleGeometry(radius) {
  const key = Math.round(radius * 10);
  if (!geometryCache.has(key)) {
    geometryCache.set(key, new THREE.IcosahedronGeometry(radius, 2));
  }
  return geometryCache.get(key);
}

export class ShieldEffect {
  /**
   * @param {THREE.Object3D} parent ship object to attach to
   * @param {number} radius bubble radius
   * @param {THREE.Color} [color]
   */
  constructor(parent, radius, color = new THREE.Color(0.45, 0.8, 1.6)) {
    this.radius = radius;
    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uColor: { value: color },
        uFlash: { value: 0 },
        uHitPos: { value: new THREE.Vector3() },
        uRadius: { value: radius },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.FrontSide,
    });
    this.mesh = new THREE.Mesh(getBubbleGeometry(radius), this.material);
    this.mesh.visible = false;
    parent.add(this.mesh);

    this._localHit = new THREE.Vector3();
  }

  /**
   * Trigger the flash.
   * @param {THREE.Vector3} worldHitPoint impact location in world space
   * @param {number} [strength]
   */
  flash(worldHitPoint, strength = 1) {
    this.material.uniforms.uFlash.value = Math.min(
      1.2, this.material.uniforms.uFlash.value + strength,
    );
    // Convert to ship-local so the highlight tracks the hull.
    this._localHit.copy(worldHitPoint);
    this.mesh.parent.worldToLocal(this._localHit);
    this.material.uniforms.uHitPos.value.copy(this._localHit);
    this.mesh.visible = true;
  }

  update(dt) {
    const uniform = this.material.uniforms.uFlash;
    if (uniform.value <= 0.01) {
      if (this.mesh.visible) this.mesh.visible = false;
      return;
    }
    uniform.value *= Math.exp(-5.5 * dt);
  }

  /** Release per-instance GPU resources (geometry is shared, kept). */
  dispose() {
    this.material.dispose();
    if (this.mesh.parent) this.mesh.parent.remove(this.mesh);
  }
}

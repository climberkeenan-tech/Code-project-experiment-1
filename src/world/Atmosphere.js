import * as THREE from 'three';

/**
 * Atmospheric scattering shell.
 *
 * A back-side sphere at the top of the atmosphere, raymarched in the
 * fragment shader with a compact single-scattering model (8 samples,
 * per-channel extinction). It produces, from one shader:
 *  - the thin blue limb seen from orbit
 *  - a full sky dome once the camera descends into the shell
 *  - orange/red terminator light at sunrise/sunset angles
 *  - additive glow that never occludes stars completely
 *
 * Terrain "aerial perspective" (haze over distant ground) is handled
 * separately in the terrain material — see hazeShader.js — because the
 * shell only shades pixels where sky is actually visible.
 */

const VERT = /* glsl */ `
  #include <common>
  #include <logdepthbuf_pars_vertex>
  varying vec3 vWorldPos;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
    #include <logdepthbuf_vertex>
  }
`;

const FRAG = /* glsl */ `
  #include <common>
  #include <logdepthbuf_pars_fragment>
  uniform vec3 uPlanetCenter;
  uniform float uPlanetRadius;
  uniform float uAtmoRadius;
  uniform vec3 uSunDir;        // direction FROM planet TOWARD the sun
  uniform vec3 uScatter;       // per-channel scattering coefficients
  uniform float uIntensity;
  varying vec3 vWorldPos;

  // Ray-sphere intersection; returns (tNear, tFar) or (-1, -1) on miss.
  vec2 raySphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float disc = b * b - c;
    if (disc < 0.0) return vec2(-1.0);
    float s = sqrt(disc);
    return vec2(-b - s, -b + s);
  }

  void main() {
    #include <logdepthbuf_fragment>

    vec3 ro = cameraPosition;
    vec3 rd = normalize(vWorldPos - ro);

    vec2 tAtmo = raySphere(ro, rd, uPlanetCenter, uAtmoRadius);
    if (tAtmo.y < 0.0) discard;
    float tNear = max(tAtmo.x, 0.0);
    float tFar = tAtmo.y;

    // Stop the march at the ground.
    vec2 tGround = raySphere(ro, rd, uPlanetCenter, uPlanetRadius);
    if (tGround.x > 0.0) tFar = min(tFar, tGround.x);
    if (tFar <= tNear) discard;

    float thickness = uAtmoRadius - uPlanetRadius;
    float scaleH = thickness * 0.30; // density e-folding height

    const int STEPS = 8;
    float stepLen = (tFar - tNear) / float(STEPS);
    vec3 p = ro + rd * (tNear + stepLen * 0.5);

    vec3 inscatter = vec3(0.0);
    float viewDepth = 0.0;

    for (int i = 0; i < STEPS; i++) {
      float h = length(p - uPlanetCenter) - uPlanetRadius;
      float density = exp(-max(h, 0.0) / scaleH);
      float segment = density * stepLen / thickness;
      viewDepth += segment;

      vec3 up = normalize(p - uPlanetCenter);
      float sunHeight = dot(up, uSunDir);
      // Twilight band: light dies smoothly past the terminator.
      float sunVis = smoothstep(-0.30, 0.12, sunHeight);
      // Approximate optical depth toward the sun: long path at grazing
      // angles → per-channel extinction → red sunsets for free.
      float sunPath = density * (1.15 - sunHeight) * 2.2;
      vec3 sunAtten = exp(-uScatter * sunPath * 3.0);

      inscatter += sunVis * sunAtten * segment;
      p += rd * stepLen;
    }

    // Rayleigh-ish phase: slightly brighter looking toward/away from sun.
    float cosTheta = dot(rd, uSunDir);
    float phase = 0.72 + 0.35 * cosTheta * cosTheta;

    // View-path extinction keeps the far limb from over-saturating.
    vec3 viewAtten = exp(-uScatter * viewDepth * 1.4);

    vec3 color = uScatter * inscatter * phase * viewAtten * uIntensity * 3.2;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export class Atmosphere {
  /**
   * @param {import('./PlanetDescriptor.js').PlanetDescriptor} descriptor
   * @param {THREE.Vector3} planetCenterUniformTarget shared live vector
   * @param {THREE.Vector3} sunDirUniformTarget shared live vector
   */
  constructor(descriptor, planetCenterUniformTarget, sunDirUniformTarget) {
    const atmoRadius = descriptor.radius + descriptor.atmosphereHeight;

    this.material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uPlanetCenter: { value: planetCenterUniformTarget },
        uPlanetRadius: { value: descriptor.radius },
        uAtmoRadius: { value: atmoRadius },
        uSunDir: { value: sunDirUniformTarget },
        uScatter: { value: descriptor.scatterColor },
        uIntensity: { value: 0.75 },
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(atmoRadius, 48, 32),
      this.material,
    );
    // The shell is huge and always "visible" when nearby; skip culling
    // churn (the sphere's bounding volume handles the far case poorly
    // because the camera is often inside it).
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 2;
  }
}

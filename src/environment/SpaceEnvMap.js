import * as THREE from 'three';

/**
 * Procedural environment map for PBR reflections.
 *
 * Metallic hulls and specular oceans need *something* to reflect. Rather
 * than an expensive realtime cubemap, we render a tiny synthetic "space"
 * scene (deep gradient, a bright sun disc, a few nebula-tinted patches)
 * once at startup through PMREMGenerator. The result feeds
 * `scene.environment`, giving every standard material believable
 * reflections for the cost of a single 256px prefiltered texture.
 *
 * @param {THREE.WebGLRenderer} renderer
 * @param {THREE.Vector3} sunDirection direction *toward* the sun
 * @returns {THREE.Texture}
 */
export function createSpaceEnvironment(renderer, sunDirection) {
  const scene = new THREE.Scene();

  // Deep-space gradient sphere: near-black with a violet-blue cast, viewed
  // from the inside.
  const skyGeom = new THREE.SphereGeometry(50, 24, 16);
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        float h = vDir.y * 0.5 + 0.5;
        vec3 bottom = vec3(0.004, 0.005, 0.012);
        vec3 top = vec3(0.010, 0.014, 0.030);
        vec3 color = mix(bottom, top, h);
        // Faint violet band across the "galactic plane".
        float band = exp(-abs(vDir.y + 0.15) * 6.0);
        color += vec3(0.020, 0.012, 0.030) * band;
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
  scene.add(new THREE.Mesh(skyGeom, skyMat));

  // The sun: a small very bright sphere — dominates specular highlights.
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(2.4, 16, 12),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(28, 24, 18) }),
  );
  sun.position.copy(sunDirection).normalize().multiplyScalar(40);
  scene.add(sun);

  // A couple of dim colored patches so reflections aren't purely monochrome.
  const patchMat1 = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.05, 0.02, 0.09) });
  const patch1 = new THREE.Mesh(new THREE.SphereGeometry(8, 8, 6), patchMat1);
  patch1.position.set(-30, 10, -25);
  scene.add(patch1);

  const patchMat2 = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.02, 0.05, 0.07) });
  const patch2 = new THREE.Mesh(new THREE.SphereGeometry(6, 8, 6), patchMat2);
  patch2.position.set(25, -14, 20);
  scene.add(patch2);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(scene, 0.04).texture;

  // Cleanup: the source scene is single-use.
  skyGeom.dispose();
  skyMat.dispose();
  sun.geometry.dispose();
  sun.material.dispose();
  patch1.geometry.dispose();
  patchMat1.dispose();
  patch2.geometry.dispose();
  patchMat2.dispose();
  pmrem.dispose();

  return envMap;
}

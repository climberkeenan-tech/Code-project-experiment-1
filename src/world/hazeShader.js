/**
 * Aerial-perspective haze injection for standard materials.
 *
 * The atmosphere shell (Atmosphere.js) only shades sky pixels; the ground
 * itself must fade toward the horizon color with distance or planets look
 * like vacuum-sealed dioramas. This helper patches a MeshStandardMaterial
 * via onBeforeCompile to blend fragment color toward a per-planet haze
 * tint using:
 *
 *   haze = 1 - exp(-distance × density)
 *
 * where density is driven per-frame from the camera's altitude (thick near
 * the surface, vanishing in orbit) and the tint dims/reddens through the
 * day-night terminator.
 */

/**
 * @param {import('three').Material} material material to patch
 * @param {object} uniforms shared uniform refs owned by the Planet:
 *   uHazeColor {value: THREE.Color}
 *   uHazeDensity {value: number}    effective density, set per-frame
 *   uPlanetCenter {value: THREE.Vector3} render-space center
 *   uSunDirPlanet {value: THREE.Vector3} planet→sun direction
 */
export function applyAtmosphericHaze(material, uniforms) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uHazeColor = uniforms.uHazeColor;
    shader.uniforms.uHazeDensity = uniforms.uHazeDensity;
    shader.uniforms.uPlanetCenter = uniforms.uPlanetCenter;
    shader.uniforms.uSunDirPlanet = uniforms.uSunDirPlanet;

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying vec3 vHazeWorldPos;',
      )
      .replace(
        '#include <worldpos_vertex>',
        `#include <worldpos_vertex>
        vHazeWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying vec3 vHazeWorldPos;
        uniform vec3 uHazeColor;
        uniform float uHazeDensity;
        uniform vec3 uPlanetCenter;
        uniform vec3 uSunDirPlanet;`,
      )
      .replace(
        '#include <dithering_fragment>',
        `{
          float hazeDist = distance(vHazeWorldPos, cameraPosition);
          float haze = 1.0 - exp(-hazeDist * uHazeDensity);
          // Day factor at the fragment: haze glows on the day side, goes
          // dark across the terminator, with a warm band in between.
          vec3 up = normalize(vHazeWorldPos - uPlanetCenter);
          float day = dot(up, uSunDirPlanet);
          float dayFactor = clamp(day * 1.6 + 0.5, 0.0, 1.0);
          vec3 sunsetTint = vec3(0.9, 0.45, 0.22);
          float sunsetBand = smoothstep(0.35, 0.0, abs(day - 0.05)) * 0.85;
          vec3 hazeTint = mix(uHazeColor, sunsetTint, sunsetBand) * dayFactor;
          // Cap so terrain never fully dissolves into the sky color.
          gl_FragColor.rgb = mix(gl_FragColor.rgb, hazeTint, clamp(haze, 0.0, 0.88));
        }
        #include <dithering_fragment>`,
      );
  };
  // Distinct programs per haze-patched material.
  material.customProgramCacheKey = () => 'atmospheric-haze';
}

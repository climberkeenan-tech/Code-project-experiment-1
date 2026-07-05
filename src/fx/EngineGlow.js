import * as THREE from 'three';
import { getGlowTexture, getPlumeTexture } from './textures.js';

/**
 * Engine exhaust visuals for one ship: a camera-facing glow sprite plus a
 * crossed-plane plume per nozzle. Plume length and brightness track
 * throttle, stretch hard under boost, and flicker subtly so the exhaust
 * feels alive.
 *
 * Everything is additive-blended and depth-read-only, so exhausts layer
 * correctly with the world without sorting artifacts.
 */
export class EngineGlow {
  /**
   * @param {THREE.Group} shipGroup group to attach to (ship space)
   * @param {THREE.Vector3[]} anchors nozzle positions in ship space
   * @param {THREE.Color} color HDR glow color
   */
  constructor(shipGroup, anchors, color) {
    this.units = [];

    // The exhaust disc meshes carry the full HDR color; sprites and plumes
    // use a toned-down copy so bloom doesn't swallow the ship's silhouette.
    const softColor = color.clone().multiplyScalar(0.4);

    const spriteMat = new THREE.SpriteMaterial({
      map: getGlowTexture(128, 2.4),
      color: softColor,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });

    const plumeMat = new THREE.MeshBasicMaterial({
      map: getPlumeTexture(128),
      color: softColor,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Plume geometry: unit plane, origin at the nozzle edge, extending +Z
    // (rearward). Scaled per-frame along Z for length.
    const plumeGeom = new THREE.PlaneGeometry(1, 1);
    plumeGeom.rotateX(-Math.PI / 2); // lie along Z
    plumeGeom.translate(0, 0, 0.5); // pivot at nozzle

    for (const anchor of anchors) {
      const unit = new THREE.Group();
      unit.position.copy(anchor);

      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.setScalar(1.4);
      unit.add(sprite);

      const planeA = new THREE.Mesh(plumeGeom, plumeMat);
      const planeB = new THREE.Mesh(plumeGeom, plumeMat);
      planeB.rotation.z = Math.PI / 2;
      unit.add(planeA, planeB);

      shipGroup.add(unit);
      this.units.push({ unit, sprite, planeA, planeB, phase: Math.random() * 10 });
    }
  }

  /**
   * @param {number} throttle01 forward thrust amount [0, 1]
   * @param {number} boost01 boost blend [0, 1]
   * @param {number} time elapsed seconds (for flicker)
   */
  update(throttle01, boost01, time) {
    // Idle engines still glow faintly — a parked ship reads as powered.
    const power = 0.16 + throttle01 * 0.6 + boost01 * 0.75;
    for (const { unit, sprite, planeA, planeB, phase } of this.units) {
      const flicker = 1 + Math.sin(time * 31 + phase) * 0.06 + Math.sin(time * 57 + phase * 2) * 0.04;
      const p = power * flicker;
      sprite.scale.setScalar(0.9 + p * 1.1);
      const length = 0.4 + p * 4.2 + boost01 * 3.0;
      const width = 0.35 + p * 0.5;
      planeA.scale.set(width, 1, length);
      planeB.scale.set(width, 1, length);
      unit.visible = p > 0.02;
    }
  }
}

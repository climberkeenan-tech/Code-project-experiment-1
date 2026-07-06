import * as THREE from 'three';
import { getGlowTexture } from '../fx/textures.js';
import { SUN_POSITION, SUN_RADIUS } from '../world/constants.js';

/**
 * The system's star: the single real light source in the game.
 *
 * Three parts:
 *  - a DirectionalLight whose direction tracks sun→player every frame, so
 *    planets near the player are lit correctly (day/night, sunsets);
 *    it also carries the game's one shadow camera, a tight box around the
 *    player for ship-and-nearby-terrain shadows (cheap on mobile)
 *  - an HDR emissive disc at the sun's world position (blooms hard)
 *  - additive glow sprites for corona falloff
 */
export class Sun {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;

    // Render-space position (absolute minus origin offset, maintained via
    // shift subscription).
    this.position = SUN_POSITION.clone();

    this.light = new THREE.DirectionalLight(0xfff0dc, 3.4);
    this.light.castShadow = true;
    this.light.shadow.mapSize.set(1024, 1024);
    const shadowCam = this.light.shadow.camera;
    shadowCam.left = -60;
    shadowCam.right = 60;
    shadowCam.top = 60;
    shadowCam.bottom = -60;
    shadowCam.near = 1;
    shadowCam.far = 400;
    this.light.shadow.bias = -0.0006;
    this.light.shadow.normalBias = 0.5;
    game.engine.scene.add(this.light);
    game.engine.scene.add(this.light.target);

    // Faint cool fill so unlit sides read as starlit, not void-black.
    this.fill = new THREE.HemisphereLight(0x21293c, 0x0a0c12, 0.55);
    game.engine.scene.add(this.fill);

    // The disc: HDR emissive so tone mapping + bloom render a convincing star.
    this.disc = new THREE.Mesh(
      new THREE.SphereGeometry(SUN_RADIUS, 24, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(14, 11, 7.5), fog: false }),
    );
    this.disc.position.copy(this.position);
    game.engine.scene.add(this.disc);

    // Corona: two nested additive sprites.
    const glowTex = getGlowTexture(256, 1.6);
    this.corona = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex,
      color: new THREE.Color(0.9, 0.65, 0.35),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    this.corona.scale.setScalar(SUN_RADIUS * 3.4);
    this.corona.position.copy(this.position);
    game.engine.scene.add(this.corona);

    this.coronaInner = new THREE.Sprite(new THREE.SpriteMaterial({
      map: getGlowTexture(256, 3.2),
      color: new THREE.Color(3.2, 2.4, 1.3),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    this.coronaInner.scale.setScalar(SUN_RADIUS * 1.9);
    this.coronaInner.position.copy(this.position);
    game.engine.scene.add(this.coronaInner);

    this._sunDir = new THREE.Vector3();

    game.origin.onShift((delta) => {
      this.position.sub(delta);
      this.disc.position.copy(this.position);
      this.corona.position.copy(this.position);
      this.coronaInner.position.copy(this.position);
    });
  }

  /** Direction from the sun toward a point (i.e. the light's travel dir). */
  getLightDirection(target, point) {
    return target.copy(point).sub(this.position).normalize();
  }

  update() {
    const player = this.game.player;
    if (!player) return;

    // Keep the directional light + shadow box centered on the player.
    this.getLightDirection(this._sunDir, player.position);

    // Day/night: near a planet, rotate the light by that planet's spin so
    // the ground lighting agrees with its (rotated) atmosphere terminator —
    // stand on the surface and the sun genuinely crosses the sky.
    const nearPlanet = this.game.universe?.playerContext?.planet;
    if (nearPlanet) {
      this._sunDir.applyAxisAngle(nearPlanet.up, nearPlanet.spinAngle);
    }

    this.light.position.copy(player.position).addScaledVector(this._sunDir, -180);
    this.light.target.position.copy(player.position);
  }
}

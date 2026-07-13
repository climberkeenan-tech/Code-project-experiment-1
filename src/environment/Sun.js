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
    // Desktop gets a 2K map — leaf shadows need the texel density; the
    // mobile GPU budget keeps the original 1K.
    const shadowRes = game.engine.isMobile ? 1024 : 2048;
    this.light.shadow.mapSize.set(shadowRes, shadowRes);
    const shadowCam = this.light.shadow.camera;
    // Box widened to ±90 so the much larger flagship (≈100u) still casts and
    // receives its own shadow without clipping at the frustum edge.
    shadowCam.left = -90;
    shadowCam.right = 90;
    shadowCam.top = 90;
    shadowCam.bottom = -90;
    shadowCam.near = 1;
    shadowCam.far = 500;
    this.light.shadow.bias = -0.0006;
    this.light.shadow.normalBias = 0.5;
    game.engine.scene.add(this.light);
    game.engine.scene.add(this.light.target);

    // Ambient fill: faint cool starlight in space, blended toward bright
    // SKYLIGHT near an atmosphere world's day side (update()) — without it,
    // every shadowed leaf and trunk renders blue-black (playtest: "the
    // trees are blue and black").
    this.fill = new THREE.HemisphereLight(0x21293c, 0x0a0c12, 0.55);
    game.engine.scene.add(this.fill);
    this._spaceSky = new THREE.Color(0x21293c);
    this._spaceGround = new THREE.Color(0x0a0c12);
    this._daySky = new THREE.Color(0xa8bdd6);
    this._dayGround = new THREE.Color(0x5c5a40);
    this._upTmp = new THREE.Vector3();

    // The disc: HDR emissive so tone mapping + bloom render a convincing star.
    this.disc = new THREE.Mesh(
      new THREE.SphereGeometry(SUN_RADIUS, 24, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(8.5, 6.7, 4.6), fog: false }) // dimmed per playtest (glare),
    );
    this.disc.position.copy(this.position);
    game.engine.scene.add(this.disc);

    // Corona: two nested additive sprites.
    const glowTex = getGlowTexture(256, 1.6);
    this.corona = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex,
      color: new THREE.Color(0.62, 0.45, 0.24), // dimmed per playtest
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    this.corona.scale.setScalar(SUN_RADIUS * 3.4);
    this.corona.position.copy(this.position);
    game.engine.scene.add(this.corona);

    this.coronaInner = new THREE.Sprite(new THREE.SpriteMaterial({
      map: getGlowTexture(256, 3.2),
      color: new THREE.Color(2.1, 1.6, 0.85), // dimmed per playtest
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }));
    this.coronaInner.scale.setScalar(SUN_RADIUS * 1.9);
    this.coronaInner.position.copy(this.position);
    game.engine.scene.add(this.coronaInner);

    // Neighbouring systems get their own visible star (disc + coronas share
    // the home star's geometry/materials). The DirectionalLight and shadow
    // rig follow whichever star is NEAREST the player.
    this.extraStars = [];
    for (const sys of (game.starSystems ?? []).slice(1)) {
      const disc = new THREE.Mesh(this.disc.geometry, this.disc.material);
      const corona = new THREE.Sprite(this.corona.material);
      corona.scale.copy(this.corona.scale);
      const coronaInner = new THREE.Sprite(this.coronaInner.material);
      coronaInner.scale.copy(this.coronaInner.scale);
      game.engine.scene.add(disc, corona, coronaInner);
      this.extraStars.push({ sys, disc, corona, coronaInner });
    }

    this._sunDir = new THREE.Vector3();
    this._nearest = new THREE.Vector3();

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

    // Grow the shadow box to fit very large hulls (the Aethelred's radius is
    // ~115); normal ships keep the tight ±90 box for sharp shadows. Only
    // recomputes the projection when the required size actually changes.
    const half = Math.max(90, player.radius * 1.5);
    const shadowCam = this.light.shadow.camera;
    if (shadowCam.right !== half) {
      shadowCam.left = -half;
      shadowCam.right = half;
      shadowCam.top = half;
      shadowCam.bottom = -half;
      shadowCam.far = Math.max(500, 240 + half * 2);
      shadowCam.updateProjectionMatrix();
    }

    // Extra-system stars ride their (origin-shifted) system anchors.
    let nearestPos = this.position;
    let nearestSq = this.position.distanceToSquared(player.position);
    for (const star of this.extraStars) {
      star.disc.position.copy(star.sys.render);
      star.corona.position.copy(star.sys.render);
      star.coronaInner.position.copy(star.sys.render);
      const d = star.sys.render.distanceToSquared(player.position);
      if (d < nearestSq) { nearestSq = d; nearestPos = star.sys.render; }
    }

    // Keep the directional light + shadow box centered on the player, lit
    // from the NEAREST system's star.
    this._sunDir.copy(player.position).sub(nearestPos).normalize();

    // Day/night: near a planet, rotate the light by that planet's spin so
    // the ground lighting agrees with its (rotated) atmosphere terminator —
    // stand on the surface and the sun genuinely crosses the sky.
    const nearPlanet = this.game.universe?.playerContext?.planet;
    if (nearPlanet) {
      this._sunDir.applyAxisAngle(nearPlanet.up, nearPlanet.spinAngle);
    }

    this.light.position.copy(player.position).addScaledVector(this._sunDir, -180);
    this.light.target.position.copy(player.position);

    // Planetary daylight ambience: inside an atmosphere on the day side the
    // sky itself is a strong light source. Fades with altitude and across
    // the terminator, so space and night keep the dim starlight fill.
    let ambience = 0;
    const ctx = this.game.universe?.playerContext;
    if (nearPlanet?.descriptor.hasAtmosphere && ctx) {
      const inAtmo = Math.max(0, 1 - ctx.altitude / (nearPlanet.descriptor.atmosphereHeight * 1.2));
      this._upTmp.copy(player.position).sub(nearPlanet.group.position).normalize();
      const day = Math.max(0, Math.min(1, this._upTmp.dot(nearPlanet.sunDir) * 1.5 + 0.35));
      ambience = Math.min(1, inAtmo) * day;
    }
    this.fill.color.copy(this._spaceSky).lerp(this._daySky, ambience);
    this.fill.groundColor.copy(this._spaceGround).lerp(this._dayGround, ambience);
    this.fill.intensity = 0.55 + ambience * 0.85;
    /** 0 = deep space/night … 1 = full daylight; Starfield/Nebulas fade on it. */
    this.daylight = ambience;
  }
}

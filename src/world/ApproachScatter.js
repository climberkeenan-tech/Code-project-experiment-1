import * as THREE from 'three';
import { SurfaceScatter } from '../onfoot/SurfaceScatter.js';

/**
 * Low-altitude surface dressing (playtest: "trees are not visible from
 * space / while flying"). When the ship flies below the vegetation ceiling
 * over a planet, a SurfaceScatter (trees, grass, ore rocks) is built at the
 * point under the ship and rebuilt as the ship moves on, so descents and
 * low passes fly over living terrain instead of bare ground.
 *
 * The on-foot controller adopts the current patch when the player disembarks
 * inside it (no double forests, no pop), and this system rebuilds naturally
 * after boarding. Patches are parented to the planet group, so floating-origin
 * shifts are inherited.
 */

const CEILING = 1500; // build below this altitude
const TEARDOWN = 2200; // dispose above this (hysteresis so it doesn't thrash)
const REBUILD_DIST = 300; // rebuild when the ship strays this far from center

export class ApproachScatter {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    /** @type {SurfaceScatter|null} */
    this.scatter = null;
    this.planet = null;
    this._center = new THREE.Vector3(); // render-space patch center
    this._dir = new THREE.Vector3();
    this._point = new THREE.Vector3();
    game.approach = this;
  }

  update() {
    const game = this.game;
    if (game.mode !== 'flight') return; // on-foot owns its own scatter

    const ctx = game.universe?.playerContext;
    const planet = ctx?.planet;
    const player = game.player;

    // Tear down when leaving the band / planet.
    if (this.scatter && (!planet || planet !== this.planet || ctx.altitude > TEARDOWN)) {
      this.scatter.dispose();
      this.scatter = null;
      this.planet = null;
      return;
    }

    if (!planet || ctx.altitude > CEILING || !player?.alive) return;

    // Surface point directly below the ship, projected onto the terrain.
    this._dir.copy(player.position).sub(planet.group.position).normalize();
    this._point.copy(planet.group.position).addScaledVector(this._dir, planet.radius);
    const alt = planet.getAltitude(this._point);
    this._point.addScaledVector(this._dir, -alt);

    if (!this.scatter) {
      this.scatter = new SurfaceScatter(game, planet, this._point);
      this.planet = planet;
      this._center.copy(this._point);
    } else if (this._point.distanceTo(this._center) > REBUILD_DIST) {
      // Moved on: rebuild the patch under the new position.
      this.scatter.dispose();
      this.scatter = new SurfaceScatter(game, planet, this._point);
      this._center.copy(this._point);
    }
  }

  /** The on-foot controller takes ownership of the live patch on disembark. */
  adopt() {
    const s = this.scatter;
    this.scatter = null;
    this.planet = null;
    return s;
  }
}

import { Engine } from './Engine.js';
import { EventBus } from './EventBus.js';
import { Input } from './Input.js';
import { AudioEngine } from './AudioEngine.js';
import { FloatingOrigin } from './FloatingOrigin.js';
import { QualityManager } from './QualityManager.js';

/**
 * Top-level game orchestrator.
 *
 * Owns the shared services (engine, events, input, audio, floating origin,
 * quality) and an ordered list of gameplay systems. Each system is a plain
 * object with an `update(dt, elapsed)` method; registration order defines
 * update order (simulation → camera → UI). After all systems have updated,
 * the floating origin rebases the world if the player has drifted too far
 * from (0,0,0) — every system with world-positioned state subscribes to the
 * shift, so the rebase is invisible to both gameplay and the renderer.
 *
 * Systems are registered by the bootstrap in `main.js` as the game is
 * assembled. Cross-system references (e.g. combat needing the player) are
 * wired through this object rather than singletons so the whole game stays
 * testable and disposable.
 */
export class Game {
  /** @param {HTMLCanvasElement} canvas */
  constructor(canvas) {
    this.engine = new Engine(canvas);
    this.events = new EventBus();
    this.input = new Input();
    this.audio = new AudioEngine();
    this.origin = new FloatingOrigin(8192);
    this.quality = new QualityManager(this.engine);

    /**
     * Named gameplay systems in update order.
     * @type {Array<{ name: string, system: { update?: Function } }>}
     */
    this.systems = [];

    /** Set by the player-ship system; consumed broadly. */
    this.player = null;
    /** Set by the universe system in Phase 6+. */
    this.universe = null;
    /** Set by the enemy manager; consumed by combat and radar. */
    this.enemies = null;
    /** Set by the weapon system; consumed by AI and HUD. */
    this.weapons = null;
    /**
     * Large sphere colliders for AI avoidance and projectile occlusion:
     * objects with `{ position: Vector3, radius: number }`. Planets and
     * stations register here.
     * @type {Array<{position: import('three').Vector3, radius: number}>}
     */
    this.obstacles = [];
    /**
     * Asteroid fields (collision + mining queries).
     * @type {import('../environment/AsteroidField.js').AsteroidField[]}
     */
    this.asteroidFields = [];
    /** FX singletons wired by the bootstrap. */
    this.explosions = null;
    this.pickups = null;
    /** Atmospheric-entry heat 0..1, drives HUD glow (set by universe). */
    this.entryHeat = 0;

    /** True while the start screen / death screen is up. */
    this.paused = true;

    this.engine.onUpdate((dt, elapsed) => this._update(dt, elapsed));
  }

  /**
   * Register a gameplay system.
   * @param {string} name
   * @param {{ update?: (dt: number, elapsed: number) => void }} system
   */
  addSystem(name, system) {
    this.systems.push({ name, system });
    return system;
  }

  _update(dt, elapsed) {
    this.input.update();

    if (!this.paused) {
      for (const { system } of this.systems) {
        if (system.update) system.update(dt, elapsed);
      }
      // Rebase the world around the player after all movement settles.
      if (this.player) {
        this.origin.update(this.player.position);
      }
    }

    this.quality.update(dt);
  }

  start() {
    this.engine.start();
  }
}

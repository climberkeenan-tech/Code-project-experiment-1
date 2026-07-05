import { clamp } from '../core/math/noise.js';

/**
 * Continuous engine audio for the player ship, fully synthesized.
 *
 * Patch: two detuned sawtooth oscillators (thrust growl) + a sine sub-bass
 * (hull rumble) through a low-pass filter, plus a filtered noise loop
 * (exhaust wash). Frequencies, cutoff and gains continuously track
 * throttle, speed and boost, so the engine *is* the telemetry.
 */
export class ShipSounds {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.initialized = false;
    this.nodes = null;

    game.events.on('player:boost-start', () => this._onBoostStart());
  }

  _init() {
    const audio = this.game.audio;
    if (!audio.ready) return;
    const ctx = audio.ctx;

    const saw1 = ctx.createOscillator();
    saw1.type = 'sawtooth';
    saw1.frequency.value = 52;
    const saw2 = ctx.createOscillator();
    saw2.type = 'sawtooth';
    saw2.frequency.value = 52 * 1.006; // slight detune → organic beat
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 30;

    const oscGain = ctx.createGain();
    oscGain.gain.value = 0;
    const subGain = ctx.createGain();
    subGain.gain.value = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 220;
    filter.Q.value = 1.2;

    saw1.connect(oscGain);
    saw2.connect(oscGain);
    oscGain.connect(filter);
    sub.connect(subGain);
    subGain.connect(audio.buses.engine);
    filter.connect(audio.buses.engine);

    saw1.start();
    saw2.start();
    sub.start();

    // Exhaust wash: looping noise through its own low-pass.
    const wash = audio.createLoop({ bus: 'engine', filterFreq: 500, gain: 0 });

    this.nodes = { saw1, saw2, sub, oscGain, subGain, filter, wash };
    this.initialized = true;
  }

  _onBoostStart() {
    // Ignition whoosh: a fast rising noise sweep.
    this.game.audio.playNoise({
      duration: 0.7,
      gain: 0.5,
      filterFreq: 600,
      filterEnd: 5200,
      attack: 0.04,
      bus: 'engine',
    });
  }

  update(dt) {
    const audio = this.game.audio;
    if (!audio.ready) return;
    if (!this.initialized) this._init();
    if (!this.nodes) return;

    const player = this.game.player;
    if (!player || !player.alive) {
      this._setLevels(0, 0, 0, dt);
      return;
    }

    const throttle = clamp(Math.abs(this.game.input.state.throttle), 0, 1);
    const speed01 = clamp(player.speed / (240 * Math.max(1, player.envSpeedScale)), 0, 1);
    const boost = player.boostActive ? 1 : 0;

    const t = audio.time;
    const smooth = 0.08;

    // Pitch rises with speed; boost adds a snarl on top.
    const baseFreq = 46 + speed01 * 74 + boost * 26;
    this.nodes.saw1.frequency.setTargetAtTime(baseFreq, t, smooth);
    this.nodes.saw2.frequency.setTargetAtTime(baseFreq * 1.006, t, smooth);
    this.nodes.sub.frequency.setTargetAtTime(24 + speed01 * 30, t, smooth);

    // Cutoff opens with throttle — the "roar" of applied thrust.
    const cutoff = 200 + throttle * 1500 + boost * 1600;
    this.nodes.filter.frequency.setTargetAtTime(cutoff, t, smooth);

    this._setLevels(
      0.05 + throttle * 0.16 + boost * 0.12, // saw growl
      0.10 + throttle * 0.12 + speed01 * 0.06, // sub rumble
      throttle * 0.09 + boost * 0.15 + speed01 * 0.04, // noise wash
      dt,
    );
  }

  _setLevels(osc, sub, wash, _dt) {
    const t = this.game.audio.time;
    this.nodes.oscGain.gain.setTargetAtTime(osc, t, 0.09);
    this.nodes.subGain.gain.setTargetAtTime(sub, t, 0.09);
    if (this.nodes.wash) {
      this.nodes.wash.gain.gain.setTargetAtTime(wash, t, 0.12);
      this.nodes.wash.filter.frequency.setTargetAtTime(400 + wash * 5200, t, 0.12);
    }
  }
}

/**
 * Procedural audio engine built on WebAudio.
 *
 * The game ships zero audio files: every sound — engine hum, lasers,
 * explosions, shield hits, UI, ambient music — is synthesized at runtime.
 * This keeps the bundle tiny (important on mobile), guarantees no
 * placeholder assets, and lets sounds react continuously to game state
 * (e.g. engine pitch follows throttle).
 *
 * Architecture:
 *   sources → per-category bus gains → master gain → compressor → output
 *
 * The AudioContext can only start after a user gesture; `unlock()` is called
 * from the start screen tap. Every public method is safe to call before
 * unlock (it just no-ops).
 */
export class AudioEngine {
  constructor() {
    /** @type {AudioContext|null} */
    this.ctx = null;
    this.master = null;
    this.buses = { sfx: null, engine: null, music: null, ambient: null };
    this.noiseBuffer = null;
    this.muted = false;
  }

  get ready() {
    return this.ctx !== null && this.ctx.state === 'running';
  }

  get time() {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  /**
   * Create (or resume) the AudioContext. Must be called from a user-gesture
   * handler the first time.
   */
  unlock() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx({ latencyHint: 'interactive' });

      // Master chain: gentle compression stops explosion stacks from clipping.
      const compressor = this.ctx.createDynamicsCompressor();
      compressor.threshold.value = -14;
      compressor.knee.value = 20;
      compressor.ratio.value = 5;
      compressor.attack.value = 0.004;
      compressor.release.value = 0.24;
      compressor.connect(this.ctx.destination);

      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 1;
      this.master.connect(compressor);

      for (const name of Object.keys(this.buses)) {
        const gain = this.ctx.createGain();
        gain.connect(this.master);
        this.buses[name] = gain;
      }
      this.buses.sfx.gain.value = 0.9;
      this.buses.engine.gain.value = 0.55;
      this.buses.music.gain.value = 0.5;
      this.buses.ambient.gain.value = 0.6;

      this.noiseBuffer = this._createNoiseBuffer(2);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master) {
      this.master.gain.setTargetAtTime(muted ? 0 : 1, this.time, 0.05);
    }
  }

  /** Pre-rendered white noise loop used by many synth patches. */
  _createNoiseBuffer(seconds) {
    const rate = this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, Math.floor(rate * seconds), rate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Play a one-shot oscillator with pitch and gain envelopes.
   * The workhorse behind lasers, UI blips and alarm tones.
   *
   * @param {object} opts
   * @param {OscillatorType} [opts.type]
   * @param {number} opts.freq        start frequency (Hz)
   * @param {number} [opts.freqEnd]   end frequency for an exponential sweep
   * @param {number} [opts.duration]  seconds
   * @param {number} [opts.gain]      peak gain
   * @param {number} [opts.attack]    seconds
   * @param {string} [opts.bus]
   * @param {number} [opts.detune]    cents
   */
  playTone({
    type = 'sine',
    freq,
    freqEnd = null,
    duration = 0.2,
    gain = 0.3,
    attack = 0.005,
    bus = 'sfx',
    detune = 0,
  }) {
    if (!this.ready) return;
    const t0 = this.time;
    const osc = this.ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (freqEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), t0 + duration);
    }
    osc.detune.value = detune;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(gain, t0 + attack);
    env.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

    osc.connect(env);
    env.connect(this.buses[bus]);
    osc.start(t0);
    osc.stop(t0 + duration + 0.05);
    osc.onended = () => {
      osc.disconnect();
      env.disconnect();
    };
  }

  /**
   * Play a filtered noise burst — impacts, explosions, thruster puffs.
   *
   * @param {object} opts
   * @param {number} [opts.duration]     seconds
   * @param {number} [opts.gain]         peak gain
   * @param {number} [opts.filterFreq]   low-pass start cutoff (Hz)
   * @param {number} [opts.filterEnd]    low-pass end cutoff (Hz)
   * @param {number} [opts.attack]       seconds
   * @param {string} [opts.bus]
   * @param {number} [opts.playbackRate] noise buffer playback rate
   */
  playNoise({
    duration = 0.4,
    gain = 0.4,
    filterFreq = 2000,
    filterEnd = 200,
    attack = 0.002,
    bus = 'sfx',
    playbackRate = 1,
  }) {
    if (!this.ready) return;
    const t0 = this.time;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;
    src.playbackRate.value = playbackRate;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterFreq, t0);
    filter.frequency.exponentialRampToValueAtTime(Math.max(30, filterEnd), t0 + duration);
    filter.Q.value = 0.7;

    const env = this.ctx.createGain();
    env.gain.setValueAtTime(0, t0);
    env.gain.linearRampToValueAtTime(gain, t0 + attack);
    env.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

    src.connect(filter);
    filter.connect(env);
    env.connect(this.buses[bus]);
    src.start(t0, Math.random() * 1.5);
    src.stop(t0 + duration + 0.05);
    src.onended = () => {
      src.disconnect();
      filter.disconnect();
      env.disconnect();
    };
  }

  /**
   * Create a persistent looping noise source with a controllable low-pass
   * filter and gain — used for engine wash and atmospheric wind.
   * @returns {{ gain: GainNode, filter: BiquadFilterNode, stop(): void }|null}
   */
  createLoop({ bus = 'ambient', filterFreq = 400, gain = 0 }) {
    if (!this.ready) return null;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    src.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 0.5;

    const gainNode = this.ctx.createGain();
    gainNode.gain.value = gain;

    src.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.buses[bus]);
    src.start();

    return {
      gain: gainNode,
      filter,
      stop: () => {
        try { src.stop(); } catch { /* already stopped */ }
        src.disconnect();
        filter.disconnect();
        gainNode.disconnect();
      },
    };
  }
}

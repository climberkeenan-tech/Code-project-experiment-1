import { Rng } from '../core/math/rng.js';

/**
 * Generative ambient score.
 *
 * A slowly evolving pad — three detuned voices on a minor-mode chord that
 * drifts to a neighbor chord every ~20 seconds — plus sparse echoing
 * melody notes. A tension layer (low pulsing drone) crossfades in while
 * hostiles are engaged, and everything ducks slightly during atmospheric
 * flight so the wind reads.
 *
 * Entirely synthesized: two oscillators and a gain per voice, one shared
 * delay line for the melodic echoes.
 */

/** Chord tones in Hz (A minor-ish pentatonic space, low register). */
const CHORDS = [
  [110.0, 164.81, 261.63], // Am
  [98.0, 146.83, 246.94], // G
  [87.31, 130.81, 220.0], // F
  [110.0, 174.61, 261.63], // F/A color
];

const MELODY_NOTES = [440, 523.25, 587.33, 659.25, 783.99];

export class Music {
  /** @param {import('../core/Game.js').Game} game */
  constructor(game) {
    this.game = game;
    this.rng = new Rng('music');
    this.initialized = false;

    this.chordIndex = 0;
    this._chordTimer = 8; // first change comes sooner
    this._melodyTimer = 5;
  }

  _init() {
    const audio = this.game.audio;
    const ctx = audio.ctx;

    // --- Pad voices ---
    this.voices = [];
    for (let i = 0; i < 3; i++) {
      const oscA = ctx.createOscillator();
      oscA.type = 'triangle';
      const oscB = ctx.createOscillator();
      oscB.type = 'sine';
      oscB.detune.value = 7; // gentle chorus
      const gain = ctx.createGain();
      gain.gain.value = 0;
      oscA.connect(gain);
      oscB.connect(gain);
      gain.connect(audio.buses.music);
      oscA.start();
      oscB.start();
      this.voices.push({ oscA, oscB, gain });
    }

    // --- Echo line for melody pings ---
    this.delay = ctx.createDelay(2);
    this.delay.delayTime.value = 0.65;
    this.feedback = ctx.createGain();
    this.feedback.gain.value = 0.42;
    this.delay.connect(this.feedback);
    this.feedback.connect(this.delay);
    this.delay.connect(audio.buses.music);

    // --- Tension drone (combat layer) ---
    this.drone = ctx.createOscillator();
    this.drone.type = 'sawtooth';
    this.drone.frequency.value = 55;
    this.droneFilter = ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.value = 220;
    this.droneLfo = ctx.createOscillator();
    this.droneLfo.frequency.value = 2.2;
    this.droneLfoGain = ctx.createGain();
    this.droneLfoGain.gain.value = 0.06;
    this.droneGain = ctx.createGain();
    this.droneGain.gain.value = 0;
    this.drone.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneLfo.connect(this.droneLfoGain);
    this.droneLfoGain.connect(this.droneGain.gain);
    this.droneGain.connect(audio.buses.music);
    this.drone.start();
    this.droneLfo.start();

    this._applyChord(0, 0.1);
    this.initialized = true;
  }

  _applyChord(index, rampSeconds) {
    const audio = this.game.audio;
    const chord = CHORDS[index];
    const t = audio.time;
    this.voices.forEach((voice, i) => {
      voice.oscA.frequency.setTargetAtTime(chord[i], t, rampSeconds);
      voice.oscB.frequency.setTargetAtTime(chord[i] * 2.005, t, rampSeconds);
      // Stagger voice levels so the pad breathes.
      const level = 0.05 + 0.02 * Math.sin(index * 2.1 + i * 1.7);
      voice.gain.gain.setTargetAtTime(level, t, rampSeconds);
    });
  }

  _playMelodyNote() {
    const audio = this.game.audio;
    const ctx = audio.ctx;
    const t = audio.time;
    const freq = this.rng.pick(MELODY_NOTES);

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.06, t + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 3.2);
    osc.connect(gain);
    gain.connect(audio.buses.music);
    gain.connect(this.delay);
    osc.start(t);
    osc.stop(t + 3.4);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }

  update(dt) {
    const audio = this.game.audio;
    if (!audio.ready) return;
    if (!this.initialized) this._init();

    // Chord drift.
    this._chordTimer -= dt;
    if (this._chordTimer <= 0) {
      this._chordTimer = 18 + this.rng.range(0, 8);
      // Neighbor-step through the chord list (never random jumps).
      this.chordIndex = (this.chordIndex + (this.rng.chance(0.5) ? 1 : CHORDS.length - 1))
        % CHORDS.length;
      this._applyChord(this.chordIndex, 6);
    }

    // Sparse melody, quieter during combat.
    this._melodyTimer -= dt;
    if (this._melodyTimer <= 0) {
      this._melodyTimer = 7 + this.rng.range(0, 9);
      if (!this._inCombat()) this._playMelodyNote();
    }

    // Tension layer crossfade.
    const t = audio.time;
    this.droneGain.gain.setTargetAtTime(this._inCombat() ? 0.085 : 0, t, 1.2);

    // Duck the pad inside atmospheres so wind and engine carry the scene.
    const density = this.game.universe?.playerContext.density ?? 0;
    audio.buses.music.gain.setTargetAtTime(0.5 - density * 0.25, t, 0.5);
  }

  _inCombat() {
    const enemies = this.game.enemies;
    const player = this.game.player;
    if (!enemies || !player) return false;
    for (const enemy of enemies.enemies) {
      if (enemy.state === 'chase' || enemy.state === 'attack') {
        if (enemy.position.distanceTo(player.position) < 2200) return true;
      }
    }
    return false;
  }
}

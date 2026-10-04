// Web Audio API Procedural Sound Engine for 3D Laundry Experience
// Generates realistic ambient hums, water swishing, dryer warm air, and UI feedback without external audio files

class LaundryAudioEngine {
  private ctx: AudioContext | null = null;
  private isMutedState: boolean = true;
  private isInitialized: boolean = false;

  // Sound nodes
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private washerGain: GainNode | null = null;
  private dryerGain: GainNode | null = null;

  // Oscillators & Noise sources
  private ambientNoise: AudioBufferSourceNode | null = null;
  private washerNoise: AudioBufferSourceNode | null = null;
  private dryerNoise: AudioBufferSourceNode | null = null;
  private washerLfo: OscillatorNode | null = null;

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMutedState ? 0 : 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Create Ambient Store Pad (subtle warm room presence)
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      const bufferSize = this.ctx.sampleRate * 2;
      const pinkNoiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = pinkNoiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const ambientFilter = this.ctx.createBiquadFilter();
      ambientFilter.type = 'lowpass';
      ambientFilter.frequency.setValueAtTime(220, this.ctx.currentTime);

      this.ambientNoise = this.ctx.createBufferSource();
      this.ambientNoise.buffer = pinkNoiseBuffer;
      this.ambientNoise.loop = true;
      this.ambientNoise.connect(ambientFilter);
      ambientFilter.connect(this.ambientGain);
      this.ambientNoise.start();

      // Washer Water Swish Engine
      this.washerGain = this.ctx.createGain();
      this.washerGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.washerGain.connect(this.masterGain);

      const washerFilter = this.ctx.createBiquadFilter();
      washerFilter.type = 'bandpass';
      washerFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      washerFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

      this.washerNoise = this.ctx.createBufferSource();
      this.washerNoise.buffer = pinkNoiseBuffer;
      this.washerNoise.loop = true;

      // LFO for rhythmic water slosh
      this.washerLfo = this.ctx.createOscillator();
      this.washerLfo.frequency.setValueAtTime(0.85, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(250, this.ctx.currentTime);
      this.washerLfo.connect(lfoGain);
      lfoGain.connect(washerFilter.frequency);
      this.washerLfo.start();

      this.washerNoise.connect(washerFilter);
      washerFilter.connect(this.washerGain);
      this.washerNoise.start();

      // Dryer Warm Air Rumble Engine
      this.dryerGain = this.ctx.createGain();
      this.dryerGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.dryerGain.connect(this.masterGain);

      const dryerFilter = this.ctx.createBiquadFilter();
      dryerFilter.type = 'lowpass';
      dryerFilter.frequency.setValueAtTime(160, this.ctx.currentTime);

      const dryerSubOsc = this.ctx.createOscillator();
      dryerSubOsc.type = 'sine';
      dryerSubOsc.frequency.setValueAtTime(58, this.ctx.currentTime);
      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      dryerSubOsc.connect(subGain);
      subGain.connect(this.dryerGain);
      dryerSubOsc.start();

      this.dryerNoise = this.ctx.createBufferSource();
      this.dryerNoise.buffer = pinkNoiseBuffer;
      this.dryerNoise.loop = true;
      this.dryerNoise.connect(dryerFilter);
      dryerFilter.connect(this.dryerGain);
      this.dryerNoise.start();

      this.isInitialized = true;
    } catch {
      // AudioContext not supported or blocked
    }
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.initContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMutedState = !this.isMutedState;

    if (this.masterGain && this.ctx) {
      const targetGain = this.isMutedState ? 0 : 0.35;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }

    if (!this.isMutedState) {
      this.playChime(660);
    }

    return this.isMutedState;
  }

  public isMuted(): boolean {
    return this.isMutedState;
  }

  public setZoneAudio(sceneIndex: number) {
    if (!this.ctx || this.isMutedState) return;
    const now = this.ctx.currentTime;

    // Washer area (Scenes 4 & 5)
    if (this.washerGain) {
      const washerVol = (sceneIndex === 3 || sceneIndex === 4) ? 0.35 : 0.02;
      this.washerGain.gain.setTargetAtTime(washerVol, now, 0.4);
    }

    // Dryer area (Scene 6)
    if (this.dryerGain) {
      const dryerVol = (sceneIndex === 5) ? 0.4 : 0.02;
      this.dryerGain.gain.setTargetAtTime(dryerVol, now, 0.4);
    }
  }

  public playChime(freq: number = 587.33) {
    if (!this.ctx || this.isMutedState) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Audio fail silent
    }
  }

  public playClick() {
    if (!this.ctx || this.isMutedState) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }
}

export const audioEngine = typeof window !== 'undefined' ? new LaundryAudioEngine() : ({} as LaundryAudioEngine);

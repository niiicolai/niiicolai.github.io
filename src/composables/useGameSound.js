import { ref } from "vue";

const TEMPO = 138;
const STEP = 60 / TEMPO / 2;

const A3 = 220;
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const G4 = 392;
const A4 = 440;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const G5 = 783.99;

const LEAD = [
  A4, C5, E5, C5, D5, C5, A4, G4,
  A4, C5, E5, G5, E5, D5, C5, B4,
  A4, E4, A4, C5, B4, G4, E4, G4,
  A4, C5, E5, D5, C5, A4, G4, E4,
];

const BASS = [
  A3 / 2, null, A3 / 2, null, G4 / 4, null, G4 / 4, null,
  C4 / 2, null, C4 / 2, null, E4 / 2, null, E4 / 2, null,
  A3 / 2, null, A3 / 2, null, D4 / 2, null, D4 / 2, null,
  C4 / 2, null, C4 / 2, null, E4 / 2, null, E4 / 2, null,
];

export function useGameSound() {
  const muted = ref(false);

  let context = null;
  let master = null;
  let musicBus = null;
  let noiseBuffer = null;
  let musicTimer = null;
  let nextStepTime = 0;
  let stepIndex = 0;

  const ensure = () => {
    if (muted.value) return null;

    if (!context) {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (!Ctor) return null;

      context = new Ctor();
      master = context.createGain();
      master.gain.value = 0.22;
      master.connect(context.destination);

      musicBus = context.createGain();
      musicBus.gain.value = 0.5;
      const softener = context.createBiquadFilter();
      softener.type = "lowpass";
      softener.frequency.value = 2600;
      musicBus.connect(softener);
      softener.connect(master);
    }

    if (context.state === "suspended") context.resume();
    return context;
  };

  const getNoise = (audio, duration) => {
    if (!noiseBuffer || noiseBuffer.duration < duration) {
      const frames = Math.floor(audio.sampleRate * Math.max(duration, 0.4));
      noiseBuffer = audio.createBuffer(1, frames, audio.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  };

  const voice = ({ audio, from, to = from, type = "sine", start, duration, gain, destination }) => {
    const oscillator = audio.createOscillator();
    const envelope = audio.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(from, start);
    if (to !== from) oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, to), start + duration);

    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(gain, start + 0.01);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(envelope);
    envelope.connect(destination ?? master);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  };

  const tone = ({ from, to = from, type = "sine", duration = 0.12, gain = 0.5, delay = 0 }) => {
    const audio = ensure();
    if (!audio) return;
    voice({ audio, from, to, type, start: audio.currentTime + delay, duration, gain });
  };

  const swoosh = ({ duration = 0.22, gain = 0.3, from = 1800, to = 260 }) => {
    const audio = ensure();
    if (!audio) return;

    const start = audio.currentTime;
    const source = audio.createBufferSource();
    source.buffer = getNoise(audio, duration);

    const filter = audio.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.3;
    filter.frequency.setValueAtTime(from, start);
    filter.frequency.exponentialRampToValueAtTime(Math.max(40, to), start + duration);

    const envelope = audio.createGain();
    envelope.gain.setValueAtTime(gain, start);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(master);
    source.start(start);
    source.stop(start + duration);
  };

  const hat = (audio, start) => {
    const source = audio.createBufferSource();
    source.buffer = getNoise(audio, 0.06);

    const filter = audio.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 7000;

    const envelope = audio.createGain();
    envelope.gain.setValueAtTime(0.09, start);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + 0.05);

    source.connect(filter);
    filter.connect(envelope);
    envelope.connect(musicBus);
    source.start(start);
    source.stop(start + 0.06);
  };

  const scheduleStep = (audio, start, index) => {
    const lead = LEAD[index % LEAD.length];
    if (lead) {
      voice({
        audio,
        from: lead,
        type: "square",
        start,
        duration: STEP * 0.85,
        gain: 0.1,
        destination: musicBus,
      });
    }

    const bass = BASS[index % BASS.length];
    if (bass) {
      voice({
        audio,
        from: bass,
        type: "triangle",
        start,
        duration: STEP * 1.7,
        gain: 0.22,
        destination: musicBus,
      });
    }

    if (index % 2 === 1) hat(audio, start);
  };

  const stopMusic = () => {
    if (musicTimer !== null) clearInterval(musicTimer);
    musicTimer = null;
  };

  const startMusic = () => {
    stopMusic();
    stepIndex = 0;
    nextStepTime = 0;

    musicTimer = setInterval(() => {
      const audio = ensure();
      if (!audio) return;

      if (nextStepTime < audio.currentTime) nextStepTime = audio.currentTime + 0.06;

      while (nextStepTime < audio.currentTime + 0.25) {
        scheduleStep(audio, nextStepTime, stepIndex);
        nextStepTime += STEP;
        stepIndex += 1;
      }
    }, 60);
  };

  return {
    muted,
    startMusic,
    stopMusic,
    start: () => {
      tone({ from: 440, to: 660, type: "triangle", duration: 0.1, gain: 0.32 });
      tone({ from: 660, to: 990, type: "triangle", duration: 0.13, gain: 0.28, delay: 0.1 });
    },
    dodge: () => swoosh({ duration: 0.24, gain: 0.26, from: 2000, to: 240 }),
    coin: () => {
      tone({ from: E5, type: "square", duration: 0.06, gain: 0.24 });
      tone({ from: B4 * 2, type: "square", duration: 0.14, gain: 0.24, delay: 0.055 });
    },
    powerUp: () => {
      tone({ from: A4, type: "square", duration: 0.07, gain: 0.26 });
      tone({ from: C5, type: "square", duration: 0.07, gain: 0.26, delay: 0.06 });
      tone({ from: E5, type: "square", duration: 0.07, gain: 0.26, delay: 0.12 });
      tone({ from: G5, type: "square", duration: 0.26, gain: 0.28, delay: 0.18 });
    },
    milestone: () => {
      tone({ from: C5, type: "square", duration: 0.09, gain: 0.26 });
      tone({ from: E5, type: "square", duration: 0.09, gain: 0.26, delay: 0.08 });
      tone({ from: G5, type: "square", duration: 0.22, gain: 0.28, delay: 0.16 });
    },
    hit: () => {
      tone({ from: 190, to: 52, type: "sawtooth", duration: 0.34, gain: 0.45 });
      swoosh({ duration: 0.24, gain: 0.32, from: 700, to: 110 });
    },
    gameOver: () => {
      tone({ from: 440, to: 415, type: "square", duration: 0.16, gain: 0.32 });
      tone({ from: 330, to: 311, type: "square", duration: 0.16, gain: 0.32, delay: 0.17 });
      tone({ from: 220, to: 165, type: "square", duration: 0.42, gain: 0.34, delay: 0.34 });
    },
    toggleMute: () => {
      muted.value = !muted.value;
      if (muted.value && context) context.suspend();
      else ensure();
    },
    dispose: () => {
      stopMusic();
      context?.close();
      context = null;
      master = null;
      musicBus = null;
      noiseBuffer = null;
    },
  };
}

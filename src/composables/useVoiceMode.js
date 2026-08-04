import { ref, watch } from "vue";

const THRESHOLD_KEY = "bergandersen.voice.threshold";

const SAMPLE_RATE = 16000;
const SILENCE_HOLD_MS = 950;
const MIN_SPEECH_MS = 350;
const MAX_UTTERANCE_MS = 12000;
const PREROLL_CHUNKS = 2;
const METER_BARS = 32;

const MIN_START_RMS = 0.009;
const MIN_CONTINUE_RMS = 0.004;
const START_MULTIPLIER = 2.2;
const CONTINUE_MULTIPLIER = 1.5;
const ONSET_MS = 130;
const NOISE_FLOOR_MIN = 0.002;
const NOISE_FLOOR_MAX = 0.02;

const NOISE_TRANSCRIPTS = new Set(["you", "thank you", "thanks", "bye", "so", "uh", "um", "hmm"]);

export function useVoiceMode({ onTranscript, canCapture = () => true }) {
  const active = ref(false);
  const status = ref("idle"); // idle | loading | listening | hearing | transcribing | synthesizing | speaking | error
  const progress = ref(0);
  const decibels = ref(-100);
  const errorMessage = ref("");
  const thresholdScale = ref(1);

  try {
    const stored = Number(localStorage.getItem(THRESHOLD_KEY));
    if (stored >= 0.4 && stored <= 2.5) thresholdScale.value = stored;
  } catch {
    /* storage unavailable */
  }

  watch(thresholdScale, (value) => {
    try {
      localStorage.setItem(THRESHOLD_KEY, String(value));
    } catch {
      /* storage unavailable */
    }
  });

  const thresholds = () => ({
    start: Math.max(MIN_START_RMS, noiseFloor * START_MULTIPLIER) * thresholdScale.value,
    keep: Math.max(MIN_CONTINUE_RMS, noiseFloor * CONTINUE_MULTIPLIER) * thresholdScale.value,
  });

  let availableVoices = [];

  const refreshVoices = () => {
    availableVoices = window.speechSynthesis?.getVoices?.() ?? [];
  };

  const pickVoice = () => {
    const english = availableVoices.filter((voice) => /^en/i.test(voice.lang || ""));
    return english.find((voice) => voice.localService) || english[0] || null;
  };

  refreshVoices();
  window.speechSynthesis?.addEventListener?.("voiceschanged", refreshVoices);

  let worker = null;
  let audioContext = null;
  let stream = null;
  let source = null;
  let analyser = null;
  let processor = null;
  let muteGain = null;
  let meterCanvas = null;
  let raf = null;

  let timeData = null;
  let freqData = null;
  let chunks = [];
  let capturing = false;
  let speechMs = 0;
  let silenceMs = 0;
  let lastFrame = 0;
  let speaking = false;
  let onsetMs = 0;
  let peakRms = 0;
  let noiseFloor = 0.01;

  const setMeterCanvas = (canvas) => {
    meterCanvas = canvas ?? null;
  };

  const resetUtterance = () => {
    chunks = [];
    speechMs = 0;
    silenceMs = 0;
    speaking = false;
    onsetMs = 0;
    peakRms = 0;
  };

  const handleWorkerMessage = (event) => {
    const data = event.data;

    if (data.status === "progress") {
      if (data.total) progress.value = Math.round((data.loaded / data.total) * 100);
      return;
    }

    if (data.status === "ready") {
      if (active.value) status.value = "listening";
      return;
    }

    if (data.status === "transcript") {
      const text = (data.text ?? "").replace(/\[.*?\]|\(.*?\)|\*.*?\*/g, "").trim();
      const normalized = text.toLowerCase().replace(/[.!?,]/g, "").trim();

      if (active.value) status.value = "listening";
      resetUtterance();

      if (text.length > 1 && !NOISE_TRANSCRIPTS.has(normalized)) onTranscript(text);
      return;
    }

    if (data.status === "error") {
      status.value = "error";
      errorMessage.value = data.error || "Speech model failed.";
    }
  };

  const ensureWorker = () => {
    if (!worker) {
      worker = new Worker(new URL("../workers/speechWorker.js", import.meta.url), { type: "module" });
      worker.onmessage = handleWorkerMessage;
      worker.onerror = (err) => {
        status.value = "error";
        errorMessage.value = err.message || "Speech worker crashed.";
      };
    }
    return worker;
  };

  const meterScale = (value) => Math.min(1, Math.sqrt(Math.max(0, value) / 0.2));

  const drawMeter = (rms, threshold) => {
    if (!meterCanvas || !analyser) return;

    const width = meterCanvas.clientWidth;
    const height = meterCanvas.clientHeight;
    if (!width || !height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (meterCanvas.width !== width * dpr || meterCanvas.height !== height * dpr) {
      meterCanvas.width = width * dpr;
      meterCanvas.height = height * dpr;
    }

    const ctx = meterCanvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    analyser.getByteFrequencyData(freqData);

    const usableBins = Math.floor(freqData.length * 0.32);
    const binsPerBar = Math.max(1, Math.floor(usableBins / METER_BARS));
    const gap = 2;
    const barWidth = (width - gap * (METER_BARS - 1)) / METER_BARS;
    const spectrumHeight = height - 9;
    const centre = spectrumHeight / 2;
    const live = status.value === "hearing";

    for (let i = 0; i < METER_BARS; i++) {
      let sum = 0;
      for (let j = 0; j < binsPerBar; j++) sum += freqData[i * binsPerBar + j];

      const value = sum / binsPerBar / 255;
      const barHeight = Math.max(2, Math.pow(value, 0.75) * spectrumHeight * 0.92);
      const x = i * (barWidth + gap);

      ctx.fillStyle = live ? "#a6e22e" : "#4c5a35";
      ctx.fillRect(x, centre - barHeight / 2, barWidth, barHeight);
    }

    const stripTop = height - 5;
    ctx.fillStyle = "#1c1f18";
    ctx.fillRect(0, stripTop, width, 5);

    ctx.fillStyle = live ? "#a6e22e" : "#68794a";
    ctx.fillRect(0, stripTop, width * meterScale(rms), 5);

    const markerX = width * meterScale(threshold);
    ctx.fillStyle = "#ff7a3c";
    ctx.fillRect(markerX - 1, stripTop - 3, 2, 11);
  };

  const finalizeUtterance = () => {
    capturing = false;

    const total = chunks.reduce((count, chunk) => count + chunk.length, 0);
    const audio = new Float32Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      audio.set(chunk, offset);
      offset += chunk.length;
    }

    const peaked = peakRms;
    const startThreshold = thresholds().start;
    resetUtterance();

    if (audio.length < SAMPLE_RATE * 0.3 || peaked < startThreshold * 1.15) {
      status.value = "listening";
      return;
    }

    status.value = "transcribing";
    ensureWorker().postMessage({ type: "transcribe", audio }, [audio.buffer]);
  };

  const monitor = () => {
    raf = requestAnimationFrame(monitor);

    const now = performance.now();
    const delta = now - lastFrame;
    lastFrame = now;

    analyser.getFloatTimeDomainData(timeData);
    let sum = 0;
    for (let i = 0; i < timeData.length; i++) sum += timeData[i] * timeData[i];

    const rms = Math.sqrt(sum / timeData.length);
    decibels.value = Math.max(-100, Math.round(20 * Math.log10(rms || 1e-8)));

    const { start: startThreshold, keep: continueThreshold } = thresholds();

    drawMeter(rms, startThreshold);

    const canListen = status.value === "listening" || status.value === "hearing";
    if (!canListen || !canCapture()) {
      if (capturing) resetUtterance();
      capturing = false;
      return;
    }

    capturing = true;

    if (!speaking) {
      if (rms > startThreshold) {
        onsetMs += delta;
        if (onsetMs >= ONSET_MS) {
          speaking = true;
          speechMs = onsetMs;
          silenceMs = 0;
          peakRms = rms;
          status.value = "hearing";
        }
      } else {
        noiseFloor = Math.min(
          NOISE_FLOOR_MAX,
          Math.max(NOISE_FLOOR_MIN, noiseFloor + (rms - noiseFloor) * 0.03)
        );
        onsetMs = 0;
        if (chunks.length > PREROLL_CHUNKS) chunks.splice(0, chunks.length - PREROLL_CHUNKS);
      }
      return;
    }

    speechMs += delta;
    peakRms = Math.max(peakRms, rms);
    if (rms > continueThreshold) silenceMs = 0;
    else silenceMs += delta;

    const settled = speechMs >= MIN_SPEECH_MS && silenceMs >= SILENCE_HOLD_MS;
    if (settled || speechMs > MAX_UTTERANCE_MS) finalizeUtterance();
  };

  const start = async () => {
    if (active.value) return;

    active.value = true;
    status.value = "loading";
    progress.value = 0;
    errorMessage.value = "";

    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
    } catch {
      active.value = false;
      status.value = "error";
      errorMessage.value = "Microphone access was denied.";
      return;
    }

    audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });
    source = audioContext.createMediaStreamSource(stream);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.65;
    timeData = new Float32Array(analyser.fftSize);
    freqData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);

    processor = audioContext.createScriptProcessor(4096, 1, 1);
    processor.onaudioprocess = (event) => {
      if (!capturing) return;
      chunks.push(new Float32Array(event.inputBuffer.getChannelData(0)));
    };
    muteGain = audioContext.createGain();
    muteGain.gain.value = 0;
    source.connect(processor);
    processor.connect(muteGain);
    muteGain.connect(audioContext.destination);

    ensureWorker().postMessage({ type: "load" });

    resetUtterance();
    lastFrame = performance.now();
    raf = requestAnimationFrame(monitor);
  };

  const stop = () => {
    active.value = false;
    status.value = "idle";
    capturing = false;
    decibels.value = -100;
    resetUtterance();

    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;

    window.speechSynthesis?.cancel();

    processor?.disconnect();
    muteGain?.disconnect();
    analyser?.disconnect();
    source?.disconnect();
    stream?.getTracks().forEach((track) => track.stop());
    audioContext?.close();

    processor = muteGain = analyser = source = stream = audioContext = null;
  };

  const speak = (text) => {
    if (!active.value || !text || !("speechSynthesis" in window)) return;

    status.value = "synthesizing";
    capturing = false;
    resetUtterance();

    if (!availableVoices.length) refreshVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    const preferred = pickVoice();

    if (preferred) utterance.voice = preferred;
    utterance.lang = preferred?.lang || "en-US";
    utterance.rate = 1.05;
    utterance.pitch = 1.15;

    const resume = () => {
      if (active.value && (status.value === "speaking" || status.value === "synthesizing")) {
        status.value = "listening";
      }
    };
    utterance.onstart = () => {
      if (active.value && status.value === "synthesizing") status.value = "speaking";
    };
    utterance.onend = resume;
    utterance.onerror = resume;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const dispose = () => {
    stop();
    window.speechSynthesis?.removeEventListener?.("voiceschanged", refreshVoices);
    worker?.terminate();
    worker = null;
  };

  return {
    active,
    status,
    progress,
    decibels,
    errorMessage,
    thresholdScale,
    start,
    stop,
    speak,
    dispose,
    setMeterCanvas,
  };
}

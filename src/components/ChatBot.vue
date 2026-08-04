<script setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { useChatBot } from "../composables/useChatBot.js";
import { useChatCharacter } from "../composables/useChatCharacter.js";
import { useVoiceMode } from "../composables/useVoiceMode.js";
import { useGameSound } from "../composables/useGameSound.js";

const { messages, status, progress, progressLabel, errorMessage, load, send, sendPriority, dispose } = useChatBot();
const character = useChatCharacter();
const sound = useGameSound();
const voice = useVoiceMode({
  onTranscript: (text) => sendPriority(text),
  canCapture: () => status.value === "ready" || playing.value,
});

const MAX_BUBBLES = 3;

const input = ref("");
const canvasRef = ref(null);
const meterRef = ref(null);
let disposeCharacter = null;

const HIGH_SCORE_KEY = "bergandersen.dodge.best";
const COIN_POINTS = 150;

const playing = ref(false);
const gameOver = ref(false);
const score = ref(0);
const dodges = ref(0);
const lives = ref(3);
const shield = ref(0);
const highScore = ref(0);

const readHighScore = () => {
  try {
    return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
  } catch {
    return 0;
  }
};

const writeHighScore = (value) => {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(value));
  } catch {
    /* storage unavailable */
  }
};

highScore.value = readHighScore();

const DODGE_INTERVAL = 5;
const NUDGE_COOLDOWN_MS = 14000;
let lastNudge = 0;

const MILESTONES = [
  { at: 100, text: "100 points! Great job!" },
  { at: 250, text: "250 points! Nice moves!" },
  { at: 500, text: "500 points! On fire!" },
  { at: 1000, text: "1,000 points! Incredible!" },
  { at: 2000, text: "2,000 points! Unstoppable!" },
  { at: 3500, text: "3,500 points! Legendary!" },
  { at: 5000, text: "5,000 points! Are you even human?" },
];

const toast = ref("");
let toastTimer = null;
let nextMilestone = 0;
let recordBeaten = false;

const showToast = (text) => {
  toast.value = text;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toast.value = ""), 2600);
};

const BUSY_VOICE = new Set(["hearing", "transcribing", "synthesizing", "speaking"]);

const nudge = (text, { force = false } = {}) => {
  if (status.value !== "ready") return;
  if (voice.active.value && BUSY_VOICE.has(voice.status.value)) return;

  const now = Date.now();
  if (!force && now - lastNudge < NUDGE_COOLDOWN_MS) return;

  lastNudge = now;
  send(text, { brief: true });
};

character.setGameHandlers({
  onScore: (value, stats) => {
    score.value = value;
    if (stats) shield.value = stats.shield;

    while (nextMilestone < MILESTONES.length && value >= MILESTONES[nextMilestone].at) {
      showToast(MILESTONES[nextMilestone].text);
      sound.milestone();
      nextMilestone += 1;
    }

    if (!recordBeaten && highScore.value > 0 && value > highScore.value) {
      recordBeaten = true;
      showToast("New personal best!");
      sound.milestone();
    }
  },
  onDodge: (stats) => {
    score.value = stats.score;
    dodges.value = stats.dodges;
    sound.dodge();

    if (stats.dodges % DODGE_INTERVAL === 0) {
      nudge(`Nice! ${stats.dodges} dodged, ${stats.score} points.`);
    }
  },
  onPickup: (type, stats) => {
    score.value = stats.score;
    lives.value = stats.lives;
    shield.value = stats.shield;

    if (type === "coin") {
      sound.coin();
      showToast(`+${COIN_POINTS} coin!`);
      return;
    }

    sound.powerUp();

    if (type === "heart") {
      showToast(`Extra life! ${stats.lives} hearts`);
      nudge(`I grabbed a heart — ${stats.lives} lives now!`, { force: true });
    } else {
      showToast("Immortal for 10s!");
      nudge("I picked up a shield — invincible for ten seconds!", { force: true });
    }
  },
  onHit: (stats) => {
    lives.value = stats.lives;
    sound.hit();

    if (stats.lives > 0) {
      nudge(`Ouch! ${stats.lives} lives left at ${stats.score} points.`, { force: true });
    }
  },
  onGameOver: (stats) => {
    playing.value = false;
    gameOver.value = true;
    score.value = stats.score;
    dodges.value = stats.dodges;
    character.setMove(0);
    sound.stopMusic();
    sound.gameOver();

    const record = stats.score > highScore.value;
    if (record) {
      highScore.value = stats.score;
      writeHighScore(stats.score);
    }

    nudge(
      record
        ? `New personal best! ${stats.score} points, ${stats.dodges} dodged.`
        : `Game over: ${stats.score} points, ${stats.dodges} dodged. My best is ${highScore.value}.`,
      { force: true }
    );
  },
});

const onGameKey = (event) => {
  const key = event.key.toLowerCase();
  const pressed = event.type === "keydown";

  if (key === "a" || key === "arrowleft") {
    event.preventDefault();
    character.setMove(pressed ? -1 : 0);
  } else if (key === "d" || key === "arrowright") {
    event.preventDefault();
    character.setMove(pressed ? 1 : 0);
  }
};

const startPlaying = () => {
  score.value = 0;
  dodges.value = 0;
  lives.value = 3;
  shield.value = 0;
  nextMilestone = 0;
  recordBeaten = false;
  toast.value = "";
  gameOver.value = false;
  playing.value = true;
  sound.start();
  sound.startMusic();
  character.startGame();
  window.addEventListener("keydown", onGameKey);
  window.addEventListener("keyup", onGameKey);
};

const stopPlaying = () => {
  playing.value = false;
  gameOver.value = false;
  toast.value = "";
  clearTimeout(toastTimer);
  sound.stopMusic();
  character.stopGame();
  window.removeEventListener("keydown", onGameKey);
  window.removeEventListener("keyup", onGameKey);
};

const togglePlay = () => (playing.value || gameOver.value ? stopPlaying() : startPlaying());

const voiceNotice = computed(() => {
  if (!voice.active.value) return null;
  if (voice.status.value === "transcribing") return { role: "user", text: "transcribing what you said…" };
  if (voice.status.value === "synthesizing") return { role: "assistant", text: "generating voice…" };
  return null;
});

const bubbles = computed(() => {
  const notice = voiceNotice.value;
  const limit = notice ? MAX_BUBBLES - 1 : MAX_BUBBLES;
  const list = messages.value.map((message, index) => ({ ...message, index })).slice(-limit);

  if (notice) list.push({ role: notice.role, index: `notice-${notice.role}`, notice: notice.text });
  return list;
});

const bubbleOpacity = (index) => Math.max(0.3, 1 - (bubbles.value.length - 1 - index) * 0.3);

const submit = () => {
  if (!input.value.trim()) return;
  send(input.value);
  input.value = "";
};

const voiceLabel = computed(() => {
  if (voice.status.value === "loading") return `loading speech model… ${voice.progress.value}%`;
  if (voice.status.value === "hearing") return "listening — I can hear you";
  if (voice.status.value === "transcribing") return "transcribing…";
  if (voice.status.value === "speaking") return "speaking…";
  if (voice.status.value === "error") return voice.errorMessage.value;
  return "listening — just talk, I'll reply out loud";
});

const toggleVoice = async () => {
  if (voice.active.value) {
    voice.stop();
    return;
  }
  await voice.start();
  await nextTick();
  voice.setMeterCanvas(meterRef.value);
};

watch(canvasRef, (canvas) => {
  if (canvas && !disposeCharacter) disposeCharacter = character.init(canvas);
}, { immediate: true });

let greetTimer = null;

watch(
  [status, voice.status, () => messages.value[messages.value.length - 1]?.content],
  ([current, voiceStatus, lastContent]) => {
    clearTimeout(greetTimer);

    if (current === "idle" || current === "error") return character.setState("sleeping");
    if (current === "loading") return character.setState("waking");
    if (current === "generating") return character.setState(lastContent ? "talking" : "thinking");

    if (voiceStatus === "speaking") return character.setState("talking");
    if (voiceStatus === "transcribing") return character.setState("thinking");

    if (current === "ready" && messages.value.length === 1) {
      character.setState("talking");
      greetTimer = setTimeout(() => character.setState("idle"), 2200);
      return;
    }

    character.setState("idle");
  },
  { immediate: true }
);

watch(status, (current, previous) => {
  if (previous === "generating" && current === "ready" && voice.active.value) {
    voice.speak(messages.value[messages.value.length - 1]?.content);
  }
});

onBeforeUnmount(() => {
  clearTimeout(greetTimer);
  clearTimeout(toastTimer);
  window.removeEventListener("keydown", onGameKey);
  window.removeEventListener("keyup", onGameKey);
  voice.dispose();
  sound.dispose();
  disposeCharacter?.();
  dispose();
});
</script>

<template>
  <div class="card p-3 flex flex-col gap-3">
    <div>
      <div class="flex items-center justify-between gap-2 mb-1">
        <h2 class="text-sm font-mono text-neutral-400">// chat_bot</h2>
        <span v-if="highScore" class="tag" title="your personal best in the dodge game">
          best {{ highScore.toLocaleString() }}
        </span>
      </div>
      <p class="text-xs text-neutral-500">A tiny AI mascot that runs entirely in your browser, powered by <a
          href="https://github.com/huggingface/transformers.js" target="_blank" rel="noopener noreferrer"
          class="link-accent">transformers.js</a>. It's a small, quantized model (Qwen2.5-0.5B) running on
        your CPU, so it's fast but not very smart, expect confident nonsense. Don't take anything it says
        seriously.</p>
    </div>

    <div class="stage">
      <TransitionGroup tag="ul" name="bubble" class="bubble-layer" role="log" aria-live="polite">
        <li v-for="(bubble, i) in bubbles" :key="bubble.index" class="bubble-slot"
          :class="bubble.role === 'user' ? 'is-user' : 'is-bot'">
          <div class="bubble" :class="{ latest: i === bubbles.length - 1 }"
            :style="{ opacity: bubbleOpacity(i), animationDelay: (bubble.index % 3) * 0.7 + 's' }">
            <span v-if="bubble.notice" class="notice">
              <i class="spinner" aria-hidden="true"></i>{{ bubble.notice }}
            </span>
            <span v-else-if="bubble.content">{{ bubble.content }}</span>
            <span v-else class="typing" aria-label="thinking"><i></i><i></i><i></i></span>
          </div>
        </li>
      </TransitionGroup>

      <div v-if="status === 'idle' || status === 'error'" class="zzz" aria-hidden="true">
        <span>z</span><span>z</span><span>z</span>
      </div>

      <Transition name="toast">
        <div v-if="toast" class="toast" role="status">{{ toast }}</div>
      </Transition>

      <canvas ref="canvasRef" class="stage-canvas" aria-hidden="true"></canvas>
    </div>

    <div v-if="status === 'idle'" class="flex flex-col items-center gap-2">
      <button @click="load"
        class="text-xs font-mono px-4 py-2 rounded-md accent-bg text-neutral-950 font-semibold hover:opacity-90 transition-opacity">
        wake him up
      </button>
      <p class="text-[0.65rem] text-neutral-600 font-mono text-center">~200MB download, cached after first load. Runs
        100% in your browser — no data leaves your device.</p>
      <p class="text-[0.65rem] text-neutral-600 border-l-2 border-neutral-800 pl-2">Disclaimer: every reply is generated
        on the fly by the model and does not represent my opinions or views in any way. This card is purely an
        experiment in running a chat bot client-side.</p>
    </div>

    <div v-else-if="status === 'loading' && messages.length === 0" class="flex flex-col gap-2">
      <div class="w-full h-1.5 rounded-full bg-neutral-900 border border-neutral-800 overflow-hidden">
        <div class="h-full accent-bg transition-all duration-200" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="text-xs text-neutral-500 font-mono truncate">downloading brain{{ progressLabel ? ' — ' + progressLabel
        : '' }}… {{ progress }}%</p>
    </div>

    <div v-else-if="status === 'error'" class="flex flex-col items-center gap-2">
      <p class="text-xs text-red-400 font-mono text-center">{{ errorMessage }}</p>
      <button @click="load"
        class="text-xs font-mono px-3 py-1.5 rounded-md border border-neutral-700 text-neutral-300 hover:border-accent hover:text-accent transition-colors">
        retry
      </button>
    </div>

    <template v-else>
      <div v-if="playing || gameOver" class="voice-panel">
        <div class="flex items-center gap-2">
          <span class="text-[0.7rem] font-mono text-neutral-400 flex-1 truncate">
            <span class="text-accent tabular-nums">{{ score.toLocaleString() }}</span>
            {{ gameOver ? `pts — ${dodges} dodged` : `pts · ${dodges} dodged` }}
            <span v-if="highScore" class="text-neutral-600">· best {{ highScore.toLocaleString() }}</span>
          </span>
          <span v-if="shield" class="shield-pill" aria-label="immortal">🛡 {{ shield }}s</span>
          <span class="text-xs tracking-widest" :class="lives ? 'text-accent' : 'text-neutral-700'"
            aria-label="lives">{{ "♥".repeat(lives) }}{{ "·".repeat(Math.max(0, 3 - lives)) }}</span>
          <button type="button" @click="sound.toggleMute()" class="sound-btn"
            :title="sound.muted.value ? 'unmute' : 'mute'" :aria-pressed="!sound.muted.value">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9z" />
              <path v-if="!sound.muted.value" d="M17 9a4 4 0 0 1 0 6" />
              <path v-else d="M17 10l4 4M21 10l-4 4" />
            </svg>
          </button>
        </div>

        <div v-if="!gameOver" class="flex gap-2">
          <button type="button" class="game-btn" @pointerdown="character.setMove(-1)"
            @pointerup="character.setMove(0)" @pointerleave="character.setMove(0)"
            @pointercancel="character.setMove(0)">
            ◀ left <kbd>A</kbd>
          </button>
          <button type="button" class="game-btn" @pointerdown="character.setMove(1)" @pointerup="character.setMove(0)"
            @pointerleave="character.setMove(0)" @pointercancel="character.setMove(0)">
            right <kbd>D</kbd> ▶
          </button>
        </div>

        <div v-else class="flex gap-2">
          <button type="button" class="game-btn" @click="startPlaying">play again</button>
          <button type="button" class="game-btn" @click="stopPlaying">back to chat</button>
        </div>

        <p class="text-[0.65rem] font-mono text-neutral-600">
          Hold <kbd class="kbd-inline">A</kbd>/<kbd class="kbd-inline">D</kbd> or the arrow keys — grab
          <span class="pick-coin">coins</span>, <span class="pick-heart">hearts</span> and
          <span class="pick-shield">shields</span>, dodge the rest.
        </p>
      </div>

      <div v-if="voice.active.value" class="voice-panel">
        <div class="flex items-center gap-2">
          <span class="voice-dot" :class="{ live: voice.status.value === 'hearing' }" aria-hidden="true"></span>
          <span class="text-[0.7rem] font-mono text-neutral-400 flex-1 truncate">{{ voiceLabel }}</span>
          <span class="text-[0.65rem] font-mono text-neutral-600 tabular-nums">{{ voice.decibels.value }} dB</span>
        </div>
        <canvas ref="meterRef" class="voice-meter" aria-label="microphone level"></canvas>
        <div class="flex items-center gap-2">
          <label for="voice-threshold" class="text-[0.6rem] font-mono text-neutral-600 shrink-0">threshold</label>
          <input id="voice-threshold" v-model.number="voice.thresholdScale.value" type="range" min="0.4" max="2.5"
            step="0.05" class="threshold-slider" />
        </div>

        <p class="text-[0.65rem] font-mono text-neutral-600">
          Only English speech is supported — drag the <span class="threshold-key">orange marker</span> just above your
          background noise.
        </p>
      </div>

      <form @submit.prevent="submit" class="flex items-center gap-2">
        <input v-model="input" type="text" placeholder="say something…"
          :disabled="status !== 'ready' || voice.active.value"
          class="flex-1 h-9 text-sm font-mono bg-neutral-900 border border-neutral-800 rounded-md px-2.5 text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-accent disabled:opacity-50" />
        <button type="button" @click="toggleVoice" :disabled="status !== 'ready'" :aria-pressed="voice.active.value"
          :title="voice.active.value ? 'stop voice mode' : 'start voice mode'"
          class="mic-btn" :class="{ recording: voice.active.value }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            aria-hidden="true">
            <rect x="9" y="2" width="6" height="11" rx="3" />
            <path d="M5 11a7 7 0 0 0 14 0" />
            <path d="M12 18v3" />
          </svg>
        </button>
        <button type="button" @click="togglePlay" :disabled="status !== 'ready'" :aria-pressed="playing"
          :title="playing || gameOver ? 'stop playing' : 'play dodge'" class="mic-btn"
          :class="{ recording: playing }">
          <svg v-if="playing || gameOver" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="6" width="12" height="12" rx="1.5" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </button>
        <button type="submit" :disabled="status !== 'ready' || voice.active.value || !input.trim()"
          class="h-9 text-xs font-mono px-3 rounded-md accent-bg text-neutral-950 font-semibold hover:opacity-90 transition-opacity disabled:opacity-40">
          send
        </button>
      </form>

      <p class="text-[0.65rem] text-neutral-600 font-mono">Runs 100% in your browser via transformers.js — chat and
        speech recognition both stay on your device. Generated replies are not my opinions or views.</p>
    </template>
  </div>
</template>

<style scoped>
.stage {
  position: relative;
  height: 340px;
  border-radius: 0.5rem;
  background: radial-gradient(ellipse at 50% 92%, #141a0c 0%, #0d0d0d 62%);
  overflow: hidden;
}

.stage::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 96px;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to top, rgba(166, 226, 46, 0.12), transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent);
}

.stage::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  z-index: 3;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, #a6e22e66 22%, #a6e22e 50%, #a6e22e66 78%, transparent);
}

.stage-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.bubble-layer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 186px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.4rem;
  margin: 0;
  padding: 0.5rem 0.6rem 0;
  list-style: none;
  overflow: hidden;
  pointer-events: none;
}

.bubble-slot {
  display: flex;
}

.is-user {
  justify-content: flex-end;
}

.is-bot {
  justify-content: flex-start;
}

.bubble {
  position: relative;
  max-width: 86%;
  font-size: 0.75rem;
  line-height: 1.45;
  padding: 0.45rem 0.65rem;
  border-radius: 0.65rem;
  animation: bubbleFloat 5s ease-in-out infinite;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bubble.latest {
  display: block;
  max-height: 108px;
  overflow-y: auto;
  pointer-events: auto;
}

.is-bot .bubble {
  background: rgba(15, 26, 0, 0.92);
  border: 1px solid #a6e22e40;
  border-bottom-left-radius: 0.15rem;
  color: #e5e5e5;
}

.is-user .bubble {
  background: rgba(38, 38, 38, 0.92);
  border: 1px solid #3a3a3a;
  border-bottom-right-radius: 0.15rem;
  color: #d4d4d4;
}

.voice-panel {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid #a6e22e40;
  border-radius: 0.5rem;
  background: rgba(15, 26, 0, 0.55);
}

.voice-meter {
  width: 100%;
  height: 46px;
  display: block;
}

.shield-pill {
  font-family: monospace;
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  border: 1px solid #4dd2ff80;
  background: rgba(0, 60, 90, 0.4);
  color: #4dd2ff;
  white-space: nowrap;
}

.pick-coin {
  color: #ffd24a;
}

.pick-heart {
  color: #ff4d6d;
}

.pick-shield {
  color: #4dd2ff;
}

.sound-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
  color: #737373;
  transition: color 0.15s ease;
}

.sound-btn:hover {
  color: #a6e22e;
}

.sound-btn svg {
  width: 0.95rem;
  height: 0.95rem;
}

.game-btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 2.1rem;
  font-family: monospace;
  font-size: 0.7rem;
  color: #d4d4d4;
  background: #171717;
  border: 1px solid #2a2a2a;
  border-radius: 0.375rem;
  user-select: none;
  touch-action: none;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.game-btn:hover {
  border-color: #a6e22e80;
  color: #e5e5e5;
}

.game-btn:active {
  background: #a6e22e;
  border-color: #a6e22e;
  color: #0a0a0a;
}

.game-btn kbd,
.kbd-inline {
  font-family: monospace;
  font-size: 0.6rem;
  padding: 0.05rem 0.28rem;
  border: 1px solid #3a3a3a;
  border-radius: 0.2rem;
  background: #0d0d0d;
  color: #a6e22e;
}

.threshold-key {
  color: #ff7a3c;
}

.threshold-slider {
  flex: 1;
  height: 2px;
  appearance: none;
  -webkit-appearance: none;
  background: #2f3428;
  border-radius: 999px;
  cursor: pointer;
}

.threshold-slider::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: #ff7a3c;
  border: none;
  cursor: pointer;
}

.threshold-slider::-moz-range-thumb {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: #ff7a3c;
  border: none;
  cursor: pointer;
}

.voice-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #4c5a35;
  flex-shrink: 0;
}

.voice-dot.live {
  background: #a6e22e;
  box-shadow: 0 0 8px #a6e22eaa;
  animation: pulse 1s ease-in-out infinite;
}

.mic-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: 0.375rem;
  border: 1px solid #2a2a2a;
  background: #171717;
  color: #a3a3a3;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.mic-btn svg {
  width: 1rem;
  height: 1rem;
}

.mic-btn:hover:not(:disabled) {
  color: #a6e22e;
  border-color: #a6e22e80;
}

.mic-btn:disabled {
  opacity: 0.4;
}

.mic-btn.recording {
  background: #a6e22e;
  border-color: #a6e22e;
  color: #0a0a0a;
  animation: pulse 1.6s ease-in-out infinite;
}

.notice {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: monospace;
  font-size: 0.7rem;
  color: #c4c4c4;
}

.spinner {
  width: 0.7rem;
  height: 0.7rem;
  flex-shrink: 0;
  border: 2px solid #a6e22e40;
  border-top-color: #a6e22e;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

.typing {
  display: inline-flex;
  gap: 0.22rem;
  align-items: center;
  padding: 0.15rem 0;
}

.typing i {
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: #a6e22e;
  animation: typingDot 1.1s ease-in-out infinite;
}

.typing i:nth-child(2) {
  animation-delay: 0.16s;
}

.typing i:nth-child(3) {
  animation-delay: 0.32s;
}

.toast {
  position: absolute;
  top: 0.7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(15, 26, 0, 0.94);
  border: 1px solid #a6e22e;
  box-shadow: 0 0 20px #a6e22e40;
  color: #a6e22e;
  font-family: monospace;
  font-size: 0.72rem;
  white-space: nowrap;
  pointer-events: none;
}

.toast-enter-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.toast-leave-active {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-12px) scale(0.88);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-18px);
}

.zzz {
  position: absolute;
  left: 57%;
  bottom: 192px;
  z-index: 2;
  display: flex;
  gap: 0.2rem;
  pointer-events: none;
}

.zzz span {
  font-family: monospace;
  font-size: 0.8rem;
  color: #a6e22e;
  opacity: 0;
  animation: zFloat 3.2s ease-in-out infinite;
}

.zzz span:nth-child(2) {
  font-size: 0.95rem;
  animation-delay: 1.05s;
}

.zzz span:nth-child(3) {
  font-size: 1.1rem;
  animation-delay: 2.1s;
}

.bubble-enter-active {
  transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.bubble-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.9);
}

.bubble-leave-active {
  position: absolute;
  left: 0.6rem;
  right: 0.6rem;
  transition: opacity 0.7s ease, transform 0.7s ease-out;
}

.bubble-leave-to {
  opacity: 0;
  transform: translateY(-60px) scale(0.88);
}

.bubble-move {
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.45;
  }
}

@keyframes bubbleFloat {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

@keyframes typingDot {

  0%,
  100% {
    opacity: 0.25;
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(-2px);
  }
}

@keyframes zFloat {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg);
  }

  15% {
    opacity: 0.9;
  }

  100% {
    opacity: 0;
    transform: translate(16px, -42px) rotate(14deg);
  }
}
</style>

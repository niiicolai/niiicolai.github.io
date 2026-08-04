import { ref } from "vue";

const HISTORY_LIMIT = 12;

const GREETINGS = [
  "*yawn* …oh, hi! I just woke up and I'm already about 90% nonsense.",
  "Beep. I'm awake! Tiny brain, big confidence. Ask me anything.",
  "Whoa, someone booted me up! Fair warning: I make things up with great enthusiasm.",
  "Systems online! I run entirely inside your browser, which explains a lot about my answers.",
  "Hello! I'm small, slightly confused, and very happy you're here. What's up?",
];

export function useChatBot() {
  const messages = ref([]);
  const status = ref("idle"); // idle | loading | ready | generating | error
  const progress = ref(0);
  const progressLabel = ref("");
  const errorMessage = ref("");

  let worker = null;
  let pending = null;

  const handleMessage = (event) => {
    const data = event.data;

    if (data.status === "progress") {
      if (data.total) {
        progress.value = Math.round((data.loaded / data.total) * 100);
      }
      progressLabel.value = data.file ?? "";
      return;
    }

    if (data.status === "ready") {
      status.value = "ready";
      if (messages.value.length === 0) {
        messages.value.push({
          role: "assistant",
          content: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
        });
      }
      return;
    }

    if (data.status === "update") {
      const last = messages.value[messages.value.length - 1];
      if (last && last.role === "assistant") {
        last.content += data.token;
      }
      return;
    }

    if (data.status === "complete") {
      status.value = "ready";
      flushPending();
      return;
    }

    if (data.status === "error") {
      status.value = "error";
      errorMessage.value = data.error || "Something went wrong.";
    }
  };

  const ensureWorker = () => {
    if (!worker) {
      worker = new Worker(new URL("../workers/chatWorker.js", import.meta.url), { type: "module" });
      worker.onmessage = handleMessage;
      worker.onerror = (err) => {
        status.value = "error";
        errorMessage.value = err.message || "Worker crashed.";
      };
    }
    return worker;
  };

  const load = () => {
    if (status.value === "loading" || status.value === "ready" || status.value === "generating") return;
    status.value = "loading";
    progress.value = 0;
    errorMessage.value = "";
    ensureWorker().postMessage({ type: "load" });
  };

  const send = (text, { brief = false } = {}) => {
    const trimmed = text.trim();
    if (!trimmed || status.value !== "ready") return;

    messages.value.push({ role: "user", content: trimmed });
    messages.value.push({ role: "assistant", content: "" });
    status.value = "generating";

    const history = messages.value
      .slice(0, -1)
      .slice(-HISTORY_LIMIT)
      .map(({ role, content }) => ({ role, content }));

    ensureWorker().postMessage({ type: "generate", messages: history, brief });
  };

  const flushPending = () => {
    if (!pending || status.value !== "ready") return;
    const next = pending;
    pending = null;
    send(next.text, next.options);
  };

  const sendPriority = (text, options = {}) => {
    if (!text.trim()) return;

    if (status.value === "generating") {
      pending = { text, options };
      worker?.postMessage({ type: "interrupt" });
      return;
    }

    send(text, options);
  };

  const dispose = () => {
    pending = null;
    worker?.terminate();
    worker = null;
  };

  return {
    messages,
    status,
    progress,
    progressLabel,
    errorMessage,
    load,
    send,
    sendPriority,
    dispose,
  };
}

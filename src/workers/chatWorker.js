import { pipeline, TextStreamer, InterruptableStoppingCriteria } from "@huggingface/transformers";

const MODEL_ID = "onnx-community/Qwen2.5-0.5B-Instruct";

const BASE_PROMPT =
  "You are a witty, upbeat little robot mascot living on a developer's portfolio website. " +
  "Always directly answer or react to what the visitor just said - never fall back to generic " +
  "greetings or 'how can I help you' filler. Keep replies short (1-2 sentences), specific, and playful.";

const SITE_CONTEXT =
  " Facts you can use: this is Nicolai Berg Andersen's (niiicolai) portfolio at bergandersen.com. " +
  "It lists his tech stack (JavaScript, TypeScript, Node.js, Vue, React, Three.js, Python and more), " +
  "certificates, articles, and projects: web apps, browser games, embeddable widgets and Python tools. " +
  "There is also a hidden interactive 3D desktop-OS experience at the /os page, with a working browser, " +
  "paint app and Snake game inside it. Contact: contact@bergandersen.com.";

const SITE_PATTERN =
  /\b(site|website|page|portfolio|blog|about|who|what is this|owner|nicolai|berg|andersen|niiicolai|project|projects|work|article|articles|certificate|certificates|stack|tech|skill|skills|3d|os|snake|paint|game|games|widget|widgets|contact|hire|email|github|find|where)\b/i;

const BRIEF_PROMPT =
  "You are a witty robot mascot currently dodging obstacles in a game while the visitor cheers you on. " +
  "Answer with a single short exclamation of at most 8 words. Never explain, never add extra sentences.";

const buildMessages = (history, brief) => {
  if (brief) return [{ role: "system", content: BRIEF_PROMPT }, ...history];

  const lastUser = [...history].reverse().find((message) => message.role === "user");
  const prompt = SITE_PATTERN.test(lastUser?.content ?? "") ? BASE_PROMPT + SITE_CONTEXT : BASE_PROMPT;
  return [{ role: "system", content: prompt }, ...history];
};

class PipelineSingleton {
  static instance = null;

  static async getInstance(progress_callback) {
    if (!this.instance) {
      this.instance = pipeline("text-generation", MODEL_ID, {
        dtype: "q4",
        device: "auto",
        progress_callback,
      });
    }
    return this.instance;
  }
}

let stopper = null;

self.onmessage = async (event) => {
  const { type } = event.data;

  if (type === "interrupt") {
    stopper?.interrupt();
    return;
  }

  if (type === "load") {
    try {
      await PipelineSingleton.getInstance((progress) => {
        self.postMessage({ status: "progress", ...progress });
      });
      self.postMessage({ status: "ready" });
    } catch (err) {
      self.postMessage({ status: "error", error: err.message });
    }
    return;
  }

  if (type === "generate") {
    try {
      const generator = await PipelineSingleton.getInstance();
      const brief = Boolean(event.data.brief);
      const messages = buildMessages(event.data.messages, brief);

      const streamer = new TextStreamer(generator.tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true,
        callback_function: (token) => {
          self.postMessage({ status: "update", token });
        },
      });

      stopper = new InterruptableStoppingCriteria();

      const output = await generator(messages, {
        stopping_criteria: stopper,
        max_new_tokens: brief ? 24 : 90,
        do_sample: true,
        temperature: 0.6,
        top_k: 40,
        repetition_penalty: 1.3,
        no_repeat_ngram_size: 3,
        streamer,
      });

      const reply = output[0]?.generated_text?.at(-1)?.content ?? "";
      self.postMessage({ status: "complete", output: reply });
    } catch (err) {
      self.postMessage({ status: "error", error: err.message });
    }
  }
};

import { pipeline } from "@huggingface/transformers";

const MODEL_ID = "Xenova/whisper-base.en";

class TranscriberSingleton {
  static instance = null;

  static async getInstance(progress_callback) {
    if (!this.instance) {
      this.instance = pipeline("automatic-speech-recognition", MODEL_ID, {
        dtype: "q8",
        device: "auto",
        progress_callback,
      });
    }
    return this.instance;
  }
}

self.onmessage = async (event) => {
  const { type } = event.data;

  if (type === "load") {
    try {
      await TranscriberSingleton.getInstance((progress) => {
        self.postMessage({ status: "progress", ...progress });
      });
      self.postMessage({ status: "ready" });
    } catch (err) {
      self.postMessage({ status: "error", error: err.message });
    }
    return;
  }

  if (type === "transcribe") {
    try {
      const transcriber = await TranscriberSingleton.getInstance();
      const output = await transcriber(event.data.audio);
      self.postMessage({ status: "transcript", text: (output?.text ?? "").trim() });
    } catch (err) {
      self.postMessage({ status: "error", error: err.message });
    }
  }
};

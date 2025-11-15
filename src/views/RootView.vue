<script setup>
import * as Two from "two-easy-engine";
import { ref, onMounted, onBeforeUnmount } from "vue";

const widgetWidth = ref(600);
const canvasRef = ref(null);

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const clock = new Two.Clock();
  const camera = new Two.Camera2D();
  const scene = new Two.Scene();
  const renderer = new Two.Renderer2D(canvas, scene, camera, {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
    backgroundColor: "black",
  });

  const lights = [];
  const num = 80;

  for (let i = 0; i < num; i++) {
    const color = new Two.HslaColor((i * Math.random() * 15) % 300, 100, 60, 1);
    const colorStop = new Two.HslaColor(color.h, 100, 60, 0);
    const light = new Two.PointLight2D(
      Math.random() * 3,
      Math.random() * 10,
      color,
      colorStop
    );
    light.transform.position.set(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
    scene.add(light);
    lights.push(light);
  }

  const handleResize = () => {
    renderer.options.setSize(window.innerWidth, window.innerHeight);
    widgetWidth.value = (window.innerWidth < 650) ? 300 : 600;
  };
  window.addEventListener("resize", handleResize);

  const moveSpeed = 0.3;
  const hueSpeed = 0.1;

  const anim = renderer.requestAnimationFrame({
    beforeRender: () => {
      const time = clock.getElapsedTime();
      const hue = (time * 60 * hueSpeed) % 360;

      for (let i = 0; i < num; i++) {
        const light = lights[i];
        light.intensity = Math.random() * 2;
        light.color.setHue(hue);
        light.transform.position.y += moveSpeed;

        if (light.transform.position.y > window.innerHeight + 20) {
          light.transform.position.set(Math.random() * window.innerWidth, -20);
        }
      }
    },
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    renderer.cancelAnimationFrame(anim);
    renderer.dispose?.();
  });
});
</script>

<template>
  <canvas ref="canvasRef" class="fixed w-full h-screen z-1" />

  <div class="fixed z-2 flex flex-col items-center justify-center w-full h-screen text-center gap-3">
    <h1 class="highlight-color text-3xl mb-3">
      bergandersen.com
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <a href="https://www.bergandersen.com/two-easy-engine/" target="_blank"
        class="border rounded-md px-3 py-3 highlight-color highlight-color-hover transition-colors duration-200">
        TwoEasyEngine
      </a>
      <router-link to="/os"
        class="border rounded-md px-3 py-3 highlight-color highlight-color-hover transition-colors duration-200">
        Interactive 3D Site
      </router-link>
      <a href="https://coding-challenges.bergandersen.com/" target="_blank"
        class="border rounded-md px-3 py-3 highlight-color highlight-color-hover transition-colors duration-200">
        Coding Challenges
      </a>
      <a href="https://www.bergandersen.com/vector-math-animation/" target="_blank"
        class="border rounded-md px-3 py-3 highlight-color highlight-color-hover transition-colors duration-200">
        Vector Fundamentals
      </a>
      <a href="https://niiicolai.github.io/widget-project-status-dashboard" target="_blank"
        class="border rounded-md px-3 py-3 highlight-color highlight-color-hover transition-colors duration-200">
        Project Status Dashboard
      </a>
    </div>

    <hr class="border w-96 highlight-border-color mt-3 mb-3" />

    <div>
      <h2 class="highlight-color text-xl mb-3">Project Status Dashboard</h2>
      <iframe
        src="https://niiicolai.github.io/widget-project-status-dashboard/#/dashboard?data_url=https://raw.githubusercontent.com/niiicolai/niiicolai/refs/heads/main/projects.json"
        height="270px" :width="widgetWidth" style="border:none;border-radius: 0.5em;"></iframe>
    </div>
  </div>
</template>

<style>
.main-bg {
  background-color: #333;
}

.secondary-bg {
  background-color: #1b1b1b;
}

.highlight-color {
  color: #a6e22e;
}

.highlight-border-color {
  border-color: #a6e22e;
}

.highlight-color-hover:hover {
  color: #88b924;
}

.highlight-bg-color {
  background-color: #a6e22e;
}

.highlight-bg-color-hover:hover {
  background-color: #88b924;
}
</style>
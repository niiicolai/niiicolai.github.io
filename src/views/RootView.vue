<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAnimatedBackground } from "../composables/useAnimatedBackground";
import CredlyBadge from "../components/CredlyBadge.vue";
const canvasRef = ref(null);
const animatedBackground = useAnimatedBackground();

onMounted(() => {
  const canvasBgg = canvasRef.value;

  if (!canvasBgg && !canvasHeader) return;

  const disposeBgg = animatedBackground.init(canvasBgg);

  onBeforeUnmount(() => {
    disposeBgg();
  });
});
</script>

<template>
  <canvas ref="canvasRef" class="fixed w-full h-screen z-1" />

  <div class="relative z-2">
    <div class="w-full h-8 bg-neutral-900 border-b border-neutral-500 text-neutral-200 px-3"></div>

    <div
      class="mx-auto p-3 md:p-0 md:py-6 md:w-128 lg:w-256 flex flex-col lg:flex-row items-start justify-between gap-3 lg:gap-6">
      <div class="w-full lg:w-96 flex flex-col gap-3">
        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200">
          <div class="relative highlight-bg-color p-3 h-16 mb-5">
            <img src="/avatar.webp" alt="avatar"
              class="rounded-full border border-neutral-500 w-16 absolute -bottom-6" />
          </div>

          <div class="p-3">
            <h2 class="text-md mb-2 font-extrabold">
              Nicolai Berg Andersen
            </h2>
            <p class="text-sm">
              Welcome to my website where I share development related content.
            </p>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200">
          <div class="highlight-bg-color h-3"></div>

          <div class="p-3">
            <h2 class="text-md mb-2 font-extrabold">
              Certificates
            </h2>
            <p class="text-sm mb-2">
              Find the certificates I've earned below.
            </p>

            <CredlyBadge badge-id="e74f1a47-2fa9-4e90-8fe9-7b57686b281c" width="250" height="250" />
            <CredlyBadge badge-id="7a71ead5-0c1f-41a2-99be-f17d8ed4f27d" width="250" height="250" />
            <CredlyBadge badge-id="c7e5a093-683a-4182-b1af-6079753f0336" width="250" height="250" />
            <CredlyBadge badge-id="12eebda4-0579-4ac8-97d0-75e4323158d7" width="250" height="250" />
            <CredlyBadge badge-id="857db932-779b-49a0-a364-b6e73d4c2cfc" width="250" height="250" />
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200">
          <div class="highlight-bg-color h-3"></div>

          <div class="p-3">
            <h2 class="text-md mb-2 font-extrabold">
              Social Media
            </h2>
            <div class="text-sm flex flex-col gap-1">
              <a href="https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">LinkedIn</a>

              <a href="https://github.com/niiicolai" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col gap-3">

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/learning-platform-example.png" alt="Learning Platform example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://learn.bergandersen.com/" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Learning Platform
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A website where I share technical tutorials in both Danish and English. These tutorials combine written
                material with interactive tasks.
              </p>
              <a href="https://learn.bergandersen.com/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <iframe
            src="https://niiicolai.github.io/widget-project-status-dashboard/#/dashboard?data_url=https://raw.githubusercontent.com/niiicolai/niiicolai/refs/heads/main/projects.json"
            height="370px" width="100%" style="border:none;border-radius: 0.5em;"></iframe>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/ai-example-page.png" alt="AI website example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://bergandersen.com/ai" target="_blank" class="text-xl block font-extrabold hover:underline">
              AI Projects
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Showcasing projects built with artificial intelligence tools, such as OpenCode.
              </p>
              <a href="https://bergandersen.com/ai" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <iframe src="https://niiicolai.github.io/widget-github-user-tracker/#/widget?github_username=niiicolai"
            height="555px" width="100%" style="border:none;border-radius: 0.5em;"></iframe>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/c7pixel.png" alt="C7pixel example" class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://c7pixel.com/" target="_blank" class="text-xl block font-extrabold hover:underline">
              C7Pixel
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A website I use for showcasing games.
              </p>
              <a href="https://c7pixel.com/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <iframe src="https://niiicolai.github.io/widget-ping-pong-game/#/ping-pong" height="510px" width="100%"
            frameborder="0" scrolling="no" style="border:none;border-radius: 0.5em;">
          </iframe>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/two-easy-engine.png" alt="TwoEasyEngine example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.bergandersen.com/two-easy-engine/" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              TwoEasyEngine
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                TwoEasyEngine is a lightweight 2D rendering library built on HTML5 Canvas. It provides a clean,
                object-oriented API for creating interactive scenes, managing meshes, controlling cameras, and animating
                objects, with minimal setup.
              </p>
              <a href="https://www.bergandersen.com/two-easy-engine/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <iframe
            src="https://niiicolai.github.io/widget-github-repo-tracker/#/dashboard?github_username=niiicolai&repository_name=two-easy-engine"
            height="537px" width="100%" style="border:none;border-radius: 0.5em;"></iframe>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/interactive-3d-site.png" alt="Interactive 3D Site example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <router-link to="/os" class="text-xl block font-extrabold hover:underline">
              Interactive 3D Site
            </router-link>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                An interactive 3D environment built with Three.js, simulating a desktop setup where users can explore a
                rendered computer and interact with a full 2D overlay. Features include a fake browser, a light
                customization program, a painting tool, and an integrated Snake game.
              </p>
              <router-link to="/os" class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </router-link>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <iframe src="https://niiicolai.github.io/widget-snake-game/#/snake" height="810px" width="100%"
            frameborder="0" scrolling="no" style="border:none;border-radius: 0.5em;">
          </iframe>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/coding-challenges.png" alt="Coding Challenges example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://coding-challenges.bergandersen.com/" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Coding Challenges
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A prototype featuring a collection of structured logical challenges focused on improving foundational
                coding and algorithmic thinking skills.
              </p>
              <a href="https://coding-challenges.bergandersen.com/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vector-math-animation.png" alt="Vector Fundamentals example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.bergandersen.com/vector-math-animation/" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Vector Fundamentals
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A small 2D animated demonstration of vector mathematics concepts, implemented using TwoEasyEngine and
                integrated into a React front-end.
              </p>
              <a href="https://www.bergandersen.com/vector-math-animation/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/widget-project-status-dashboard.png" alt="Project Status Dashboard example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://niiicolai.github.io/widget-project-status-dashboard" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Project Status Dashboard
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                An oldschool iframe widget component that initializes a project status dashboard by making a single,
                on-load fetch request to a specified external JSON data source.
              </p>
              <a href="https://niiicolai.github.io/widget-project-status-dashboard" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/github-repo-tracker.png" alt="GitHub Repository Tracker example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://niiicolai.github.io/widget-github-repo-tracker" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              GitHub Repository Tracker
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                An embeddable iframe widget designed to provide a real-time snapshot of a GitHub repository's stats.
              </p>
              <a href="https://niiicolai.github.io/widget-github-repo-tracker" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/github-user-tracker.png" alt="GitHub User Tracker example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://niiicolai.github.io/widget-github-user-tracker" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              GitHub User Tracker
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                An embeddable iframe widget designed to provide a real-time snapshot of a GitHub user's stats.
              </p>
              <a href="https://niiicolai.github.io/widget-github-user-tracker" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/ping-pong-game-widget.png" alt="Ping-Pong Game Widget example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://niiicolai.github.io/widget-ping-pong-game" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Ping-Pong Game Widget
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                An embeddable iframe widget with an interactive ping-pong game.
              </p>
              <a href="https://niiicolai.github.io/widget-ping-pong-game" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/snake-game-widget.png" alt="Snake Game Widget example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://niiicolai.github.io/widget-snake-game" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Snake Game Widget
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                An embeddable iframe widget with an interactive snake game.
              </p>
              <a href="https://niiicolai.github.io/widget-snake-game" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <footer class="py-3 w-full text-center rounded-md bg-neutral-900 border border-neutral-500 text-neutral-200">
          bergandersen.com © 2025 - 2026
        </footer>
      </div>
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
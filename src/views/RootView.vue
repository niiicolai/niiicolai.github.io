<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAnimatedBackground } from "../composables/useAnimatedBackground";

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

  <div class="relative z-2 flex flex-col gap-3 items-center justify-center w-full min-h-screen gap-3 p-6">
    <div class="md:w-128 lg:w-256">
      <header class="w-full h-32 flex flex-col gap-3 items-center justify-center sm:flex-row sm:h-8 sm:justify-between">
        <h1 class="highlight-color text-3xl">
          bergandersen.com
        </h1>

        <div class="h-8 flex gap-3 items-center justify-end">
          <a href="https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/" target="_blank"
            class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">LinkedIn</a>
          <div class="highlight-border-color border"></div>
          <a href="https://github.com/niiicolai" target="_blank"
            class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">GitHub</a>
        </div>
      </header>

      <hr class="border w-full highlight-border-color mt-3 mb-3" />

      <div class="mb-3 w-full h-screen rounded-md border highlight-border-color flex flex-col justify-center p-6">
        <div class="highlight-color text-center">
          <h2 class="text-xl lg:text-3xl lg:max-w-1/2 mx-auto mb-4 font-extrabold">
            Hey there! Glad you stopped by!
          </h2>
          <p class="text-md lg:text-lg lg:max-w-1/2 mx-auto">
            I'm <strong>Nicolai Berg Andersen</strong>, and I develop stuff for the web.
            I hope you will find my collection of personal projects interesting.
            The collection is a mix of fun and experimental projects.
          </p>
        </div>
      </div>

      <div class="w-full mb-3">
        <iframe
          src="https://niiicolai.github.io/widget-project-status-dashboard/#/dashboard?data_url=https://raw.githubusercontent.com/niiicolai/niiicolai/refs/heads/main/projects.json"
          height="370px" width="100%" style="border:none;border-radius: 0.5em;"></iframe>
      </div>

      <div class="grid grid-cols-1 gap-3">
        <div class="min-h-screen w-full px-10 py-20 flex flex-col items-center justify-center 
            rounded-md border highlight-border-color">

          <div class="w-full">

            <h1 class="text-4xl font-extrabold mb-6 leading-tight max-w-3xl mx-auto ">
              <a href="https://learn.bergandersen.com/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Learning Platform
              </a>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto 
                  text-gray-300 lg:text-justify">
              A place where I share technical tutorials in both Danish and English. These tutorials combine written
              material with interactive tasks.
            </p>

            <div class="mb-10 w-full flex justify-center">
              <img src="/examples/learning-platform-example.png" alt="Learning Platform example"
                class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
            </div>


            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                Tutorials
              </span>
            </div>

            <div class="flex gap-6 w-full justify-center items-center">
              <a href="https://learn.bergandersen.com/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="w-full mb-3">
          <iframe src="https://niiicolai.github.io/widget-github-user-tracker/#/widget?github_username=niiicolai"
            height="440px" width="100%" style="border:none;border-radius: 0.5em;"></iframe>
        </div>

        <div class="min-h-screen w-full px-10 py-20 flex flex-col items-center justify-center 
            rounded-md border highlight-border-color">

          <div class="w-full">

            <h1 class="text-4xl font-extrabold mb-6 leading-tight max-w-3xl mx-auto ">
              <a href="https://bergandersen.com/ai" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Projects built with artificial intelligence.
              </a>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto 
                  text-gray-300 lg:text-justify">
              Showcasing projects built with artificial intelligence tools, such as OpenCode.
            </p>

            <div class="mb-10 w-full flex justify-center">
              <img src="/examples/ai-example-page.png" alt="Learning Platform example"
                class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
            </div>


            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                LLM
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                Agentic AI
              </span>
            </div>

            <div class="flex gap-6 w-full justify-center items-center">
              <a href="https://bergandersen.com/ai" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Visit Website
              </a>
            </div>
          </div>
        </div>

        <div class="w-full mb-3">
          <iframe src="https://niiicolai.github.io/widget-ping-pong-game/#/ping-pong" height="600px" width="100%"
            frameborder="0" scrolling="no" style="border:none;border-radius: 0.5em;">
          </iframe>
        </div>

        <div class="min-h-screen w-full px-10 py-20 flex flex-col items-center justify-center 
            rounded-md border highlight-border-color">

          <div class="w-full">

            <h1 class="text-4xl font-extrabold mb-6 leading-tight max-w-3xl mx-auto ">
              <a href="https://www.bergandersen.com/two-easy-engine/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                TwoEasyEngine
              </a>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto 
                  text-gray-300 lg:text-justify">
              TwoEasyEngine is a lightweight 2D rendering library built on HTML5 Canvas. It provides a clean,
              object-oriented API for creating interactive scenes, managing meshes, controlling cameras, and animating
              objects, with minimal setup.
            </p>

            <div class="mb-10 w-full flex justify-center">
              <img src="/examples/two-easy-engine.png" alt="TwoEasyEngine example"
                class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
            </div>


            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                JavaScript
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                2D Canvas Library
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                NPM Package
              </span>
            </div>

            <div class="flex gap-6 w-full justify-center items-center">
              <a href="https://github.com/niiicolai/two-easy-engine" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                GitHub Repository
              </a>

              <a href="https://www.bergandersen.com/two-easy-engine/" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Visit Official Documentation
              </a>
            </div>
          </div>
        </div>

        <div class="w-full mb-3">
          <iframe
            src="https://niiicolai.github.io/widget-github-repo-tracker/#/dashboard?github_username=niiicolai&repository_name=two-easy-engine"
            height="414px" width="100%" style="border:none;border-radius: 0.5em;"></iframe>
        </div>

        <div class="w-full px-10 py-20 flex flex-col items-center justify-center 
            bg-gray-900 text-center rounded-md border highlight-border-color">

          <div class="w-full">

            <h1 class="text-4xl font-extrabold mb-6 
                    leading-tight text-left max-w-3xl mx-auto">
              <router-link to="/os"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Interactive 3D Site
              </router-link>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300 text-left lg:text-justify">
              An interactive 3D environment built with Three.js, simulating a desktop setup where users can explore a
              rendered computer and interact with a full 2D overlay. Features include a fake browser, a light
              customization program, a painting tool, and an integrated Snake game.
            </p>

            <div class="mb-10 w-full flex justify-center">
              <img src="/examples/interactive-3d-site.png" alt="Interactive 3D Site example"
                class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
            </div>


            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                JavaScript
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                Three.js
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                Vue.js
              </span>
            </div>

            <router-link to="/os"
              class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
              Visit Demo
            </router-link>

          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div class="w-full p-10 py-20 flex flex-col items-center justify-center 
            text-center rounded-md border highlight-border-color">

            <div class="w-full">

              <h1 class="text-4xl font-extrabold mb-6 
                    leading-tight">
                <a href="https://coding-challenges.bergandersen.com/" target="_blank"
                  class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                  Coding Challenges
                </a>
              </h1>

              <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-300">
                A prototype featuring a collection of structured logical challenges focused on improving foundational
                coding and algorithmic thinking skills.
              </p>

              <div class="mb-10 w-full flex justify-center">
                <img src="/examples/coding-challenges.png" alt="Coding Challenges example"
                  class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
              </div>


              <div class="flex flex-wrap justify-center gap-3 mb-6">
                <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                  TypeScript
                </span>
                <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                  Prototyping
                </span>
                <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                  React.js
                </span>
              </div>


              <div class="flex gap-6 w-full justify-center items-center">
                <a href="https://github.com/niiicolai/coding-challenges" target="_blank"
                  class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                  GitHub Repository
                </a>

                <a href="https://coding-challenges.bergandersen.com/" target="_blank"
                  class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                  Visit Demo
                </a>
              </div>

            </div>
          </div>

          <div class="w-full p-10 py-20 flex flex-col items-center justify-center 
            text-center rounded-md border highlight-border-color">

            <div class="w-full">

              <h1 class="text-4xl font-extrabold mb-6 
                   leading-tight">
                <a href="https://www.bergandersen.com/vector-math-animation/" target="_blank"
                  class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                  Vector Fundamentals
                </a>
              </h1>

              <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto 
                  text-gray-300">
                A small 2D animated demonstration of vector mathematics concepts, implemented using TwoEasyEngine and
                integrated into a React front-end.
              </p>

              <div class="mb-10 w-full flex justify-center">
                <img src="/examples/vector-math-animation.png" alt="Coding Challenges example"
                  class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
              </div>


              <div class="flex flex-wrap justify-center gap-3 mb-6">
                <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                  TypeScript
                </span>
                <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                  Math
                </span>
                <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                  React
                </span>
              </div>

              <div class="flex gap-6 w-full justify-center items-center">
                <a href="https://github.com/niiicolai/vector-math-animation" target="_blank"
                  class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                  GitHub Repository
                </a>

                <a href="https://www.bergandersen.com/vector-math-animation/" target="_blank"
                  class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                  Visit Demo
                </a>
              </div>

            </div>
          </div>
        </div>

        <div class="w-full px-10 py-20 flex flex-col items-center justify-center 
            bg-gray-900 text-center rounded-md border highlight-border-color">

          <div class="w-full">

            <h1 class="text-4xl text-left font-extrabold mb-6 leading-tight max-w-3xl mx-auto">
              <a href="https://niiicolai.github.io/widget-project-status-dashboard" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Project Status Dashboard
              </a>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto 
                  text-gray-300 lg:text-justify">
              An oldschool iframe widget component that initializes a project status dashboard by making a single,
              on-load fetch request to a specified external JSON data source.
            </p>

            <div class="mb-10 w-full flex justify-center">
              <img src="/examples/widget-project-status-dashboard.png" alt="Project Status Dashboard example"
                class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
            </div>


            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                JavaScript
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                Iframe Widget
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                React.js
              </span>
            </div>

            <div class="flex gap-6 w-full justify-center items-center">
              <a href="https://github.com/niiicolai/widget-project-status-dashboard" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                GitHub Repository
              </a>

              <a href="https://niiicolai.github.io/widget-project-status-dashboard" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Visit Demo
              </a>
            </div>



          </div>
        </div>

        <div class="w-full px-10 py-20 flex flex-col items-center justify-center 
            text-center rounded-md border highlight-border-color">

          <div class="w-full">

            <h1 class="text-4xl text-left font-extrabold mb-6 leading-tight max-w-3xl mx-auto">
              <a href="https://niiicolai.github.io/widget-github-repo-tracker" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                GitHub Repository Tracker
              </a>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto 
                  text-gray-300 lg:text-justify">
              An embeddable iframe widget designed to provide a real-time snapshot of a GitHub repository's stats.
            </p>

            <div class="mb-10 w-full flex justify-center">
              <img src="/examples/github-repo-tracker.png" alt="Project Status Dashboard example"
                class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
            </div>


            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                JavaScript
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                Iframe Widget
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                React.js
              </span>
            </div>

            <div class="flex gap-6 w-full justify-center items-center">
              <a href="https://github.com/niiicolai/widget-github-repo-tracker" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                GitHub Repository
              </a>

              <a href="https://niiicolai.github.io/widget-github-repo-tracker" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Visit Demo
              </a>
            </div>



          </div>
        </div>

        <div class="w-full px-10 py-20 flex flex-col items-center justify-center 
            bg-gray-900 text-center rounded-md border highlight-border-color">

          <div class="w-full">

            <h1 class="text-4xl text-left font-extrabold mb-6 leading-tight max-w-3xl mx-auto">
              <a href="https://niiicolai.github.io/widget-github-user-tracker" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                GitHub User Tracker
              </a>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto 
                  text-gray-300 lg:text-justify">
              An embeddable iframe widget designed to provide a real-time snapshot of a GitHub user's stats.
            </p>

            <div class="mb-10 w-full flex justify-center">
              <img src="/examples/github-user-tracker.png" alt="Github user tracker example"
                class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
            </div>


            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                JavaScript
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                Iframe Widget
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                React.js
              </span>
            </div>

            <div class="flex gap-6 w-full justify-center items-center">
              <a href="https://github.com/niiicolai/widget-github-user-tracker" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                GitHub Repository
              </a>

              <a href="https://niiicolai.github.io/widget-github-user-tracker" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Visit Demo
              </a>
            </div>



          </div>
        </div>

        <div class="w-full px-10 py-20 flex flex-col items-center justify-center 
            text-center rounded-md border highlight-border-color">

          <div class="w-full">

            <h1 class="text-4xl text-left font-extrabold mb-6 leading-tight max-w-3xl mx-auto">
              <a href="https://niiicolai.github.io/widget-ping-pong-game" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Ping-Pong Game Widget
              </a>
            </h1>

            <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto 
                  text-gray-300 lg:text-justify">
              An embeddable iframe widget with an interactive ping-pong game.
            </p>

            <div class="mb-10 w-full flex justify-center">
              <img src="/examples/ping-pong-game-widget.png" alt="Github user tracker example"
                class="w-full max-w-3xl rounded-xl shadow-2xl border-4 highlight-border-color" />
            </div>

            <div class="flex flex-wrap justify-center gap-3 mb-6">
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-blue-400 text-gray-900 shadow-md">
                JavaScript
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                Iframe Widget
              </span>
              <span class="text-sm font-semibold px-4 py-2 rounded-full 
                     bg-gray-700 text-gray-200">
                React.js
              </span>
            </div>

            <div class="flex gap-6 w-full justify-center items-center">
              <a href="https://github.com/niiicolai/widget-ping-pong-game" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                GitHub Repository
              </a>

              <a href="https://niiicolai.github.io/widget-ping-pong-game" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">
                Visit Demo
              </a>
            </div>



          </div>
        </div>

        <footer class="py-5 w-full text-center rounded-md highlight-color border highlight-border-color">
          bergandersen.com | 2025 - 2026
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
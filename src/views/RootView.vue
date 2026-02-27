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
      class="mx-auto p-3 md:p-0 md:py-6 md:w-128 lg:w-256 xl:w-324 flex flex-col lg:flex-row items-start justify-between gap-3 lg:gap-6">

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
              Welcome to my corner of the web! I share development projects, AI-powered tools, and automation experiments I’m passionate about. Not everything here is production-ready, you’ll find both beginner and advanced articles, lots of prototypes, and some more serious projects.
            </p>
            <p class="text-sm">
              I enjoy building everything from full-scale 3D applications and websites to automation tools.
            </p>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/html-report-img.png" alt="Project Status Dashboard example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://github.com/niiicolai/sar-cpu-data-analyzer" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              SAR CPU Data Analyzer
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A python project that can be used to analyze, test and visualize the CPU data from the SAR command.
              </p>
              <a href="https://github.com/niiicolai/sar-cpu-data-analyzer" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Repository
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/line_graph_cars.png" alt="TwoEasyEngine MCP server example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://github.com/niiicolai/two-easy-engine-mcp-server" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              TwoEasyEngine MCP server
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                The TwoEasyEngine MCP Server is a Model Context Protocol (MCP) server that demonstrates how to use the
                TwoEasyEngine 2D library to provide canvas drawing capabilities as a tool for LLM agents.
              </p>
              <a href="https://github.com/niiicolai/two-easy-engine-mcp-server" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Repository
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
          <img src="/examples/ide-example.png" alt="AI Editor Project example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://github.com/niiicolai/ai-editor" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              AI Editor Project
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                This project includes seven backend services that manage authentication, payments, LLM communication, email delivery, vector embedding generation, and RAG (Retrieval-Augmented Generation) evaluation.
              </p>
              <a href="https://github.com/niiicolai/ai-editor" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Repository
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/chat-example.png" alt="AI Editor Project example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://github.com/niiicolai/chat-app" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Chat App Project
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A Node.js Chat App implementing a relational, document, and graph database to learn about data modeling, relationships, and efficient querying across different database types.
              </p>
              <a href="https://github.com/niiicolai/chat-app" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Repository
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vr-webshop.png" alt="VR Webshop example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=gZ16FViAOOE" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              VR Webshop
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                An experimental webshop with a interface for shopping in a complete 3D environment in VR.
              </p>
              <a href="https://www.youtube.com/watch?v=gZ16FViAOOE" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/lemonade_shop.png" alt="Lemonade Shop example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=XtH3UJRc4bg" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Lemonade Shop
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A 3D simulation game designed for IOS and Android.
              </p>
              <a href="https://www.youtube.com/watch?v=XtH3UJRc4bg" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/highlands-world-of-adventures.png" alt="Highlands World of Adventures example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=0PqdNStLv1g" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Highlands World of Adventures
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A 3D platformer game designed for IOS and Android.
              </p>
              <a href="https://www.youtube.com/watch?v=0PqdNStLv1g" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/robot-invasion-wars-example.png" alt="Robot Invasion Wars example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://youtu.be/Z1_AM2or9r4" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Robot Invasion Wars
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A 3D top-down robot shooter game designed for IOS and Android.
              </p>
              <a href="https://youtu.be/Z1_AM2or9r4" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/javascript-crossplatform-game.png" alt="Robot Invasion Wars example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://youtu.be/gc0yM8eqkV0" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Europa: The Celestial Quest
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A 3D cross-platform JavaScript game designed for IOS, Android, Windows, MacOS, and Linux.
              </p>
              <a href="https://youtu.be/gc0yM8eqkV0" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/pizza-boy-example.png" alt="Pizza boy demo example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=bnutZ3ec74U" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              Pizza boy demo
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A 3D mobile game designed for IOS and Android.
              </p>
              <a href="https://www.youtube.com/watch?v=bnutZ3ec74U" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vr-tennis-demo.png" alt="VR Tennis demo example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=j8KX4hfGcYM" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              VR Tennis demo
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A quick VR Tennis prototype.
              </p>
              <a href="https://www.youtube.com/watch?v=j8KX4hfGcYM" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vr-rts-example.png" alt="VR RTS demoexample"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=Io5gkox-nzU" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              VR RTS demo
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A VR RTS prototype.
              </p>
              <a href="https://www.youtube.com/watch?v=Io5gkox-nzU" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vr-pool-example.png" alt="VR RTS demoexample"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=7Q5KKqbr0PE" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              VR Pool demo
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                An interactive pool-table in a VR shooter prototype.
              </p>
              <a href="https://www.youtube.com/watch?v=7Q5KKqbr0PE" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vending-machine-demo.png" alt="VR Vending Machines demo example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=JLVNEcMAKFM" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              VR Vending Machines demo
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Interactive vending machines in a VR shooter prototype.
              </p>
              <a href="https://www.youtube.com/watch?v=JLVNEcMAKFM" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vr-zombie-shooter-prototype.png" alt="VR Zombie Game demo example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=AUHNYBeSNi4" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              VR Zombie Game demo
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A simple VR zombie shooter prototype.
              </p>
              <a href="https://www.youtube.com/watch?v=AUHNYBeSNi4" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vr-vehicle-demo.png" alt="VR Vehicle Game demo example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=mWmPMsBIqVI" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              VR Vehicle Game demo
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A simple vehicle prototype in VR.
              </p>
              <a href="https://www.youtube.com/watch?v=mWmPMsBIqVI" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/vr-bow-example.png" alt="VR Bow demo example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://www.youtube.com/watch?v=1cWN1h5SHVo" target="_blank"
              class="text-xl block font-extrabold hover:underline">
              VR Bow demo
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A simple bow and arrow prototype in VR.
              </p>
              <a href="https://www.youtube.com/watch?v=1cWN1h5SHVo" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit Video
              </a>
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

        <div class="grid grid-cols-2 gap-3">
          <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
            <img src="/examples/review-agent-example.png" alt="Review agent example"
              class="w-full border-b border-neutral-500 h-64" />

            <div class="p-3 h-44 flex flex-col justify-between gap-2">
              <div class="flex flex-col gap-1">
                <a href="https://github.com/niiicolai/review-agent" target="_blank"
                  class="text-xl block font-extrabold hover:underline">
                  GitHub Review Agent
                </a>
                <p class="text-sm">
                  AI-powered GitHub Pull Request reviewer and comment responder bot.
                </p>
              </div>

              <a href="https://github.com/niiicolai/review-agent" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit GitHub Repository
              </a>
            </div>
          </div>

          <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
            <img src="/examples/documentation-agent.png" alt="Documentation agent example"
              class="w-full border-b border-neutral-500 h-64" />


            <div class="p-3 h-44 flex flex-col justify-between gap-2">
              <div class="flex flex-col gap-1">
                <a href="https://github.com/niiicolai/documentation-agent" target="_blank"
                  class="text-xl block font-extrabold hover:underline">
                  Documentation Agent
                </a>
                <p class="text-sm">
                  A desktop application that implements local AI through Ollama and agentic
                  workflows powered by LangChain to analyze your documents and automatically generate documentation.
                </p>
              </div>


              <a href="https://github.com/niiicolai/documentation-agent" target="_blank"
                class="highlight-color highlight-color-hover hover:underline">
                Visit GitHub Repository
              </a>
            </div>
          </div>
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
          <iframe
            src="https://niiicolai.github.io/widget-project-status-dashboard/#/dashboard?data_url=https://raw.githubusercontent.com/niiicolai/niiicolai/refs/heads/main/projects.json"
            height="370px" width="100%" style="border:none;border-radius: 0.5em;"></iframe>
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
          <iframe src="https://niiicolai.github.io/widget-github-user-tracker/#/widget?github_username=niiicolai"
            height="555px" width="100%" style="border:none;border-radius: 0.5em;"></iframe>
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

      <div class="w-full lg:w-96 flex flex-col gap-3">

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

              <a href="https://builtin.com/authors/nicolai-andersen" target="_blank"
                class="highlight-color highlight-color-hover hover:underline transition-colors duration-200">Built In</a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/2d-hunting-game.gif" alt="2D Hunting Game example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/better-programming/create-a-simple-2d-hunting-game-with-javascript-and-html-1cb78e01a69e"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              2D Hunting Game
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A JavaScript guide to build a simple 2D hunting game with elements such as animations, particle systems,
                and collision checks.
              </p>
              <a href="https://medium.com/better-programming/create-a-simple-2d-hunting-game-with-javascript-and-html-1cb78e01a69e"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/2d-runner-game.gif" alt="2D Endless Runner Game example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/better-programming/how-to-build-a-2d-endless-runner-game-with-javascript-and-html-11940ab797bf"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              2D Endless Runner Game
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A JavaScript guide to build a simple 2D endless runner game using an HTML canvas element and JavaScript.
              </p>
              <a href="https://medium.com/better-programming/how-to-build-a-2d-endless-runner-game-with-javascript-and-html-11940ab797bf"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/video-player-guide.webp" alt="Custom Video Player example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/better-programming/a-tutorial-to-the-html-video-element-b8b9a4bf2f76"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Custom Video Player
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn to modify HTML video elements to give them a bit more refreshing design.
              </p>
              <a href="https://medium.com/better-programming/a-tutorial-to-the-html-video-element-b8b9a4bf2f76"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/tic-tac-toe.gif" alt="Tic-Tac-Toe Game example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/better-programming/create-tic-tac-toe-with-html-and-javascript-ea1c245a9f1f"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Tic-Tac-Toe Game
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn to create Tic-Tac-Toe with an HTML Canvas element and JavaScript.
              </p>
              <a href="https://medium.com/better-programming/create-tic-tac-toe-with-html-and-javascript-ea1c245a9f1f"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/space-invaders-game.gif" alt="Space Shooter Game example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/better-programming/create-the-classic-space-invaders-game-af087786d63b"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Space Shooter Game
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn to create a space shooter game in JavaScript.
              </p>
              <a href="https://medium.com/better-programming/create-the-classic-space-invaders-game-af087786d63b"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/2d-movement-games.gif" alt="Introduction to movement in 2D games example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/@niiicolai/an-introduction-to-movement-in-2d-games-281ff3b58533"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Introduction to movement in 2D games
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                 Learn some of the concepts behind moving a 2D object in a game by simple Euclidean vector operations.
              </p>
              <a href="https://medium.com/@niiicolai/an-introduction-to-movement-in-2d-games-281ff3b58533"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/snake-game.gif" alt="Snake Game example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/better-programming/create-the-classic-snake-game-with-processing-and-java-18f9db48fac4"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Snake Game
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                 Learn to implement the classic snake game in Processing.
              </p>
              <a href="https://medium.com/better-programming/create-the-classic-snake-game-with-processing-and-java-18f9db48fac4"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/grayscale-example.gif" alt="Digital Image Processing: Grayscale example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/@niiicolai/digital-image-processing-grayscale-442461769fd2"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Digital Image Processing: Grayscale
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                 Introduces a method that can be used to grayscale an image.
              </p>
              <a href="https://medium.com/@niiicolai/digital-image-processing-grayscale-442461769fd2"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/webscrape-example.gif" alt="Extract news information using Python and Scrapy example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/@niiicolai/extract-news-information-using-python-and-scrapy-b523585c95c9"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Extract news information using Python and Scrapy
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Explain the basics of setting up a Scrapy application and how to implement a spider that can crawl and extract information from news pages.
              </p>
              <a href="https://medium.com/@niiicolai/extract-news-information-using-python-and-scrapy-b523585c95c9"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/learn-python-example.png" alt="Stop worrying and start coding: Python Edition example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/@niiicolai/stop-worrying-and-start-coding-python-edition-2c8b75e9cd0f"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Stop worrying and start coding: Python Edition
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn the most general concepts necessary to learn to stop worrying and start coding: Python.
              </p>
              <a href="https://medium.com/@niiicolai/stop-worrying-and-start-coding-python-edition-2c8b75e9cd0f"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/learn-python-example.png" alt="Design pattern: Guard clause example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/@niiicolai/design-pattern-guard-clause-c050a26dcf35"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Design pattern: Guard clause
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn a simple pattern known as the guard clause and it can be used to avoid writing complex nested if-statements
              </p>
              <a href="https://medium.com/@niiicolai/design-pattern-guard-clause-c050a26dcf35"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/list-comprehension.png" alt="Design pattern: Guard clause example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/@niiicolai/python-basics-list-comprehension-601fe1e1286d"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Python: List comprehension
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                The article looks into the basics of list comprehension and how to use it.
              </p>
              <a href="https://medium.com/@niiicolai/python-basics-list-comprehension-601fe1e1286d"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <img src="/examples/mysql-docker-example.png" alt="Deploy and Automate MySQL Server on Ubuntu Using Docker and GitHub Actions example"
            class="w-full border-b border-neutral-500" />

          <div class="p-3 flex flex-col gap-2">
            <a href="https://medium.com/better-programming/how-to-deploy-and-automate-mysql-server-on-ubuntu-using-docker-and-github-actions-b7cda5075eaf"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              Deploy and Automate MySQL Server on Ubuntu Using Docker and GitHub Actions
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                A guide to create and manage MySQL servers using Docker and GitHub Actions.
              </p>
              <a href="https://medium.com/better-programming/how-to-deploy-and-automate-mysql-server-on-ubuntu-using-docker-and-github-actions-b7cda5075eaf"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <div class="p-3 flex flex-col gap-2">
            <a href="https://builtin.com/software-engineering-perspectives/iframe"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              What Is an iFrame?
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn about the HTML iFrame element.
              </p>
              <a href="https://builtin.com/software-engineering-perspectives/iframe"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <div class="p-3 flex flex-col gap-2">
            <a href="https://builtin.com/software-engineering-perspectives/waterfall-methodology"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              What Is the Waterfall Methodology?
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn about the Waterfall Methodology.
              </p>
              <a href="https://builtin.com/software-engineering-perspectives/waterfall-methodology"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <div class="p-3 flex flex-col gap-2">
            <a href="https://builtin.com/software-engineering-perspectives/json"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              What Is JSON?
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn more about JSON.
              </p>
              <a href="https://builtin.com/software-engineering-perspectives/json"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <div class="p-3 flex flex-col gap-2">
            <a href="https://builtin.com/data-science/pandas"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              What Is Pandas?
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Get started with Pandas.
              </p>
              <a href="https://builtin.com/data-science/pandas"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <div class="p-3 flex flex-col gap-2">
            <a href="https://builtin.com/software-engineering-perspectives/ruby-on-rails"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              What Is Ruby on Rails?
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn more about Ruby on Rails.
              </p>
              <a href="https://builtin.com/software-engineering-perspectives/ruby-on-rails"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
          </div>
        </div>

        <div class="bg-neutral-900 border border-neutral-500 rounded-md text-neutral-200 overflow-hidden">
          <div class="p-3 flex flex-col gap-2">
            <a href="https://builtin.com/software-engineering-perspectives/ruby-on-rails"
              target="_blank" class="text-xl block font-extrabold hover:underline">
              What Is Ruby on Rails?
            </a>
            <div class="flex flex-col gap-1 text-sm">
              <p>
                Learn more about Ruby on Rails.
              </p>
              <a href="https://builtin.com/software-engineering-perspectives/ruby-on-rails"
                target="_blank" class="highlight-color highlight-color-hover hover:underline">
                Visit Article
              </a>
            </div>
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
            <CredlyBadge badge-id="7c53fc6c-6262-442e-9583-3a0fc9ed2abb" width="250" height="250" />
          </div>
        </div>
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
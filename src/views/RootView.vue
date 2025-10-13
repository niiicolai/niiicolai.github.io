<script setup>
</script>

<template>
  <div class="main-bg flex flex-col items-center justify-center h-screen text-center gap-3">
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
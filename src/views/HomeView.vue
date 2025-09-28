<script setup>
import { ref } from 'vue'
import Article from '../components/Article.vue'
import Badge from '../components/Badge.vue'
import articlesData from '../assets/articles'

const articles = ref(articlesData);
const articleRefs = ref(Array(articles.value.length).fill(null));
const frontpageRef = ref();
const authorRef = ref();
const disclaimerRef = ref();
const prerequisiteRef = ref();
const showTableOfContents = ref(false);

const scrollTo = (el) => {
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    showTableOfContents.value = false;
  }
}

const toggleTableOfContents = () => {
  showTableOfContents.value = !showTableOfContents.value;
}
</script>

<template>
  <div class="absolute top-3 right-3">
    <router-link to="/os" class="highlight-color highlight-color-hover italic transition-colors duration-200">
      Looking for my interactive 3D site?
    </router-link>
  </div>

  <div
    :class="`${showTableOfContents ? '' : 'hidden'} fixed z-10 top-0 bottom-0 left-0 bg-black border-r border-black text-white lg:flex flex-col items-center justify-start`">
    <div class="p-6 gap-3 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-3 border-b highlight-border-color pb-3 w-full">
        <h1 class="text-xl font-bold">
          Table of Contents
        </h1>
      </div>
      <ul class="flex flex-col gap-2">
        <li>
          <button class="highlight-color highlight-color-hover text-base hover:underline cursor-pointer"
            :onClick="() => scrollTo(frontpageRef)">
            Frontpage
          </button>
          <div class="text-xs text-gray-400">
            Welcome
          </div>
        </li>
        <li>
          <button class="highlight-color highlight-color-hover text-base hover:underline cursor-pointer"
            :onClick="() => scrollTo(disclaimerRef)">
            Disclaimer
          </button>
          <div class="text-xs text-gray-400">
            Important Notice
          </div>
        </li>
        <li>
          <button class="highlight-color highlight-color-hover text-base hover:underline cursor-pointer" :onClick="() => scrollTo(authorRef)">
            The Author
          </button>
          <div class="text-xs text-gray-400">
            Background Information
          </div>
        </li>
        <li>
          <button class="highlight-color highlight-color-hover text-base hover:underline cursor-pointer"
            :onClick="() => scrollTo(prerequisiteRef)">
            Prerequisite
          </button>
          <div class="text-xs text-gray-400">
            How to follow the examples
          </div>
        </li>
        <li v-for="(article, idx) in articles" :key="idx">
          <button class="highlight-color highlight-color-hover text-base hover:underline cursor-pointer"
            :onClick="() => scrollTo(articleRefs[idx])">
            {{ article.header }}
          </button>
          <div class="text-xs text-gray-400">{{ article.subheader }}</div>
        </li>
      </ul>
    </div>
  </div>
  <div class="lg:hidden fixed left-3 bottom-3 z-20">
    <button class="cursor-pointer rounded-full p-2 highlight-bg-color highlight-bg-color-hover shadow-full" :onClick="() => toggleTableOfContents()">
      <!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
      <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="2em" viewBox="0 0 640 640">
        <path
          d="M96 160C96 142.3 110.3 128 128 128L512 128C529.7 128 544 142.3 544 160C544 177.7 529.7 192 512 192L128 192C110.3 192 96 177.7 96 160zM96 320C96 302.3 110.3 288 128 288L512 288C529.7 288 544 302.3 544 320C544 337.7 529.7 352 512 352L128 352C110.3 352 96 337.7 96 320zM544 480C544 497.7 529.7 512 512 512L128 512C110.3 512 96 497.7 96 480C96 462.3 110.3 448 128 448L512 448C529.7 448 544 462.3 544 480z" />
      </svg>
    </button>
  </div>

  <div :ref="div => frontpageRef = div"
    class="w-full h-screen main-bg text-white flex flex-col items-center justify-center lg:pl-64">
    <div class="p-6 w-full lg:w-1/2 mx-auto gap-4 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-1 border-b highlight-border-color pb-3 w-full">
        <h1 class="text-2xl font-bold">
          bergandersen.com
        </h1>
        <p class="text-md">
          Weekly practical examples of common vulnerabilities, along with actionable strategies for mitigating them.
        </p>
      </div>
      <p class="text-sm text-gray-300">
        By Nicolai Berg Andersen | Started: 09/14/2025 | Articles: {{ articles.length }}
      </p>
    </div>
  </div>

  <div class="w-full h-screen secondary-bg text-white flex flex-col items-center justify-center lg:pl-64"
    :ref="div => disclaimerRef = div">
    <div class="p-6 w-full lg:w-1/2 mx-auto mx-auto gap-3 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-1 border-b highlight-border-color pb-3 w-full">
        <h1 class="text-xl font-bold">
          Disclaimer
        </h1>
      </div>
      <p class="text-sm">
        All content on this site is provided for educational purposes only. The examples shown are intentionally
        insecure and must not be used in production systems. The author accepts no responsibility for misuse,
        damage, or
        consequences resulting from applying these examples outside a controlled environment.
      </p>
    </div>
  </div>

  <div class="w-full h-screen main-bg text-white flex flex-col items-center justify-center lg:pl-64"
    :ref="div => authorRef = div">
    <div class="p-6 w-full lg:w-1/2 mx-auto gap-3 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-1 border-b highlight-border-color pb-3 w-full">
        <h1 class="text-xl font-bold">
          The Author
        </h1>
      </div>
      <p class="text-sm">
        Hi, I'm Nicolai.
      </p>
      <p class="text-sm">
        I have a broad interest in many areas of software development, including JavaScript, Ruby, Python, image
        processing, and microcontrollers. This part of my website is dedicated to security.
      </p>
      <p class="text-sm">
        If you have any questions or feedback, feel free to contact me at: <a href="mailto:contact@bergandersen.com"
          class="highlight-color highlight-color-hover hover:underline">contact@bergandersen.com</a>
      </p>
    </div>
  </div>

  <div class="w-full h-screen secondary-bg text-white flex flex-col items-center justify-center lg:pl-64"
    :ref="div => prerequisiteRef = div">
    <div class="p-6 w-full lg:w-1/2 mx-auto gap-3 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-1 border-b highlight-border-color pb-3 w-full">
        <h1 class="text-xl font-bold">
          Prerequisite
        </h1>
      </div>
      <p class="text-sm">
        If you want to follow the examples on this page, make sure you have the following installed:
      </p>
      <ul class="flex flex-row gap-2 flex-wrap">
        <li>
          <Badge url="http://nodejs.org/en" text="Node.js" color="blue" />
        </li>
        <li>
          <Badge url="https://www.mysql.com/products/community/" text="MySQL Community Edition" color="red" />
        </li>
      </ul>
      <p class="text-sm">
        Some examples also require familiarity with these NPM dependencies:
      </p>
      <ul class="flex flex-row gap-2 flex-wrap">
        <li>
          <Badge url="https://www.npmjs.com/package/express?activeTab=readme" text="express" color="green" />
        </li>
        <li>
          <Badge url="https://www.npmjs.com/package/mysql2#installation" text="mysql2" color="yellow" />
        </li>
        <li>
          <Badge url="https://www.npmjs.com/package/dotenv" text="dotenv" color="purple" />
        </li>
      </ul>
      <p class="text-sm">
        For convenience, you may also want:
      </p>
      <ul class="flex flex-row gap-2 flex-wrap">
        <li>
          <Badge url="https://www.mysql.com/products/workbench/" text="MySQL Workbench" color="gray" />
        </li>
        <li>
          <Badge url="https://curl.se/" text="cURL" color="orange" />
        </li>
      </ul>
      <p class="text-sm italic">
        Note: Required tools and dependencies are always listed at the beginning of the article.
      </p>
      <p class="text-sm italic">
        Note: All examples require Node.js.
      </p>
    </div>
  </div>

  <div class="w-full min-h-screen gap-0 flex flex-col items-center justify-center lg:pl-64">
    <div class="w-full" v-for="(article, idx) in articles" :key="idx" :ref="el => articleRefs[idx] = el">
      <Article :idx="idx" :article="article"></Article>
    </div>
  </div>

  <footer class="p-6 text-center main-bg text-white lg:pl-64">
    bergandersen.com © 2025 Nicolai Berg Andersen. All rights reserved.
  </footer>
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
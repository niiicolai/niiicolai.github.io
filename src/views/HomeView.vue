<script setup>
import { ref } from 'vue'
import Article from '../components/Article.vue'
import articlesData from '../assets/articles'

const articles = ref(articlesData)

const articleRefs = ref(Array(articles.value.length).fill(null))
const scrollToArticle = (index) => {
  const el = articleRefs.value[index]
  console.log(articleRefs.value)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const authorRef = ref();
const scrollToAuthor = () => {
  if (authorRef.value)
    authorRef
      .value
      .scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const disclaimerRef = ref();
const scrollToDisclaimer = () => {
  if (disclaimerRef.value)
    disclaimerRef
      .value
      .scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="absolute top-3 right-3">
    <router-link to="/os" class="text-orange-500 hover:text-orange-400 italic transition-colors duration-200">
      Looking for my interactive 3D site?
    </router-link>
  </div>

  <div class="w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <div class="p-6 md:w-1/2 mx-auto gap-4 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-1 border-b border-orange-500 pb-3 w-full">
        <h1 class="text-2xl font-bold">
          bergandersen.com
        </h1>
        <p class="text-md">
          Weekly practical examples of common Node.js vulnerabilities, along with actionable strategies for mitigating
          them.
        </p>
      </div>
      <p class="text-sm text-gray-300">
        By Nicolai Berg Andersen | Started: 09/14/2025 | Articles: 1
      </p>
    </div>
  </div>

  <div class="w-full h-screen bg-gray-800 text-white flex flex-col items-center justify-center">
    <div class="p-6 md:w-1/2 mx-auto gap-3 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-3 border-b border-orange-500 pb-3 w-full">
        <h1 class="text-xl font-bold">
          Table of Contents
        </h1>
      </div>
      <ul class="flex flex-col gap-2">
        <li>
          <button class="text-orange-600 text-base hover:underline cursor-pointer"
            :onClick="() => scrollToDisclaimer()">
            Disclaimer
          </button>
          <div class="text-xs text-gray-500">
            Important Notice
          </div>
        </li>
        <li>
          <button class="text-orange-600 text-base hover:underline cursor-pointer" :onClick="() => scrollToAuthor()">
            The Author
          </button>
          <div class="text-xs text-gray-500">
            Background Information
          </div>
        </li>
        <li v-for="(article, idx) in articles" :key="idx">
          <button class="text-orange-600 text-base hover:underline cursor-pointer"
            :onClick="() => scrollToArticle(idx)">
            {{ article.header }}
          </button>
          <div class="text-xs text-gray-500">{{ article.subheader }}</div>
        </li>
      </ul>
    </div>
  </div>

  <div class="w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center"
    :ref="div => disclaimerRef = div">
    <div class="p-6 md:w-1/2 mx-auto mx-auto gap-3 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-1 border-b border-orange-500 pb-3 w-full">
        <h1 class="text-xl font-bold">
          Disclaimer
        </h1>
      </div>
      <p class="text-sm">
        All content on this site is provided for educational purposes only. The examples shown are intentionally
        insecure and must not be used in production systems. The author accepts no responsibility for misuse, damage, or
        consequences resulting from applying these examples outside a controlled environment.
      </p>
    </div>
  </div>

  <div class="w-full h-screen bg-gray-800 text-white flex flex-col items-center justify-center"
    :ref="div => authorRef = div">
    <div class="p-6 md:w-1/2 mx-auto gap-3 flex flex-col items-start justify-center">
      <div class="flex flex-col gap-1 border-b border-orange-500 pb-3 w-full">
        <h1 class="text-xl font-bold">
          The Author
        </h1>
      </div>
      <p class="text-sm">
        Hi, I'm Nicolai.
      </p>
      <p class="text-sm">
        I have a broad interest in many areas of software development, including JavaScript, Ruby, Python, image
        processing, and microcontrollers. This part of my website is dedicated to security in Node.js.
      </p>
      <p class="text-sm">
        I recently graduated with a bachelor’s degree in Software Development and also hold an AP Graduate degree in
        Computer Science, along with a vocational education in IT support.
      </p>
      <p class="text-sm">
        I enjoy exploring security topics and sharing practical insights with developers.
      </p>
      <p class="text-sm">
        If you have any questions or feedback, feel free to contact me at: <a href="mailto:contact@bergandersen.com"
          class="text-orange-600 hover:underline">contact@bergandersen.com</a>
      </p>
    </div>
  </div>

  <div class="w-full min-h-screen gap-0 flex flex-col items-center justify-center">
    <div class="w-full" v-for="(article, idx) in articles" :key="idx" :ref="el => articleRefs[idx] = el">
      <Article :idx="idx" :article="article"></Article>
    </div>
  </div>

  <footer class="p-6 text-center bg-gray-900 text-white">
    bergandersen.com © 2025 Nicolai Berg Andersen. All rights reserved.
  </footer>
</template>

<style>
.markdown h1 {
  font-size: 2.25rem;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown h2 {
  font-size: 1.75rem;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown h4 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown h5 {
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown h6 {
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.markdown p {
  margin: 1em 0;
}

.markdown ul,
.markdown ol {
  margin: 1em 0 1em 2em;
  padding-left: 1.5em;
}

.markdown li {
  margin-bottom: 0.5em;
}

.markdown blockquote {
  border-left: 4px solid #cbd5e1;
  background: #f8fafc;
  color: #64748b;
  padding: 0.5em 1em;
  margin: 1em 0;
  font-style: italic;
}

.markdown a {
  color: #2563eb;
  text-decoration: underline;
}

.markdown code {
  background: #f1f5f9;
  color: #e11d48;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  font-family: 'Fira Mono', monospace;
  font-size: 0.95em;
}

.markdown pre {
  background: #f1f5f9;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown hr {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2em 0;
}
</style>
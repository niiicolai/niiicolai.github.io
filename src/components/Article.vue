<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import Badge from './Badge.vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

const props = defineProps({
    article: {
        type: Object,
        required: true
    },
    idx: {
        type: Number,
        required: true
    }
});

function estimateReadingTimeMarkdown(markdown) {
  const text = markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')   // Remove images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // Remove links but keep text
    .replace(/[`*_~>#-]/g, '')          // Remove formatting characters
    .replace(/\n+/g, ' ')               // Collapse newlines
    .trim();

  // Count words
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(wordCount / 200);

  return minutes;
}

const renderedBody = computed(() => md.render(props.article.body));
const readingTime = computed(() => estimateReadingTimeMarkdown(props.article.body));

</script>

<template>
    <article class="w-full" :class="`${idx % 2 == 1 ? 'secondary-bg text-white' : 'main-bg text-white'}`">
        <div class="p-6 lg:w-1/2 mx-auto py-24 flex flex-col gap-6">
            <header>
                <div
                    class="mb-2 border-b highlight-border-color pb-3 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-3">
                    <div>
                        <h2 class="text-4xl font-bold mb-3">
                            {{ article.header }}
                        </h2>
                        
                        <h3 class="text-xl text-gray-100">
                            {{ article.subheader }}
                        </h3>
                    </div>
                </div>


                <div class="flex flex-row gap-3 lg:items-center justify-center lg:justify-start">
                    <div class="text-sm text-gray-100 flex gap-3">
                        <span>Written: {{ article.published }}</span>
                        <span>Last modified: {{ article.modified }}</span>
                        <span>Reading time: {{ readingTime }} minutes</span>
                    </div>
                </div>
            </header>

            <div class="flex flex-col gap-3">
                <div class="flex flex-col lg:flex-row items-center lg:justify-between gap-2">
                    <div class="flex items-center text-center md:text-left gap-1 text-gray-100 font-semibold">
                        <span>Prerequisite: </span>
                    </div>

                    <div class="flex items-center gap-1 flex-wrap">
                        <Badge v-for="dependency in article.dependencies" :key="dependency.text" :text="dependency.text"
                            :color="dependency.color" :url="dependency.url" />
                    </div>
                </div>

                <div class="markdown">
                    <div class="leading-relaxed text-base" v-html="renderedBody"></div>
                </div>
            </div>
        </div>
    </article>
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
    list-style-type: disc;
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
    color: #a6e22e;
    hover: #a6e22e;
    text-decoration: underline;
    word-wrap: break-word;
}
.markdown a:hover {
    color: #8abb28;
}

.markdown pre {
    padding: 1em;
    border-radius: 6px;
    overflow-x: auto;
}

.markdown p code {
    padding: 0em 0.5em;
    border-radius: 4px;
    color: #a6e22e;
    display: inline-block;
    background-color: #333333e7;
}

.markdown hr {
    border: none;
    border-top: 1px solid #e5e7eb;
    margin: 2em 0;
}
</style>
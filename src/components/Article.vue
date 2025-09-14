<script setup>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()
const props = defineProps({
    article: {
        type: Object,
        required: true
    },
    idx: {
        type: Number,
        required: true
    }
})
const renderedBody = computed(() => md.render(props.article.body));

</script>

<template>
    <article class="w-full" :class="`${idx % 2 == 1 ? 'bg-gray-900 text-white' : 'bg-gray-100'}`">
        <div class="max-w-2xl w-1/2 mx-auto py-24 p-6 flex flex-col gap-6">
            <header>
                <h2 class="text-4xl font-bold mb-2">
                    {{ article.header }}
                </h2>
                <p class="text-lg">
                    {{ article.subheader }}
                </p>
                <div class="mt-2 text-sm flex gap-4">
                    <span>Published: {{ article.published }}</span>
                    <span>Last modified: {{ article.modified }}</span>
                </div>
            </header>
            <div class="flex flex-col gap-3">
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
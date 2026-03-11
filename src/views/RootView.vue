<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useAnimatedBackground } from "../composables/useAnimatedBackground";
import ArticleCarousel from "../components/ArticleCarousel.vue";
import FeaturedCarousel from "../components/FeaturedCarousel.vue";
import CertificateCarousel from "../components/CertificateCarousel.vue";
import { centerCards, rightCards, carouselCards, featuredCards } from "../data/portfolioCards.js";

const showBackToTop = ref(false);

const onScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const canvasRef = ref(null);
const animatedBackground = useAnimatedBackground();

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dispose = animatedBackground.init(canvas);
  window.addEventListener('scroll', onScroll);
  onBeforeUnmount(() => {
    dispose();
    window.removeEventListener('scroll', onScroll);
  });
});

const stack = [
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Node.js', color: '#8cc84b' },
  { name: 'React', color: '#61dafb' },
  { name: 'Vue', color: '#42b883' },
  { name: 'Three.js', color: '#a6e22e' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'MySQL', color: '#4479a1' },
  { name: 'Cypress', color: '#17202c' },
  { name: 'Python', color: '#3776ab' },
];

const certificates = [
  { type: 'custom', name: 'Claude Code in Action', issuer: 'Anthropic / Skilljar', link: 'https://verify.skilljar.com/c/7n9gx6yqmyey' },
  { type: 'credly', badgeId: 'e74f1a47-2fa9-4e90-8fe9-7b57686b281c' },
  { type: 'credly', badgeId: '7a71ead5-0c1f-41a2-99be-f17d8ed4f27d' },
  { type: 'credly', badgeId: 'c7e5a093-683a-4182-b1af-6079753f0336' },
  { type: 'credly', badgeId: '12eebda4-0579-4ac8-97d0-75e4323158d7' },
  { type: 'credly', badgeId: '857db932-779b-49a0-a364-b6e73d4c2cfc' },
  { type: 'credly', badgeId: '7c53fc6c-6262-442e-9583-3a0fc9ed2abb' },
];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.04, rootMargin: '0px 0px -16px 0px' }
);

const vReveal = {
  mounted(el) {
    el.classList.add('reveal');
    revealObserver.observe(el);
  },
  unmounted(el) {
    revealObserver.unobserve(el);
  },
};
</script>

<template>
  <canvas ref="canvasRef" class="fixed w-full h-screen z-1" aria-hidden="true" />

  <div class="relative z-2">
    <div class="w-full h-8 bg-neutral-950 border-b border-neutral-700 flex items-center px-4 gap-3" aria-hidden="true">
      <span class="w-3 h-3 rounded-full bg-red-500 opacity-80"></span>
      <span class="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></span>
      <span class="w-3 h-3 rounded-full bg-accent opacity-80"></span>
      <span class="ml-2 text-xs text-neutral-500 font-mono">~/bergandersen.com</span>
    </div>

    <div
      class="mx-auto p-3 md:p-0 md:py-6 md:w-128 lg:w-256 xl:w-324 flex flex-col lg:flex-row items-start justify-between gap-3 lg:gap-6">

      <!-- Left column -->
      <div class="w-full lg:w-96 flex flex-col gap-3">
        <div v-reveal class="card">
          <div class="relative accent-bg p-3 h-16 mb-5" aria-hidden="true">
            <img src="/personal-image.png" alt="Nicolai Berg Andersen profile photo"
              class="rounded-full border-2 border-neutral-700 w-16 absolute -bottom-6 shadow-lg" />
          </div>
          <div class="p-3 pt-2">
            <div class="flex items-center gap-2 mb-1">
              <h1 class="text-md font-extrabold text-neutral-100">Nicolai Berg Andersen</h1>
              <span class="status-dot" aria-hidden="true"></span>
            </div>
            <p class="text-xs font-mono text-neutral-400 mb-3" aria-label="Role: Full-stack developer">// Full-stack
              developer</p>
            <a href="https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/" target="_blank"
              rel="noopener noreferrer" class="opportunity-badge"
              aria-label="Open to opportunities — contact me on LinkedIn">
              <span class="opportunity-dot" aria-hidden="true"></span>
              <span>Open to opportunities</span>
              <span class="opportunity-platform">LinkedIn →</span>
            </a>
          </div>
        </div>

        <div v-reveal class="card">
          <div class="accent-bg h-1 rounded-t-md" aria-hidden="true"></div>
          <div class="p-3">
            <h2 class="text-sm font-mono text-neutral-400 mb-3">// tech_stack</h2>
            <ul class="flex flex-wrap gap-2" role="list">
              <li v-for="item in stack" :key="item.name" class="stack-chip">
                <span class="stack-dot" :style="{ backgroundColor: item.color }" aria-hidden="true"></span>
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>

        <div v-reveal class="card">
          <div class="accent-bg h-1 rounded-t-md" aria-hidden="true"></div>
          <div class="p-3">
            <h2 class="text-sm font-mono text-neutral-400 mb-3">// social_links</h2>
            <div class="flex flex-col gap-2">
              <a href="https://github.com/niiicolai" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm link-accent transition-colors duration-200">
                <span class="font-mono text-neutral-500" aria-hidden="true">$</span> github.com/niiicolai
              </a>
              <a href="https://builtin.com/authors/nicolai-andersen" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm link-accent transition-colors duration-200">
                <span class="font-mono text-neutral-500" aria-hidden="true">$</span> builtin.com/authors/nicolai...
              </a>
              <a href="https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/" target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm link-accent transition-colors duration-200">
                <span class="font-mono text-neutral-500" aria-hidden="true">$</span> linkedin.com/in/nicolai...
              </a>
            </div>
          </div>
        </div>

        <div v-reveal class="card overflow-hidden">
          <CertificateCarousel :items="certificates" />
        </div>
      </div>

      <!-- Center column -->
      <div class="w-full flex flex-col gap-3">
        <div v-reveal class="card p-4">
          <h2 class="text-sm font-mono text-neutral-400 mb-1">// introduction</h2>
          <p class="text-sm text-neutral-300 mb-2">
            Welcome to my corner of the web! I share development projects, AI-powered tools, and automation
            experiments I'm passionate about. Not everything here is production-ready. You'll find both beginner and
            advanced articles, lots of prototypes, and some more serious projects.
            I enjoy building everything from full-scale 3D applications and websites to automation tools.
          </p>
        </div>

        <div v-reveal class="card overflow-hidden">
          <FeaturedCarousel :items="featuredCards" />
        </div>

        <div v-reveal class="card card-hover overflow-hidden">
          <ArticleCarousel :items="carouselCards" />
        </div>

        <template v-for="card in centerCards" :key="card.iframe ? card.src : card.title">
          <div v-reveal class="card overflow-hidden" :class="{ 'card-hover': !card.iframe }">
            <iframe v-if="card.iframe" :src="card.src" :height="card.height" width="100%"
              style="border:none;display:block;" loading="lazy" :title="card.title || 'Embedded widget'"></iframe>
            <template v-else>
              <img v-if="card.image" :src="card.image" :alt="card.imageAlt" loading="lazy"
                class="w-full border-b border-neutral-700" />
              <div class="p-3 flex flex-col gap-2">
                <div class="flex items-start justify-between gap-2">
                  <router-link v-if="card.routerLink" :to="card.link"
                    class="text-base font-bold text-neutral-100 hover:text-accent transition-colors">{{ card.title
                    }}</router-link>
                  <a v-else :href="card.link" target="_blank" rel="noopener noreferrer"
                    class="text-base font-bold text-neutral-100 hover:text-accent transition-colors">{{ card.title
                    }}</a>
                  <span v-if="card.tag" class="tag" aria-hidden="true">{{ card.tag }}</span>
                </div>
                <p class="text-sm text-neutral-400">{{ card.description }}</p>
                <router-link v-if="card.routerLink" :to="card.link" class="link-accent text-sm">{{ card.linkText }}
                  →</router-link>
                <a v-else :href="card.link" target="_blank" rel="noopener noreferrer" class="link-accent text-sm">{{
                  card.linkText }} →</a>
              </div>
            </template>
          </div>
        </template>
      </div>

      <!-- Right column -->
      <div class="w-full lg:w-96 flex flex-col gap-3">
        <div v-for="card in rightCards" v-reveal :key="card.title" class="card card-hover overflow-hidden">
          <img v-if="card.image" :src="card.image" :alt="card.imageAlt" loading="lazy"
            class="w-full border-b border-neutral-700" />
          <div class="p-3 flex flex-col gap-2">
            <div class="flex items-start justify-between gap-2">
              <a :href="card.link" target="_blank" rel="noopener noreferrer"
                class="text-base font-bold text-neutral-100 hover:text-accent transition-colors">{{ card.title }}</a>
              <span v-if="card.tag" class="tag" aria-hidden="true">{{ card.tag }}</span>
            </div>
            <p class="text-sm text-neutral-400">{{ card.description }}</p>
            <a :href="card.link" target="_blank" rel="noopener noreferrer" class="link-accent text-sm">{{ card.linkText
              }}
              →</a>
          </div>
        </div>
      </div>

    </div>

    <footer v-reveal
      class="py-3 mx-3 mb-3 text-center rounded-md bg-neutral-950 border border-neutral-700 text-neutral-500 text-sm font-mono">
      bergandersen.com &copy; 2025 &ndash; 2026
    </footer>
  </div>

  <button v-if="showBackToTop" @click="scrollToTop"
    class="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-neutral-950 border border-neutral-700 text-neutral-400 hover:border-accent hover:text-accent flex items-center justify-center transition-colors duration-200 font-mono"
    aria-label="Back to top">
    <span aria-hidden="true">↑</span>
  </button>
</template>

<style>
.accent-bg {
  background-color: #a6e22e;
}

.card {
  background-color: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 0.5rem;
  color: #e5e5e5;
}

.card-hover {
  transition: border-color 0.2s ease;
}

.card-hover:hover {
  border-color: #a6e22e40;
}

.tag {
  font-size: 0.65rem;
  font-family: monospace;
  background-color: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #a6e22e;
  padding: 0.15rem 0.45rem;
  border-radius: 0.25rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.link-accent {
  color: #a6e22e;
  transition: color 0.15s ease;
}

.link-accent:hover {
  color: #88b924;
}

.status-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: #a6e22e;
  box-shadow: 0 0 6px #a6e22e99;
}

.text-accent {
  color: #a6e22e;
}

.opportunity-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid #a6e22e40;
  border-radius: 999px;
  background-color: #0f1a00;
  font-size: 0.75rem;
  color: #c4c4c4;
  text-decoration: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.opportunity-badge:hover {
  border-color: #a6e22e80;
  background-color: #162200;
}

.opportunity-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background-color: #a6e22e;
  box-shadow: 0 0 5px #a6e22eaa;
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;
}

.opportunity-platform {
  color: #a6e22e;
  font-weight: 600;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

.stack-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  font-size: 0.75rem;
  color: #c4c4c4;
  font-family: monospace;
  white-space: nowrap;
}

.stack-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.reveal.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
</style>

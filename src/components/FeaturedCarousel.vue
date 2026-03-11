<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  items: {
    image: string;
    imageAlt: string;
    title: string;
    tag: string;
    description: string;
    link: string;
    linkText: string;
  }[];
}>();

const current = ref(0);

const prev = () => {
  current.value = (current.value - 1 + props.items.length) % props.items.length;
};

const next = () => {
  current.value = (current.value + 1) % props.items.length;
};
</script>

<template>
  <div class="featured-carousel">
    <div class="featured-image-wrap">
      <transition name="fade" mode="out-in">
        <img
          :key="current"
          :src="items[current].image"
          :alt="items[current].imageAlt"
          loading="lazy"
          class="featured-image"
        />
      </transition>

      <div class="featured-nav">
        <button @click="prev" class="nav-btn" aria-label="Previous project">‹</button>
        <button @click="next" class="nav-btn" aria-label="Next project">›</button>
      </div>

      <div class="featured-dots" aria-hidden="true">
        <button
          v-for="(_, i) in items"
          :key="i"
          class="dot"
          :class="{ active: i === current }"
          @click="current = i"
        />
      </div>
    </div>

    <transition name="slide-up" mode="out-in">
      <div :key="current" class="featured-body">
        <div class="featured-meta">
          <span class="tag">{{ items[current].tag }}</span>
          <span class="featured-counter" aria-live="polite">{{ current + 1 }} / {{ items.length }}</span>
        </div>
        <a :href="items[current].link" target="_blank" rel="noopener noreferrer" class="featured-title">
          {{ items[current].title }}
        </a>
        <p class="featured-desc">{{ items[current].description }}</p>
        <a :href="items[current].link" target="_blank" rel="noopener noreferrer" class="link-accent featured-link">
          {{ items[current].linkText }} →
        </a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.featured-carousel {
  display: flex;
  flex-direction: column;
}

.featured-image-wrap {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #2a2a2a;
}

.featured-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
}

.featured-nav {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  pointer-events: none;
}

.nav-btn {
  pointer-events: all;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid #2a2a2a;
  color: #a6e22e;
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  transition: border-color 0.15s ease, background 0.15s ease;
}

.nav-btn:hover {
  border-color: #a6e22e;
  background: rgba(0, 0, 0, 0.85);
}

.featured-dots {
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.35rem;
}

.dot {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.25);
  cursor: pointer;
  padding: 0;
  transition: background 0.15s ease;
}

.dot.active {
  background: #a6e22e;
}

.featured-body {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.featured-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.featured-counter {
  font-size: 0.65rem;
  font-family: monospace;
  color: #555;
}

.featured-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #e5e5e5;
  text-decoration: none;
  line-height: 1.35;
  transition: color 0.15s ease;
}

.featured-title:hover {
  color: #a6e22e;
}

.featured-desc {
  font-size: 0.8rem;
  color: #888;
  line-height: 1.5;
  margin: 0;
}

.featured-link {
  font-size: 0.8rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  items: { title: string; link: string; tag?: string }[];
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
  <div class="carousel">
    <div class="carousel-header">
      <span class="carousel-label font-mono">// articles</span>
      <div class="carousel-controls">
        <button @click="prev" aria-label="Previous">‹</button>
        <span class="carousel-counter">{{ current + 1 }} / {{ items.length }}</span>
        <button @click="next" aria-label="Next">›</button>
      </div>
    </div>

    <transition name="slide" mode="out-in">
      <div :key="current" class="carousel-slide">
        <div class="carousel-top">
          <span v-if="items[current].tag" class="tag">{{ items[current].tag }}</span>
        </div>
        <a :href="items[current].link" target="_blank" class="carousel-title">
          {{ items[current].title }}
        </a>
        <a :href="items[current].link" target="_blank" class="link-accent carousel-link">
          Visit Article →
        </a>
      </div>
    </transition>

    <div class="carousel-dots">
      <button
        v-for="(_, i) in items"
        :key="i"
        class="carousel-dot"
        :class="{ active: i === current }"
        @click="current = i"
        :aria-label="`Go to slide ${i + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.carousel {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 160px;
}

.carousel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.carousel-label {
  font-size: 0.75rem;
  color: #555;
}

.carousel-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.carousel-controls button {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #a6e22e;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease;
}

.carousel-controls button:hover {
  border-color: #a6e22e;
}

.carousel-counter {
  font-size: 0.7rem;
  font-family: monospace;
  color: #555;
  min-width: 2.5rem;
  text-align: center;
}

.carousel-slide {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.carousel-top {
  min-height: 1.25rem;
}

.carousel-title {
  font-size: 1rem;
  font-weight: 700;
  color: #e5e5e5;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.15s ease;
}

.carousel-title:hover {
  color: #a6e22e;
}

.carousel-link {
  font-size: 0.8rem;
  margin-top: auto;
}

.carousel-dots {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
  padding-top: 0.25rem;
}

.carousel-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #2a2a2a;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.15s ease;
}

.carousel-dot.active {
  background: #a6e22e;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>

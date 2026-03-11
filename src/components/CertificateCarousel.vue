<script setup lang="ts">
import { ref } from 'vue';
import CredlyBadge from './CredlyBadge.vue';
import CertificateBadge from './CertificateBadge.vue';

type CertItem =
  | { type: 'credly'; badgeId: string }
  | { type: 'custom'; name: string; link: string; issuer?: string };

const props = defineProps<{ items: CertItem[] }>();

const current = ref(0);

const prev = () => {
  current.value = (current.value - 1 + props.items.length) % props.items.length;
};

const next = () => {
  current.value = (current.value + 1) % props.items.length;
};
</script>

<template>
  <div class="cert-carousel">
    <div class="cert-carousel-header">
      <span class="cert-carousel-label">// certificates</span>
      <div class="cert-carousel-controls">
        <button @click="prev" aria-label="Previous certificate">‹</button>
        <span class="cert-carousel-counter">{{ current + 1 }} / {{ items.length }}</span>
        <button @click="next" aria-label="Next certificate">›</button>
      </div>
    </div>

    <div class="cert-carousel-stage">
      <template v-for="(item, i) in items" :key="i">
        <div v-show="i === current" class="cert-carousel-slide">
          <CredlyBadge
            v-if="item.type === 'credly'"
            :badge-id="item.badgeId"
            :width="250"
            :height="250"
          />
          <CertificateBadge
            v-else
            :name="item.name"
            :link="item.link"
            :issuer="item.issuer"
            :width="250"
            :height="250"
          />
        </div>
      </template>
    </div>

    <div class="cert-carousel-dots" aria-hidden="true">
      <button
        v-for="(_, i) in items"
        :key="i"
        class="cert-dot"
        :class="{ active: i === current }"
        @click="current = i"
      />
    </div>
  </div>
</template>

<style scoped>
.cert-carousel {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 0.75rem;
}

.cert-carousel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cert-carousel-label {
  font-size: 0.75rem;
  font-family: monospace;
  color: #555;
}

.cert-carousel-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.cert-carousel-controls button {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #a6e22e;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease;
}

.cert-carousel-controls button:hover {
  border-color: #a6e22e;
}

.cert-carousel-counter {
  font-size: 0.7rem;
  font-family: monospace;
  color: #555;
  min-width: 2.5rem;
  text-align: center;
}

.cert-carousel-stage {
  display: flex;
  justify-content: center;
  min-height: 260px;
  align-items: center;
}

.cert-carousel-slide {
  display: flex;
  justify-content: center;
}

.cert-carousel-dots {
  display: flex;
  gap: 0.4rem;
  justify-content: center;
}

.cert-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  background: #2a2a2a;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background 0.15s ease;
}

.cert-dot.active {
  background: #a6e22e;
}
</style>

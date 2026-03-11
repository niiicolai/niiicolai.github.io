<script setup lang="ts">
withDefaults(defineProps<{
  name: string;
  link: string;
  issuer?: string;
  width?: number;
  height?: number;
}>(), {
  issuer: 'Certificate',
  width: 250,
  height: 250,
});
</script>

<template>
  <div class="cert-wrapper" :style="{ width: width + 'px', height: height + 'px' }">
    <a :href="link" target="_blank" class="cert-badge">
      <div class="cert-body">
        <p class="cert-issuer">{{ issuer }}</p>
        <p class="cert-name">{{ name }}</p>
        <span class="cert-verify">Verify ↗</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.cert-wrapper {
  display: inline-block;
}

.cert-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #2a2a2a;
  border-radius: 0.5rem;
  background-color: #111;
  text-decoration: none;
  text-align: center;
  padding: 1rem;
  box-sizing: border-box;
  gap: 0.75rem;
  transition: border-color 0.2s ease;
}

.cert-badge:hover {
  border-color: #a6e22e40;
}

.cert-svg {
  width: 80px;
  height: 80px;
}

.cert-body {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  align-items: center;
}

.cert-issuer {
  font-size: 0.65rem;
  font-family: monospace;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.cert-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: #d4d4d4;
  line-height: 1.3;
  margin: 0;
}

.cert-verify {
  font-size: 0.7rem;
  color: #a6e22e;
  margin-top: 0.15rem;
  transition: color 0.2s ease;
}

.cert-badge:hover .cert-verify {
  color: #88b924;
}
</style>

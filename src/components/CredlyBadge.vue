<script setup lang="ts">
import { onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    badgeId: string;
    width?: number;
    height?: number;
    host?: string;
    fluid?: boolean;
  }>(),
  {
    width: 150,
    height: 270,
    host: "https://www.credly.com",
    fluid: false,
  }
);

onMounted(() => {
  if (!document.querySelector('script[src="https://cdn.credly.com/assets/utilities/embed.js"]')) {
    const script = document.createElement("script");
    script.src = "https://cdn.credly.com/assets/utilities/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }
});
</script>

<template>
  <div
    class="credly-wrapper"
    :class="{ fluid }"
  >
    <div
      :data-iframe-width="width"
      :data-iframe-height="height"
      :data-share-badge-id="badgeId"
      :data-share-badge-host="host"
    />
  </div>
</template>

<style scoped>
.credly-wrapper.fluid iframe {
  width: 100% !important;
  max-width: 100%;
}
</style>

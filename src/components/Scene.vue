<template>
    <canvas ref="canvasRef" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScene } from '../composables/useScene.js'

const canvasRef = ref(null)
const scene = useScene()

onMounted(async () => await scene.onMounted(canvasRef.value))
onUnmounted(() => scene.onUnmounted())

defineExpose({
    adapter: scene.adapter
})
</script>

<style scoped>
canvas {
    width: 100%;
    height: 100vh;
    display: block;
}
</style>
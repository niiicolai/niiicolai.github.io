<script setup>
import { ref } from 'vue';
import Scene from './components/Scene.vue'

const showScene = ref(false)
</script>

<template>
  <Scene />
  <div class="overlay" v-if="!showScene">
    <div>
      <div class="overlay__content">
        <button @click="showScene = !showScene">Explore Scene</button>
        <small>
          Note: Use the mouse wheel to zoom in and out, left-click to rotate, and right-click to pan.
        </small>
      </div>

      <!--small info about author-->
      <p class="author">by <a href="https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/" target="_blank">nicolai</a></p>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 2rem;
}

.overlay div {
  text-align: center;
}

.overlay__content button, .overlay__content a {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 2rem;
  background-color: rgba(255, 255, 255, 0.192);
  color: black;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.overlay__content button:hover, .overlay__content a:hover {
  background-color: #f2f2f2;
}

.overlay__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.overlay__content small {
  display: block;
  font-size: 1rem;
}

.author {
  position: fixed;
  bottom: 0rem;
  left: 2rem;
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
}

.author a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.author a:hover {
  color: #f2f2f2;
}


</style>

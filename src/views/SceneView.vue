<script setup>
import Scene from '../components/Scene.vue'
import { onMounted, ref } from 'vue'

const sceneRef = ref(null)
const showScene = ref(false)

const turnOnPC = () => {
  sceneRef.value?.adapter?.os?.turnOn();
}

const watchAdapter = () => {
  if (sceneRef.value?.adapter?.os) {
    sceneRef.value.adapter.os.eventDispatcher.addEventListener('stateChanged', () => {
      showScene.value = sceneRef.value?.adapter?.os?.isActive;
    });
    return true;
  }
  return false;
};

onMounted(() => {
  // Try immediately, then poll until adapter is available
  if (!watchAdapter()) {
    const interval = setInterval(() => {
      if (watchAdapter()) {
        clearInterval(interval);
      }
    }, 100);
  }
});

</script>

<template>
  <Scene ref="sceneRef" />
  <div class="overlay" v-if="!showScene && sceneRef?.adapter?.isReady">
    <div>
      <div class="overlay__content">
        <button @click="turnOnPC" class="a">Power up</button>
        <small>
            Hey there! 👋 I'm Nicolai, and this is my interactive portfolio. Power up the system to explore what I've been working on!
        </small>
      </div>
    </div>
  </div>
  <div class="overlay flex flex-col justify-center align-center gap-1" v-if="!sceneRef?.adapter?.isReady">
    <div class="spinner__icon">
      <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z"/>
      </svg>
    </div>
    <p class="loading__text">
      Loading... <br />
      Please wait while the scene is being prepared.
    </p>
  </div>
</template>

<style scoped>

.flex {
  display: flex;;
}

.flex-col {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.gap-1 {
  gap: 1rem;
}

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

.overlay__content button, .overlay__content .a {
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

.overlay__content button:hover, .overlay__content .a:hover {
  background-color: #f2f2f2;
}

.overlay__content button, .overlay__content .link {
  color: rgb(61, 139, 255);
}

.overlay__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2em;
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

.loading__text {
  font-size: 1.1rem;
  text-align: center;
  margin-top: 1rem;
}

.spinner__icon {
  border-radius: 50%;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.2) inset;
}
.spinner__icon svg {
  animation: spin 2s linear infinite;
  margin: 0 auto;
  display: block;  
  width: 2em;
  fill: #0099ff;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


</style>

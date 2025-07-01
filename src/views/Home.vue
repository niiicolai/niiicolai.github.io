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
  <div class="overlay" v-if="!showScene">
    <div>
      <div class="overlay__content">
        <button @click="turnOnPC" class="a">Power up</button>
        <small>
            Hey there! 👋 I'm Nicolai, and this is my interactive portfolio. Power up the system to explore what I've been working on!
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


</style>

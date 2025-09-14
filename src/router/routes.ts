import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import SceneView from '../views/SceneView.vue'
import NotFoundView from '../views/error/NotFound.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/os', component: SceneView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

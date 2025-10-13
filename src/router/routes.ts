import { createWebHashHistory, createRouter } from 'vue-router'

import RootView from '../views/RootView.vue'
import SceneView from '../views/SceneView.vue'
import NotFoundView from '../views/error/NotFound.vue'

const routes = [
  { path: '/', component: RootView },
  { path: '/os', component: SceneView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

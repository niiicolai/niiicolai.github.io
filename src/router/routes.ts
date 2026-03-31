import { createWebHashHistory, createRouter } from 'vue-router'

import RootView from '../views/RootView.vue'
import SceneView from '../views/SceneView.vue'
import LastView from '../views/LastView.vue'
import NotFoundView from '../views/error/NotFound.vue'

const routes = [
  { path: '/', component: LastView },
  { path: '/root', component: RootView },
  { path: '/os', component: SceneView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

import { createWebHashHistory, createRouter } from 'vue-router'

import ClosedView from '../views/ClosedView.vue'
import NotFoundView from '../views/error/NotFound.vue'

const routes = [
  { path: '/', component: ClosedView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

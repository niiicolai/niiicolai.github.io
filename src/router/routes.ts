import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '../views/Home.vue'
import NotFoundView from '../views/error/NotFound.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/:pathMatch(.*)*', component: NotFoundView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

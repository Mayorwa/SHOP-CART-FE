import { createRouter, createWebHistory } from 'vue-router'
import routes from './paths'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView()
  },
})
export default router

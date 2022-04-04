import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Drawing from '@/pages/Drawing.vue'
import Three from '@/pages/Three.vue'
import Line from '@/pages/Line.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/drawing',
    name: 'Drawing',
    component: Drawing
  },
  {
    path: '/three',
    name: 'Three',
    component: Three
  },
  {
    path: '/line',
    name: 'Line',
    component: Line
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

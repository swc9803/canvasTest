import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Drawing from '@/pages/Drawing.vue'
import Three from '@/pages/Three.vue'
import Line from '@/pages/Line.vue'
import Gltf from '@/pages/Gltf.vue'
import Gltfex from '@/pages/Gltfex.vue'
import Sticky from '@/pages/Sticky.vue'
import Mask from '@/pages/Mask.vue'

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
  },
  {
    path: '/gltf',
    name: 'Gltf',
    component: Gltf
  },
  {
    path: '/gltfex',
    name: 'Gltfex',
    component: Gltfex
  },
  {
    path: '/sticky',
    name: 'Sticky',
    component: Sticky
  },
  {
    path: '/mask',
    name: 'Mask',
    component: Mask
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

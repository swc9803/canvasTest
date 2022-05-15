import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Drawing from '@/pages/Drawing.vue'
import Three from '@/pages/Three.vue'
import Line from '@/pages/Line.vue'
import Gltf from '@/pages/Gltf.vue'
import Gltfani from '@/pages/Gltfani.vue'
import Sticky from '@/pages/Sticky.vue'
import Mask from '@/pages/Mask.vue'
import Arrow from '@/pages/Arrow.vue'
import Gltfske from '@/pages/GltfWithSketchfab.vue'
import Orbit from '@/pages/Orbit.vue'
import Toline from '@/pages/Toline.vue'
import Raycaster from '@/pages/Raycaster.vue'

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
    path: '/gltfani',
    name: 'Gltfani',
    component: Gltfani
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
  },
  {
    path: '/arrow',
    name: 'Arrow',
    component: Arrow
  },
  {
    path: '/gltfske',
    name: 'Gltfske',
    component: Gltfske
  },
  {
    path: '/orbit',
    name: 'Orbit',
    component: Orbit
  },
  {
    path: '/toline',
    name: 'Toline',
    component: Toline
  },
  {
    path: '/raycaster',
    name: 'Raycaster',
    component: Raycaster
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

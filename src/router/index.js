import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Three from '@/pages/Three.vue'
import Line from '@/pages/Line.vue'
import Gltf from '@/pages/Gltf.vue'
import Gltfani from '@/pages/Gltfani.vue'
import Sticky from '@/pages/Sticky.vue'
import Orbit from '@/pages/Orbit.vue'
import Raycaster from '@/pages/Raycaster.vue'
import Font from '@/pages/Font.vue'
import Glass from '@/pages/Glass.vue'
import Dynamic from '@/pages/Dynamicmap.vue'
import Zoom from '@/pages/Zoom.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/orbit',
    name: 'Orbit',
    component: Orbit
  },
  {
    path: '/raycaster',
    name: 'Raycaster',
    component: Raycaster
  },
  {
    path: '/font',
    name: 'Font',
    component: Font
  },
  {
    path: '/glass',
    name: 'Glass',
    component: Glass
  },
  {
    path: '/dynamic',
    name: 'Dynamic',
    component: Dynamic
  },
  {
    path: '/zoom',
    name: 'Zoom',
    component: Zoom
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

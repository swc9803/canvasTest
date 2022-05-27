<template>
  <div class="container" ref="container" />
</template>

<script>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    const container = ref()
    const scrollEl = ref()
    const color = 0xFFFFFF
    const intensity = 1
    const fov = 35
    const near = 0.9
    const far = 1000

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    const scene = new THREE.Scene()

    onMounted(() => {
      const width = container.value.clientWidth
      const height = container.value.clientHeight

      // camera
      const camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
      camera.position.set(0, 0, 2)

      // light
      const light = new THREE.DirectionalLight(color, intensity)
      const light2 = new THREE.DirectionalLight(color, intensity)
      light2.position.set(0, -5, 2)
      scene.add(light)
      scene.add(light2)

      // orbitControls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.update()

      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.value.appendChild(renderer.domElement)

      // render
      renderer.render(scene, camera)

      function animate () {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()

      function onWindowResize () {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
      window.addEventListener('resize', onWindowResize)
    })

    return {
      scrollEl, container
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  z-index: 9;
}
</style>

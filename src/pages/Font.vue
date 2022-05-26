<template>
  <div class="scrollEl" ref="scrollEl" />
  <div class="container" ref="container" />
  <section class="section1" />
  <section class="section2" />
  <section class="section3" />
  <section class="section4" />
  <section class="section5" />
</template>

<script>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
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

      // fontLoader
      const loader = new FontLoader()
      loader.load('font.json',
        (font) => {
          const geometry = new TextGeometry('폰트\n테스트\n입니다.', {
            font: font,
            size: 0.2,
            height: 0.2,
            curveSegmants: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.01,
            bevelOffset: 0.005,
            bevelSegments: 24
          })

          geometry.center()

          const material = new THREE.MeshPhongMaterial({
            color: '#689F38',
            roughness: 0.3,
            metalness: 0.7
          })
          const mesh = new THREE.Mesh(geometry, material)
          scene.add(mesh)
        }
      )
      gsap.to(light.rotation, { y: 20 })

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
.scrollEl {
  position: absolute;
  width: 0;
  height: 500vh;
  opacity: 0;
}

.container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9;
}

section {
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>

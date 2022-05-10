<template>
  <div v-show="loading" class="loading">load</div>
  <div class="scrollEl" ref="scrollEl" />
  <div class="container" ref="cont" />
  <section class="section1" />
  <section class="section2" />
  <section class="section3" />
  <section class="section4" />
  <section class="section5" />
</template>

<script>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    const loading = ref(true)
    const cont = ref()
    const scrollEl = ref()

    onMounted(() => {
      function boxAni () {
        const fov = 75
        const aspect = cont.value.clientWidth / cont.value.clientHeight
        const near = 0.1
        const far = 2000
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        camera.position.set(0, 0, 10)

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        })
        const scene = new THREE.Scene()

        function init () {
          // 빛
          const color = 0xFFFFFF
          const intensity = 1
          const light = new THREE.DirectionalLight(color, intensity)

          const raycaster = new THREE.Raycaster()
          const rayOrigin = new THREE.Vector3(-3, 0, 0)
          const rayDirection = new THREE.Vector3(10, 0, 0)
          rayDirection.normalize()
          raycaster.set(rayOrigin, rayDirection)
          scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0x00ff00))

          light.position.set(-1, 2, 4)
          scene.add(light)
          renderer.setSize(cont.value.clientWidth, cont.value.clientHeight)
          renderer.setPixelRatio(window.devicePixelRatio)

          cont.value.appendChild(renderer.domElement)

          // eslint-disable-next-line no-unused-vars
          function render () {
            renderer.render(scene, camera)
          }

          const gltfLoader = new GLTFLoader()
          gltfLoader.load('fox.glb', (model) => {
            const root = model.scene
            root.position.set(0, -50, -90)
            root.rotation.set(0, -2, 0)
            scene.add(root)
            loading.value = false
          })
          animate()
        }

        function animate () {
          requestAnimationFrame(animate)
          renderer.render(scene, camera)
        }
        init()

        function onWindowResize () {
          camera.aspect = cont.value.clientWidth / cont.value.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(cont.value.clientWidth, cont.value.clientHeight)
        }
        window.addEventListener('resize', onWindowResize)

        // scene.rotation.set(0, 1.88, 0)
        // camera.position.set(1, 0, 5)

        // ScrollTrigger.defaults({
        //   immediateRender: false
        // })
      }
      boxAni()
    })
    return {
      scrollEl, cont, loading
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

// .section1 {
//   background-color: tomato;
// }
// .section2 {
//   background-color: steelblue;
// }
// .section3 {
//   background-color: crimson;
// }
// .section4 {
//   background-color: lime;
// }
// .section5 {
//   background-color: grey;
// }
</style>

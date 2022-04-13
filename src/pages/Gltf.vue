<template>
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
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
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

          const dracoLoader = new DRACOLoader()
          dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/')
          gltfLoader.setDRACOLoader(dracoLoader)
          // const models = {}
          // const toLoad = [
          //   {
          //     name: 'witch',
          //     group: new THREE.Group(),
          //     file: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/paint-brush/model.gltf'
          //   },
          //   {
          //     name: 'bear',
          //     group: new THREE.Group(),
          //     file: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf'
          //   }
          // ]

          // toLoad.forEach((item) => {
          gltfLoader.load('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/ankou-with-cart/model.gltf', (model) => {
            const root = model.scene
            root.position.set(0, 0.5, 0)
            scene.add(root)
            carAni
            // .to(camera.position, { x: -0.1 })
              .to(root.rotation, { x: 20.6 }, '<')
              .to(scene.position, { z: 20.6 }, '<')
            // .to(scene.rotation, { z: 2.6 }, '<')
            // .to(cont.value, { opacity: 0, scale: 0 }, '<')
          })
          // })
          const carAni = gsap.timeline({
            scrollTrigger: {
              trigger: scrollEl.value,
              start: 'top top',
              end: '80%',
              scrub: 1
            }
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
      scrollEl, cont
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

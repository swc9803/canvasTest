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
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    const cont = ref()
    const scrollEl = ref()

    onMounted(() => {
      function boxAni () {
        const fov = 35
        const aspect = cont.value.clientWidth / cont.value.clientHeight
        const near = 0.9
        const far = 1000
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        })
        const scene = new THREE.Scene()

        function init () {
          renderer.setSize(cont.value.clientWidth, cont.value.clientHeight)
          renderer.setPixelRatio(window.devicePixelRatio)

          cont.value.appendChild(renderer.domElement)

          // eslint-disable-next-line no-unused-vars
          function render () {
            renderer.render(scene, camera)
          }
          const controls = new OrbitControls(camera, renderer.domElement)
          controls.update()

          const geometry = new THREE.TorusGeometry(0.4, 0.2, 100, 100)
          var material = new THREE.MeshNormalMaterial()
          var box = new THREE.Mesh(geometry, material)
          // box.scale.set(1.0, 1.0, 1.0)
          // box.position.set(0.0, 0.0, 0.0)
          scene.add(box)
          gsap.to(camera.rotation, { y: 100, duration: 360, ease: 'none', repeat: -1 })
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

        scene.rotation.set(0, 1.88, 0)
        camera.position.set(1, 0, 5)
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

.section1 {
  background-color: tomato;
}
.section2 {
  background-color: steelblue;
}
.section3 {
  background-color: crimson;
}
.section4 {
  background-color: lime;
}
.section5 {
  background-color: grey;
}
</style>

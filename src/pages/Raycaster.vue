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

      // raycaster
      const raycaster = new THREE.Raycaster()
      const rayOrigin = new THREE.Vector3(-3, 0, 0)
      const rayDirection = new THREE.Vector3(10, 0, 0)
      rayDirection.normalize()
      raycaster.set(rayOrigin, rayDirection)
      scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0x0000ff))

      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.value.appendChild(renderer.domElement)

      // render
      renderer.render(scene, camera)

      // animation
      const geometry = new THREE.BoxGeometry(0.4, 0.2)
      var material = new THREE.MeshPhongMaterial()
      var box1 = new THREE.Mesh(geometry, material)
      var box2 = new THREE.Mesh(geometry, material)
      material.color = new THREE.Color(0xff0000)
      box2.position.set(0, 0, 0)
      scene.add(box1)
      scene.add(box2)
      const intersect = raycaster.intersectObjects([box1, box2])
      const log = () => {
        console.log(intersect)
      }
      window.addEventListener('click', log)
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

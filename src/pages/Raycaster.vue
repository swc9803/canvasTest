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
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    const cont = ref()
    const scrollEl = ref()
    const color = 0xFFFFFF
    const intensity = 1

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

          const light = new THREE.DirectionalLight(color, intensity)
          light.position.set(-1, 2, 4)
          scene.add(light)

          const raycaster = new THREE.Raycaster()
          const rayOrigin = new THREE.Vector3(-3, 0, 0)
          const rayDirection = new THREE.Vector3(10, 0, 0)
          rayDirection.normalize()
          raycaster.set(rayOrigin, rayDirection)
          scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0x0000ff))

          const geometry = new THREE.BoxGeometry(0.4, 0.2)
          var material = new THREE.MeshPhongMaterial()
          var box = new THREE.Mesh(geometry, material)
          var box2 = new THREE.Mesh(geometry, material)
          material.color = new THREE.Color(0xff0000)
          // box.scale.set(1.0, 1.0, 1.0)
          box.position.set(2.0, 0.0, 0.0)
          box2.position.set(-2.0, 0.0, 0.0)
          scene.add(box)
          scene.add(box2)
          animate()
          const carAni = gsap.timeline({
            scrollTrigger: {
              trigger: scrollEl.value,
              start: 'top top',
              end: '80%',
              scrub: 1
            }
          })
          carAni
            .fromTo(cont.value, { opacity: 0.5 }, { opacity: 1 }, '<')
            .to(box.rotation, { y: 6.79 }, '<')
            .to(box.rotation, { x: 2.6 })
            .to(box.rotation, { z: 2.6 }, '<')
            .to(box.rotation, { z: 0.02, y: 3.1 })
          // .to(camera.position, { x: 0.16 }, '<')
            .to(cont.value, { opacity: 0, scale: 0 }, '<')
          const intersect = raycaster.intersectObjects([box, box2])
          console.log(intersect)
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
        camera.position.set(0, 0, 5)

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

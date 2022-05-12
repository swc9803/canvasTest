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

    onMounted(() => {
      function boxAni () {
        const fov = 75
        const aspect = cont.value.clientWidth / cont.value.clientHeight
        const near = 0.1
        const far = 2000
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
          const x = -2.5; const y = -5
          const shape = new THREE.Shape()
          shape.moveTo(x + 2.5, y + 2.5)
          shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y)
          shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5)
          shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5)
          shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5)
          shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y)
          shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)

          // ExtrudeGeometry settings
          const settings = {
            steps: 5,
            depth: 4,
            bevelEnabled: true,
            bevelThickness: 1.6,
            bevelSize: 2,
            bevelSegments: 6
          }
          const geometry = new THREE.ExtrudeGeometry(shape, settings)
          const fillMaterial = new THREE.MeshNormalMaterial()
          const heart = new THREE.Mesh(geometry, fillMaterial)
          // const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
          const line = new THREE.LineSegments(new THREE.WireframeGeometry(geometry))
          const group = new THREE.Group()
          group.add(heart)
          group.add(line)
          scene.add(group)
          camera.position.set(0, 0, 15)
          group.rotation.x = Math.PI // 180 degree
          heart.position.set(0, 0, 0)
          line.position.set(0, 0, 0)
          line.material.transparent = true
          line.material.depthTest = false
          gsap.set(heart.material, { zIndex: 10 })
          gsap.set(line.material, { zIndex: 15 })
          const carAni = gsap.timeline({
            scrollTrigger: {
              trigger: scrollEl.value,
              start: 'top top',
              end: '100%',
              scrub: 1
            }
          })
          carAni
            .fromTo(cont.value, { opacity: 0 }, { opacity: 1 })
            // .to(line.scale, { x: 1.1, y: 1.1, z: 1.1 }, '<')
            .to(line.material, { opacity: 0.3 }, '<')
            // object.material 로 웬만한 설정 가능
            .to(scene.rotation, { y: Math.PI }, '<')
            .to(scene.rotation, { x: 2.6, z: 2.6 })
            .to(scene.rotation, { z: 0.02, y: 3.1 })
          // .to(camera.position, { x: 0.16 }, '<')
            .to(cont.value, { opacity: 0, scale: 0 }, '<')
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

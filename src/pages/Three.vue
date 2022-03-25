<template>
  <div class="container"></div>
  <section class="section-one">
  </section>

  <section class="section-two">
  </section>

  <section class="section-three">
  </section>

  <section class="section-four">
  </section>

  <section class="section-five">
  </section>
</template>

<script>

// import test from '@/components/three'
import { onMounted } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    // test()
    onMounted(() => {
      function addModelToBG () {
        let container
        let camera
        let renderer
        let scene

        function init () {
          container = document.querySelector('.container')

          // Create scene
          scene = new THREE.Scene()

          const fov = 35
          const aspect = container.clientWidth / container.clientHeight
          const near = 0.9
          const far = 1000

          // Camera setup
          camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

          // Renderer
          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
          })

          renderer.setSize(container.clientWidth, container.clientHeight)
          renderer.setPixelRatio(window.devicePixelRatio)

          container.appendChild(renderer.domElement)

          // eslint-disable-next-line no-unused-vars
          function render () {
            renderer.render(scene, camera)
          }

          var geometry = new THREE.BoxGeometry()
          var material = new THREE.MeshNormalMaterial()
          var box = new THREE.Mesh(geometry, material)
          box.scale.set(1.0, 1.0, 1.0)
          box.position.set(0.0, 0.0, 0.0)
          scene.add(box)
          animate()
        }

        function animate () {
          requestAnimationFrame(animate)
          renderer.render(scene, camera)
        }

        init()

        function onWindowResize () {
          camera.aspect = container.clientWidth / container.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(container.clientWidth, container.clientHeight)
        }

        window.addEventListener('resize', onWindowResize)

        gsap.registerPlugin(ScrollTrigger)

        scene.rotation.set(0, 1.88, 0)
        camera.position.set(2, 0, 5)

        ScrollTrigger.defaults({
          immediateRender: false,
          ease: 'power1.inOut'
        })

        const carAni = gsap.timeline({

          scrollTrigger: {
            trigger: '.section-two',
            start: 'top top',
            endTrigger: '.section-five',
            end: 'bottom bottom',
            scrub: 1
          }

        })

        carAni
          .to(scene.rotation, { y: 4.79 })
          .to(camera.position, { x: -0.1 })
          .to(scene.rotation, { z: 1.6 })
          .to(scene.rotation, { z: 0.02, y: 3.1 }, 'simultaneously')
          .to(camera.position, { x: 0.16 }, 'simultaneously')
          .to('.container', { opacity: 0, scale: 0 }, 'simultaneously')
      }
      addModelToBG()
    })
  }
}
</script>

<style lang="scss">

body {
  width: 100vw;
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  overflow-x: hidden;
}

.container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
}

section {
  width: 100%;
  height: 100vh;
  position: relative;

}

.section-one {
  background-color: tomato;
}

.section-two {
  background-color: steelblue;
}

.section-three {
  background-color: crimson;
}

.section-four {
  background-color: lime;
}

.section-five {
  background-color: grey;
}
</style>

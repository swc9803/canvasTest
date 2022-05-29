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
      camera.position.set(0, 0, 80)

      // light
      const light = new THREE.DirectionalLight(0xFFFFFF, intensity)
      const light2 = new THREE.DirectionalLight(0xFFFFFF, intensity)
      light2.position.set(0, -5, 2)
      scene.add(light)
      scene.add(light2)

      // picking
      const raycaster = new THREE.Raycaster()
      raycaster.cursorNormalizedPosition = undefined
      const onMouseMove = (e) => {
        const width = container.value.clientWidth
        const height = container.value.clientHeight

        const x = (e.offsetX / width) * 2 - 1
        const y = -(e.offsetY / height) * 2 + 1

        raycaster.cursorNormalizedPosition = { x, y }
      }
      const picking = () => {
        container.value.addEventListener('mousemove', onMouseMove)
      }

      // model
      const Particle = (scene, geometry, material, x, y) => {
        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(x, y, 0)
        scene.add(mesh)
        mesh.wrapper = Particle
      }
      const period = 12
      const upd = (time) => {
        time *= 0.001

        raycaster.setFromCamera(raycaster.cursorNormalizedPosition, camera)
        const targets = raycaster.intersectObjects(scene.children)

        const awakenTime = time
        const t = time - awakenTime
        if (targets.length > 0) {
          const mesh = targets[0].object
          const particle = mesh.wrapper
          particle.awake(time)
          mesh.rotation.x = THREE.Math.lerp(0, Math.PI * 2 * period, t / period)
        }

        scene.traverse((obj3d) => {
          if (obj3d instanceof THREE.Mesh) {
            obj3d.wrapper.update(time)
          }
        })
      }
      const geometry = new THREE.BoxGeometry()

      const color = new THREE.Color()
      color.setHSL(0, 0, 0.1)
      const material = new THREE.MeshStandardMaterial({ color })
      for (let x = -20; x <= 20; x += 1.1) {
        for (let y = -20; y <= 20; y += 1.1) {
          Particle(scene, geometry, material, x, y)
        }
      }

      // orbitControls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.update()

      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.value.appendChild(renderer.domElement)

      // render
      renderer.render(scene, camera)

      function animate () {
        upd()
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      picking()
      animate()

      function onWindowResize () {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
      window.addEventListener('resize', onWindowResize)
    })

    return {
      container
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  z-index: 9;
}
</style>

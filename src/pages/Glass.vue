<template>
  <!-- 유리 재질의 주전자 + 배경 -->
  <div class="container" ref="container" />
</template>

<script>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'
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
      camera.position.set(0, 4, 5)

      // light
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(-1, 2, 4)
      scene.add(light)

      // orbitControls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.update()

      renderer.setSize(width, height)
      renderer.setPixelRatio(window.devicePixelRatio)
      container.value.appendChild(renderer.domElement)

      // object
      const teapotGeometry = new TeapotGeometry(0.7, 24)
      const teapotMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1,
        roughness: 0.05,
        ior: 2.5,
        thickness: 0.2,
        transmission: 1,
        side: THREE.DoubleSide
      })
      const teapot = new THREE.Mesh(teapotGeometry, teapotMaterial)
      scene.add(teapot)

      const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1.5, 32)
      const cylinderMaterial = new THREE.MeshNormalMaterial()
      const cylinderPivot = new THREE.Object3D()
      for (let degree = 0; degree <= 360; degree += 30) {
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
        const radian = THREE.Math.degToRad(degree)
        cylinder.position.set(2 * Math.sin(radian), 0, 2 * Math.cos(radian))
        cylinderPivot.add(cylinder)
      }
      scene.add(cylinderPivot)

      // background
      const loader = new THREE.TextureLoader()
      loader.load('studio.jpg', texture => {
        const renderTarget = new THREE.WebGLCubeRenderTarget(texture.image.height)
        renderTarget.fromEquirectangularTexture(renderer, texture)
        scene.background = renderTarget.texture
      })

      // render
      renderer.render(scene, camera)

      function animate () {
        if (cylinderPivot) {
          cylinderPivot.rotation.y += 0.0005
        }
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
  height: 100vh;
}
</style>

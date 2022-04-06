<template>
  <div @mousemove="starAni" class="container" ref="container" />
  <p>d</p>
  <div src="src\assets\models\hat.gltf"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    const container = ref()
    let mouseX = 0
    let mouseY = 0
    const starAni = (e) => {
      mouseY = e.clientY
      mouseX = e.clientX
    }
    onMounted(() => {
      const scene = new THREE.Scene()
      const width = window.innerWidth
      const height = window.innerHeight
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
      camera.position.z = 2
      scene.add(camera)
      const renderer = new THREE.WebGLRenderer({
        antialias: true
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(new THREE.Color('#111111'), 1)
      container.value.appendChild(renderer.domElement)

      window.addEventListener('resize', () => {
        const width = window.innerWidth
        const height = window.innerHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })

      const geometry = new THREE.TorusGeometry(0.4, 0.2, 100, 100)
      const material = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x00ff80
      })

      const sphere = new THREE.Points(geometry, material)
      scene.add(sphere)

      const particlesGeometry = new THREE.BufferGeometry()
      const loader = new THREE.TextureLoader()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.height = 100
      canvas.width = 100
      ctx.fillStyle = '#fff'
      ctx.beginPath()
      ctx.arc(50, 50, 25, 0, 2 * Math.PI)
      ctx.fill()
      const img = canvas.toDataURL()
      const star = loader.load(img)
      const particlesmaterial = new THREE.PointsMaterial({
        size: 0.01,
        map: star,
        transparent: true
      })
      const particlesCnt = 2000
      const posArray = new Float32Array(particlesCnt * 3)
      for (let i = 0; i < particlesCnt * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * (Math.random() * 5)
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      )

      const particlesMesh = new THREE.Points(particlesGeometry, particlesmaterial)
      scene.add(particlesMesh)

      const clock = new THREE.Clock()

      const animate = () => {
        window.requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()
        // Update objects
        sphere.rotation.y = 0.5 * elapsedTime
        particlesMesh.rotation.y = -1 * (elapsedTime * 0.1)

        if (mouseX > 0) {
          particlesMesh.rotation.x = -mouseY * (elapsedTime * 0.00008)
          particlesMesh.rotation.y = -mouseX * (elapsedTime * 0.00008)
        }
        renderer.render(scene, camera)
      }

      animate()
    })
    return {
      container,
      starAni
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  z-index: 9;
}
p {
  margin: 0;
}
</style>

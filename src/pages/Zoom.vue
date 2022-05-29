<template>
  <div class="container" ref="container" />
</template>

<script>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    const container = ref()

    onMounted(() => {
      function boxAni () {
        const fov = 75
        const aspect = container.value.clientWidth / container.value.clientHeight
        const near = 0.1
        const far = 2000
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
        camera.position.set(0, 0, 2)

        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true
        })
        const scene = new THREE.Scene()

        function init () {
          // 빛
          const light = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4)
          scene.add(light)
          const light1 = new THREE.DirectionalLight(0xffffff, 1.5)
          light1.position.set(-1, 2, 0)
          scene.add(light1)
          const light2 = new THREE.DirectionalLight(0xffffff, 1.5)
          light2.castShadow = true
          light2.position.set(1, 4, 0)
          light2.shadow.mapSize.width = light2.shadow.mapSize.height = 1024 * 10
          light2.shadow.radius = 4
          light2.shadow.bias = 0.0001
          scene.add(light2)

          renderer.setSize(container.value.clientWidth, container.value.clientHeight)
          renderer.setPixelRatio(window.devicePixelRatio)
          renderer.shadowMap.enabled = true
          renderer.shadowMap.type = THREE.PCFSoftShadowMap

          container.value.appendChild(renderer.domElement)

          // eslint-disable-next-line no-unused-vars
          function render () {
            renderer.render(scene, camera)
          }

          const controls = new OrbitControls(camera, renderer.domElement)

          const raycaster = new THREE.Raycaster()
          const picking = () => {
            container.value.addEventListener('dblclick', onDblClick.bind(this))
          }
          function onDblClick (e) {
            const width = container.value.clientWidth
            const height = container.value.clientHeight
            const xy = {
              x: (e.offsetX / width) * 2 - 1,
              y: -(e.offsetY / height) * 2 + 1
            }
            raycaster.setFromCamera(xy, camera)
            const cars = []
            scene.traverse(obj3d => {
              if (obj3d.name === 'car') {
                cars.push(obj3d)
              }
            })
            for (let i = 0; i < cars.length; i++) {
              const car = cars[i]
              const targets = raycaster.intersectObject(car)
              if (targets.length > 0) {
                zoomFit(car, 70)
                controls.enabled = true
                return
              }
            }
            const box = scene.getObjectByName('box')
            zoomFit(box, 45)
          }
          function zoomFit (object3d, viewAngle) {
            const box = new THREE.Box3().setFromObject(object3d)
            const sizeBox = box.getSize(new THREE.Vector3()).length()
            const centerBox = box.getCenter(new THREE.Vector3())

            const direction = new THREE.Vector3(0, 1, 0)
            direction.applyAxisAngle(new THREE.Vector3(1, 0, 0),
              THREE.Math.degToRad(viewAngle))

            const halfSizeModel = sizeBox * 0.5
            const halfFov = THREE.Math.degToRad(camera.fov * 0.5)
            const distance = halfSizeModel / Math.tan(halfFov)

            const newPosition = new THREE.Vector3().copy(
              direction.multiplyScalar(distance).add(centerBox))
            controls.update()

            gsap.to(camera.position, {
              duration: 1.5,
              x: newPosition.x,
              y: newPosition.y,
              z: newPosition.z
            })

            gsap.to(controls.target, {
              duration: 0.5,
              x: centerBox.x,
              y: centerBox.y,
              z: centerBox.z,
              onUpdate: () => {
                camera.lookAt(controls.target.x,
                  controls.target.y, controls.target.z)
              }
            }
            )
          }

          const gltfLoader = new GLTFLoader()
          const dracoLoader = new DRACOLoader()
          dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/')
          gltfLoader.setDRACOLoader(dracoLoader)
          // gltfLoader.load('gob.gltf', (model) => {
          //   const root = model.scene
          //   scene.add(root)
          // })
          const items = [
            { url: 'models/car1/scene.gltf', removed: 'Plane' },
            { url: 'models/car2/scene.gltf', removed: 'Object_9' }
          ]
          items.forEach((item, index) => {
            gltfLoader.load(item.url, (gltf) => {
              const obj3d = gltf.scene

              const removedObj3d = obj3d.getObjectByName(item.removed)
              removedObj3d.removeFromParent()

              const box = new THREE.Box3().setFromObject(obj3d)
              const sizeBox = box.max.z - box.min.z
              const scale = 1 / sizeBox
              const tx = (index / (items.length - 1)) - 0.5
              obj3d.scale.set(scale, scale, scale)
              obj3d.position.set(tx, -box.min.y * scale, 0)

              scene.add(obj3d)
              obj3d.name = 'car'
            })
          })
          picking()

          const boxGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.1, 64)
          const boxMaterial = new THREE.MeshStandardMaterial(
            { color: 0x454545, metalness: 0.5, roughness: 0.5 })
          const box = new THREE.Mesh(boxGeometry, boxMaterial)
          box.receiveShadow = true
          box.name = 'box'

          box.position.y = -0.05
          scene.add(box)

          animate()
        }

        var clock = new THREE.Clock()
        var mixer

        function animate () {
          requestAnimationFrame(animate)
          var delta = clock.getDelta()
          if (mixer) mixer.update(delta)
          renderer.render(scene, camera)
        }
        init()

        function onWindowResize () {
          camera.aspect = container.value.clientWidth / container.value.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(container.value.clientWidth, container.value.clientHeight)
        }
        window.addEventListener('resize', onWindowResize)
      }
      boxAni()
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
  position: fixed;
  z-index: 9;
}
</style>

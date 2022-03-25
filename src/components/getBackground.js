import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass.js'
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js'
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'

const getBackground = () => {
  let camera, composer, renderer
  let torus1, torus2
  let animateId, rendererDom

  function init () {
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000)

    camera.position.z = 10

    const scene1 = new THREE.Scene()
    const scene2 = new THREE.Scene()

    torus1 = new THREE.Mesh(new THREE.TorusGeometry(window.innerWidth / window.innerHeight, 1, 16, 32))
    scene1.add(torus1)

    torus2 = new THREE.Mesh(new THREE.TorusGeometry((window.innerWidth / window.innerHeight) + 1.5, 1, 16, 32))
    scene2.add(torus2)

    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0xe0e0e0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    renderer.autoClear = false

    rendererDom = document.querySelector('#app').appendChild(renderer.domElement)

    const clearPass = new ClearPass()
    const clearMaskPass = new ClearMaskPass()

    const maskPass1 = new MaskPass(scene1, camera)
    const maskPass2 = new MaskPass(scene2, camera)

    const pizzaImage = require('@/assets/pizza.png')

    const texture1 = new THREE.TextureLoader().load(pizzaImage)
    texture1.minFilter = THREE.LinearFilter

    const beerImage = require('@/assets/beerBack.png')
    const texture2 = new THREE.TextureLoader().load(beerImage)

    const texturePass1 = new TexturePass(texture1)
    const texturePass2 = new TexturePass(texture2)

    const outputPass = new ShaderPass(CopyShader)

    const parameters = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: true
    }

    const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, parameters)

    composer = new EffectComposer(renderer, renderTarget)

    composer.addPass(clearPass)
    composer.addPass(maskPass1)
    composer.addPass(texturePass1)
    composer.addPass(clearMaskPass)
    composer.addPass(maskPass2)
    composer.addPass(texturePass2)
    composer.addPass(clearMaskPass)
    composer.addPass(outputPass)

    window.addEventListener('resize', onWindowResize)
  }

  function onWindowResize () {
    const width = window.innerWidth
    const height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    composer.setSize(width, height)
  }

  function animate () {
    animateId = requestAnimationFrame(animate)

    const time = performance.now() * 0.001 + 6000

    torus1.position.x = Math.cos(time / 1.5) * 2
    torus1.position.y = Math.sin(time)
    torus1.rotation.x = Math.cos(time / 1.5) * 2
    torus1.rotation.y = Math.sin(time) * 3
    torus2.position.x = Math.cos(time / 1.5) * 6
    torus2.position.y = Math.sin(time / 3)
    torus2.rotation.x = time
    torus2.rotation.y = time / 2

    renderer.clear()
    composer.render(time)
  }

  init()
  animate()

  return { animateId, rendererDom }
}

export default getBackground

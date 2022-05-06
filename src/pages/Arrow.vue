<template>
  <div class="grid" ref="grid"/>
  <svg class="arrow" ref="arrow" viewBox="0 0 122 68" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 34H116M116 34L87.5 62.5M116 34L87.5 5.5"
      stroke="white"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
  <!-- <div class="arrow" ref="arrow"></div> -->
  test
</template>

<script>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
export default {
  setup () {
    const grid = ref()
    const arrow = ref()

    onMounted(() => {
      const arrows = []
      const arrowCenters = []
      const size = Math.round(Math.max(innerWidth, innerHeight) / 15)
      const numArrowsX = Math.ceil(innerWidth / size)
      const numArrowsY = Math.ceil(innerHeight / size)
      const mousePos = new THREE.Vector2()

      function init () {
        window.addEventListener('mousemove', mouseMove)
        onResize()
      }

      function generateArrowGrid () {
        for (let i = 0; i < numArrowsX * numArrowsY; i += 1) {
          const newArrow = arrow.value.cloneNode(true)
          newArrow.id = `arrow-${i}`
          newArrow.setAttribute('class', 'arrow')
          grid.value.appendChild(newArrow)
          arrows.push(newArrow)

          const arrowRect = newArrow.getBoundingClientRect()
          const arrowCenter = new THREE.Vector2(
            arrowRect.left + newArrow.clientWidth * 0.5,
            arrowRect.top + newArrow.clientHeight * 0.5
          )
          arrowCenters.push(arrowCenter)
        }
      }

      function mouseMove (e) {
        mousePos.set(e.clientX, e.clientY)
        arrows.forEach((arrow, i) => {
          const vecToMouse = new THREE.Vector2().subVectors(
            mousePos,
            arrowCenters[i]
          )
          const angle = vecToMouse.angle()
          arrow.style.setProperty('--arrow-angle', angle)
        })
      }
      init()

      function onResize () {
        grid.value.style.setProperty('--num-columns', numArrowsX)
        grid.value.style.setProperty('--num-rows', numArrowsY)
        grid.value.innerHTML = ''
        generateArrowGrid()
      }
      window.addEventListener('resize', onResize)
    })
    return {
      grid,
      arrow
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  --num-columns: 6;
  --num-rows: 6;
  --arrow-angle: 0;
  --arrow-scale: 0.5;
  --color-arrow: rgba(255,255,255,0.9)
}
.arrow {
  transform: rotate(calc(var(--arrow-angle) * 1rad)) scale(var(--arrow-scale));
  max-width: 100%;
  & > path {
    stroke: var(--color-arrow);
  }
  // height: 30px;
  // background: white;
}

.grid {
  width: 100%;
  height: 100vh;
  display: grid;
  cursor: crosshair;
  overflow: hidden;
  background: #111;
  grid-template-columns: repeat(var(--num-columns), 1fr);
  grid-template-rows: repeat(var(--num-rows), 1fr);
  grid-gap: 2em;
}
</style>

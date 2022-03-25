<template>
  <canvas ref="canvas" width="600" height="400" />
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  setup () {
    const canvas = ref()

    const radi = (deg) => {
      return deg * Math.PI / 180
    }
    onMounted(() => {
      const ctx = canvas.value.getContext('2d')
      let xPos = 10
      let count = 0
      const draw = () => {
        if (count % 30 === 0) {
          ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
          ctx.beginPath()
          ctx.arc(xPos, 150, 10, 0, radi(360))
          ctx.fill()
          xPos += 5
        }
        count++
        requestAnimationFrame(draw)
      }
      draw()
    })
    return {
      canvas
    }
  }
}
</script>

<style lang="scss" scoped>
canvas {
  position: relative;
  // width: 100%;
  // height: 100%;
  background: rgb(158, 158, 158);
}
</style>

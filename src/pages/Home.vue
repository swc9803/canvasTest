<template>
  <canvas ref="canvas" width="600" height="400" />
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  setup () {
    const canvas = ref()
    onMounted(() => {
      const w = innerWidth
      // const h = innerHeight
      const ctx = canvas.value.getContext('2d')
      ctx.fillRect(50, 50, w, w)
      ctx.fillStyle = 'red'
      ctx.fillRect(0, 0, 100, 100)
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
  background: rgb(43, 43, 43);
}
</style>

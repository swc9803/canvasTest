<template>
  <div class="test" id="test">
    </div>
</template>

<script>
import getBackground from '@/components/getBackground'
export default {
  setup () {
    // const { animateId, rendererDom } = getBackground()
    getBackground()
  }
}
</script>

<style lang="scss" scoped>
.cont {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

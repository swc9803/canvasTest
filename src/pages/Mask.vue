<template>
  <!-- <div class="container">
  </div> -->
  <div class="scrollEl" ref="scr"></div>
  <div class="dd">
    <div class="box"></div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    const scr = ref()
    onMounted(() => {
      const carAni = gsap.timeline({
        scrollTrigger: {
          trigger: scr.value,
          start: 'top top',
          end: '80%',
          scrub: 1
        }
      })
      carAni.to('.box', {
        clipPath: 'circle(75%)'
      })
    })
    return {
      scr
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollEl {
  width: 10px;
  height: 150vh;
  position: absolute;
}
.dd {
  width: 400px;
  height: 400px;
}
.box {
  width: 100%;
  height: 100%;
  background-size: cover;
  background: url('~@/assets/pizza.png');
  clip-path: circle(5%);
}
</style>

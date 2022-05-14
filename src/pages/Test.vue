<template>
  <button @click="dd">click</button>
  <div class="scrollEl" ref="scr"></div>
  <div class="blue"></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default {
  setup () {
    const scr = ref()
    const dd = () => {
      console.log(carAni)
    }
    const carAni = gsap.timeline({
      scrollTrigger: {
        start: 'top top',
        end: '50% top',
        scrub: true,
        markers: true
      }
    })
    onMounted(() => {
      carAni.fromTo('.blue', { opacity: 1 }, { opacity: 0 })
    })
    return {
      dd,
      scr
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  z-index: 5;
}
.blue {
  width: 400px;
  height: 200vh;
  background: blue;
}
.box {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  background: url('~@/assets/pizza.png');
  // clip-path: circle(5%);
}
button {
  text-align: left;
  margin: 50px;
}
</style>

<template>
  <div class="box box1">one</div>
  <div class="box box2"></div>
  <div class="dd">
    <div class="ss">sticky</div>
  </div>
  <div class="box box3">three</div>
  <div class="box box3">three</div>
  <div class="box box3">three</div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  setup () {
    onMounted(() => {

    })
  }
}
</script>

<style lang="scss" scoped>
.dd {
  width: 10px;
  height: 150vh;
  background: black;
  .ss {
    position: sticky;
    width: 100px;
    height: 100px;
    top: 0;
    left: 50%;
    background: rgb(99, 83, 83);
  }
}
.box {
  width: 90%;
  height: 100vh;
  color: white;
}
.box1 {
  background: red;
}
.box2 {
  background: blue;
}
.box3 {
  // background: green;
}
</style>

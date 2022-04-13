<template>
  <canvas id="canvas"></canvas>
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

html, body {
    margin: 0;

    padding: 0;
    width: 100%;
    height: 100%;

    font-family: "Helvetica", sans-serif;

    background: #222222;

    overflow: hidden;
}

div{
width:100%;
color:#e8cf53;
text-align:center;
font-size:100px;
    font-weight: 100;
position:absolute;
bottom:50px;
}
</style>

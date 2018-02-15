<template>
  <div id="app">
    <div class="container">
    <!-- <img src="./assets/logo.png"> -->
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {padding: 0; margin: 0; box-sizing: border-box;}
#app {
  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* margin-top: 60px; */
  position: relative;
  min-width: 1000px;
  min-height: 800px;
  height: 100vh;
}
#app .container {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(/static/snow.jpg);
}
.img {
  width: 100%;
  height: 100%;
}
.middle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>

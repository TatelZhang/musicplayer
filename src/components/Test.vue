<template>
  <div class="test-container">
    <div class="progress middle" @click="hh">

    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      hh (e) {
        console.log(e)
      }
    }
  }
</script>
<style>
  .test-container {
    border: 1px solid red;
    height: 20px;
    width: 200px;
    position: relative;
  }
  .progress {
    height: 10px;
    width: 100%;
    background-color: palegreen;
  }
</style>

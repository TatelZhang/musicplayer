<template>
  <div class="search-container">
    <div class="music-box">
      <div class="item">
        <div class="pic">
          <img src="http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg" alt="" class="img">
        </div>
        <div class="info">
          <span class="label">歌曲名</span>
          <span class="label">歌手</span>
          <span class="label">专辑</span>
          <span class="label" @click="test"><i class="fa fa-play"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {

      }
    },
    computed: {
      keywords () {
        // return this.$route.
      }
    },
    methods: {
      test () {
        console.log(this.$route)
      }
    },
    mounted () {
      console.log(this.$route)
    }
  }
</script>
<style>
  .search-container {
  }
  .music-box {
    font-size: 12px;
    color: #243d6f;
    border: 1px solid red;
  }
  
  .music-box .item {
    height: 40px;
    position: relative;
    padding: 5px;
    background-color: rgba(243, 247, 249, .6);
    margin-bottom: 5px;
  }
  .music-box .item > * {
    display: inline-block;
    vertical-align: middle;
  }
  .music-box .item .pic {
    width: 30px;
    height: 30px;
    position: relative;
  }
  .music-box .item .info {
  }
  .item .info .label {
    display: inline-block;
    line-height: 100%;
    /* vertical-align: baseline; */
    margin-left: 50px;
  }
</style>

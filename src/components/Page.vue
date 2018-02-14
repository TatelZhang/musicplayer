<template>
  <div class="page-container">
    <div class="wrapper"></div>
    <div class="left">
      <Menu></Menu>
    </div>
    <div class="right">
      <div class="search-banner">
        
        <input type="text" class="search-input" placeholder="请输入歌曲名字">
        <button class="btn"><i class="fa fa-search"></i></button>
      </div>
      <div class="result">
        <router-view />
      </div>
    </div>
    <div class="controller">
      <Controller></Controller>
    </div>
  </div>
</template>
<script>
  import './page.css'
  import Menu from './Menu'
  import Controller from './Controller'
  export default {
    components: {Menu, Controller},
    data () {
      return {

      }
    },
    methods: {
      test () {
        axios.get('/api/search?keywords=海阔天空').then(res => {
          console.log(res)
        })
      }
    },
    mounted () {
      this.$router.push({path: '/search'})
    }
  }
</script>

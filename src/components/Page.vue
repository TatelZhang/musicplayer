<template>
  <div class="page-container">
    <div class="wrapper"></div>
    <div class="left">
      <Menu></Menu>
    </div>
    <div class="right">
      <div class="search-banner">
        <input type="text" class="search-input" placeholder="请输入歌曲名字" v-model="keywords">
        <button class="btn" @click="search"><i class="fa fa-search"></i></button>
      </div>
      <div class="result">
        <!-- <button class="btn" @click="test">点击</button> -->
        <router-view @change-song="changeSong" :keywords="keywords"/>
      </div>
    </div>
    <div class="controller">
      <Controller :song="song"></Controller>
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
        song: {
          id: '29713638',
          img: 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
          title: '心做し',
          author: '双笙'
        },
        keywords: ''
      }
    },
    methods: {
      test () {
        // axios.get('/api/search?keywords=海阔天空').then(res => {
        //   console.log(res)
        // })
        this.song.id = 451113443
      },
      changeSong (song) {
        for(let key in this.song){
          this.song[key] = song[key]
        }
      },
      search () {
        this.$router.push({name: 'search', params: {keywords: this.keywords}})
      }
    },
    mounted () {
      this.$router.push({path: '/search'})
    }
  }
</script>

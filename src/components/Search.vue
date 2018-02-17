<template>
  <div class="search-container">
    <div class="music-box">
      <div class="item" v-for="song in songs" :key="song.id">
        <div class="pic">
          <img :src="song | getImg" alt="" class="img">
        </div>
        <div class="info">
          <span class="label" style="width: 300px;">{{song.name}}</span>
          <span class="label" style="width: 80px;">{{song | getArtists}}</span>
          <span class="label" style="width: 200px;">{{song.album?song.album.name: '暂无'}}</span>
          <span class="label" @click="play(song)"><i class="fa fa-play"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        songs: []
      }
    },
    props: {
      keywords: {
        type: String,
        default: '心做し'
      }
    },
    watch: {
      keywords (val) {
        if(!val) return
        this.getSongs()
      }
    },
    computed: {
     
    },
    methods: {
      test () {
        console.log(this.$route)
      },
      getSongs () {
        const params = {}
        params.keywords = this.keywords
        params.limit = '10'
        params.offset = 0
        axios.get('/api/search', {params}).then(({status, data}) => {
          if(status === 200 && data.code === 200) {
            this.songs = data.result.songs
          }
        })
      },
      play (song) {
        const item = {}
        item.id = song.id
        item.img = song.artists[0]? song.artists[0].img1v1Url : 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
        item.title = song.name
        item.author = song.artists[0]? song.artists[0].name : '未知作者'
        this.$emit('change-song', item)
      }
    },
    filters: {
      getArtists (song) {
        const artists = song.artists
        let arts = artists.map(item => {
          return item.name
        })
        return arts.join(',')
      },
      getImg (song) {
        const artists = song.artists
        let imgs = artists.map(item => item.img1v1Url)
        return imgs[0] || 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
      }
    },
    mounted () {
      // console.log(this.$route)
      this.getSongs()
    }
  }
</script>
<style>
  .search-container {
  }
  .music-box {
    font-size: 12px;
    color: #243d6f;
    /* border: 1px solid red; */
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
    position: relative;
  }
  .item .info .label {
    display: inline-block;
    line-height: 100%;
    /* vertical-align: baseline; */
    margin-left: 10px;
    /* width: 20%; */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; 
  }
  .item .info .label.name {
    width: 300px;
  }
  .item .info .label .fa {
    cursor: pointer;
  }
  .item .info .label .fa:hover {
    color:chartreuse;
  }
</style>

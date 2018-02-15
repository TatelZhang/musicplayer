<template>
  <div class="ctrl">
    <div class="info">
      <div class="pic">
        <img :src="song.img" alt="" class="img">
      </div>
      <div class="desc">
        <div>
          <span>{{song.title}}</span>
        </div>
        <div>
          <span style="font-size: 12px;color:#aeb7c8;">{{song.author}}</span>
        </div>
      </div>
    </div>
    <div class="operate">
      <div class="prev">
        <div class="middle">
          <i class="fa fa-backward"></i>
        </div>
      </div>
      <div class="play">
        <div class="middle" style="font-size: 30px;" @click="playSong">
          <i v-if="playing" class="fa fa-stop-circle"></i>
          <i v-else class="fa fa-play-circle"></i>
          <audio :src="url" style="display: none;" ref="song"></audio>
        </div>
      </div>
      <div class="next" @click="changeSong">
        <div class="middle">
          <i class="fa fa-forward"></i>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      // id: {type: String, default: '29713638'}
      song: {
        type: Object,
        default () {
          return {
            id: '29713638',
            img: 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            title: '心做し',
            author: '双笙'
          }
        }
        
      }
    },
    data () {
      return {
        url: '',
        playing: false,
        music: this.$refs.song
      }
    },
    watch: {
      playing (val) {
        if(val){
          this.play()
        }else{
          this.pause()
        }
      },
      url () {  // 音乐url改变 播放音乐
        if(this.playing){
          this.music.autoplay = true
          this.play()
        }
      },
      id (val) {  // 音乐id改变 获取音乐
        this.getSong()
      }
    },
    computed: {
      id () {
        // this.song.id
        return this.song.id
      }
    },
    methods: {
      playSong () {
        this.playing = !this.playing
        this.getSong()  // 获取音乐url
      },
      play () {
        this.music.play()
      },
      pause () {
        this.music.pause()
      },
      changeSong () {
      },
      getSong () {
        axios.get('/api/music/url', {params: {id: this.id}}).then(({status, data}) => {
          this.url = data.data[0].url
        })
      }
    },
    mounted () {
      // this.getSong()
      this.music = this.$refs.song
    }
  }
</script>
<style>
  .ctrl {
    height: 100%;
    width: 100%;
  }
  .ctrl .info, .ctrl .info .pic, .ctrl .info .desc, .ctrl .operate, .ctrl .operate > *{
    display: inline-block;
  }
  .ctrl .info {
    height: 100%;
    width: 300px;
  }
  .ctrl .info .pic {
    height: 50px;
    width: 50px;
    overflow: hidden;
    border-radius: 5px;
    vertical-align: middle;
    /* transform: translateY(50%); */
    /* line-height: 100%; */
    margin: 5px;
    background-color: white;
  }
  
  .ctrl .desc {
    color: #243d6f;
    font-size: 14px;
    font-weight: bold;
    vertical-align: middle;
  }
  .ctrl .operate {
    color: #6b7af1;
    width: 250px;
    height: 100%;
    vertical-align: middle;
    position: relative;
    font-weight: bold;
    font-size: 15px;
  }
  .ctrl .operate .prev, .ctrl .operate .play, .ctrl .operate .next{
    height: 100%;
    width: 50px;
    position: relative;
  }
  .prev:hover, .play:hover, .next:hover{
    color: #6b7ac0;
  }
  .middle i {
    cursor: pointer;
  }
</style>

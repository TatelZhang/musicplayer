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
    <div class="volumn">
      <div class="middle" style="width:100%;">
        <input type="range" v-model.number="volume" :style="volumeStyle" min=1 max=100>
        <i class="fa fa-volume-up" v-if="volume>50"></i>
        <i class="fa fa-volume-down" v-else></i>
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
            id: '478303470',
            img: 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
            title: '心做し',
            author: '双笙'
          }
        }
        
      }
    },
    data () {
      return {
        url: 'http://up.mcyt.net/down/43014.mp3',
        playing: false,
        music: this.$refs.song,
        volume: 100
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
      url (val) {  // 音乐url改变 播放音乐
        if(val){
          this.music.autoplay = true
          // this.play()
          this.playing = true
          // console.log(this.music.autoplay)
          // this.music.loadstart = () => {
          //   this.music.autoplay = true
          //   this.playing = true
          //   console.log('load start')
          // }
        }
      },
      id (val) {  // 音乐id改变 获取音乐
        console.log(val)
        this.getSong()
      },
      volume (val) {
        // console.log(val)
        this.music.volume = val/100
      }
    },
    computed: {
      id () {
        // this.song.id
        return this.song.id
      },
      volumeStyle () {
        const len = this.volume
        return `background: -webkit-linear-gradient(left, #6b7af1 0%, #6b7af1 ${len}%, #fff ${len}%, #fff 100%)`
      }
    },
    methods: {
      playSong () {
        this.playing = !this.playing
      },
      play () {
        try {
          this.music.play()
        } catch (error) {
          console.log(error)
        }
      },
      pause () {
        try {
          this.music.pause()
        } catch (err){
          console.log(err)
        }
      },
      wrapper () {
        this.music.addEventListener('ended', (r) => {
          this.playing = false
        })
        this.music.addEventListener('playing', (r) => {console.log(r)})
      },
      changeVolume () {
        this.music.volume = 0;
      },
      changeSong () {
        this.music.volume = Math.random()
        // console.log(this.music.volume)
      },
      getSong () {
        this.playing = false
        axios.get('/api/music/url', {params: {id: this.id}}).then(({status, data}) => {
          this.url = data.data[0].url
        })
      }
    },
    mounted () {
      // this.getSong()
      this.music = this.$refs.song
      this.wrapper()
      // console.log(this.music.volume)
      // console.log(this.music.end)
      // // this.music.ended = () => {
      // //   console.log(1111)
      // // }
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
  .ctrl .operate > *{
    height: 100%;
    width: 50px;
    position: relative;
  }
  .prev:hover, .play:hover, .next:hover{
    color: #6b7ac0;
  }
  .ctrl .volumn {
    vertical-align: middle;
    position: relative;
    display: inline-block;
    width: 200px;
    height: 100%;
  }
  .middle i {
    cursor: pointer;
  }
  .volumn div > * {
    display: inline-block;
    vertical-align: middle;
    color: #6b7af1;
    cursor: default;
  }
  .volumn input {
    -webkit-appearance: none;
    outline: none;
    background: none;
    height: 3px;
    transition: 1s;
  }
  .volumn input::-webkit-slider-thumb{
    -webkit-appearance: none;
    height: 13px;
    width: 13px;
    background-color: #6b7af1;
    border-radius: 50%;
    border: 1px solid #fff;
  }
  /* .volumn input:hover::-webkit-slider-thumb{
    border-color: #fff;
  } */
</style>

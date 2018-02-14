<template>
  <div class="ctrl">
    <div class="info">
      <div class="pic">
        <img :src="imgUrl" alt="" class="img">
      </div>
      <div class="desc">
        <div>
          <span>{{title}}</span>
        </div>
        <div>
          <span style="font-size: 12px;color:#aeb7c8;">{{author}}</span>
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
        </div>
      </div>
      <div class="next" @click="getSong">
        <div class="middle">
          <i class="fa fa-forward"></i>
        </div>
      </div>
      <audio :src="songUrl" controls style="display: none;" ref="song"></audio>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        id: '400162138',
        imgUrl: 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        author: '歌手',
        title: '歌曲名',
        songUrl: 'http://m10.music.126.net/20180214204231/fcd99f3a1798ac2866560f7bdc41f071/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3',
        playing: false,
      }
    },
    watch: {
      playing (val) {
        if(val){
          this.play()
        }else{
          this.pause()
        }
      }
    },
    methods: {
      playSong () {
        this.playing = !this.playing
        // console.log(this.$refs.song.play)
        if(!this.playing){
          this.$refs.song.play()
        }else{
          const a = document.createElement('audio')
          // a.pause
          this.$refs.song.pause()
        }
      },
      play () {
        this.$refs.song.play()
      },
      pause () {
        this.$refs.song.pause()
      },
      getSong () {
        axios.get('/api/music/url', {params: {id: this.id}}).then(({status, data}) => {
          this.songUrl = data.data[0].url
        })
      }
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
  }
  .img {
    width: 100%;
    height: 100%;
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
  .middle {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
  .middle i {
    cursor: pointer;
  }
</style>

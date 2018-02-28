<template>
  <div class="ctrl">
    <div :class="['lyric', {show:lyricShow}]">
        <div class="wrapper" :style="wrapperImg"></div>
        <div class="lrc-container" ref="lrc">
          <div class="pice" v-if="!lyric.length">抱歉，暂无歌词</div>
          <div v-for="item in lyric" class="pice" :class="{active: isCurrLrc === item[0]}">
            <div class="self" @click="lrcChangeProgress(item[0])">{{item[1]}}</div>
            <!-- <div class="extra">ssss</div> -->
          </div>
        </div>
    </div>
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
      <div class="next">
        <div class="middle">
          <i class="fa fa-forward"></i>
        </div>
      </div>
      <div class="cycle" style="width: 20px;">
        <div class="middle">
          <i class="fa fa-random"></i>
        </div>
      </div>
      <div :class="['lrc', {active: lyricShow}]">
        <div class="middle">
          <span @click="showLrc">词</span>
        </div>
      </div>
    </div>
    <div class="volumn">
      <div class="middle" style="width:100%;">
        <span style="display:inline-block; width:15px;">
          <i class="fa fa-volume-up" v-if="volume>50"></i>
          <i class="fa fa-volume-down" v-else></i>
        </span>
        <input type="range" v-model.number="volume" :style="volumeStyle" min=1 max=100>
      </div>
    </div>
    <div class="progress">
      <input type="range" v-model="progress" :style="progressStyle" @click="changeProgress" :max="duration">
    </div>
    
  </div>
</template>
<script>
  const lrc = "[by:love_hassy] [00:00.00] 作曲 : 蝶々P [00:00.580] 作词 : 蝶々P [00:01.740]ねぇもしも [00:03.900]全て投げ捨てられたら [00:07.480]笑って生きることが楽になるの [00:12.900]また胸が痛くなるから [00:17.300]もう何も言わないでよ [00:23.030] [00:47.400]ねぇもしも [00:48.900]全て忘れられたなら [00:52.850]泣かないで生きることも 楽になるの [00:58.730]でもそんな事出来ないから [01:02.910]もう何も見せないでよ [01:08.520]君にどれだけ近づいても [01:14.300]僕の心臓は一つだけ [01:20.520]酷いよ酷いよ [01:22.720]もういっそ僕の体を [01:25.720]壊して引き裂いて [01:28.600]好きなようにしてよ [01:31.300]叫んで藻掻いて [01:34.100]瞼を腫らしても [01:37.000]まだ君は僕の事を [01:39.850]抱きしめて離さない [01:42.760]もういいよ [01:46.800] [01:55.640]ねぇもしも [01:57.750]僕の願いが叶うなら [02:01.150]君と同じものが欲しいんだ [02:06.700]でも僕には存在しないから [02:11.450]じゃあ せめて此処に来てよ [02:18.350] [02:21.100]あ [02:42.300]君にどれだけ愛されても [02:48.090]僕の心臓は一つだけ [02:53.780]やめてよやめてよ [02:56.500]優しくしないでよ [02:59.390]どうしても僕には [03:02.300]理解ができないよ [03:05.060]痛いよ痛いよ [03:08.010]言葉で教えてよ [03:10.800]こんなの知らないよ [03:13.660]独りにしないで [03:16.600]酷いよ酷いよ [03:19.180]もういっそ僕の体を [03:22.210]壊して引き裂いて [03:24.970]好きなようにしてよ [03:27.800]叫んで藻掻いて [03:30.550]瞼を腫らしても [03:33.540]まだ君は僕の事を [03:36.250]抱きしめて離さない [03:39.290]もういいよ [03:45.510] [04:03.590]ねぇもしも [04:04.870]僕に心があるなら [04:09.060]どうやってそれを 見つければいいの [04:14.800]少し微笑んで君が言う [04:19.130]「それはねここにあるよ」 [04:24.560] "
  function solveLrc (lrc) {
    const lrcArr = []
    const pattern = /(\[\d{2}:\d{2}\.\d*\]\s+)*\[\d{2}:\d{2}\.\d*\][^\[]*/g  // 用于匹配歌词单元的正则表达式
    const p2 = /\[\d{2}:\d{2}\.\d*\]/g   // 时间正则表达式
    const res = lrc.match(pattern)
    res.map((item)=>{
      const lrcItem = item.replace(p2, '').trim() // 获取歌词
      const r = item.match(p2)  // 获取时间 ['[]','[]']
      Array.prototype.forEach.call(r, (unit)=> {
        const t = unit.slice(1, -1).split(':')
        const tr = (parseInt(t[0], 10)*60 + parseFloat(t[1])).toFixed(3)
        lrcArr.push([Number(tr), lrcItem])
      })
    })
    const rrr = lrcArr.sort((x, y) => {
      return x[0] - y[0]
    })
    // console.log(rrr)
    return rrr
  }
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
        playing: false,      // 播放状态
        music: this.$refs.song,  // 媒体节点
        volume: 20,     // 歌曲声音*100
        progress: 0,   // 歌曲进度
        duration: 0,    // 歌曲长度
        lyricShow: false,
        lyric: [],    // 歌词容器
        tlyric: [],   // 译词
        lrcIndex: 0   // 用于调整歌词高度
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
          this.playing = true
        }
      },
      id (val) {  // 音乐id改变 获取音乐
        // console.log(val)
        this.getSong()
        this.getLyric()
      },
      volume (val) {
        this.music.volume = val/100
      },
      progress (val) {
        // console.log(val)
      },
      lrcIndex (val) {
        this.$refs.lrc.scrollTop = val * 60
        // console.log(this.$refs.lrc.scrollTo)
      }
    },
    computed: {
      id () {
        // this.song.id
        return this.song.id
      },
      volumeStyle () {  // 声音进度样式控制
        const len = this.volume
        return `background: -webkit-linear-gradient(left, #6b7af1 0%, #6b7af1 ${len}%, #fff ${len}%, #fff 100%)`
      },
      progressStyle () {   // 播放进度样式控制
        const curr = Number(this.progress)
        const len = curr / Number(this.duration) * 100
        return `background: -webkit-linear-gradient(left, #6b7af1 0%, #6b7af1 ${len}%, #eee ${len +2}%,#eee ${len +2}%, #eee 100%)`
      },
      wrapperImg () {
        // return `backgr`
        return `background-image: url(${this.song.img});`
      },
      isCurrLrc () {
        const cur = this.lrcTime
        // let t = 0
        if(!this.lyric.length) return ;
        for(let [k, v] of this.lyric.entries()){
          // console.log(v)
          if(cur >=(parseInt(v[0]) - 1) && cur < (this.lyric[k+1] ? this.lyric[k+1][0]:cur + 1)){
            this.lrcIndex = k
            // console.log(k)
            return v[0]
          }
        }
        // this.lyric.forEach((item, index, arr) => {
        //   if(cur >= parseInt(item[0]) && cur < arr[index+1][0]){
        //     t = item[0]
        //     return 
        //   }
        //   console.log(item)
        // })
        // return t
      },
      lrcTime () {
        return parseInt(this.progress)
      }
    },
    methods: {
      playSong () { // 更改当前播放状态
        this.playing = !this.playing
      },
      play () { //播放音乐
        try {
          this.music.play()
        } catch (error) {
          console.log(error)
        }
      },
      pause () { // 暂停播放
        try {
          this.music.pause()
        } catch (err){
          console.log(err)
        }
      },
      initDefalt () {   // 初始化audio DOM
        this.music.volume = this.volume/100;
        this.music.addEventListener('ended', (r) => {
          this.playing = false
        })
        this.music.addEventListener('timeupdate', ({target}) => {   // 进度条控制
          this.duration = target.duration     // 获取音乐长度
          this.progress = target.currentTime  // 获取音乐当前进度
        })
        this.music.addEventListener('loadeddata', (e) => {  // 媒体的第一帧加载完毕
          const {target, srcElement} = e
          this.duration = target.duration
          this.progress = 0
        })
      },
      getSong () {  // 获取音乐链接
        this.playing = false
        axios.get('/music/music/url', {params: {id: this.id}}).then(({status, data}) => {
          this.url = data.data[0].url
        })
      },
      changeProgress () {  // 更改音乐当前进度
        this.music.currentTime = this.progress
      },
      getLyric () {
        axios.get('/music/lyric', {params: {id: this.id}}).then(({status, data}) => {
          if(status === 200 && data.code === 200) {
            this.lyric = solveLrc(data.lrc.lyric)
            this.lrcIndex = 0
          }else{
            this.lyric = []
          }
        })
      },
      lrcChangeProgress (val) {
        this.music.currentTime = val
      },
      showLrc () {
        this.lyricShow = !this.lyricShow
      }
    },
    mounted () {
      this.music = this.$refs.song  // 获取audio DOM 节点
      this.initDefalt()
      this.lyric = solveLrc(lrc)
    }
  }
</script>
<style>
  .ctrl {
    height: 100%;
    width: 100%;
  }
  .ctrl > * , .ctrl > * > * {
    display: inline-block;
  }
  /* .ctrl .info .pic, .ctrl .info .desc, .ctrl .operate, .ctrl .operate > *{
    display: inline-block;
  } */
  .ctrl .info {
    transform: translateX(0);
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
    /* width: 150px; */
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
  .ctrl .operate .cycle{

  }
  .ctrl .operate .lrc span {
    color: #b4bed0;
    cursor: pointer;
  }
  .ctrl .operate .lrc.active span{
    color: #6b7af1;
  }
  .prev:hover, .play:hover, .next:hover{
    color: #6b7ac0;
  }
  .ctrl .volumn {
    vertical-align: middle;
    position: relative;
    display: inline-block;
    width: 160px;
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
  .ctrl .progress {
    display: block;
    position: absolute;
    width: 100%;
    top: 0;
    height: 3px;
  }
  .ctrl .progress input {
    cursor: pointer;
    position: absolute;
    background: #eee;
    top: 0;
    width: 100%;
    -webkit-appearance: none;
    outline: none;
    height: 3px;
    border-radius: 10px;
  }
  .ctrl .progress input::-webkit-slider-thumb{
    -webkit-appearance: none;
    height: 10px;
    height: 3px;
    width: 3px;
    background: #6b7af1;
    border-radius: 10px;
  }
  .ctrl .lyric {
    position: fixed;
    top: 100%;
    left: 20%;
    width: 80%;
    height: 100%;
    transition: top .3s;
    overflow: hidden;
    background-color: #f3f7f9;
  }
  .ctrl .lyric.show {
    
    top: 0;
   
    /* background-size: cover; */
    /* filter: blur(60px);
    background-image: url(http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg); */
    /* border:1px solid red; */
  }
  .ctrl .lyric .wrapper{
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: contrast(100%);
    background-size: cover;
    background-color: #4c534c;
    /* background-image: url(http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg); */
  }
  /* .volumn input:hover::-webkit-slider-thumb{
    border-color: #fff;
  } */
  .ctrl .lrc-container {
    user-select: none;
    position: relative;
    width: 600px;
    height: 60%;
    margin-left: 50%;
    margin-top: 10%;
    transform: translateX(-50%);
    overflow: auto;
    text-align: center;
    padding-top: 120px; 
  }
  .ctrl .lrc-container .pice{
    color: #fff;
    height: 50px;
    font-family: '微润雅黑';
    margin-bottom: 10px;
    transition: color .5s;
  }
  .ctrl .lrc-container .pice.active {
    color: #31c27c;
    font-weight: bold;
  }
  .ctrl .lrc-container .pice .self {
    
    cursor: pointer;
  }
  .ctrl .lrc-container::-webkit-scrollbar{
    -webkit-appearance: none;
  }
</style>

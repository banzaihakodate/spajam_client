<template>
  <div class="home">
    <div v-if="isDebuf">
      <div>{{beta}}</div>
      <div>{{gamma}}</div>
      <div>{{y}}</div>
      <div>{{x}}</div>
    </div>
    {{angle}}
    <v-btn
      @click="start">
      スタート
    </v-btn>
  </div>
</template>

<script>
import { mapActions ,mapGetters } from 'vuex'
import router from '../plugins/router'

// 以下ではココでthisを用いて使用できるようにするための宣言
export default {
  name: 'home',
  data() {
    return {
      isDebug:false,
      beta:0,
      gamma:0,
      x:0, 
      y:0,
      angle:0
      // このコンポーネントのみで使う値の宣言
    }
  },
  components: {
    // 使うコンポーネントの宣言
  },
  computed: {
    ...mapGetters([
      'evil'
    ]),
  },
  methods: {
    ...mapActions([
      // Actionから受け取りたいアクションを選択
    ]),
    start(){
      router.push('/win')
    },
    audio(){
      const audio = new Audio("http://kina-ko.appspot.com/toy/suiso/a_oto_m64.mp3?20180405");
      audio.play();
    },
    orientationHandler() { //要パラメータ調整
      this.beta = event.beta //角度
      this.gamma = event.gamma //角度
      this.x = Math.sin(event.gamma*Math.PI/180) //ラジアンに変換して正弦波
      this.y = Math.cos(event.beta*Math.PI/180) //ラジアンに変換して余弦波
      const _angle = Math.atan2(this.x,this.y)*180/Math.PI //tanの値から，角度算出
      if (_angle < 0) {
        this.angle = Math.floor(360 + _angle)
      } else {
        this.angle = Math.floor(_angle)
      }
    }
  },
  created() {
    window.addEventListener('deviceorientation', this.orientationHandler)
    if (this.evil === true ) {
      setTimeout(this.audio, 2000);
    }
  }
}
</script>

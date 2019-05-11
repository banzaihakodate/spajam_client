<template>
  <div class="home">
    <div v-if="isDebuf">
      <div>{{beta}}</div>
      <div>{{gamma}}</div>
      <div>{{y}}</div>
      <div>{{x}}</div>
    </div>
    {{angle}}
  </div>
</template>

<script>
import { mapActions ,mapGetters } from 'vuex'

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
      // Getterから受け取りたい値を選択
    ]),
  },
  methods: {
    ...mapActions([
      // Actionから受け取りたいアクションを選択
    ]),
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
  }
}
</script>

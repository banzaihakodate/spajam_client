<template>
  <div class="pl-5 pr-5">
    <div v-if="isDebug">
      <div>{{beta}}</div>
      <div>{{gamma}}</div>
      <div>{{y}}</div>
      <div>{{x}}</div>
    </div>
    <div v-if="!this.evil">
      <img :style="{ transform: 'rotate('+ this.angle +'deg)'}" src="../assets/yubi.png" class="img"/>
    </div>
    <div v-if="this.evil">
      <img :style="{ transform: 'rotate('+ this.stateAngle +'deg)'}" src="../assets/yubi.png" class="img"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
      angle:0,
    }
  },
  components: {
    // 使うコンポーネントの宣言
  },
  computed: {
    ...mapGetters([
      'evil',
      'id',
      'name',
      'isHoi',
      'users',
      'stateAngle'
    ]),
  },
  methods: {
    ...mapActions([
      'REQUEST_DONE_HOI',
      'REQUEST_IS_HOI',
      'REQUEST_SET_GYRO',
      'REQUEST_GET_GYRO'
      // Actionから受け取りたいアクションを選択
    ]),
    start(){
      router.push('/win')
    },
    audio(){
      const audio = new Audio('http://cloud.ai-j.jp/hackathon/tmp/201905120102081253378235.ogg')
      audio.addEventListener('ended', () => {
        this.REQUEST_DONE_HOI(this.id)
      })
      audio.play();
    },
    orientationHandler() { //要パラメータ調整
      if (!this.evil) {
        this.beta = event.beta //角度
        this.gamma = event.gamma //角度
        this.x = Math.sin(event.gamma * Math.PI / 180) //ラジアンに変換して正弦波
        this.y = Math.cos(event.beta * Math.PI / 180) //ラジアンに変換して余弦波
        const _angle = Math.atan2(this.x, this.y) * 180 / Math.PI //tanの値から，角度算出
        if (_angle < 0) {
          this.angle = Math.floor(360 + _angle)
        } else {
          this.angle = Math.floor(_angle)
        }
      }
    }
  },
  created() {
    if (this.evil) {
      setTimeout(this.audio, 2000);
    } else {
      window.addEventListener('deviceorientation', this.orientationHandler)
      this.REQUEST_IS_HOI(this.id)
    }
  },
  watch: {
    isHoi: function(newVal) {
      if (newVal) {
        window.removeEventListener('deviceorientation', this.orientationHandler)
        this.REQUEST_SET_GYRO({
          roomID:this.id,
          userID:this.name,
          gyro:this.angle
        })
      }
    },
    users: {
      handler: function(val) {
        const dones = val.filter(item => item.gyro != null);
        if (val.length === dones.length){
          this.REQUEST_GET_GYRO({
            name: this.name,
            id: this.id,
          });
          //gyroがnullになっているuserが0であるので，次の処理へ
          setTimeout(() =>{
            router.push('win')
          },3000)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .button, .img {
    width: 100%;
  }
  .img {
    padding-top: 15vh;
  }
</style>

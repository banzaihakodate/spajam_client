<template>
  <div class="pl-5 pr-5">
    <div v-if="isDebug">
      <div>{{beta}}</div>
      <div>{{gamma}}</div>
      <div>{{y}}</div>
      <div>{{x}}</div>
    </div>
    <div v-if="!evil">
      <img :style="{ transform: 'rotate('+ this.angle +'deg)'}" src="../assets/yubi.png" class="img"/>
    </div>
    <div class="hoge">
    <v-btn
      round
      @click="start"
      color="primary"
      class="button">
      Start
    </v-btn>
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
      'users'
    ]),
  },
  methods: {
    ...mapActions([
      'REQUEST_DONE_HOI',
      'REQUEST_IS_HOI',
      'REQUEST_SET_GYRO'
      // Actionから受け取りたいアクションを選択
    ]),
    start(){
      router.push('/win')
    },
    audio(){
      const audio = new Audio('https://vocaroo.com/media_command.php?media=s1krZxkdiCyw&command=download_mp3')
      audio.addEventListener('ended', () => {
        this.REQUEST_DONE_HOI(this.id)
      })
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
        const dones = val.filter(item => item.gyro != null)
        if (val.length === dones.length){
          //gyroがnullになっているuserが0であるので，次の処理へ
          router.push('win')
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
  .img, .hoge{
    padding-top: 15vh;
  }
</style>

<template>
  <div class="pl-5 pr-5">
    <div v-if="isDebug">
      <div>{{beta}}</div>
      <div>{{gamma}}</div>
      <div>{{y}}</div>
      <div>{{x}}</div>
    </div>
    <img :style="{ transform: 'rotate('+ this.angle +'deg)'}" src="../assets/yubi.png" class="img"/>
    <div class="hoge">
      <v-btn
        round
        @click="audio"
        color="primary"
        v-if="this.evil"
        :disabled="this.btn"
        class="button">
        Music Start
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
      btn: false,
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
    audio(){
      this.btn = true;
      const audio = new Audio('https://vocaroo.com/media_command.php?media=s1krZxkdiCyw&command=download_mp3');
      audio.addEventListener('ended', () => {
        this.REQUEST_DONE_HOI(this.id)
      });
      audio.play();
    },
    orientationHandler() { //要パラメータ調整
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
  },
  mounted() {
    window.addEventListener('deviceorientation', this.orientationHandler)
    this.REQUEST_IS_HOI(this.id);
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
  .img, .hoge {
    padding-top: 15vh;
  }
</style>

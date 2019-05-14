<template>
  <div class="pl-5 pr-5 hoge">
    <div class="text-xs-center">
      <h2>Selected is ...</h2>
    <transition name="loser">
      <div v-if="this.show" class="pt-5">
        <img v-if='loser.isEvil' src="../assets/oni.png" class="img"/>
        <img v-if='!loser.isEvil' src="../assets/person.png" class="img"/>
        <h1>
          {{loser.name}}
        </h1>
      </div>
    </transition>
    </div>
    <div class="text-xs-center pt-5">
      <transition name="button">
        <v-btn
          round
          @click="start"
          color="rgba(255,99,71)"
          class="button"
          v-if="this.btn">
          Back
        </v-btn>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions ,mapGetters } from 'vuex'
import router from '../plugins/router'
import { INIT_REQUEST } from '../vuex/actions/input'
import { calcDistance360 } from '../helpers/calcDistance360'

// 以下ではココでthisを用いて使用できるようにするための宣言
export default {
  name: 'home',
  data() {
    return {
      show: false,
      btn: false,
    }
  },
  components: {
    // 使うコンポーネントの宣言
  },
  computed: {
    ...mapGetters([
      'id',
      'users'
    ]),
    loser: function() {
      const range = 20
      const evil = this.users.find(user => user.isEvil)
      const others = this.users.filter(user => !user.isEvil)
      const evilValue = evil.gyro
      let losers = null
      if (evilValue + range > 359) {
        const over = evilValue + range - 359
        const lower = evilValue - range
        losers = others.filter(user => lower <= user.gyro && user.gyro <= 359 || 0 <= user.gyro && user.gyro <= over)
      } else if (evilValue - range < 0) {
        const upper = evilValue + range
        const less = evilValue - range + 359
        losers = others.filter(user => less <= user.gyro && user.gyro <= 359 || 0 <= user.gyro && user.gyro <= upper)
      } else {
        const upper = evilValue + range
        const lower = evilValue - range
        losers = others.filter(user => lower <= user.gyro && user.gyro <= upper)
      }
      if (losers.length === 0) {
        return evil
      }
      if (losers.length === 1) {
        return losers[0]
      }

      let min = 181
      let minUser = {}
      losers.forEach(item => {
        const dist = calcDistance360(evilValue, item.gyro)
        if (dist < min) {
          min = dist
          minUser = item
        }
      })
      return minUser
    }
  },
  methods: {
    ...mapActions([
      INIT_REQUEST
    ]),
    start(){
      this.INIT_REQUEST(this.id);
      router.push('/')
    },
    changeShow(){
      this.show = true;
      this.btn = true;
    }
  },
  mounted() {
    // eslint-disable-next-line
    Particles.init({
      selector: '.background',
      sizeVariations: 30,
      maxParticles: 40,
      color: [
        'rgba(255,99,71,.5)', 'rgba(255,99,71,.3)', 'rgba(255,99,71,.1)'
      ]
    });

    this.show = false;
    setTimeout(this.changeShow, 2000)
  }
}
</script>

<style scoped>
  .hoge {
    padding-top: 12vh;
  }
  .button, img {
    width: 100%;
    color: white;
  }

  .loser-enter {
    opacity: 0;
  }
  .loser-enter-to {
    opacity: 1;
  }
  .loser-enter-active {
    transition: all 3s ease 0s;
  }

  .button-enter {
    opacity: 0;
  }
  .button-enter-to {
    opacity: 1;
  }
  .button-enter-active {
    transition: all 0s ease 3s;
  }
</style>

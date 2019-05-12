<template>
  <div class="home">
    <h1>Win</h1>
    <div>{{loser}}</div>
    <v-btn
      @click="start">
      スタート
    </v-btn>
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
      // このコンポーネントのみで使う値の宣言
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
      console.log(losers)
      if (losers.length === 0) {
        return evil.name
      }
      if (losers.length === 1) {
        return losers[0].name
      }

      let min = 181
      let minName = ''
      losers.forEach(item => {
        const dist = calcDistance360(evilValue, item.gyro)
        if (dist < min) {
          min = dist
          minName = item.name
        }
      })
      return minName
    }
  },
  methods: {
    ...mapActions([
      INIT_REQUEST
    ]),
    start(){
      this.INIT_REQUEST(this.id);
      router.push('/')
    }
  }
}
</script>

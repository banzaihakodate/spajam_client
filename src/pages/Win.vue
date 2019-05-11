<template>
  <div class="home">
    <h1>Win</h1>
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
    ]),
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

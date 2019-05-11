<template>
  <div class="home">
    <h1>おに</h1>
    <v-btn
      v-if="this.evil"
      @click="start">
      スタート
    </v-btn>
  </div>
</template>

<script>
import { mapActions ,mapGetters } from 'vuex'
import { REQUEST_START_HOI, REQUEST_START_TRIGGER } from '../vuex/actions/input'

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
      'evil',
      'id'
    ]),
  },
  methods: {
    ...mapActions([
      REQUEST_START_HOI,
      REQUEST_START_TRIGGER
      // Actionから受け取りたいアクションを選択
    ]),
    start(){
      this.REQUEST_START_HOI(this.id);
    }
  },
  created() {
    this.REQUEST_START_TRIGGER({id: this.id});
  }
}
</script>

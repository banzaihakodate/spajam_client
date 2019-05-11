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
      // Getterから受け取りたい値を選択
    ]),
  },
  methods: {
    ...mapActions([
      // Actionから受け取りたいアクションを選択
    ]),
    start(){
      // TODO: hostの場合，flagの変更，コレクションの1番目に鬼付与
      router.push('/')
    }
  }
}
</script>

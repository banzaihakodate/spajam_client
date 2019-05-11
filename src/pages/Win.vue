<template>
  <div class="home">
    <h1>Win</h1>
  </div>
</template>

<script>
import { mapActions ,mapGetters } from 'vuex'

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
  }
}
</script>

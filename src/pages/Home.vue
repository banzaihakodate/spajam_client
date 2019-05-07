<template>
  <div class="home">
    <Test />
  </div>
</template>

<script>
import Test from '../components/Test'
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
    Test
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

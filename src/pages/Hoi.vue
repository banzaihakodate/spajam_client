<template>
  <div class="home">
    <h1>ホイ</h1>
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
      'evil'
    ]),
  },
  methods: {
    ...mapActions([
      // Actionから受け取りたいアクションを選択
    ]),
    start(){
      router.push('/win')
    },
    audio(){
      const audio = new Audio("http://kina-ko.appspot.com/toy/suiso/a_oto_m64.mp3?20180405");
      audio.play();
    }

  },
  created(){
    if (this.evil === true ) {
      setTimeout(this.audio, 2000);
    }
  }
}
</script>

<template>
  <div class="pl-5 pr-5 hoge">
    <div class="text-xs-center">
      <h2>Your Job is ...</h2>
    </div>
    <transition name="fade">
      <img v-if='this.oni' src="../assets/oni.png" class="img"/>
      <img v-if='this.person' src="../assets/person.png" class="img"/>
    </transition>
    <div class="hoge">
      <transition name="button">
        <v-btn
          round
          @click="start"
          color="primary"
          v-if="this.button"
          class="button">
          Start
        </v-btn>
      </transition>
    </div>
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
      oni: false,
      person: false,
      button: false,
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
    },
    evil_flag(){
      if (this.evil){
        this.oni = true;
        this.button = true;
      } else {
        this.person = true;
      }
    }
  },
  mounted() {
    setTimeout(this.evil_flag, 2000);
    this.REQUEST_START_TRIGGER({id: this.id});
  }
}
</script>

<style scoped>
  .hoge {
    padding-top: 12vh;
  }
  .img, .hoge {
    padding-top: 6vh;
  }
  .button, .img {
    width: 100%;
  }
  .fade-enter {
     opacity: 0;
   }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-enter-active {
    transition: all 3s ease;
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

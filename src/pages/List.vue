<template>
  <div class="pl-5 pr-5 hoge">
    <div class="text-xs-center"><h2>{{`${this.users.length} person`}}</h2></div>
    <div class="pt-3"></div>
      <Card class="card mb-2" v-for="(item, index) in this.users" v-bind:key="index" v-bind="item"/>
    <div class="text-xs-center pt-5">
      <v-btn
        round
        @click="start"
        color="primary"
        class="button"
        v-if="this.host"
        :disabled="this.users.length <= 1">
        Start
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions ,mapGetters } from 'vuex'
import Card from '../components/Card'
import { REQUEST_USERS, REQUEST_ADD_EVIL } from '../vuex/actions/input'

// 以下ではココでthisを用いて使用できるようにするための宣言
export default {
  name: 'home',
  data() {
    return {
      // このコンポーネントのみで使う値の宣言
    }
  },
  components: {
    Card
    // 使うコンポーネントの宣言
  },
  computed: {
    ...mapGetters([
      'host',
      'users',
      'id',
      'name'
    ]),
  },
  methods: {
    ...mapActions([
      REQUEST_USERS,
      REQUEST_ADD_EVIL,
    ]),
    start(){
      this.REQUEST_ADD_EVIL(this.id);
    },
    askUsers(){
      this.REQUEST_USERS({id:this.id, name: this.name})
    }
  },
  mounted() {
      this.askUsers()
    ;
  }
}
</script>

<style scoped>
  .hoge {
    padding-top: 12vh;
  }
  .button, .img {
    width: 100%;
  }
  .card-enter {
    opacity: 0;
  }
  .card-enter-to {
    opacity: 1;
  }
  .card-enter-active {
    transition: all 0s ease 2s;
  }
</style>

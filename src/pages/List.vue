<template>
  <div class="home">
    <h1>リスト</h1>
    <Card class="card mb-2" v-for="(item, index) in this.users" v-bind:key="index" v-bind="item"/>
    <v-btn
      @click="start"
      v-if="this.host">
      スタート
    </v-btn>
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
  created() {
    setTimeout(
      this.askUsers
      ,2000)
    ;
  }
}
</script>

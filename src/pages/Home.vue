<template>
  <div class="home">
    <h1>ホーム</h1>
    <v-flex xs12 sm6 md3 class="pl-3">
      <v-text-field
        label="Name"
        v-model="name"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm6 md3 class="pl-3">
      <v-text-field
        type="number"
        label="room id"
        v-model="id"
      ></v-text-field>
    </v-flex>
    <v-btn
      @click="start">
      スタート
    </v-btn>
  </div>
</template>

<script>
import { mapActions ,mapGetters } from 'vuex'
import router from '../plugins/router'
import { REQUEST_INPUT } from '../vuex/actions/input'

// 以下ではココでthisを用いて使用できるようにするための宣言
export default {
  name: 'home',
  data() {
    return {
      name: '',
      id: '',
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
      REQUEST_INPUT
    ]),
    start(){
      // TODO: firebaseへの追加
      const data = {
        name: this.name,
        id: this.id,
      };

      this.REQUEST_INPUT(data);
      router.push('/list')
    }
  }
}
</script>

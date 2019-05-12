<template>
  <div class="home">
    <div class="pl-5 pr-5">
      <img src="../assets/logo.png" class="img"/>
      <v-flex xs12 md3 class="pt-5">
        <v-text-field
          label="Name"
          v-model="name"
          prepend-inner-icon="person"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md3>
        <v-text-field
          type="number"
          label="ID"
          v-model="id"
          prepend-inner-icon="domain"
        ></v-text-field>
      </v-flex>
      <div class="text-xs-center pt-5">
        <v-btn
          round
          @click="start"
          color="primary"
          class="button"
          :disabled="this.btn">
          Next
        </v-btn>
      </div>
    </div>
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
      btn: false
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
      this.btn = true;
      const data = {
        name: this.name,
        id: this.id,
      };

      this.REQUEST_INPUT(data);
      setTimeout(()=> {
        router.push('/list')
      }, 1500);
    }
  },
  created(){
    this.btn = false;
  }
}
</script>
<style scoped>
  .home {
  }
  .button, .img {
    width: 100%;
  }
  .img {
    padding-top: 15vh;
  }
</style>

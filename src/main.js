import Vue from 'vue'
import './plugins/vuetify'
import router from './plugins/router'
import store from './vuex/store'
import './registerServiceWorker'
import App from './layouts/App'
import firebase from 'firebase'

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyBwWafrOB_eZYuLaH0WUFHyS2sLsQY58ew",
  authDomain: "banzai-hakodate-dev.firebaseapp.com",
  databaseURL: "https://banzai-hakodate-dev.firebaseio.com",
  projectId: "banzai-hakodate-dev",
  storageBucket: "banzai-hakodate-dev.appspot.com",
  messagingSenderId: "1066114496868",
  appId: "1:1066114496868:web:431d53e5bc332588"
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

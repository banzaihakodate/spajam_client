import Vue from 'vue'
import './plugins/vuetify'
import router from './plugins/router'
// import store from './vuex/store'
import './registerServiceWorker'
import App from './layouts/App'
import firebase from 'firebase'

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyAm6OmZVpHriLyUZ8w1Dm8btEInBnMucok",
  authDomain: "banzai-hakodate.firebaseapp.com",
  databaseURL: "https://banzai-hakodate.firebaseio.com",
  projectId: "banzai-hakodate",
  storageBucket: "banzai-hakodate.appspot.com",
  messagingSenderId: "182299175330",
  appId: "1:182299175330:web:fcecf948eda766ad"
};

firebase.initializeApp(config);


new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app');

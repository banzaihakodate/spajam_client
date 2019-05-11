import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import List from '../pages/List.vue'
import Oni from '../pages/Oni.vue'
import Hoi from '../pages/Hoi.vue'
import Win from '../pages/Win.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List,
    },
    {
      path: '/oni',
      name: 'oni',
      component: Oni,
    },
    {
      path: '/hoi',
      name: 'hoi',
      component: Hoi,
    },
    {
      path: '/win',
      name: 'win',
      component: Win,
    }
  ]
})

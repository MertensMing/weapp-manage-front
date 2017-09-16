import Vue from 'vue'
import router from './router'
import store from './store'
import vueBeauty from 'vue-beauty'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)
Vue.use(vueBeauty)

new Vue({
  el: '#app-container',
  router,
  render: h => h(App)
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import vueBeauty from 'vue-beauty'
import router from './router'
import 'atui/dist/greater-blue.css'

import 'vue-beauty/package/style/vue-beauty.min.css'
    
Vue.use(vueBeauty)
Vue.use(VueRouter)

new Vue({
  el: '#app_container',
  router,
  render: h => h(App)
})

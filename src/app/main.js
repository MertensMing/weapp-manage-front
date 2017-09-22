import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import '../../theme/index.css'
import './common/style/base.scss'

Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
  el: '#app_container',
  router,
  render: h => h(App)
})

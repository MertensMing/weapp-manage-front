import VueRouter from 'vue-router'
import Tv from '../components/Tv.vue'

const routes = [
  {
    path: '/',
    component: Tv
  }
]

const router = new VueRouter({
  routes: routes
})

export default router
import VueRouter from 'vue-router'
import Login from '../pages/login/index'
import Signup from '../pages/signup/index'
import Reset from  '../pages/reset/index'

console.log('Signup', Signup);

const routes = [
  {
    path: '/reset',
    component: Reset
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/signup',
    component: Signup
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

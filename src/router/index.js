import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home'
import RankingsView from '../views/Rankings'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/rankings/:category',
    name: 'Rankings',
    component: RankingsView
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

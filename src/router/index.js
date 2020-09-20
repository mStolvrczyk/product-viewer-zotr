import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home'
import RankingsView from '../views/Rankings'
import AdminPanelView from '../views/AdminPanel'

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
    component: RankingsView,
    children: [
      { path: ':subcategory', component: RankingsView }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/adminpanel',
    name: 'AdminPanel',
    component: AdminPanelView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

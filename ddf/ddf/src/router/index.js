import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  }
  ,
  {
    path: '/metadataset',
    name: 'metadataset',
    component: () => import(/* webpackChunkName: "about" */ '../views/MetadatasetView.vue')
  }
  ,
  {
    path: '/config',
    name: 'config',
    component: () => import(/* webpackChunkName: "about" */ '../views/Config.vue')
  }
  ,
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

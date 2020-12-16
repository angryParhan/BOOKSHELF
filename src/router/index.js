import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard"*/ '../views/Dashboard.vue')
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import(/* webpackChunkName: "favorites"*/ '../views/Favorites.vue')
  },
  {
    path: '/books/find',
    name: 'book-search',
    component: () => import(/* webpackChunkName: "book-search"*/ '../views/BookSearch.vue')

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

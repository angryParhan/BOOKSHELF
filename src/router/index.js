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
  },
  {
    path: '/library',
    name: 'library-card',
    component: () => import(/* webpackChunkName: "library-card"*/ '../views/Library.vue'),
    params: true
  },
  {
    path: '/book',
    name: 'book-page',
    component: () => import(/* webpackChunkName: "book-search"*/ '../views/Book.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

export default router

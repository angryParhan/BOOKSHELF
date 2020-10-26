import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import kernel from './components/kernel/index'


Vue.config.productionTip = false

Vue.use(kernel)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

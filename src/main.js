import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import kernel from './components/kernel/index'
import breakpoint from './plugins/breakpointPlugin'


import "normalize.css"


Vue.config.productionTip = false


breakpoint()
Vue.use(kernel)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

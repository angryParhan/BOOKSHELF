import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store.js'
import kernel from './components/kernel/index'
import breakpoint from './plugins/breakpointPlugin'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart, faSearch, faHome, faPlus
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faSearch, faHome, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import "normalize.css"

Vue.config.productionTip = false

breakpoint()
Vue.use(kernel)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

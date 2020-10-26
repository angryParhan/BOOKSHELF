import Vue from "vue";
import Vuex from "vuex";
import * as modules from './store'

Vue.use(Vuex);

export default new Vuex.Store({
  ...modules
})

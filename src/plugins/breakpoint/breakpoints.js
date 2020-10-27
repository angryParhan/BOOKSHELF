import {breakpoint} from "../../mixins/breakpoints";

const Breakpoint = {
  install: function install(Vue) {
    Vue.prototype.$breakpoint = new Vue({
      mixins: [breakpoint],
    });
  },
};

export default Breakpoint

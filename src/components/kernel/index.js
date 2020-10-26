import * as Components from './exports'

const install = (Vue) => {
  for (const componentName of Object.keys(Components)) {
    Vue.component(componentName, Components[componentName])
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default { install }

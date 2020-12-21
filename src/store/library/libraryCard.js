export default {
  namespaced: true,
  state: {
    data: {}
  },
  mutations: {

  },
  actions: {
    setLibrary (store, payload) {
      console.log('library ' + payload)
    }
  },
  getters: {
    getData (state) {
      return state.data
    }
  }
}

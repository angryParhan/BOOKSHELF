export default {
  namespaced: true,
  state: {
    authDialog: false,
  },
  mutations: {
    SET_AUTH_DIALOG (state, value) {
      state.authDialog = value
    }
  },
  actions: {
    showAuthDialog ({commit}) {
      commit('SET_AUTH_DIALOG', true)
    }
  },
  getters: {
  }
}

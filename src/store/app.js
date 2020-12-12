export default {
  namespaced: true,
  state: {
    authDialog: false,
    sideBarOpened: true
  },
  mutations: {
    SET_AUTH_DIALOG (state, value) {
      state.authDialog = value
    },
    SET_SIDEBAR_OPPOSITE (state) {
      state.sideBarOpened = !state.sideBarOpened
    },
    SET_SIDEBAR (state, value) {
      state.sideBarOpened = value
    }
  },
  actions: {
    showAuthDialog ({ commit }) {
      commit('SET_AUTH_DIALOG', true)
    },
    hideAuthDialog( { commit }) {
      commit('SET_AUTH_DIALOG', false)
    }
  },
  getters: {
    getSideBar (state) {
      return state.sideBarOpened
    }
  }
}

export default {
  namespaced: true,
  state: {
    sideBarOpened: true,
    activeDialog: null
  },
  mutations: {
    SET_DIALOG (state, payload) {
      state.activeDialog = payload
    },
    SET_SIDEBAR_OPPOSITE (state) {
      state.sideBarOpened = !state.sideBarOpened
    },
    SET_SIDEBAR (state, value) {
      state.sideBarOpened = value
    }
  },
  actions: {
    showDialog ({ commit }, payload) {
      commit('SET_DIALOG', payload)
    },
    hideDialog ({ commit }) {
      commit('SET_DIALOG', null)
    }
  },
  getters: {
    getSideBar (state) {
      return state.sideBarOpened
    },
    getActiveDialog (state) {
      return state.activeDialog
    }
  }
}

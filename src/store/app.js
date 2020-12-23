export default {
  namespaced: true,
  state: {
    sideBarOpened: true,
    activeDialog: null,
    params: {}
  },
  mutations: {
    SET_DIALOG (state, payload) {
      state.activeDialog = payload
    },
    SET_PARAMS (state, payload) {
      state.params = payload
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
      document.body.style.overflow = 'hidden'
    },
    setParams ({ commit }, payload) {
      commit('SET_PARAMS', payload)
    },
    hideDialog ({ commit }) {
      commit('SET_DIALOG', null)
      commit('SET_PARAMS', {})
      document.body.style.overflow = null
    }
  },
  getters: {
    getSideBar (state) {
      return state.sideBarOpened
    },
    getActiveDialog (state) {
      return state.activeDialog
    },
    getParams (state) {
      return state.params
    }
  }
}

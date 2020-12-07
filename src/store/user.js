export default {
  namespaced: true,
  state: {
    user: null,
    isLogin: false,
    token: null
  },
  mutations: {
    SET_USER_LOGIN (state, value) {
      state.isLogin = value
    },
    SET_TOKEN (state, token) {
      state.token = token
    }
  },
  actions: {
    login ({ commit }, payload) {
      localStorage.setItem('token', payload.token)
      commit('SET_TOKEN', payload.token)
      commit('SET_USER_LOGIN', true)
    }
  },
  getters: {
    isLogin (state) {
      return state.isLogin
    }
  }
}

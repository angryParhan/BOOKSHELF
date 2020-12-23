import userModel from '../models/user/UserModel'


export default {
  namespaced: true,
  state: {
    user: null,
    isLogin: false,
    username: '',
    userFavoritesId: '',
    userId: '',
    userEmail: ''

  },
  mutations: {
    SET_USER_LOGIN_DATA (state, payload) {
      state.isLogin = true
      state.user = payload
      state.username = payload.username
      state.userFavoritesId = payload.userFavoritesId
      state.userId = payload.userId
      state.userEmail = payload.userEmail
    },
  },
  actions: {
    async login ({ commit, dispatch }, payload) {
      commit('SET_USER_LOGIN_DATA', payload)
      dispatch('library/setLibraries', null, { root: true })
    },
    async logout ({state }) {
      console.log('here', userModel)
      await userModel.logout()
      state.user = null
      state.isLogin = false
      state.username = ''
      state.userFavoritesId = ''
      state.userId = ''
      state.userEmail = ''
    },
  },
  getters: {
    isLogin (state) {
      return state.isLogin
    },
    getUsername (state) {
      return state.username
    },
    getUserEmail (state) {
      return state.userEmail
    },
    getUser (state) {
      return state.user
    }
  }
}

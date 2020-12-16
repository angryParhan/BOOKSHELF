import userModel from '../models/user/UserModel'


export default {
  namespaced: true,
  state: {
    user: null,
    isLogin: true,
    username: '',
    userFavoritesId: '',
    userId: '',
    userEmail: ''

  },
  mutations: {
    SET_USER_LOGIN_DATA (state, payload) {
      state.isLogin = true
      state.username = payload.user_name
      state.userFavoritesId = payload.user_library_id
      state.userId = payload.user_id
      state.userEmail = payload.user_email
    },
  },
  actions: {
    login ({ commit }, payload) {
      commit('SET_USER_LOGIN_DATA', payload)

    },
    async logout ({state }) {
      console.log('here', userModel)
      //await userModel.logout()
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
    }
  }
}

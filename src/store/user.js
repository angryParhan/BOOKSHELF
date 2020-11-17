export default {
  namespaced: true,
  state: {
    user: null,
    isLogin: false
  },
  getters: {
    isLogin (state) {
      return state.isLogin
    }
  }
}

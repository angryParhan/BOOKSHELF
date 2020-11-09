export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    isLogin (state) {
      return state.user
    }
  }
}

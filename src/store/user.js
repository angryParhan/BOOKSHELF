export default {
  namespace: true,
  state: {
    user: null,
  },
  getters: {
    isLogin (state) {
      return state.user
    }
  }
}

export default {
  namespaced: true,
  state: {
    favorites: []
  },
  mutations: {
    ADD_FAVORITE (state, book) {
      state.favorites.push(book)
    },
    REMOVE_FAVORITE (state, book) {
      const index = state.favorites.findIndex(item => item.title === book.title)
      if (index !== -1) {
        state.favorites.splice(index, 1)
      }
    }
  },
  actions: {
    async addFavoriteBook ({ commit, rootGetters, state }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_AUTH_DIALOG', true, { root: true })
        return
      }
      const checkSameBook = state.favorites.findIndex(item => item.title === payload.title)
      if (checkSameBook !== -1) return
      commit('bestSellersBooks/SET_BOOK_FAVORITE', payload, { root: true })
      commit('ADD_FAVORITE', payload)
    },
    async removeBookFromFavorites ({ commit, rootGetters }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_AUTH_DIALOG', true, { root: true })
        return
      }
      commit('bestSellersBooks/REMOVE_BOOK_FAVORITE', payload, { root: true })
      commit('REMOVE_FAVORITE', payload)
    }
  },
  getters: {
    getFavorites (state) {
      return state.favorites
    }
  }
}

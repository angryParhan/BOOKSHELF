import localBooksModel from '../models/Books/localBooksModel'

export default {
  namespaced: true,
  state: {
    favorites: []
  },
  mutations: {
    ADD_FAVORITE (state, book) {
      state.favorites.push(book)
    },
    SET_FAVORITES (state, payload) {
      state.favorites = payload
    },
    REMOVE_FAVORITE (state, book) {
      const index = state.favorites.findIndex(item => item.id === book.id)
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
      const checkSameBook = state.favorites.findIndex(item => item.id === payload.id)
      if (checkSameBook !== -1) return
      console.log(payload);
      await localBooksModel.createBook(payload)
      await localBooksModel.addBook({
        book_id: payload.id
      })
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
    },
    async setFavoritesBooks ({ commit }) {
      try {
        const books = await localBooksModel.getLibraryBooks()
        commit('SET_FAVORITES', books.data.data)
      } catch (e) {
        console.error(e);
      }
    }
  },
  getters: {
    getFavorites (state) {
      return state.favorites
    }
  }
}

import localBooksModel from '../../models/Books/localBooksModel'
import LibraryModel from '../../models/library/LibraryModel'

export default {
  namespaced: true,
  state: {
    favorites: [],
    libraries: [],
    currentBook: null
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
    },
    SET_CURRENT_BOOK (state, book) {
      state.currentBook = {...book}
    },
    SET_CURRENT_BOOK_FAVORITE (state, value) {
      if ('favorite' in state.currentBook) {
        state.currentBook.favorite = value
      }
    },
    RESET_CURRENT_BOOK (state) {
      state.currenBook = null
    },
    SET_LIBRARIES (state, payload) {
      state.libraries = payload
    },
    ADD_LIBRARY (state, payload) {
      state.libraries.push(payload)
    },
    REMOVE_LIBRARY (state, payload) {
      const index = state.libraries.findIndex(item => item.id === payload.id)
      if (index !== -1) {
        state.libraries.splice(index, 1)
      }
    }
  },
  actions: {
    async addFavoriteBook ({ commit, rootGetters, state }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      const checkSameBook = state.favorites.findIndex(item => item.id === payload.id)
      if (checkSameBook !== -1) return
      try {
        await localBooksModel.createBook(payload)
      } catch (e) {
        console.log(e);
      }
     try {
        await localBooksModel.addBook({
          id: payload.id
        })
     } catch (e) {
       console.log(e);
     }
      commit('bestSellersBooks/SET_BOOK_FAVORITE', payload, { root: true })
      commit('ADD_FAVORITE', payload)
    },
    async removeBookFromFavorites ({ commit, rootGetters }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      commit('bestSellersBooks/REMOVE_BOOK_FAVORITE', payload, { root: true })
      commit('REMOVE_FAVORITE', payload)
      await localBooksModel.removeBook({
        id: payload.id
      })
    },
    async setFavoritesBooks ({ commit }) {
      try {
        const books = await localBooksModel.getLibraryBooks()
        commit('SET_FAVORITES', books.data.data)
      } catch (e) {
        console.error(e);
      }
    },
    async addLibrary ({ commit, rootGetters, state }, payload) { // TODO
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      const checkSameBook = state.favorites.findIndex(item => item.id === payload.id)
      if (checkSameBook !== -1) return
      await localBooksModel.addBook({
        id: payload.id
      })
      commit('bestSellersBooks/SET_BOOK_FAVORITE', payload, { root: true })
      commit('ADD_FAVORITE', payload)
    },
    async createLibrary ({ commit, rootGetters, state }, payload) {
      if (!rootGetters['user/isLogin']) {
        return
      }
      const checkSameBook = state.libraries.findIndex(item => item.id === payload.id)
      if (checkSameBook !== -1) return
      try {
        const { library } = (await LibraryModel.create(payload)).data
        commit('ADD_LIBRARY', library)
        return library
      } catch (e) {
        console.log(e)
        return false
      }
    },
    async addBookToLibrary ({ rootGetters }, payload) {
      if (!rootGetters['user/isLogin']) {
        return
      }
      try {
        await localBooksModel.createBook(payload.book)
        await localBooksModel.addBook({
          id: payload.book.id,
          library_id: payload.library.id
        })
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    },
    async removeLibrary ({ commit, rootGetters }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      commit('REMOVE_LIBRARY', payload)
    },
    setLibraries ({ commit, rootGetters }) {
      console.log('here user')
      if (!rootGetters['user/isLogin']) {
        return
      }
      const user = rootGetters['user/getUser']
      commit('SET_LIBRARIES', (user.libraries || []))
    }
  },
  getters: {
    getFavorites (state) {
      return state.favorites
    },
    getLibraries (state) {
      return state.libraries
    },
    getCurrentBook (state) {
      return state.currentBook
    }
  }
}

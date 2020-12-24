import localBooksModel from '../../models/Books/localBooksModel'
import LibraryModel from '../../models/library/LibraryModel'

export default {
  namespaced: true,
  state: {
    favorites: [],
    libraries: [],
    currentBook: null,
  },
  mutations: {
    ADD_FAVORITE (state, book) {
      state.favorites.push(book)
    },
    SET_FAVORITES (state, payload) {
      state.favorites = payload
    },
    SET_LIBRARY (state, payload) {
      state.libraries = state.libraries.map(item => {
        if (item.id === payload.id) {
          return {
            ...item,
            ...payload,
          }
        }
        return item
      })
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
    async removeFromLibrary ({ commit, rootGetters }, payload) { // TODO
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      await localBooksModel.removeBook({
        id: payload.id,
        library_id: rootGetters['library/libraryCard/getData'].id
      })
      commit('library/libraryCard/REMOVE_BOOK', payload, { root: true })
    },
    async addToLibrary ({ rootGetters }, payload) {
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
    async addLibrary ({ commit, rootGetters }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      try {
        await LibraryModel.add({
          id: payload.id
        })
      } catch (e) {
        console.log(e)
      }
      commit('ADD_LIBRARY', payload)
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
    async removeLibrary ({ commit, dispatch, rootGetters, rootState }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      const data = await LibraryModel.delete({
        id: payload.id
      })
      console.log(data);
      commit('REMOVE_LIBRARY', payload)
      if (rootState['library/libraryCard']) {
        dispatch('library/libraryCard/removeLibrary', payload, { root: true })
      }
    },
    async setLibraries ({ commit, rootGetters }) {
      if (!rootGetters['user/isLogin']) {
        return
      }
      try {
        let libraries = (await LibraryModel.getAll()).data.data
        commit('SET_LIBRARIES', libraries)
      } catch (e) {
        commit('SET_LIBRARIES', [])
      }
    },
    async editLibrary ({ commit, dispatch, rootGetters, rootState }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      await LibraryModel.edit(payload)
      commit('SET_LIBRARY', payload)
      if (rootState['library/libraryCard']) {
        dispatch('library/libraryCard/editLibrary', payload, { root: true })
      }
      if (rootState['library/latestLibraries']) {
        dispatch('library/latestLibraries/editLibrary', payload, { root: true })
      }
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

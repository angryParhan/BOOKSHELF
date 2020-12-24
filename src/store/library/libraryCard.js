import LibraryModel from '@/models/library/LibraryModel';

export default {
  namespaced: true,
  state: {
    data: {}
  },
  mutations: {
    SET_DATA (state, payload) {
      state.data = payload
    },
    REMOVE_BOOK (state, book) {
      state.data.books = (state.data.books||[]).filter(item => item.id !== book.id)
    }
  },
  actions: {
    async setLibrary ({ commit }, payload) {
      const data = (await LibraryModel.get({
        id: payload
      })).data.library
      commit('SET_DATA', data)
    },
    async editLibrary ({ commit, rootGetters, getters }, payload) {
      if (!rootGetters['user/isLogin']) {
        return
      }
      commit('SET_DATA', {
        ...getters.getData,
        ...payload
      })
    },
    async removeLibrary ({ commit, rootGetters }) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
    }
  },
  getters: {
    getData (state) {
      return state.data
    },
    getBooks (state) {
      return state.data.books || []
    }
  }
}

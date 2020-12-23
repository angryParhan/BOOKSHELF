import LibraryModel from '@/models/library/LibraryModel';

export default {
  namespaced: true,
  state: {
    data: {}
  },
  mutations: {
    SET_DATA (state, paylod) {
      state.data = paylod
    }
  },
  actions: {
    async setLibrary ({ commit }, payload) {
      const data = (await LibraryModel.get({
        library_id: payload
      })).data.library
      commit('SET_DATA', data)
    },
    async editLibrary ({ commit, rootGetters }, payload) {
      if (!rootGetters['user/isLogin']) {
        commit('app/SET_DIALOG', 'Auth', { root: true })
        return
      }
      const data = (await LibraryModel.edit(payload))
      console.log(data);
      commit('SET_DATA', payload)
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

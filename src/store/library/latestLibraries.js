import LibraryModel from '../../models/library/LibraryModel'

export default {
  namespaced: true,

  state: {
    libraries: []
  },

  mutations: {
    SET_LIBRARIES (state, payload) {
      state.libraries = payload
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
  },

  actions: {
    async setLibraries ({ commit }, payload = 4) {
      try {
        const libraries = (await LibraryModel.getLatestLibraries({
          count: payload
        })).data.libraries
        commit('SET_LIBRARIES', libraries)
      } catch (e) {
        console.log(e);
        commit('SET_LIBRARIES', [])
      }
    },
    removeLibraries ({ commit }) {
      commit('SET_LIBRARIES', [])
    },
    async editLibrary ({ commit, rootGetters }, payload) {
      if (!rootGetters['user/isLogin']) {
        return
      }
      commit('SET_LIBRARY', payload)
    },

  },

  getters: {
    getLibraries (state) {
      return state.libraries
    }
  }
}

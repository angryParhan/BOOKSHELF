export default {
  namespaced: true,
  state: {
    isSet: false,
    bestSellingCategories: [],
    bestSellingItems: [],
    offset: 0
  },
  mutations: {
    SET_SETTED (state, value) {
      state.isSet = value
    },
    SET_CATEGORIES (state, value) {
      state.bestSellingCategories = [...value]
    },
    SET_BESTSELING (state, value) {
      state.bestSellingItems.push(value)
    },
    SET_OFFSET (state, value) {
      state.offset = value
    }
  },
  getters: {
    getIsBooksSet (state) {
      return state.isSet
    },
    getCategoriesList (state) {
      return state.bestSellingCategories
    },
    getOffset (state) {
      return state.offset
    },
    getBestSellingItems (state) {
      return state.bestSellingItems
    }
  }
}

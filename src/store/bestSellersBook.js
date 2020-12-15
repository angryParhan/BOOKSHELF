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
    },
    SET_BOOK_FAVORITE (state, book) {
      const index = state.bestSellingItems.findIndex(item => item.listId === book.category)
      if (index !== -1) {
        const bookIndex = state.bestSellingItems[index].books.findIndex(item => item.title === book.title)
        if (bookIndex !== -1) {
          state.bestSellingItems[index].books[bookIndex].favorite = true
        }
      }
    },
    REMOVE_BOOK_FAVORITE (state, book) {
      const index = state.bestSellingItems.findIndex(item => item.listId === book.category)
      if (index !== -1) {
        const bookIndex = state.bestSellingItems[index].books.findIndex(item => item.title === book.title)
        if (bookIndex !== -1) {
          state.bestSellingItems[index].books[bookIndex].favorite = false
        }
      }
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

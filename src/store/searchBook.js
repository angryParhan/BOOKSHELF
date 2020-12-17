import googleBookModel from '../models/Books/googleBooksModel'

export default {
  namespaced: true,
  state: {
    booksFound: [],
    offset: 0,
    loading: false,
    totalItems: 0,
  },
  mutations: {
    SET_OFFSET (state, number) {
      state.offset = number
    },
    ADD_BOOKS (state, books) {
      state.booksFound = [...state.booksFound, ...books]
    },
    SET_INITIAL (state) {
      state.booksFound = []
      state.offset = 0
      state.loading = false
      state.totalItems = 0
    }
  },
  actions: {
    async searchBook ({ state, commit }, payload) {
      try {
        const { data } = await googleBookModel.searchBook(payload.value, state.offset)
        state.totalItems = data.totalItems
        commit('SET_OFFSET', state.totalItems + data?.items?.length ? data.items.length : 0)
        if (data?.items?.length) {
          console.log('here', data.items)
          const foundBooks = data.items.filter(item => item.volumeInfo).map((unParsedBook) => {
            const book = unParsedBook.volumeInfo

            console.log('book', book)
            return {
              author: book?.authors?.length ? book.authors[0] : 'unknown',
              img: book?.imageLinks?.thumbnail ? book.imageLinks.thumbnail : book?.imageLinks?.smallThumbnail ? book.imageLinks.smallThumbnail : 'empty',
              rating: book?.averageRating,
              title: book.title,
              description: book.description,
              favorite: false,
              category: book?.categories?.length ? book.categories[0] : false
            }
          })
          commit('ADD_BOOKS', foundBooks)
        }

      } catch (e) {
        console.log(e)
      }

    }

  },
  getters: {
    getFoundBooks (state) {
      return state.booksFound
    }
  }
}

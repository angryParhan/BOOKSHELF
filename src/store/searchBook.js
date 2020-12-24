import googleBookModel from '../models/Books/googleBooksModel'

export default {
  namespaced: true,
  state: {
    booksFound: [],
    offset: 0,
    loading: false,
    totalItems: 0,
    searchTriggered: false,
    error: false,
    lastSearchValue: ''
  },
  mutations: {
    SET_OFFSET (state, number) {
      state.offset = number
    },
    ADD_BOOKS (state, books) {
      state.booksFound = [...state.booksFound, ...books]
    },
    SET_LAST_SEARCH (state, value) {
      state.lastSearchValue = value
    },
    SET_INITIAL (state) {
      state.booksFound = []
      state.offset = 0
      state.loading = false
      state.totalItems = 0
      state.searchTriggered = false
      state.error = false
      state.lastSearchValue = ''
    },
    SET_FAVORITE (state, payload) {
      const indx = state.booksFound.findIndex(item => item.id === payload.book.id)
      if (indx !== -1) {
        state.booksFound[indx].favorite = payload.value
      }
    }
  },
  actions: {
    async searchBook ({ state, commit }, payload) {
      try {
        state.searchTriggered = true
        state.loading = true

        console.log('here')
        if (state.offset < state.totalItems || payload.initial) {
          const { data } = await googleBookModel.searchBook(payload.value, state.offset)
          state.totalItems = data.totalItems
          if (data?.items?.length) {
            commit('SET_OFFSET', state.offset + data.items.length)
            const foundBooks = data.items.filter(item => item.volumeInfo).map((unParsedBook) => {
              const book = unParsedBook.volumeInfo

              console.log('book', book)
              return {
                author: book?.authors?.length ? book.authors.join(', ') : 'unknown',
                img: book?.imageLinks?.thumbnail ? book.imageLinks.thumbnail : book?.imageLinks?.smallThumbnail ? book.imageLinks.smallThumbnail : 'empty',
                rating: book?.averageRating,
                title: book.title,
                description: book.description,
                favorite: false,
                category: book?.categories?.length ? book.categories[0] : false,
                id: ((book.title||'').replace(/[ '"`]/g, '') + (book.author||'').replace(/[ '"`]/g, '')).toLowerCase() + book.pageCount||0,
                googleLink: book.infoLink||''
              }
            })
            commit('ADD_BOOKS', foundBooks)
          }
        }
        state.loading = false
      } catch (e) {
        console.log(e)
        state.error = true
        state.loading = false
      }

    }

  },
  getters: {
    getFoundBooks (state) {
      return state.booksFound
    },
    loading (state) {
      return state.loading
    },
    isSearched (state) {
      return state.searchTriggered
    },
    getError (state) {
      return state.error
    },
    getLastSearch (state) {
      return state.lastSearchValue
    }
  }
}

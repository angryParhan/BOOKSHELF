<template>
 <section class="book-search">
   <toolbar
       @search-book="startSearching"
   />

   <section class="book-search__items">
     <bookCard
         v-for="book of booksFound"
         :key="book.title"
         :book="book"
     />

     <sceletonLoader v-if="loading"/>
   </section>




   <UiKitStub
       v-if="(!loading && !booksFound.length) || error"
       :description="stubText"
   />
 </section>
</template>

<script>
  import bookSearch from '../store/searchBook'
  import toolbar from '../components/SearchBook/searchBookToolbar'
  import { mapGetters, mapActions } from 'vuex'
  import bookCard from '../components/SearchBook/listedBookCard'
  import sceletonLoader from '../components/SearchBook/sceletonLoader'

  export default {
    name: "BookSearch",
    components: { toolbar, bookCard, sceletonLoader },

    data () {
      return {
        searchedValue: '',
      }
    },



    computed: {
      ...mapGetters({
        booksFound: 'bookSearchStore/getFoundBooks',
        isSearched: 'bookSearchStore/isSearched',
        loading: 'bookSearchStore/loading',
        error: 'bookSearchStore/getError'
      }),
      stubText () {
        if (this.error) {
          return 'Sorry something went wrong'
        }
        if (this.isSearched) {
          return 'Books not found'
        }
        return 'To find book, please enter name or description in the input above!'
      }
    },


    beforeCreate () {
      if (!this.$store.state.bookSearchStore) {
        this.$store.registerModule('bookSearchStore', bookSearch)
      }
    },

    mounted () {
      this.scroll()
    },

    beforeDestroy () {
      if (this.$store.state.bookSearchStore) {
        this.$store.unregisterModule('bookSearchStore')
      }
    },


    methods: {
      ...mapActions({
        searchBook: 'bookSearchStore/searchBook'
      }),
      async startSearching (payload) {
        if (payload.initial) {
          this.searchedValue = payload.value
          this.$store.commit('bookSearchStore/SET_INITIAL')
        }
        await this.searchBook({value: this.searchedValue, initial: payload.initial})
        console.log('books', this.booksFound)
      },
      scroll () {
        window.onscroll = () => {
          let bottomOfWindow = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2
          if (bottomOfWindow) {
            if (!this.loading) {
              this.startSearching({initial: false})
            }
          }
        }
      },
    }
  }
</script>

<style lang="scss">
.book-search {
  padding: 0 20px 20px;

  &__items {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;

  }


}
</style>

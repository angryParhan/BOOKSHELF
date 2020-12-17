<template>
 <section class="book-search">
   <toolbar
       @search-book="startSearching"
   />

   <bookCard
       v-for="book of booksFound"
       :key="book.title"
       :book="book"
   />


   <UiKitStub />
 </section>
</template>

<script>
  import bookSearch from '../store/searchBook'
  import toolbar from '../components/SearchBook/searchBookToolbar'
  import { mapGetters, mapActions } from 'vuex'
  import bookCard from '../components/SearchBook/listedBookCard'

  export default {
    name: "BookSearch",
    components: { toolbar, bookCard },

    data () {
      return {
        searchedValue: ''
      }
    },


    computed: {
      ...mapGetters({
        booksFound: 'bookSearchStore/getFoundBooks'
      })
    },


    beforeCreate () {
      if (!this.$store.state.bookSearchStore) {
        this.$store.registerModule('bookSearchStore', bookSearch)
      }
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
      }
    }
  }
</script>

<style lang="scss">
.book-search {
  padding: 0 20px;


}
</style>

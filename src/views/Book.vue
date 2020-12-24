<template>
  <section class="book-page">
    <book-page
        v-if="id"
        :id="id"
    />

    <UiKitSlider class="book-page__slider" v-if="getSuggestionBook.length">
      <bookCart
          v-for="book of getSuggestionBook"
          :key="book.id"
          :book="book"
      />
    </UiKitSlider>


  </section>
</template>

<script>
  import bookPage from '../components/BookPage/BookPage'
  import { mapGetters } from 'vuex'
  import bookCart from '../components/dashboard/bookCart'

  export default {
    name: "Book",
    components: {
      bookPage,
      bookCart
    },

    data () {
      return {
        id: '',
        numberOfSuggestions: 8
      }
    },

    computed: {
      ...mapGetters({
        favoritesList: 'library/getFavorites',
        bestSellingItems: 'bestSellersBooks/getBestSellingItems'
      }),
      getSuggestionBook () {
        let sugestedBooks = []
        //sugestedBooks = this.favoritesList.filter((month,idx) => idx < this.numberOfSuggestions - 1)
        if (sugestedBooks.length < this.numberOfSuggestions - 1 && this.bestSellingItems[0]?.books) {
          sugestedBooks = [...sugestedBooks, ...this.bestSellingItems[0]?.books.filter((month,idx) => idx < this.numberOfSuggestions - 1)]
        }
        return sugestedBooks
      }
    },

    created () {
      if (this.$route.query?.id) {
        this.id = this.$route.query.id
      }
    }

  }
</script>

<style lang="scss">
  .book-page {
    max-width: 85%;
    margin: 0 auto;

    &__slider {
      margin: 50px 0;

      .book-cart {
        margin-bottom: 0;
      }
    }

    .my_items {
      width: 200px;
      height: 400px;
    }
  }


  @media all and (max-width: 600px) {
    .book-page {
      max-width: 100%;
    }
  }
</style>

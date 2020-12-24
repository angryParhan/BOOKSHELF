<template>
  <section class="book-page">
    <book-page
        v-if="id"
        :id="id"
    />

    <UiKitSlider class="book-page__slider">
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
        return this.favoritesList.filter((month,idx) => idx < this.numberOfSuggestions - 1)
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
</style>

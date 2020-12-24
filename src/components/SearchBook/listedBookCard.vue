<template>
  <section class="listed-book">
    <div class="listed-book__img">
      <img v-if="book.img !== 'empty'" :src="book.img" alt="bookTitle" @click="bookPage(book.id)">
      <div v-else class="listed-book__img-stub">
        <img src="../../assets/icons/img-stub-icon.svg" alt="stub">
      </div>
    </div>


    <h3 class="listed-book__title">
      <section class="listed-book__title-firstPart">
        <section class="listed-book__title-name">
          <span class="listed-book__title-name-value" @click="bookPage(book.id)">{{ book.title }}</span>
        </section>

        <section class="listed-book__title-author">
          <span class="listed-book__title-author-description">Author: </span>
          <span class="listed-book__title-author-surname">{{ book.author }}</span>
        </section>
      </section>

      <section class="listed-book__title-rating" v-if="book.rating">
        Rating: {{ book.rating }}
      </section>

    </h3>
    <div class="listed-book__description">
      <p>{{ book.description }}</p>
      <div class="listed-book__shared">
        <section class="listed-book__shared-add-to-library">
          <img src="../../assets/icons/plus.svg" alt="library" @click="addToLibraryHandler">
        </section>

        <section class="listed-book__shared-like">
          <img v-if="book.favorite" src="../dashboard/images/favorite-selected.svg" alt="" @click="handleBookRemove">
          <img v-else src="../dashboard/images/favorite.svg" alt="" @click="handleAddToFavorites">
        </section>

        <section class="listed-book__shared-google-books">
          <a :href="book.googleLink" target="_blank"><img src="../../assets/icons/google-out.svg" alt="google-books"></a>
        </section>
      </div>
    </div>

  </section>
</template>

<script>
  import { mapActions } from 'vuex'


  export default {
    name: "listedBookCard",

    props: {
      book: {
        type: Object,
        required: true
      }
    },

    methods: {
      ...mapActions({
        showDialog: 'app/showDialog',
        setParams: 'app/setParams',
        addToFavorites: 'library/addFavoriteBook',
        removeFromFavorites: 'library/removeBookFromFavorites',
      }),

      bookPage (id) {
        this.$store.commit('library/SET_CURRENT_BOOK', this.book)
        this.$router.push({path: '/book', query: {id} })
      },

      handleBookRemove () {
        this.$store.commit('bookSearchStore/SET_FAVORITE', {book: this.book, value: false})
        this.removeFromFavorites(this.book)
      },

      handleAddToFavorites () {
        this.$store.commit('bookSearchStore/SET_FAVORITE', {book: this.book, value: true})
        this.addToFavorites(this.book)
      },

      addToLibraryHandler () {
        this.setParams(this.book)
        this.showDialog('AddBook')
      },
    }
  }
</script>

<style lang="scss">
  .listed-book {
    width: 100%;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 0.7fr 1fr 1fr;
    grid-column-gap: 0;
    grid-row-gap: 0;


    &__img {
      grid-area: 1 / 1 / 4 / 2;
      display: flex;
      cursor: pointer;
      img {
        height: 340px;
        width: 250px;
      }

      &-stub {
        height: 340px;
        width: 250px;
        background: #818184;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        img {
          height: 80px;
          margin-bottom: 10px;
        }
      }
    }

    &__title {
      padding-left: 20px;
      grid-area: 1 / 2 / 2 / 5;
      display: flex;
      flex-direction: row;
      gap: 10px;
      margin: 0;
      justify-content: space-between;

      &-rating {
        width: max-content;
      }

      &-name {
        cursor: pointer;
        margin-bottom: 5px;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    &__description {
      margin-top: 20px;
      padding-left: 20px;
      grid-area: 2 / 2 / 4 / 5;
      position: relative;

      p {
        font-size: 16px;
        letter-spacing: 1px;
        line-height: 22px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        margin: 0;
      }
    }

    &__shared {
      grid-area: 4 / 1 / 5 / 5;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      bottom: 0;
      width: 100%;


      section img {
        width: 60px;
        height: 60px;
        cursor: pointer;
      }
    }


  }

  @media all and (max-width: 600px) {

    .listed-book {

      grid-template-columns: 1fr;
      grid-template-rows: 1fr 0.4fr 0.75fr;



      &__img {
        grid-area: 1 / 1 / 2 / 2;
        justify-content: center;
      }

      &__title {
        grid-area: 2 / 1 / 3 / 2;
        justify-content: center;
        flex-direction: column;
      }


      &__description {
        grid-area: 3 / 1 / 4 / 2;
        -webkit-line-clamp: 10;
        padding: 0;
      }

      &__shared {
        grid-area: 4 / 1 / 5 / 2;
      }

    }

  }



</style>

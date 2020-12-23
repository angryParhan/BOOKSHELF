<template>
  <section class="book">
    <div class="book__img">
      <img v-if="book.img" :src="book.img" alt="book-img">
      <div
          v-else
          class="book__img-stub"
      />
    </div>
    <div class="book__info">
      <section class="book__info-first-part">
        <div class="book__title-wrapper">
          <div>
            <h1 class="book__title">{{ book.title }}</h1>

            <h3 class="book__author"><span>Author: </span>{{ book.author }}</h3>
            <h5 class="book__category"><span>Category: </span>{{ book.category }}</h5>
          </div>
          <h4 class="book__rating">Rating: 5</h4>
        </div>
        <article class="book__description">
          <h2>Description</h2>
          <p class="book__description-text">{{ book.description }}</p>
        </article>
      </section>

      <section class="book__btns">
        <div class="book__add-to-library">
          <img src="../../assets/icons/plus.svg" alt="" @click="addToLibraryHandler">
        </div>

        <div class="book__favorite">
          <img v-if="!book.favorite" src="../dashboard/images/favorite.svg" alt="" @click="addToFavorites(book)">
          <img v-else src="../dashboard/images/favorite-selected.svg" alt="" @click="addToFavorites(book)">
        </div>

        <div class="book__google-link">
          <a :href="book.googleLink" target="_blank"><img src="../../assets/icons/google-out.svg" alt="google-books"></a>
        </div>

      </section>
    </div>



  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "BookPage",
    props: {
      id: {
        type: String,
        required: true
      }
    },

    computed: {
      ...mapGetters({
        book: 'library/getCurrentBook'
      })
    },

    methods: {
      ...mapActions({
        showDialog: 'app/showDialog',
        setParams: 'app/setParams',
        addToFavorites: 'library/addFavoriteBook',
        removeFromFavorites: 'library/removeBookFromFavorites',
      }),

      addToLibraryHandler () {
        this.setParams(this.book)
        this.showDialog('AddBook')
      },
    },

    mounted () {
      console.log('id', this.id, this.book)
    }
  }
</script>

<style lang="scss">
  .book {
    padding: 40px 20px;
    display: grid;
    grid-template-columns: 327px 1fr;
    gap: 3rem;

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }


    &__img {
      height: 500px;
      padding: 20px;
      background: #646464;
      text-align: center;
      border-radius: 5px;

      img {
        height: 100%;
        width: 100%;
      }

      &-stub {
        width:328px;
        height: 100%;
        background: #818184 url("../../assets/icons/img-stub-icon.svg") no-repeat center;
        background-size: 88px 80px;

      }

    }

    &__title {
      margin: 0;
      font-size: 46px;

      &-wrapper {
        display: flex;
        justify-content: space-between;
      }
    }

    &__rating {
      height: fit-content;
      margin: 0 0 0 20px;
      padding-top: 20px;
      width: 140px;
    }

    &__author {
      margin-top: 5px;
      margin-bottom: 0;

      span {
        font-weight: 400;
        font-size: 17px;
      }
    }

    &__category {
      margin-top: 5px;
      font-size: 17px;

      span {
        font-weight: 400;
        font-size: 15px;
      }
    }

    &__description {

      display: flex;
      flex-direction: column;
      position: relative;

      h2 {
        font-size: 28px;
        line-height: 1.2;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      &-text {
        font-size: 18px;
        letter-spacing: 1px;
        margin-top: 0;
      }
    }

    &__btns {
      display: flex;
      justify-content: space-around;
    }

    &__btns img {
      width: 60px;
      height: 60px;
      cursor: pointer;
    }
  }

</style>

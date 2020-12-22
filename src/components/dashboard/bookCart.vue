<template>
  <section @mouseover="addBtn = true" @mouseleave="addBtn = false" class="book-cart">
    <span v-show="showRank" @click="showDialog('AddBook')" class="book-cart__rank">
      <span v-if="!addBtn">{{ book.rank }}</span>
      <span v-else><font-awesome-icon icon="plus" class="" /></span>
    </span>
    <div class="book-cart__img-wrapper">
      <img
          :src="book.img"
          :alt="`${book.title}-image`"
          class="book-cart__img"
      >
      <img
          v-if="!book.favorite"
          src="./images/favorite.svg"
          alt="heart"
          class="book-cart__img-favorite"
          @click="addToFavorites(book)"
      >
      <img
          v-else
          src="./images/favorite-selected.svg"
          alt="heart selected"
          class="book-cart__img-favorite"
          @click="removeFromFavorites(book)"
      >
    </div>
    <h5 class="book-cart__title">{{ book.title }}</h5>
    <p class="book-cart__author">{{ book.author }}</p>
  </section>

</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "bookCart",
    props: {
      book: {
        type: Object,
        required: true
      },
      showRank: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        addBtn: false
      }
    },

    methods: {
      ...mapActions({
        addToFavorites: 'library/addFavoriteBook',
        removeFromFavorites: 'library/removeBookFromFavorites',
        showDialog: 'app/showDialog'
      })
    }
  }
</script>

<style lang="scss">
.book-cart {
  padding: 20px;
  background: #3e3e3d;
  border-radius: 5px;
  width: fit-content;
  margin-bottom: 20px;
  position: relative;
  cursor: pointer;

  &:hover {
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 1);
  }

  &__rank {
    position: absolute;
    background: #e1a73b;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    top: -20px;
    left: -20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222222 !important;
    font-weight: 700;
  }

  &__img {
    width: 300px;
    height: 420px;
  }

  &__img-wrapper {
    position: relative;
    &:hover {

      .book-cart__img-favorite {
        display: block;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        height: 100%;
        width: 100%;
        z-index: 1;
      }
    }
  }

  &__img-favorite {
    display: none;
    height: 70px;
    width: 70px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  &__title {
    width: 300px;
    word-break: break-word;
    font-size: 16px;
    margin: 15px 0;
  }

  &__author {
    width: 300px;
    word-break: break-word;
    font-size: 18px;
    margin: 0;
    letter-spacing: 2px;
  }
}
</style>

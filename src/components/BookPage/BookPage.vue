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
        <p>{{ book.description }}</p>
      </article>
    </div>



  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

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

    mounted () {
      console.log('id', this.id, this.book)

    }
  }
</script>

<style lang="scss">
  .book {
    padding: 40px 20px;
    max-width: 1180px;
    margin: 0 auto;

    display: grid;
    grid-template-columns: 327px 1fr;
    gap: 2rem;


    &__img {
      height: 500px;

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
      font-family: GT Super Bold, serif;
      font-size: 46px;

      &-wrapper {
        display: flex;
        justify-content: space-between;
      }
    }

    &__rating {
      height: fit-content;
      margin: 0;
      padding-top: 20px;
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
      h2 {
        font-family: GT Super Bold, serif;
        font-size: 28px;
        line-height: 1.2;
      }
    }
  }

</style>

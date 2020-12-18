<template>
  <section class="listed-book">
    <div class="listed-book__img">
      <img :src="book.img" alt="bookTitle">
    </div>
    <h3 class="listed-book__title">
      <section class="listed-book__title-name">
        <span class="listed-book__title-name-description">Title: </span>
        <span class="listed-book__title-name-value">{{ book.title }}</span>
      </section>

      <section class="listed-book__title-author">
        <span class="listed-book__title-author-description">Author: </span>
        <span class="listed-book__title-author-surname">{{ book.title }}</span>
      </section>

    </h3>
    <p class="listed-book__description">{{ book.description }}</p>
    <div class="listed-book__shared">

    </div>
  </section>
</template>

<script>
  export default {
    name: "listedBookCard",

    props: {
      book: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="scss">
  .listed-book {
    width: 100%;
    background: #3e3e3d;
    border-radius: 5px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 0;


    &__img {
      grid-area: 1 / 1 / 4 / 2;
      text-align: center;
      img {
        height: 340px;
        width: 250px;
      }
    }

    &__title {
      grid-area: 1 / 2 / 2 / 5;
    }

    &__description { grid-area: 2 / 2 / 4 / 5; }

    &__shared { grid-area: 4 / 1 / 5 / 5; }


  }



  .parent {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .div1 { grid-area: 1 / 1 / 4 / 2; }
  .div2 { grid-area: 1 / 2 / 2 / 5; }
  .div3 { grid-area: 2 / 2 / 4 / 5; }
  .div4 { grid-area: 4 / 1 / 5 / 5; }
</style>

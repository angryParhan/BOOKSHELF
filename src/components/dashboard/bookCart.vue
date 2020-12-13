<template>
  <section class="book-cart">
    <span class="book-cart__rank"><span>{{ book.rank }}</span></span>
    <img :src="book.img" :alt="`${book.title}-image`" class="book-cart__img">
    <h5 class="book-cart__title">{{ book.title }}</h5>

  </section>

</template>

<script>
  export default {
    name: "bookCart",
    props: {
      book: {
        type: Object,
        required: true
      }
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
    color: #646464 !important;
    font-weight: 700;
  }

  &__img {
    width: 330px;
    height: 500px;
  }

  &__title {
    width: 330px;
    word-break: break-word;
  }
}
</style>

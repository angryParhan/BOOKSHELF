<template>
  <section class="listed-book">
    <img :src="book.img" alt="bookTitle">
    <p>{{ book.title }}</p>
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

  }
</style>

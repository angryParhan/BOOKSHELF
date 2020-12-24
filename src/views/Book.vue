<template>
  <section class="book-page">
    <book-page
        v-if="id"
        :id="id"
    />

    <UiKitSlider>

    </UiKitSlider>


  </section>
</template>

<script>
  import bookPage from '../components/BookPage/BookPage'

  export default {
    name: "Book",
    components: {
      bookPage,

    },

    data () {
      return {
        id: ''
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

  }
</style>

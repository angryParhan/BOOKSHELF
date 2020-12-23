<template>
  <section class="book-page">
    <book-page
        v-if="id"
        :id="id"
    />


    <swiper class="swiper" :options="swiperOption">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>



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
        id: '',
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
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

  }
</style>

<template>
  <section class="favorites">
    <h1 class="favorites__title">Favorites</h1>

    <section class="favorites__books">
      <bookCart
          v-for="book of favoritesList"
          :book="book"
          :key="book.title"
      />
    </section>
    <UiKitStub v-if="!favoritesList.length"/>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  import bookCart from '../components/dashboard/bookCart'

  export default {
    name: "Favorites",
    components: { bookCart },
    computed: {
      ...mapGetters({
        favoritesList: 'library/getFavorites'
      })
    }
  }
</script>

<style lang="scss">
.favorites {
  padding: 0 20px;

  &__title {
    text-align: center;
  }

  &__books {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }

}
</style>

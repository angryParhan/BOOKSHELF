<template>
  <section>
    <template v-if="books.length">
        <div class="library-card__books">
          <bookCart
              v-for="book of books"
              :book="book"
              :key="book.title"
          />
        </div>
    </template>


    <UiKitStub
        v-else
        description="There is no books in library."
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import bookCart from '@/components/dashboard/bookCart';

export default {
  name: 'Library',
  components: {
    bookCart
  },
  computed: {
    ...mapGetters({
      library: 'library/libraryCard/getData',
      books: 'library/libraryCard/getBooks'
    })
  },

}
</script>

<style lang="scss">
.library-card {
  &__books {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    padding-top: 90px;
  }
}
</style>

<template>
  <section class="add-book">
    <div v-if="libraries.length" class="add-book__list">
      <div
          v-for="library of libraries"
          :key="library.id"
          class="add-book__list-item"
          @click="addHandler(library)"
      >
        <font-awesome-icon icon="landmark" class="add-book__list-icon"/> {{ library.title }}
      </div>
    </div>

    <UiKitStub
        v-else
        description="Create library to add book."
    />
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddBook',

  computed: {
    ...mapGetters({
      allLibraries: 'library/getLibraries',
      book: 'app/getParams'
    }),
    libraries () {
      return this.allLibraries.filter(library => library.my)
    }
  },

  mounted () {
    this.$root.$on('add-book', this.signInHandler)
  },


  beforeDestroy() {
    this.$root.$off('add-book', this.signInHandler)
  },


  methods: {
    ...mapActions({
      addBookToLibrary: 'library/addBookToLibrary'
    }),
    async addHandler (library) {
      try {
        const res = this.addBookToLibrary({
          book: this.book,
          library: library
        })
        if (res) {
          this.$emit('result', 'success')
        } else {
          this.$emit('result', 'api-error')
        }
      } catch (e) {
        console.error(e)
      }
    }

  }
}
</script>

<style lang="scss">

.add-book {
  &__list {
    &-item {
      padding: 10px 80px;
      margin: 5px 0;
      border-radius: 5px;
      &:hover {
        background-color: #3e3e3d;
      }
    }
    &-icon {
      margin-right: 7px;
    }
  }
}


</style>

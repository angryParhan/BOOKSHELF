<template>
  <section class="add-book">
    <div v-if="libraries.length" class="add-book__list">
      <div
          v-for="library of libraries"
          :key="library.id"
          class="add-book__list-item"
          @click="addHandler(library)"
      >
        <font-awesome-icon icon="book" class="add-book__list-icon"/> {{ library.title }}
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
      libraries: 'library/getLibraries'
    })
  },

  mounted () {
    this.$root.$on('add-book', this.signInHandler)
  },


  beforeDestroy() {
    this.$root.$off('add-book', this.signInHandler)
  },


  methods: {
    ...mapActions({
      createLibrary: 'library/createLibrary'
    }),
    async addHandler () {
      this.errorCheck = false
      this.validateAdding()

      if(!this.errorCheck) {
        //start auth Function
        try {
          const res = this.createLibrary({
            name: this.formValues.name.value,
            description: this.formValues.description.value
          })
          if (res) {
            this.$emit('result', 'success')
          } else {
            this.$emit('result', 'api-error')
          }
        } catch (e) {
          console.error(e)
        }
      } else {
        this.$emit('result', 'validation-error')
      }
    },

    validateAdding () {
      if (!this.formValues.name.value.length) {
        this.errorCheck = true
        this.formValues.name.error = 'Enter name'
      } else {
        this.formValues.name.error = false
      }
    },

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

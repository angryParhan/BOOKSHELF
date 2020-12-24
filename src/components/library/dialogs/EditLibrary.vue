<template>
  <section class="edit-library">
    <div>
      <UiKitInput
          v-model="formValues.title.value"
          :error="formValues.title.error"
          @blur="validateName"
          class="edit-library__input"
          placeholder="Name"
          type="text"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.description.value"
          :error="formValues.description.error"
          class="edit-library__input"
          placeholder="Description"
          style="margin-top: 65px"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditLibrary',

  computed: {
    ...mapGetters({
      library: 'app/getParams'
    })
  },

  data () {
    return {
      errorCheck: false,
      formValues: {
        title: {
          value: '',
          error: false
        },
        description: {
          value: '',
          error: false
        }
      }
    }
  },


  mounted () {
    this.formValues.title.value = this.library.title || ''
    this.formValues.description.value = this.library.description || ''
    this.$root.$on('edit-library', this.signInHandler)
  },


  beforeDestroy() {
    this.$root.$off('edit-library', this.signInHandler)
  },


  methods: {
    ...mapActions({
      editLibrary: 'library/editLibrary'
    }),
    async signInHandler () {
      this.errorCheck = false
      this.validateName()

      if(!this.errorCheck) {
        //start auth Function
        try {
          const res = this.editLibrary({
            title: this.formValues.title.value,
            description: this.formValues.description.value,
            id: this.library.id
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

    validateName () {
      if (!this.formValues.title.value.length) {
        this.errorCheck = true
        this.formValues.title.error = 'Enter name'
      } else {
        this.formValues.title.error = false
      }
    },

  }
}
</script>

<style lang="scss">

.edit-library {
  div {
    display: flex;
    justify-content: center;

    .UiKit-input {
      width: 400px;
      box-shadow: none;
    }
  }
}


</style>

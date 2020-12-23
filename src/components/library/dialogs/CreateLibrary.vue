<template>
  <section class="create-library">
    <div>
      <UiKitInput
          v-model="formValues.name.value"
          :error="formValues.name.error"
          @blur="validateName"
          class="create-library__input"
          placeholder="Name"
          type="text"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.description.value"
          :error="formValues.description.error"
          class="create-library__input"
          placeholder="Description"
          style="margin-top: 65px"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateLibrary',
  data () {
    return {
      errorCheck: false,
      formValues: {
        name: {
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
    this.$root.$on('create-library', this.signInHandler)
  },


  beforeDestroy() {
    this.$root.$off('create-library', this.signInHandler)
  },


  methods: {
    ...mapActions({
      createLibrary: 'library/createLibrary'
    }),
    async signInHandler () {
      this.errorCheck = false
      this.validateName()

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

    validateName () {
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

.create-library {
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

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
          @blur="validateDescription"
          class="create-library__input"
          placeholder="Description"
          style="margin-top: 65px"
      />
    </div>
  </section>
</template>

<script>
import LibraryModel from '../../models/library/LibraryModel'
import { mapActions } from 'vuex'

export default {
  name: "SignIn",
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


  computed: {

  },


  mounted () {
    this.$root.$on('create-library', this.signInHandler)
  },


  beforeDestroy() {
    this.$root.$off('create-library', this.signInHandler)
  },


  methods: {
    ...mapActions({
      login: 'user/login',
    }),
    async signInHandler () {
      this.errorCheck = false
      this.validateName()
      this.validateDescription()

      if(!this.errorCheck) {
        //start auth Function
        try {
          const res = await LibraryModel.create({
            name: this.formValues.name.value,
            description: this.formValues.description.value
          })
          if (res?.data?.library_id) {
            console.log(res?.data?.library_id)
            this.$emit('result', 'success')
          } else {
            this.$emit('result', 'api-error')
          }
        } catch (e) {
          console.error(e)
          if (e?.response?.data?.message) {
            if (e.response.data.message === 'Password is not equal!') {
              this.formValues.description.error = 'Incorrect password'
            } else if (e.response.data.message === 'There is no user with this data') {
              this.formValues.name.error = 'There is no such user'
            }
            this.$emit('result', 'validation-error')
            return
          }
          this.$emit('result', 'api-error')
        }
      } else {
        this.$emit('result', 'validation-error')
      }
    },

    validateName () {
      if (this.formValues.name.value.length <= 3) {
        this.errorCheck = true
        this.formValues.name.error = 'Enter name'
      } else {
        this.formValues.name.error = false
      }
    },

    validateDescription () {
      if (this.formValues.description.value.length < 6) {
        this.errorCheck = true
        this.formValues.description.error = 'Password must be longer than 6 characters'
      } else {
        this.formValues.description.error = false
      }
    }

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

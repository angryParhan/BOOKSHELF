<template>
  <section class="sign-in">
    <div>
      <UiKitInput
          v-model="formValues.login.value"
          :error="formValues.login.error"
          @blur="validateLogin"
          class="sign-in__input"
          placeholder="Login"
          type="text"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.password.value"
          :error="formValues.password.error"
          @blur="validatePassword"
          class="sign-in__input"
          placeholder="Password"
          type="password"
          style="margin-top: 65px"
      />
    </div>
  </section>
</template>

<script>
  import UserModel from '../../models/user/UserModel'
  import { mapActions } from 'vuex'

  export default {
    name: "SignIn",
    data () {
      return {
        errorCheck: false,
        formValues: {
          login: {
            value: '',
            error: false
          },
          password: {
            value: '',
            error: false
          }
        }
      }
    },


    computed: {

    },


    mounted () {
      this.$root.$on('auth', this.signInHandler)
    },


    beforeDestroy() {
      this.$root.$off('auth', this.signInHandler)
    },


    methods: {
      ...mapActions({
        login: 'user/login',
      }),
      async signInHandler () {
        this.errorCheck = false
        this.validateLogin()
        this.validatePassword()

        if(!this.errorCheck) {
          //start auth Function
          try {
            const res = await UserModel.login({value: this.formValues.login.value, password: this.formValues.password.value})
            if (res?.data?.user) {
              this.login({ ...res.data.user })
              this.$emit('auth-result', 'success')
            } else {
              this.$emit('auth-result', 'api-error')
            }
          } catch (e) {
            console.error(e)
            if (e?.response?.data?.message) {
              if (e.response.data.message === 'Password is not equial!') {
                this.formValues.password.error = 'Incorrect password'
              } else if (e.response.data.message === 'There is no user with this data') {
                this.formValues.login.error = 'There is no such user'
              }
              this.$emit('auth-result', 'validation-error')
              return
            }
            this.$emit('auth-result', 'api-error')
          }
        } else {
          this.$emit('auth-result', 'validation-error')
        }
      },

      validateLogin () {
        if (this.formValues.login.value.length < 3) {
          this.errorCheck = true
          this.formValues.login.error = 'Login must be longer then 3 characters'
        } else {
          this.formValues.login.error = false
        }
      },

      validatePassword () {
        if (this.formValues.password.value.length < 6) {
          this.errorCheck = true
          this.formValues.password.error = 'Password must be longer than 6 characters'
        } else {
          this.formValues.password.error = false
        }
      }

    }
  }
</script>

<style lang="scss">

  .sign-in {
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

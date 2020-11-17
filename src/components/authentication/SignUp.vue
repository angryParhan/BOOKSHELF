<template>
  <section class="sign-in">
    <div>
      <UiKitInput
          v-model="formValues.username.value"
          :error="formValues.username.error"
          class="sign-in__input"
          placeholder="Username"
          type="text"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.login.value"
          :error="formValues.login.error"
          class="sign-in__input"
          placeholder="Email"
          type="email"
          style="margin-top: 50px"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.password.value"
          :error="formValues.password.error"
          class="sign-in__input"
          placeholder="Password"
          type="password"
          style="margin-top: 50px"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.confirmPassword.value"
          :error="formValues.confirmPassword.error"
          class="sign-in__input"
          placeholder="Confirm password"
          type="password"
          style="margin-top: 50px"
      />
    </div>

  </section>

</template>

<script>
  import UserModel from '../../models/user/UserModel'

  export default {
    name: "SignUp",
    data () {
      return {
        errorCheck: false,
        formValues: {
          username: {
            value: '',
            error: false
          },
          login: {
            value: '',
            error: false
          },
          password: {
            value: '',
            error: false
          },
          confirmPassword: {
            value: '',
            error: false
          }
        }
      }
    },
    mounted () {
      this.$root.$on('auth', this.signUpHandler)
    },
    beforeDestroy() {
      this.$root.$off('auth', this.signUpHandler)
    },
    methods: {
      async signUpHandler () {
        this.errorCheck = false

        this.validateUsername()
        this.validateEmail()
        this.validatePassword()
        this.validateConfirmPassword()


        if (!this.errorCheck) {
          //signInFunction
          try {
            const res = await UserModel.register(this.formValues.login.value, this.formValues.username.value, this.formValues.password.value)
            if (res) {
              this.$emit('auth-result', 'success')
            }
          } catch (e) {
            this.$emit('auth-result', 'api-error')
            console.error(e)
          }
        } else {
          this.$emit('auth-result', 'validation-error')
        }
      },
      validateUsername () {
        if (this.formValues.username.value.length <= 3) {
          this.errorCheck = true
          this.formValues.username.error = 'Username must be longer then 3 characters'
        } else {
          this.formValues.username.error = false
        }
      },
      validateEmail() {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!re.test(String(this.formValues.login.value).toLowerCase())) {
          this.errorCheck = true
          this.formValues.login.error = 'invalid email'
        } else {
          this.formValues.login.error = false
        }
      },
      validatePassword () {
        if (this.formValues.password.value.length <= 6) {
          this.errorCheck = true
          this.formValues.password.error = 'Password must be longer than 6 characters'
        } else {
          this.formValues.password.error = false
        }
      },
      validateConfirmPassword () {
        if (this.formValues.password.error) return
        if (this.formValues.confirmPassword.value !== this.formValues.password.value) {
          this.errorCheck = true
          this.formValues.confirmPassword.error = 'passwords are not the same'
        } else {
          this.formValues.confirmPassword.error = false
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

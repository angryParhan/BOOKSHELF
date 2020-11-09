<template>
  <section class="sign-in">
    <div>
      <UiKitInput
          v-model="formValues.login.value"
          :error="formValues.login.error"
          class="sign-in__input"
          placeholder="Email"
          type="email"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.password.value"
          :error="formValues.password.error"
          class="sign-in__input"
          placeholder="Password"
          type="password"
          style="margin-top: 65px"
      />
    </div>

  </section>

</template>

<script>
  import axios from 'axios'

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
    mounted () {
      this.$root.$on('auth', this.signInHandler)
    },
    beforeDestroy() {
      this.$root.$off('auth', this.signInHandler)
    },
    methods: {
      async signInHandler () {
        this.errorCheck = false
        this.validateEmail()
        this.validatePassword()

        if(!this.errorCheck) {
          //start auth Function
          console.log('ok')
          const data = (await axios({
            method: 'post',
            url: '//localhost:8090/api/auth/login',
            data: {
              value: this.formValues.login.value,
              password: this.formValues.password.value,
            }
          }))
          console.log(data)
          setTimeout(() => {
            this.$emit('auth-result', 'success')
          }, 1000)
        } else {
          this.$emit('auth-result', 'validation-error')
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

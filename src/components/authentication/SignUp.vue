<template>
  <section class="sign-in">
    <div>
      <UiKitInput
          v-model="formValues.username.value"
          :class="{input__error: formValues.username.error}"
          class="sign-in__input"
          placeholder="Username"
          type="text"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.login.value"
          :class="{input__error: formValues.login.error}"
          class="sign-in__input"
          placeholder="Email"
          type="email"
          style="margin-top: 55px"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.password.value"
          :class="{input__error: formValues.password.error}"
          class="sign-in__input"
          placeholder="Password"
          type="password"
          style="margin-top: 55px"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.confirmPassword.value"
          :class="{input__error: formValues.confirmPassword.error}"
          class="sign-in__input"
          placeholder="Confirm password"
          type="password"
          style="margin-top: 55px"
      />
    </div>

  </section>

</template>

<script>
  export default {
    name: "SignUp",
    data () {
      return {
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
      signUpHandler () {
        console.log('sign up')
        setTimeout(() => {
          this.$emit('auth-result', false)
        }, 3000)
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

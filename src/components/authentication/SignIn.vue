<template>
  <section class="sign-in">
    <div>
      <UiKitInput
          v-model="formValues.login.value"
          :class="{input__error: formValues.login.error}"
          class="sign-in__input"
          placeholder="Email"
          type="email"
      />
    </div>
    <div>
      <UiKitInput
          v-model="formValues.password.value"
          :class="{input__error: formValues.password.error}"
          class="sign-in__input"
          placeholder="Password"
          type="password"
          style="margin-top: 65px"
      />
    </div>

  </section>

</template>

<script>
  export default {
    name: "SignIn",
    data () {
      return {
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

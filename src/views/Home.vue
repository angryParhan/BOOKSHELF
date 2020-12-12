<template>
  <section class="login">
    <div class="login__wrapper">
      <div class="login__header">
        <h1 class="app-name login__name">Bookshelf</h1>
      </div>
      <div class="login__body">
        <img class="login__body__icon" src="../assets/login-imgs/icon.png" alt=""/>
      </div>
      <div class="login__footer">
        <router-link class="login__footer__link" to="/dashboard">
          Continue without SignUp
        </router-link>
        <UiKitBtn text="Sign In" style="width: 200px; border-radius: 30px;" @click="showAuthDialog"/>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'


  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'user/isLogin'
      })
    },
    watch: {
    },
    methods: {
      ...mapActions({
        showAuthDialog: 'app/showAuthDialog'
      })
    }
  }
</script>

<style lang="scss">
  @import '../assets/scss/globals.scss';

  .login {
    font-family: 'Quicksand', sans-serif;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: inset 0 0 550px #000000;
    background-image: url("../assets/login-imgs/login_background.jpg");
    z-index: 100;

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 10% 0;
    }

    &__header {
      display: flex;
      width: 100%;
    }

    &__body {
      width: 100%;
      display: flex;
      justify-content: center;

      &__form {
        width: 100%;
        height: 200px;
        background: transparent;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__input {
          width: 550px;
        }

      }


      &__icon {
        width: 200px;
        border-radius: 100px;
        box-shadow: 0 0px 550px 20px #000000;
      }
    }

    &__footer {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;

      &__link {
        margin-bottom: 5px;
        width: fit-content;
      }

      .get-started__btn {
        min-width: 232px;
      }
    }

    &__btn {
      margin: 0 auto;
      display: block;
    }

    &__name {
      margin: 0 auto;
    }
  }

  .btn {
    background: $orange;
    border: none;
    border-radius: 30px;
    padding: 15px 59px;
    font-size: 22px;
    font-weight: 700;
    box-shadow: 0 0 550px #000000;

    &:hover {
      /*background: #ffa620;*/
    }

    &:active {
      background: #fbcc67;
    }

    &:focus {
      outline: none;
    }
  }

  .app-name {
    color: #fccd67;
    font-size: 75px;
    text-shadow: 0 0 0 black, 0 0 1em black;
    text-transform: uppercase;

    @media all and (max-width: 600px) {
      font-size: 47px;
    }
  }
</style>

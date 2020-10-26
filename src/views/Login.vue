<!--<template>-->
<!--  <div class="login">-->
<!--    <div class="login__wrapper">-->
<!--      <div class="login__header">-->
<!--        <h1 class="app-name login__name">Bookshelf</h1>-->
<!--      </div>-->
<!--      <div class="login__body">-->
<!--        <img v-if="!login" class="login__icon" src="../assets/login-imgs/icon.png" alt="" />-->
<!--      </div>-->
<!--      <div class="login__footer">-->
<!--        <button class="btn login__btn" @click="login = true">Get started</button>-->
<!--        <UiKitInput v-model="textTest" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__header">
        <h1 class="app-name login__name">Bookshelf</h1>
      </div>
      <div class="login__body">
        <transition name="slide-fade" mode="out-in">
          <img v-if="!login" class="login__body__icon" src="../assets/login-imgs/icon.png" alt="" />
          <div v-else-if="login" class="login__body__form">
            <UiKitInput
                    v-model="formValues.login.value"
                    @focus="formValues.login.error"
                    @blur="formValidate('login')"
                    :class="{input__error: formValues.login.error}"
                    class="login__body__form__input"
                    placeholder="Email"
                    type="email"
            ></UiKitInput>
            <UiKitInput
                    v-model="formValues.password.value"
                    @focus="formValues.password.error"
                    @blur="formValidate('password')"
                    :class="{input__error: formValues.password.error}"
                    class="login__body__form__input"
                    placeholder="Password"
                    type="email"
            ></UiKitInput>
          </div>
        </transition>
      </div>
      <div class="login__footer">
        <button class="btn login__btn"  @click="login = !login">
          <transition name="fade" mode="out-in">
            <span :key="login">{{ login ? 'Sign up' : 'Get started' }}</span>
          </transition>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'


  export default {
    data () {
      return {
        login: false,
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
      ...mapState({
        userStore: 'user'
      }),
      ...mapGetters({
        isLogin: 'isLogin'
      })
    },
    methods: {
      formValidate (type) {
        if (!this.formValues[type].value) {
          this.formValues[type].error = true
        } else {
          this.formValues[type].error = false
        }
      }
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

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
          font-family: 'Quicksand', sans-serif;
          width: 50%;
          margin: 10px 0;
          background: rgba(0, 0, 0, 0.5);
          outline: none;
          border: 3px solid #e1a73b;
          border-radius: 40px;
          padding: 14px 26px;
          font-size: 19px;
          color: #ffe8bd;
          text-align: center;
          box-shadow: 0 0 30px #000000;
          &::placeholder {
            font-family: 'Quicksand', sans-serif;
            color: #e0bfa0;
          }
        }
        .input__error {
          border: 3px solid #ff5234;
        }
      }
      &__icon {
        width: 200px;
      }
    }
    &__footer {
      width: 100%;
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
    background: #e1a73b;
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
    color: #ffe8bd;
    font-size: 75px;
    text-shadow: 0 0 0 black, 0 0 1em black;
    text-transform: uppercase;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter-from, .fade-leave-to
    /* .component-fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .slide-leave-active,
  .slide-enter-active {
    transition: 0.5s;
  }
  .slide-enter-from {
    transform: translate(0, 100%);
  }
  .slide-leave-to {
    transform: translate(0, -100%);
  }

  .slide-fade-enter-active {
    transition: all .1s ease;
  }
  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter-from, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform: translateY(10px);
    opacity: 0;
  }
</style>

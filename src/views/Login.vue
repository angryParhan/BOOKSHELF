<template>
  <div class="login">
    <div class="login__wrapper">
      <div class="login__header">
        <h1 class="app-name login__name">Bookshelf</h1>
      </div>
      <div class="login__body">
        <img v-if="!login" class="login__icon" src="../assets/login-imgs/icon.png" alt="" />
      </div>
      <div class="login__footer">
        <button class="btn login__btn" @click="login = true">Get started</button>
        <UiKitInput />
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'


  export default {
    data () {
      return {
        login: false
      }
    },
    computed: {
      ...mapState({
        userStore: 'user'
      }),
      ...mapGetters({
        isLogin: 'isLogin'
      })
    }
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Quicksand&display=swap');

  .login {
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
    &__icon {
      width: 200px;
    }
    &__footer {
      width: 100%;
    }
    &__btn {
      margin: 0 auto;
      display: block;
    }
    &__header {
      display: flex;
      width: 100%;
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
    font-family: 'Quicksand', sans-serif;
    color: #ffe8bd;
    font-size: 75px;
    text-shadow: 0px 0px 0px black, 0 0 1em black;
    text-transform: uppercase;
  }
</style>

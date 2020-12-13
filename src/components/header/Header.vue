<template>
  <header class="header">
    <div class="header__first-part">
      <div class="header__sidebar-icon ripple" @click="changeSidebar">
        <img src="./images/menu-icon.svg" alt="menu">
      </div>
      <router-link to="/dashboard" tag="h2" class="header__logo">BOOKSHELF</router-link>
    </div>


    <div class="header__user-popover" @click="showAuthDialog">
      <div class="unregister-popover" v-if="!isLogin">
        <span>Login or register</span>

        <img class="unregister-popover__user-img" src="./images/user.svg" alt="user">
      </div>
      <div v-else class="logged-in-popover">
        <div class="logged-in-popover__personal-data">
          <span class="logged-in-popover__personal-data__username">Zevs</span>
          <span class="logged-in-popover__personal-data__email">andrewparhomchuk@gmail.com</span>
        </div>
        <img class="logged-in-popover__user-img" src="./images/profile.svg" alt="user">
      </div>
    </div>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: "Header",
    computed: {
      ...mapGetters({
        isLogin: 'user/isLogin'
      })
    },
    methods: {
      ...mapActions({
        showAuthDialog: 'app/showAuthDialog'
      }),
      changeSidebar () {
        this.$store.commit('app/SET_SIDEBAR_OPPOSITE')
      }
    }
  }
</script>

<style lang="scss">
  .header {
    background: #404040;
    height: 70px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 20;

    &__first-part {
      display: flex;
    }

    &__sidebar-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 50px;
      width: 50px;
      height: 50px;
    }

    &__logo {
      color: #fccd67;
      font-size: 20px;
      text-shadow: 0 0 0 black, 0 0 1em black;
      text-transform: uppercase;
      margin-left: 20px;
      cursor: pointer;
      user-select: none;
    }


    &__user-popover {
      cursor: pointer;


      .unregister-popover {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        user-select: none;
        padding: 10px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 11px;

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        &__user-img {
          margin-left: 15px;
          height: 20px;
          width: 20px;
        }
      }


      .logged-in-popover {
        display: flex;
        border-radius: 11px;
        background: rgba(0, 0, 0, 0.2);
        padding: 3px 10px;

        &:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        &__personal-data {
          display: flex;
          flex-direction: column;
          justify-content: center;

          &__username {
            font-weight: 700;
          }

          &__email {
            font-size: 13px;
          }
        }

        &__user-img {
          height: 50px;
          width: 50px;
          margin-left: 10px;
        }
      }
    }
  }

</style>

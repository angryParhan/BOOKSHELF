<template>
  <section>
    <UiKitDialog
        v-model="app.authDialog"
        :fullscreen="$breakpoint.xsOnly"
    >
      <div class="auth-dialog">

        <div class="auth-dialog__tabs" :class="{'auth-dialog__tabs-disable' : loading}">
          <div class="auth-dialog__tabs-wrapper" :class="{ 'slide-left' : activeTab === 'sign-in', 'slide-right' : activeTab === 'sign-up' }">
            <p class="tabs-item" :class="{'tabs-item-active' : activeTab === 'sign-in'}" @click="activeTab = 'sign-in'">Sign in</p>
            <p class="tabs-item" :class="{'tabs-item-active' : activeTab === 'sign-up'}" @click="activeTab = 'sign-up'">Sign up</p>
          </div>
        </div>

        <section class="auth-dialog__active-tab">
          <transition name="fadeHeight" mode="out-in">
            <SignIn v-if="activeTab === 'sign-in'" @auth-result="handleAuthResult"/>
            <SignUp v-else @auth-result="handleAuthResult"/>
          </transition>


        </section>

        <div class="auth-dialog__btn">
          <UiKitBtn text="Log In" style="width: 200px" :loading="loading" @click="authHandler"/>
        </div>


      </div>
    </UiKitDialog>
  </section>
</template>

<script>
import SignIn from './SignIn'
import SignUp from './SignUp'
import { mapState } from 'vuex'

  export default {
    name: "AuthDialog",
    components: {
      SignIn,
      SignUp
    },
    data() {
      return {
        activeDialog: true,
        activeTab: 'sign-up',
        loading: false,
        errorDialog: false
      }
    },
    computed: {
      ...mapState({
        app: 'app'
      })
    },
    methods: {
      authHandler () {
        this.loading = true
        this.$root.$emit('auth')
      },
      handleAuthResult (result) {
        if (result === 'validation-error') {
          this.loading = false
        } else if (result === 'success') {
          this.loading = false
        } else if (result === 'api-error') {
          this.errorDialog = true
          this.loading = false
        }
       }
    }
  }
</script>

<style lang="scss">
  .auth-dialog {
    width: 500px;

    @media all and (max-width: 600px) {
      width: 100%;
    }

    background: #272727;
    color: #ffe8bd;

    &__tabs {
      padding-top: 30px;
      @media all and (max-width: 600px) {
        padding-top: 45px;
      }

      display: flex;
      justify-content: center;

      &-disable {
        pointer-events: none;

      }

      &-wrapper {
        display: flex;
        position: relative;
        width: 400px;

        &.slide-left:after {
          left: 0;
          transition: left 0.2s linear;
        }

        &.slide-right:after {
          left: 50%;
          transition: left 0.2s linear;
        }


        &:after {
          content: '';
          display: block;
          width: 50%;
          height: 1px;
          background: #e1a73b;
          bottom: 0;
          position: absolute;
          left: 0;
        }
      }

      .tabs-item {
        width: 50%;
        text-align: center;
        cursor: pointer;
        padding: 20px 0;
        user-select: none;
        margin-bottom: 0;
        background: rgba(0, 0, 0, 0.1);


        &-active {
          background: rgba(0, 0, 0, 0.2);
        }
      }

    }

    &__active-tab {
      margin-top: 55px;
    }

    &__btn {
      display: flex;
      justify-content: center;
      margin-top: 55px;
      margin-bottom: 40px;
    }
  }

  .fadeHeight-enter-active,
  .fadeHeight-leave-active {
    transition: all 0.3s;
    max-height: 600px;
  }
  .fadeHeight-enter,
  .fadeHeight-leave-to
  {
    max-height: 200px;
    opacity: 0;
  }

</style>

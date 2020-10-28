<template>
  <section>
    <UiKitDialog
        v-model="activeDialog"
        :fullscreen="$breakpoint.xsOnly"
    >
      <div class="auth-dialog">

        <div class="auth-dialog__tabs">
          <div class="auth-dialog__tabs-wrapper" :class="{ 'slide-left' : activeTab === 'sign-in', 'slide-right' : activeTab === 'sign-up' }">
            <p class="tabs-item" :class="{'tabs-item-active' : activeTab === 'sign-in'}" @click="activeTab = 'sign-in'">Sign in</p>
            <p class="tabs-item" :class="{'tabs-item-active' : activeTab === 'sign-up'}" @click="activeTab = 'sign-up'">Sign up</p>
          </div>
        </div>

        <section class="auth-dialog__active-tab">
          <SignIn />
        </section>

        <div class="auth-dialog__btn">
          <UiKitBtn text="Log In" style="width: 200px"/>
        </div>


      </div>
    </UiKitDialog>
  </section>
</template>

<script>
import SignIn from './SignIn'

  export default {
    name: "AuthDialog",
    components: {
      SignIn
    },
    data() {
      return {
        activeDialog: true,
        activeTab: 'sign-in'
      }
    }
  }
</script>

<style lang="scss">
  .auth-dialog {
    width: 100%;
    background: #272727;
    color: #ffe8bd;

    &__tabs {
      padding-top: 30px;
      display: flex;
      justify-content: center;

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
        background: rgba(0, 0, 0, 0.05);


        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        &-active {
          background: rgba(0, 0, 0, 0.1);
        }

        &-active::after {

        }
      }

    }

    &__active-tab {
      margin-top: 100px;
    }

    &__btn {
      display: flex;
      justify-content: center;
      margin-top: 80px;
      margin-bottom: 40px;
    }
  }

</style>

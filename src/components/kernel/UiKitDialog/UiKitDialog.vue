<template>
  <section
      v-if="isOpen"
      class="ui-kit-dialog"
  >
    <transition name="fade">
      <div
          v-if="isOpen && !fullscreen"
          class="ui-kit-dialog__overlay"
          @click.stop="!persistent ? handleHideDialog() : ''"
      />

    </transition>
    <transition name="fade">
      <section
          :class="contentClasses"
          :style="{'border-radius' : fullscreen ? '0' : '10px'}"
      >
        <div
          v-show="closeBtn"
          class="ui-kit-dialog__close"
          @click.stop="handleHideDialog"
        >
          <img src="../../../assets/login-imgs/close-icon.svg" width="15" height="15" alt="">
        </div>
        <slot style="z-index: 400"/>
      </section>
    </transition>


  </section>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "UiKitDialog",
    model: {
      prop: 'isOpen',
      event: 'update:isOpen'
    },
    props: {
      isOpen: {
        type: [Boolean, String, null],
        default: false
      },
      fullscreen: {
        type: Boolean,
        default: false,
      },
      closeBtn: {
        type: Boolean,
        default: true,
      },
      contentClass: {
        type: String,
        default: '',
      },
      persistent: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      contentClasses: {
        get() {
          let classes = 'ui-kit-dialog__content';
          if(this.fullscreen) {
            classes += ' ' + 'ui-kit-dialog__content--mobile'
          }
          if(this.contentClass) {classes += ' ' + this.contentClass}
          return classes;
        }
      }
    },
    methods: {
      ...mapActions({
        hideDialog: 'app/hideDialog'
      }),
      handleHideDialog () {
        this.hideDialog()
        this.$emit('update:isOpen', false)
      }
    }
  }
</script>

<style lang="scss">
  .ui-kit-dialog {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 400;
    position: fixed;

    &__overlay {
      position: fixed;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      z-index: 200;
      //background: rgba(#505050, 0.5);
      background: rgba(0, 0, 0, 0.6);
    }

    &__close {
      width: 15px;
      height: 15px;
      position: absolute;
      cursor: pointer;
      right: 5px;
      top: 5px;
      z-index: 1;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: background-color 0.1s linear;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        transition: background-color 0.1s linear;
      }

    }

    &__content {
      position: absolute;
      z-index: inherit;
      background: #272727;
      overflow: auto;
      max-height: 90vh;
      box-shadow: 0px 0px 10px 0px black;

      &--mobile {
        //width: 100vw;
        //height: 100vh;
        width: 100%;
        height: 100%;
        max-height: 100vh;
        overflow: auto;
      }
    }

    .fade-enter-active  {
      transition: .2s cubic-bezier(.25,.8,.25,1);
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

  }



</style>

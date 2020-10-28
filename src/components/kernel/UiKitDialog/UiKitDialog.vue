<template>
  <section
      v-if="isOpen"
      class="ui-kit-dialog"
  >
    <transition name="fade">
      <div
          v-if="isOpen && !fullscreen"
          class="ui-kit-dialog__overlay"
          @click.stop="!persistent ? $emit('update:isOpen', false) : ''"
      />

    </transition>
    <transition name="fade">
      <section
          :class="contentClasses"
      >
        <div
          v-show="closeBtn"
          class="ui-kit-dialog__close"
          @click.stop="$emit('update:isOpen', false)"
        >
          <img src="../../../assets/login-imgs/close-icon.svg" width="15" height="15" alt="">
        </div>
        <slot style="z-index: 400"/>
      </section>
    </transition>


  </section>
</template>

<script>
  export default {
    name: "UiKitDialog",
    model: {
      prop: 'isOpen',
      event: 'update:isOpen'
    },
    props: {
      isOpen: {
        type: Boolean,
        default: false
      },
      fullscreen: {
        type:Boolean,
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
      background: rgba(#191919, 0.5);
    }

    &__close {
      width: 15px;
      height: 15px;
      position: absolute;
      cursor: pointer;
      right: 12px;
      top: 12px;

    }

    &__content {
      width: 400px;
      position: absolute;
      z-index: inherit;
      background: #ffffff;
      overflow: auto;
      //box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.13);
      border-radius: 10px;
      max-height: 90vh;
      box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);

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

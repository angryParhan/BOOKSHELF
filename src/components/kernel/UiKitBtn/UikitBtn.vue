<template>
  <section class="ui-kit-btn" :class="{'ui-kit-btn__disabled' : loading || disabled}" @click="$emit('click')">
    <span v-if="!loading">{{ text }}</span>
    <div class="ui-kit-btn__loading" v-else>
      <img src="../../../assets/login-imgs/loading-icon.svg" alt="preloader">
    </div>

  </section>
</template>

<script>
  export default {
    name: "UikitBtn",
    props: {
      text: {
        type: String,
        default: 'apply'
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss">
 .ui-kit-btn {
   background: rgba(241, 174, 72, 1);
   border-radius: 5px;
   min-height: 50px;
   max-width: 300px;
   font-size: 22px;
   width: 260px;
   cursor: pointer;
   transition: background 0.3s linear;
   display: flex;
   justify-content: center;
   align-items: center;
   user-select: none;

   &__disabled {
     pointer-events: none;
     background: rgba(241, 174, 72, 0.6);
   }

   &:hover {
     background: rgba(241, 174, 72, 0.8);
     transition: background 0.3s linear;
   }
   &__loading {
     width: 25px;
     height: 25px;
     animation: loading 1.1s linear infinite;
     pointer-events: none;
   }

 }


 @keyframes loading {
   0% {
     -webkit-transform: rotate(0);
     transform: rotate(0);
   }
   100% {
     -webkit-transform: rotate(360deg);
     transform: rotate(360deg);
   }
 }
</style>

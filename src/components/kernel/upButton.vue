<template>
  <section class="up-btn" v-show="allowBtn" @click="scrollTop">
    >
  </section>
</template>

<script>
  export default {
    name: "upButton",

    data () {
      return {
        intervalInstance: undefined,
        allowBtn: false
      }
    },

    computed: {
      showBtn() {
        return this.allowBtn || this.value
      }
    },

    mounted() {
      this.allowBtn = window.innerHeight * 3 < window.scrollY;
      this.intervalInstance = setInterval(()=>{
        this.allowBtn = window.innerHeight * 3 < window.scrollY;
      },250)
    },


    destroyed() {
      clearInterval(this.intervalInstance);
    },


    methods: {
      scrollTop () {
        window.scroll({top: 0, behavior: 'smooth'})
      }
    }

  }
</script>

<style lang="scss">
  .up-btn {
    width: 50px;
    height: 50px;
    background: rgba(#484848, 0.6);
    border-radius: 50%;
    position: fixed;
    bottom: 50px;
    right: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transform: rotate(-90deg);
    color: #e1a73b;
    font-size: 38px;
    user-select: none;
    align-items: flex-start;
    z-index: 30;
  }

</style>

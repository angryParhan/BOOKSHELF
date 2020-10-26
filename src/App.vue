<template>
  <div>
    <router-link v-if="userIsLogin" to="/">Home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import user from '../src/store/user'


  export default {

    computed: {
      ...mapGetters({
        userIsLogin: 'isLogin'
      }),

    },
    created () {
      if (!this.$store.state.user) {
        this.$store.registerModule('user', user)
      }
    },
    beforeDestroy () {
      if (this.$store.state.user) {
        this.$store.unregisterModule('user')
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/scss/globals.scss';



</style>

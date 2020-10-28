<template>
  <div>
    <router-link v-if="userIsLogin" to="/">Home</router-link>
    <AuthDialog />
    <router-view></router-view>
  </div>
</template>

<script>
  import AuthDialog from './components/authentication/AuthDialog'
  import { mapGetters } from 'vuex'
  import user from '../src/store/user'


  export default {
    components: {
      AuthDialog
    },
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

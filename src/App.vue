<template>
  <div>
    <AuthDialog />
    <router-view></router-view>
  </div>
</template>

<script>
  import AuthDialog from './components/authentication/AuthDialog'
  import user from '../src/store/user'
  import app from '../src/store/app'


  export default {
    components: {
      AuthDialog
    },
    computed: {
    },
    created () {
      if (!this.$store.state.app) {
        this.$store.registerModule('app', app)
      }
      if (!this.$store.state.user) {
        this.$store.registerModule('user', user)
      }
    },
    mounted () {
      console.log('app', this.app)
    },
    beforeDestroy () {
      if (this.$store.state.app) {
        this.$store.unregisterModule('app')
      }
      if (this.$store.state.user) {
        this.$store.unregisterModule('user')
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/scss/globals.scss';



</style>

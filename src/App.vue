<template>
  <div>
    <AuthDialog />
    <UiHeader />
    <sidebar />
    <main class="main-content" :class="{'main-content__drawer-off' : !draw || !$breakpoint.mdAndUp}">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import AuthDialog from './components/authentication/AuthDialog'
  import user from '../src/store/user'
  import app from '../src/store/app'
  import UiHeader from './components/header/Header'
  import sidebar from './components/SideBar/Sidebar'
  import { mapGetters, mapActions } from 'vuex'
  import UserModel from '@/models/user/UserModel';


  export default {
    components: {
      AuthDialog,
      UiHeader,
      sidebar
    },
    computed: {
      ...mapGetters({
        draw: 'app/getSideBar'
      })
    },
    created () {
      if (!this.$store.state.app) {
        this.$store.registerModule('app', app)
      }
      if (!this.$store.state.user) {
        this.$store.registerModule('user', user)
      }

    },
    async mounted () {
      console.log('app', this.app)
      await UserModel.login()
    },
    beforeDestroy () {
      if (this.$store.state.app) {
        this.$store.unregisterModule('app')
      }
      if (this.$store.state.user) {
        this.$store.unregisterModule('user')
      }
    },
    methods: {
      ...mapActions({
        login: 'user/login'
      })
    }
  }
</script>

<style lang="scss">
  @import './assets/scss/globals.scss';

  .main-content {
    transition: padding 0.3s linear;
    padding: 72px 0 0 300px;
    transition-delay: 0.3s;

    &__drawer-off {
      padding: 72px 0 0 0 !important;
    }
  }

  .sidebar-main {
  }



</style>

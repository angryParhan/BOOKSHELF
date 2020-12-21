<template>
  <div>
    <AuthDialog />
    <UiHeader />
    <sidebar />
    <main class="main-content" :class="{'main-content__drawer-off' : !draw || !$breakpoint.mdAndUp}">
      <router-view></router-view>
    </main>
    <upBtn />
  </div>
</template>

<script>
  import AuthDialog from './components/authentication/AuthDialog'
  import user from '../src/store/user'
  import app from '../src/store/app'
  import library from '../src/store/library'
  import UiHeader from './components/header/Header'
  import sidebar from './components/SideBar/Sidebar'
  import { mapGetters, mapActions } from 'vuex'
  import UserModel from '@/models/user/UserModel'
  import upBtn from './components/kernel/upButton'

  export default {
    components: {
      AuthDialog,
      UiHeader,
      sidebar,
      upBtn
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
      if (!this.$store.state.library) {
        this.$store.registerModule('library', library)
      }

    },
    async mounted () {
      try {
        const res = await UserModel.login()
        if (res?.data?.user) {
          this.login(res.data.user)
        }
        console.log(res.data.user)
      } catch (e) {
        console.log(e.response?.status)
      }

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

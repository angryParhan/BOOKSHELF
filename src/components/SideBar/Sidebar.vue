<template>
  <section>
    <aside class="sidebar" :class="{'sidebar__close' : !draw, 'sidebar__opened' : draw}">
      <div
          v-for="item in items"
          :key="item.text"
          class="sidebar__item"
          :class="{'sidebar__item-active' : $route.name === item.routeName}"
          @click="onRouteClick(item)"
      >
        <font-awesome-icon :icon="item.icon" class="sidebar__item-icon" /> {{ item.text }}
      </div>
    </aside>
    <div
        v-if="!$breakpoint.mdAndUp && draw"
        class="sidebar__overlayXs"
        @click.self.stop="closeSidebar"
    />
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'


  export default {
    name: 'Sidebar',
    data () {
      return {
        items: [
          {
            text: 'Find book',
            icon: 'search',
            routeName: 'book-search'
          },
          {
            text: 'Dashboard',
            icon: 'home',
            routeName: 'dashboard'
          },
          {
            text: 'Favorites',
            icon: 'heart',
            routeName: 'favorites'
          },
          {
            text: 'Create library',
            icon: 'plus',
            dialogName: 'CreateLibrary'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        draw: 'app/getSideBar',
        isLogin: 'user/isLogin'
      })
    },
    watch: {
      '$breakpoint.mdAndUp' (nv) {
        nv ? this.$store.commit('app/SET_SIDEBAR', true) : this.closeSidebar()
      },
      '$route.path'() {
        if (!this.$breakpoint.mdAndUp) {
          this.closeSidebar()
        }
      },
      async draw (nv) {
        if (!this.$breakpoint.mdAndUp) {
          if (nv) {
            document.documentElement.classList.add('scroll-off')
          } else {
            await this.$nextTick();
            document.documentElement.classList.remove('scroll-off');
          }
        }
      }
    },

    mounted() {
      if (!this.$breakpoint.mdAndUp) {
        this.$store.commit('app/SET_SIDEBAR', false)
      }
    },

    methods: {
      ...mapActions({
        showDialog: 'app/showDialog'
      }),
      closeSidebar () {
        this.$store.commit('app/SET_SIDEBAR', false)
      },
      onRouteClick (menuItem) {
        if (menuItem.routeName){
          this.changeRoute(menuItem.routeName)
        } else if (menuItem.dialogName) {
          if (!this.isLogin) {
            this.showDialog('Auth')
            return
          }
          this.showDialog(menuItem.dialogName)
        }
      },
      changeRoute (name) {
        this.$router.push({ name }).catch((e)=>{
          console.log(e)
        })
      }
    }
  }
</script>


<style>
  .scroll-off {
    overflow: hidden !important;
  }
</style>

<style lang="scss">
  .sidebar {
    position: fixed;
    top: 70px;
    height: calc(100vh - 70px);
    background: #3e3e3d;
    width: 250px;
    border-top: 2px solid #2c2c2b;
    transition: left 0.3s linear;
    z-index: 20;
    padding-top: 15px;

    &__close {
      left: -300px;
    }

    &__opened {
      left: 0;
    }

    &__overlayXs {
      position: fixed;
      top: 70px;
      left: 0;
      height: calc(100vh - 70px);
      background: rgba(0, 0, 0, 0.2);
      width: 100vw;
      z-index: 10;
    }

    &__item {
      cursor: pointer;
      padding: 10px 0 10px 40px;
      user-select: none;
      font-weight: 500;
      margin: 10px 5px;
      border-radius: 5px;
      &:hover {
        background: rgba(0, 0, 0, 0.2);
      }

      &-active {
        position: relative;
        color: #f1ae48;
        font-weight: 600;
      }
      &-icon {
        font-size: 13px;
        margin-bottom: 1px;
        margin-right: 5px;
      }
    }
  }

</style>

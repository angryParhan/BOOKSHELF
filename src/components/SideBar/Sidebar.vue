<template>
  <section>
    <aside class="sidebar" :class="{'sidebar__close' : !draw, 'sidebar__opened' : draw}">
      <div
          v-for="(item, i) in items"
          :key="item.routeName + (item.routeQuery||{}).id + item.text + i"
          class="sidebar__item"
          :class="{'sidebar__item-active' : $route.name === item.routeName && (!(item.routeQuery||{}) || $route.query.id === (item.routeQuery||{}).id)}"
          @click="onRouteClick(item)"
      >
        <font-awesome-icon :icon="item.icon" class="sidebar__item-icon" /> {{ item.text }}
      </div>
      <p class="sidebar__divider">Libraries</p>
      <div
          v-for="(item, i) in libraryRoutes"
          :key="item.routeName + (item.routeQuery||{}).id + item.text + i"
          class="sidebar__item sidebar__item-library"
          :class="{'sidebar__item-active' : $route.name === item.routeName && (!(item.routeQuery||{}) || $route.query.id === (item.routeQuery||{}).id)}"
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
        ]
      }
    },
    computed: {
      ...mapGetters({
        draw: 'app/getSideBar',
        isLogin: 'user/isLogin',
        libraries: 'library/getLibraries',
      }),
      libraryRoutes () {
        console.log(this.libraries);
        const routes = this.libraries.filter(el => el.my && !el.favorite).map(item => {
          return {
            text: item.title,
            icon: 'landmark',
            routeName: 'library-card',
            routeQuery: { id: item.id }
          }
        })
        routes.unshift({
          text: 'Create library',
          icon: 'plus',
          dialogName: 'CreateLibrary'
        })
        return routes
      }
    },
    watch: {
      '$breakpoint.mdAndUp' (nv) {
        console.log('sidebar', nv)
        nv ? this.$store.commit('app/SET_SIDEBAR', true) : this.closeSidebar()
      },
      '$route.path'() {
        if (!this.$breakpoint.mdAndUp) {
          this.closeSidebar()
        }
      },
      libraries (nv) {
        console.log('libraries', nv)
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
          this.changeRoute(menuItem)
        } else if (menuItem.dialogName) {
          if (!this.isLogin) {
            this.showDialog('Auth')
            return
          }
          this.showDialog(menuItem.dialogName)
        }
      },
      changeRoute (menuItem) {
        this.$router.push({
          name: menuItem.routeName,
          query: menuItem.routeQuery || {}
        }).catch(e => {
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
    //border-top: 2px solid #2c2c2b;
    box-shadow: 10px 0px 10px -10px black;
    transition: transform 0.3s linear;
    z-index: 20;
    padding-top: 15px;
    user-select: none;
    overflow-y: auto;
    &__divider {
      padding: 0 26px;
      font-size: 15px;
      color: #afab99;
    }
    &__close {
      transform: translateX(-300px);
    }

    &__opened {
      transform: translateX(0);
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
      font-weight: 500;
      margin: 10px 5px;
      border-radius: 5px;
      &:hover {
        background: rgba(0, 0, 0, 0.2);
      }
      &-library {
        margin: 6px 5px;
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

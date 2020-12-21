<template>
  <section>
    <aside class="sidebar" :class="{'sidebar__close' : !draw, 'sidebar__opened' : draw}">
      <div
          v-for="item in items"
          :key="item.text"
          class="sidebar__item"
          :class="{'sidebar__item-active' : $route.name === item.routeName}"
          @click="changeRoute(item.routeName)"
      >
        {{ item.text }}
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
  import { mapGetters } from 'vuex'


  export default {
    name: "Sidebar",
    data () {
      return {
        items: [
          {
            text: 'Dashboard',
            icon: '',
            routeName: 'dashboard'
          },
          {
            text: 'Favorites',
            icon: '',
            routeName: 'favorites'
          },
          {
            text: 'Find book',
            icon: '',
            routeName: 'book-search'
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        draw: 'app/getSideBar'
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
      closeSidebar () {
        this.$store.commit('app/SET_SIDEBAR', false)
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
    width: 300px;
    border-top: 2px solid #2c2c2b;
    transition: transform 0.3s linear;
    z-index: 20;
    padding-top: 15px;

    &__close {
      transform: translateX(-350px);
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
      padding: 15px 0 15px 40px;
      user-select: none;
      font-weight: 500;

      &:hover {
        background: rgba(0, 0, 0, 0.2);
      }

      &-active {
        position: relative;
        color: #f1ae48;
        font-weight: 600;

        &:before {
          content: '';
          display: block;
          width: 30px;
          height: 3px;
          position: absolute;
          background: #f1ae48;
          top: 23px;
          left: 0;
        }
      }
    }

  }

</style>

<template>
  <section class="dashboard">
    <h1>Latest created libraries</h1>
    <LatestLibraries count="4"/>
    <h1>New York Times Best Seller Lists</h1>
    <bestSellingBooks />
  </section>
</template>

<script>
  import bestSellingBooks from  '../components/dashboard/BestSellingBooks'
  import bestSellersBooksStore from '../store/bestSellersBook'
  import library from '../store/library/library';
  import LatestLibraries from '../components/dashboard/LatestLibraries';

  export default {
    name: "Dashboard",
    components: { bestSellingBooks },
    name: 'Dashboard',
    components: {
      LatestLibraries,
      bestSellingBooks,
    },

    data () {
      return {
        key: 0
      }
    },

    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.key++
        next();
      })
    },

    beforeDestroy() {
      if (this.$store.state.bestSellersBooks) {
        this.$store.unregisterModule('bestSellersBooks')
      }
      if (this.$store.state.bestSellersBooks) {
        this.$store.unregisterModule('library')
      }
    },

    beforeCreate () {
      if (!this.$store.state.bestSellersBooks) {
        this.$store.registerModule('bestSellersBooks', bestSellersBooksStore)
      }
      if (!this.$store.state.bestSellersBooks) {
        this.$store.registerModule('library', library)
      }
    },

  }
</script>

<style lang="scss">
  .dashboard {
    padding: 0 20px;

    h1 {
      text-align: center;
    }
  }
</style>

<template>
<section class="dashboard">
  <h1>New York Times Best Seller Lists</h1>
  <bestSellingBooks />
</section>
</template>

<script>
  import bestSellingBooks from  '../components/dashboard/BestSellingBooks'
  import bestSellersBooksStore from '../store/bestSellersBook'

  export default {
    name: "Dashboard",
    components: { bestSellingBooks },
    beforeCreate () {
      if (!this.$store.state.bestSellersBooks) {
        this.$store.registerModule('bestSellersBooks', bestSellersBooksStore)
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

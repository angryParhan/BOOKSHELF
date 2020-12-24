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
  import LatestLibraries from '../components/dashboard/LatestLibraries'

  export default {
    name: "Dashboard",
    components: {
      LatestLibraries,
      bestSellingBooks,
    },

    data() {
      return {
        key: 0
      }
    }

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

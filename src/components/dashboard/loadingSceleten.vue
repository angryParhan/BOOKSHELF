<template>
<section class="dashboard-skeleton">
  <div class="dashboard-skeleton__item" v-for="item of 4" :key="item">
    <div class="img-stub"></div>
    <div class="text-stub"></div>
    <div class="text-stub-desc"></div>
  </div>
</section>
</template>

<script>
  export default {
    name: "loadingSceleten"
  }
</script>

<style lang="scss">
  .dashboard-skeleton {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 100px;



    &__item {
      height: 520px;
      width: 340px;
      background: #3e3e3d;
      padding: 20px;
      border-radius: 5px;
      animation: blinker 1s linear infinite;


      .img-stub {
        height: 90%;
        background: #797976;
      }

      .text-stub, .text-stub-desc {
        width: 60%;
        background: #6c6c69;
        border-radius: 15px;
        margin-top: 12px;
        height: 15px;
      }

      .text-stub-desc {
        width: 90%;
      }
    }
  }

  @keyframes blinker {
    50% {
      background: #585857;
    }
  }
</style>

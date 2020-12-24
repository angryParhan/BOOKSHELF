<template>
  <section
      :class="{
        'slider': true,
         contentClass: contentClass !== ''
      }"
  >
    <div class="slider__items">
      <slot />
    </div>

  </section>
</template>

<script>

  export default {
    name: 'Slider',
    props: {
      contentClass: {
        type: String,
        default: ''
      },
      showArrows: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="scss">
  .slider {
    box-shadow: inset 0 0 10px #000000;
    padding: 0 10px;
    &:hover {
    }


    &__items {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      width: 100%;
      gap: 2rem;
      padding: 20px;


      & > div, section {
        flex: 0 0 auto;
      }
    }

  }

</style>

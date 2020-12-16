<template>
 <section class="ui-kit-stub">
   <div class="ui-kit-stub-wrapper">
     <h4 class="ui-kit-stub__title">{{ description }}</h4>
     <div class="ui-kit-stub__img-wrapper">
       <img class="ui-kit-stub__img" src="../../../assets/book-icons/opened-book.svg" alt="book-stub">
     </div>
   </div>

 </section>
</template>

<script>
  export default {
    name: "UiKitStub",
    props: {
      description: {
        type: String,
        default: 'To find book, please enter name or description in the input above!'
      }
    }
  }
</script>

<style lang="scss">
.ui-kit-stub {
  max-width: 100%;
  max-height: 70vh;
  height: 90vh;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;

  &-wrapper {

  }

  &__title {
    font-size: 26px;
    font-weight: 400;
    text-align: center;
  }

  &__img {
    height: 300px;

    &-wrapper {
      text-align: center;
    }
  }
}
</style>

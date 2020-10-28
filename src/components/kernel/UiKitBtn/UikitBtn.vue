<template>
  <section class="ui-kit-btn">
    {{ text }}
  </section>
</template>

<script>
  export default {
    name: "UikitBtn",
    props: {
      text: {
        type: String,
        default: 'apply'
      }
    }
  }
</script>

<style lang="scss">
 .ui-kit-btn {
   background: #f1ae48;
   border: none;
   border-radius: 30px;
   padding: 15px 59px;
   font-size: 22px;
   font-weight: 700;
   width: 260px;
   text-align: center;
   cursor: pointer;
 }
</style>

<template>
  <section>
    <UiKitDialog
        v-model="activeDialog"
        :fullscreen="$breakpoint.xsOnly"
    >
      <div class="auth-dialog">
      </div>
    </UiKitDialog>
  </section>
</template>

<script>
  export default {
    name: "AuthDialog",
    data() {
      return {
        activeDialog: true
      }
    }
  }
</script>

<style lang="scss">
  .auth-dialog {
    width: 100%;
    background: #FB6868;
    height: 300px;
  }

</style>

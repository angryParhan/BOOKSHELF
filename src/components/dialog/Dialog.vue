<template>
  <section>
    <comment
        :is="activeDialog + 'Dialog'"
        v-if="activeDialog"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dialog',
  components: {
    'AuthDialog': () => import('../authentication/AuthDialog'),
    'CreateLibraryDialog': () => import('../library/dialogs/CreateLibraryDialog'),
    'EditLibraryDialog': () => import('../library/dialogs/EditLibraryDialog'),
    'AddBookDialog': () => import('../book/AddBookDialog')
  },
  computed: {
    ...mapGetters({
      activeDialog: 'app/getActiveDialog'
    })
  }
}
</script>

<style scoped>

</style>

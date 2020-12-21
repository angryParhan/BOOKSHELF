<template>
  <section class="dashboard">
    <h1>Current library {{ $route.params.id }}</h1>

  </section>
</template>

<script>
import libraryCard from '@/store/library/libraryCard'
import { mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  methods: {
    ...mapActions({
      setLibrary: 'library/libraryCard/setLibrary'
    })
  },
  beforeCreate () {
    if (!this.$store.state.library?.libraryCard) {
      this.$store.registerModule('library/libraryCard', libraryCard)
    }
  },
  created () {
    this.setLibrary(this.$route.params.id)
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

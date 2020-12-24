<template>
  <section class="library">
    <LibraryPage />
  </section>
</template>

<script>
import libraryCardStore from '../store/library/libraryCard'
import LibraryPage from '../components/library/LibraryPage';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Library',
  components: {
    LibraryPage
  },
  watch: {
    '$route.query.id' (val) {
      this.setLibrary(val)
    }
  },
  computed: {
    ...mapGetters({
      library: 'library/libraryCard/getData'
    })
  },
  methods: {
    ...mapActions({
      setLibrary: 'library/libraryCard/setLibrary'
    })
  },

  beforeDestroy () {
    if (this.$store.state['library/libraryCard']) {
      this.$store.unregisterModule('library/libraryCard')
    }
  },


  beforeCreate () {
    if (!this.$store.state['library/libraryCard']) {
      this.$store.registerModule('library/libraryCard', libraryCardStore)
    }
  },

  created () {
    this.setLibrary(this.$route.query.id)
  }
}
</script>

<style lang="scss">
.library {
  padding: 35px 20px;

  h1 {
    text-align: center;
  }
}
</style>

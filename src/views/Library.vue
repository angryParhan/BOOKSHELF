<template>
  <section class="library">
    <h1>{{ library.title }}</h1>
    <LibraryCard />
  </section>
</template>

<script>
import libraryCardStore from '../store/library/libraryCard'
import LibraryCard from '../components/library/LibraryCard';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Library',
  components: {
    LibraryCard
  },
  watch: {
    '$route.params.id' (val) {
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
  beforeCreate () {
    if (!this.$store.state.library?.libraryCard) {
      this.$store.registerModule('library/libraryCard', libraryCardStore)
    }
  },
  created () {
    this.setLibrary(this.$route.params.id)
  }
}
</script>

<style lang="scss">
.library {
  padding: 0 20px;

  h1 {
    text-align: center;
  }
}
</style>

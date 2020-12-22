<template>
  <section class="dashboard">
    <h1>{{ library.title }}</h1>
    <Library />
  </section>
</template>

<script>
import libraryCard from '@/store/library/libraryCard'
import Library from '@/components/library/Library';
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    Library
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

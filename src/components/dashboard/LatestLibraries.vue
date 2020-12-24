<template>
  <section class="latest-libraries">
      <libraryCard
          v-for="library of latest"
          :key="library.id"
          :library="library"
          size="250px"
          info tools
      />
  </section>
</template>

<script>
import libraryCard from '../library/libraryCard'
import { mapActions, mapGetters } from 'vuex'
import latestLibraries from '../../store/library/latestLibraries'


export default {
  name: 'LatestLibraries',

  props: {
    count: {
      type: [Number, String],
      default: 4
    },
  },

  components: {
    libraryCard,
  },

  computed: {
    ...mapGetters({
      latest: 'library/latestLibraries/getLibraries'
    })
  },

  methods: {
    ...mapActions({
      setLatest: 'library/latestLibraries/setLibraries',
      removeLatest: 'library/latestLibraries/removeLibraries'
    })
  },

  beforeDestroy () {
    if (this.$store.state['library/latestLibraries']) {
      this.$store.unregisterModule('library/latestLibraries')
    }
  },
  beforeCreate () {
    if (!this.$store.state['library/latestLibraries']) {
      this.$store.registerModule('library/latestLibraries', latestLibraries)
    }
  },

  created () {
    this.setLatest(this.count)
  }
}
</script>

<style lang="scss">
.latest-libraries {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 50px;
}
</style>

<template>
  <section @mouseover="hover = true" @mouseleave="hover = false" class="library-card">

    <span v-if="hover" @click="editLibraryHandler" class="library-card__edit">
      <span><font-awesome-icon icon="pen" /></span>
    </span>

    <img class="library-card__img" src="https://asllinea.org/wp-content/uploads/2014/03/BookPileXXXIEdit.jpg"/>

    <div v-if="info" class="library-card__info">
      <h4>{{ library.title }}</h4>
    </div>

  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Library',
  props: {
    library: {
      type: Object,
      required: true
    },
    info: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hover: false
    }
  },
  methods: {
    ...mapActions({
      showDialog: 'app/showDialog',
      setParams: 'app/setParams'
    }),

    editLibraryHandler () {
      this.setParams(this.library)
      this.showDialog('EditLibrary')
    }
  }
}
</script>

<style lang="scss">

.library-card {
  background: #3e3e3d;
  position: relative;
  padding: 15px;
  width: 330px;
  border-radius: 5px;
  box-shadow: 0px 0px 20px 0px black;

  &__edit {
    position: absolute;
    top: -14px;
    z-index: 1;
    left: -14px;
    background-color: #e1a73b;
    height: 28px;
    width: 28px;
    padding: 5px 0;
    text-align: center;
    display: block;
    border-radius: 20px;
    color: black;
  }

  &__img {
    display: block;
    width: 300px;
    height: 300px;
    margin: 0 auto;
    filter: brightness(80%);
  }

  &__info {
    position: absolute;
    z-index: 20;
    bottom: 0;
    width: 100%;
    padding: 5px 10px;
    h6 {
      text-shadow: black 1px 0 10px;
    }
  }

}

</style>

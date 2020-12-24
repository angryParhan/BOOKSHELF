<template>
  <section :style="{ '--size': size }" @mouseover="hover = true" @mouseleave="hover = false" class="library-card">

    <span v-if="tools && hover" @click="libraryHandler" class="library-card__edit">
      <span v-if="library.creator"><font-awesome-icon icon="pen" /></span>
      <span v-else-if="!library.my"><font-awesome-icon icon="plus" /></span>
      <span v-else><font-awesome-icon icon="trash" /></span>
    </span>

    <img class="library-card__img" src="https://asllinea.org/wp-content/uploads/2014/03/BookPileXXXIEdit.jpg"/>

    <div v-if="info" class="library-card__info">
      <p>
        <span class="library-card__info-title" @click="goToLibrary">{{ library.title }}</span>
        <span v-if="(library.user||{}).username" class="library-card__info-author"><br/> by {{ library.user.username }}</span>
      </p>
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
    },
    size: {
      type: String,
      default: '300px'
    },
    tools: {
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
      setParams: 'app/setParams',
      addLibrary: 'library/addLibrary',
      removeLibrary: 'library/removeLibrary'
    }),

    goToLibrary () {
      this.$router.push({
        path: '/library',
        query: {
          id: this.library.id
        }
      })
    },

    libraryHandler () {
      if (this.library.creator) {
        this.setParams(this.library)
        this.showDialog('EditLibrary')
      } else if (this.library.my) {
        this.library.my = false
        this.removeLibrary(this.library)
      } else {
        this.library.my = true
        this.addLibrary(this.library)
      }
    }
  }
}
</script>

<style lang="scss">
$size: var(--size);

.library-card {
  background: #3e3e3d;
  position: relative;
  padding: 15px;
  width: calc(var(--size) + 30px);
  border-radius: 5px;
  box-shadow: 0px 0px 20px 0px black;

  &__edit {
    position: absolute;
    top: -20px;
    z-index: 1;
    left: -20px;
    background-color: #e1a73b;
    height: 38px;
    width: 38px;
    padding: 10px 0;
    text-align: center;
    display: block;
    border-radius: 20px;
    color: black;
  }

  &__img {
    display: block;
    width: $size;
    height: $size;
    margin: 0 auto;
    filter: brightness(80%);
  }

  &__info {
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 25px 8px 25px;
    &-title {
      cursor: pointer;
      margin-top: 0;
      font-size: 20px;
      font-weight: bold;
      text-shadow: black 1px 0 10px;
      &:hover {
        text-decoration: underline;
      }
    }
    &-author {
      cursor: pointer;
      margin-top: 0;
      font-size: 15px;
      font-weight: normal;
      text-shadow: black 1px 0 10px;
    }
  }

}

</style>

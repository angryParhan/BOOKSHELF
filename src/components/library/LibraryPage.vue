<template>
  <section class="library-page">

    <header @mouseover="editBtn = true" @mouseleave="editBtn = false" class="library-page__header">

      <div class="library-page__header-card">
        <libraryCard
            :library="library"
            tools
        />
      </div>

      <div class="library-page__header__info">
        <h2 class="library-page__header__info-title">{{ library.title }}</h2>
        <h3 class="library-page__header__info-description">{{ library.description }}</h3>
      </div>
      <div v-if="library.my" class="library-page__header__remove">
        <span @click="removeLibraryHandler">DELETE</span>
      </div>
    </header>


    <div class="library-page__books">
      <template v-if="books.length">
        <div class="library-page__book">
          <bookCart
              v-for="book of books"
              :book="book"
              :key="book.title"
              :remove="library.creator"
          />
        </div>
      </template>


      <UiKitStub
          v-else
          description="There is no books in library."
      />
    </div>


  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import bookCart from '@/components/dashboard/bookCart'
import libraryCard from './libraryCard';

export default {
  name: 'LibraryPage',
  components: {
    bookCart,
    libraryCard
  },
  data () {
    return {
      editBtn: false
    }
  },
  computed: {
    ...mapGetters({
      library: 'library/libraryCard/getData',
      books: 'library/libraryCard/getBooks'
    })
  },
  methods: {
    ...mapActions({
      showDialog: 'app/showDialog',
      setParams: 'app/setParams',
      removeLibrary: 'library/removeLibrary'
    }),

    removeLibraryHandler () {
      this.removeLibrary(this.library)
      this.$router.push({ name: 'dashboard' })
    },

    editLibraryHandler () {
      this.setParams(this.library)
      this.showDialog('EditLibrary')
    }
  }
}
</script>

<style lang="scss">
.library-page {
  display: flex;
  align-items: flex-start;

  &__header {
    position: sticky;
    top: 70px;
    width: 30%;
    padding-top: 20px;
    padding-left: 20px;

    &__info {
      width: 100%;
      margin-top: 20px;
      padding: 5px 20px;
      overflow: hidden;
      border-radius: 10px;
      text-align: center;

      &-description {
        font-weight: 400;
      }
    }

    &__remove {
      margin: 0 auto;
      padding: 20px 20px;
      overflow: hidden;
      border-radius: 10px;
      text-align: center;
      span {
        font-weight: bold;
        display: inline-block;
        padding: 5px 25px;
        background: #d65454;
        border-radius: 25px;
        box-shadow: 0px 0px 5px 0px black;
        &:hover {
          box-shadow: 0px 0px 20px 0px black;
        }
      }
    }

    &-card {
      width: 100%;
      section {
        margin: 0 auto;
      }
    }
  }


  &__books {
    width: 70%;
  }
  &__book {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    padding-top: 0px;
  }
}

@media all and (max-width: 1450px) {
  .library-page {
    display: block;

    &__header {
      position: relative;
      width: 100%;
      top: 0;
    }

    &__books {
      width: 100%;
    }
  }

}

</style>

<template>
  <section class="search-book-toolbar">
    <UiKitInput
        v-model="searchValue"
        class="search-book-toolbar__input"
        placeholder="Search value"
        :error="error"
        @keyup.enter="searchBook"
    />
    <UiKitBtn
        class="search-book-toolbar__btn"
        text="Search"
        @click="searchBook"
    />
  </section>

</template>

<script>
  export default {
    name: "searchBookToolbar",
    data () {
      return  {
        searchValue: '',
        error: ''
      }
    },
    methods: {
      validateInput () {
        if (!this.searchValue.trim().length) {
          this.error = 'Search value is empty'
          setTimeout(() => {
            this.error = ''
          }, 2000)
          return false
        }
        return true
      },
      searchBook () {
        if (this.validateInput()) {
          this.$emit('search-book', {value: this.searchValue.trim(), initial: true})
        }
      }
    }
  }
</script>

<style lang="scss">
  .search-book-toolbar {
    height: 200px;
    display: flex;
    align-items: center;
    max-width: 1180px;
    margin: 0 auto;
    justify-content: space-around;
    position: relative;

    &__input {
      max-width: unset!important;
      width: 100%;

      input {
        padding-right: 260px !important;
      }
    }

    &__btn {
      position: absolute;
      right: 0;
      height: 48px;
      min-height: unset !important;
      border-radius: 0 40px 40px 0 !important;

    }

  }


  @media all and (max-width: 600px) {
    .search-book-toolbar {
      &__btn {
        width: 30% !important;
      }

      &__input {
        input {
          padding-right: 31% !important;
        }
      }
    }
  }

</style>

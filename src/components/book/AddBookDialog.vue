<template>
  <section>
    <UiKitDialog
        v-model="app.activeDialog"
        :fullscreen="$breakpoint.xsOnly"
    >
      <div class="add-book-dialog">
        <div class="add-book-dialog__title">
          <p>Choose library</p>
        </div>
        <section class="add-book-dialog__section">
          <AddBook @result="handleAddResult"/>
        </section>
      </div>
    </UiKitDialog>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddBook from '@/components/book/AddBook';

export default {
  name: 'AddBookDialog',
  components: {
    AddBook
  },
  computed: {
    ...mapState({
      app: 'app'
    })
  },
  methods: {
    ...mapActions({
      hideDialog: 'app/hideDialog'
    }),
    handleAddResult (result) {
      if (result === 'success') {
        this.hideDialog()
      }
    }
  }
}
</script>

<style lang="scss">
.add-book-dialog {
  width: 400px;
  @media all and (max-width: 600px) {
    width: 100%;
  }

  background: #272727;
  color: #ffe8bd;

  &__title {
    display: flex;
    justify-content: center;
    position: relative;
    p {
      width: 50%;
      text-align: center;
      font-size: 24px;
      cursor: pointer;
      user-select: none;
      margin-bottom: 0;
    }

  }

  &__section {
    max-height: 300px;
    overflow-y: auto;
    margin: 15px 20px 25px 20px;
  }

  &__btn {
    display: flex;
    justify-content: center;
    margin-top: 55px;
    margin-bottom: 40px;
  }
}

.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.3s;
  max-height: 600px;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  max-height: 200px;
  opacity: 0;
}

</style>

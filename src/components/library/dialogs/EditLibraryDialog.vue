<template>
  <section>
    <UiKitDialog
        v-model="app.activeDialog"
        :fullscreen="$breakpoint.xsOnly"
    >
      <div class="edit-library-dialog">
        <div class="edit-library-dialog__title">
          <p>Edit '{{ library.title }}' library</p>
        </div>
        <section class="edit-library-dialog__section">
          <EditLibrary @result="handleCreateResult"/>
        </section>

        <div class="edit-library-dialog__btn">
          <UiKitBtn text="Edit" style="width: 200px" :loading="loading" @click="createHandler"/>
        </div>

      </div>
    </UiKitDialog>
  </section>
</template>

<script>
import EditLibrary from './EditLibrary'
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'EditLibraryDialog',
  components: {
    EditLibrary
  },
  data() {
    return {
      activeDialog: true,
      activeTab: 'sign-in',
      loading: false,
      errorDialog: false
    }
  },
  computed: {
    ...mapState({
      app: 'app'
    }),
    ...mapGetters({
      library: 'app/getParams'
    })
  },
  methods: {
    ...mapActions({
      hideDialog: 'app/hideDialog'
    }),
    createHandler () {
      this.loading = true
      this.$root.$emit('edit-library')
    },
    handleCreateResult (result) {
      if (result === 'validation-error') {
        this.loading = false
      } else if (result === 'api-error') {
        this.errorDialog = true
        this.loading = false
      } else if (result === 'success') {
        this.loading = false
        this.hideDialog()
      }
    }
  }
}
</script>

<style lang="scss">
.edit-library-dialog {
  width: 500px;

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
      padding: 20px 0 0 0;
      user-select: none;
      margin-bottom: 0;
    }

  }

  &__tabs {
    padding-top: 30px;
    @media all and (max-width: 600px) {
      padding-top: 45px;
    }

    display: flex;
    justify-content: center;

    &-disable {
      pointer-events: none;

    }

    &-wrapper {
      display: flex;
      justify-content: center;
      position: relative;
      width: 400px;

      &.slide-left:after {
        left: 0;
        transition: left 0.2s linear;
      }

      &.slide-right:after {
        left: 50%;
        transition: left 0.2s linear;
      }
      &.slide-center:after {
        left: 50%;
        transform: translate(-50%, 0);
        transition: left 0.2s linear;
      }


      &:after {
        content: '';
        display: block;
        width: 50%;
        height: 1px;
        background: #e1a73b;
        bottom: 0;
        position: absolute;
        left: 0;
      }
    }

    .tabs-item {
      width: 50%;
      text-align: center;
      cursor: pointer;
      padding: 20px 0;
      user-select: none;
      margin-bottom: 0;
      background: rgba(0, 0, 0, 0.1);


      &-active {
        background: rgba(0, 0, 0, 0.2);
      }
    }

  }

  &__section {
    margin-top: 55px;
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

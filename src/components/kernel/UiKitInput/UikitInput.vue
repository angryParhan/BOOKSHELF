<template>
  <section
      class="UiKit-input"
      :class="customClass"
      :style="{'border-color': error !== '' && error !== false ? '#FB6868' : '#e1a73b'}"
  >
    <input
        :value="value"
        v-bind="$attrs"
        id="uiKitInput"
        autocomplete="off"
        @input="updateInput"
        @focus="onFocus"
        @blur="onBlur"
        @keyup="onKeyup"
    >
    <label
        for="uiKitInput"
        :class="{'UiKit-input-active' : value.length}"
    >
      {{ placeholder }}
    </label>
    <span
        class="UiKit-input__error"
        v-show="typeof error !== 'boolean'"
    >
      {{ error }}
    </span>
  </section>

</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      customClass: {
        type: String,
        default: ' '
      },
      error: {
        type: [String, Boolean],
        default: ''
      }
    },
    data() {
      return {
      }
    },
    methods: {
      updateInput (e) {
        this.$emit('input', e.target.value)
      },
      onFocus(e) {
        this.$emit('focus', e)
      },
      onBlur(e) {
        this.$emit('blur', e)
      },
      onKeyup(e) {
        this.$emit('keyup', e)
      },
    }

  }
</script>

<style lang="scss">
  .UiKit-input {
    max-width: 300px;
    max-height: 80px;
    padding: 0.4rem 0.25rem 0.5rem 0.25rem;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 30px #000000;
    border: 2px solid #e1a73b;
    border-radius: 40px;
    outline: none;
    position: relative;
    font-family: 'Quicksand', sans-serif;
    font-size: 19px;
    text-align: center;
    color: #ffe8bd;

    &-active {
      top: -17px !important;
      color: #e1a73b !important;
    }

    &:focus-within {
      box-shadow: #e1a73b;
    }

    input {
      width: 100%;
      height: 100%;
      border: none;
      background: transparent;
      color: aliceblue;
      outline: none;
      padding: 3px 13px;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-transition-delay: 99999s;
      transition-delay: 99999s;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-animation: autofill 0s forwards;
      animation: autofill 0s forwards;
    }


    input:focus + label {
      top: -17px;
      color: #e1a73b;
      transition: all 0.3s;
    }

    label {
      position: absolute;
      color: azure;
      width: fit-content;
      top: 50%;
      transform: translateY(-50%);
      left: 12px;
      pointer-events: none;
      transition: all 0.3s;
    }

    &__error {
      color: #FB6868;
      position: absolute;
      bottom: -25px;
      left: 14px;
      font-size: 13px;
      width: fit-content;
    }
  }


</style>

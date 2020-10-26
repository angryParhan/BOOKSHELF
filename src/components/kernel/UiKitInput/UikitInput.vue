<template>
  <section class="UiKit-input" :class="customClass">
    <input v-model="localInputValue" :type="type" :maxlength="maxlength" id="uiKitInput" @focus="$emit('focus', $event)" @blur="$emit('blur', $event)">
    <label for="uiKitInput" :class="{'UiKit-input-active' : localInputValue.length}">{{ placeholder }}</label>
  </section>

</template>

<script>
  export default {
    model: {
      prop: 'inputValue',
      event: 'change'
    },
    props: {
      inputValue: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      maxlength: {
        type: Number,
        default: 500
      },
      placeholder: {
        type: String,
        default: ''
      },
      customClass: {
        type: String,
        default: ' '
      }
    },
    data() {
      return {
        localInputValue: this.inputValue
      }
    },
    watch: {
      localInputValue (nv) {
        this.$emit('change', nv)
      }
    }

  }
</script>

<style lang="scss">
  .UiKit-input {
    /*max-width: 300px;*/
    width: 60%;
    max-height: 80px;
    padding: 0.4rem 0.25rem 0.5rem 0.25rem;
    margin-top: 40px;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 30px #000000;
    border: 3px solid #e1a73b;
    border-radius: 40px;
    outline: none;
    position: relative;
    font-family: 'Quicksand', sans-serif;
    font-size: 19px;
    text-align: center;
    color: #ffe8bd;

    &-active {
      top: -13px !important;
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

    input:focus + label {
      top: -13px;
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
  }

</style>

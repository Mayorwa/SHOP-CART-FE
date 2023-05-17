<template>
  <div class="input_wrap items-center">
    <input
      class="field__input"
      :type="isVisible ? 'text' : 'password'"
      v-bind="$attrs"
      v-model="value"
      :placeholder="placeholder"
      :readonly="readonly"
    />
    <div class="password-icon mr-3" @click="toggleVisibility">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        class="icon"
        v-if="isVisible"
      >
        <use xlink:href="/sprite.svg#icon-eye-off"></use>
      </svg>
      <svg width="20px" height="20px" viewBox="0 0 24 24" class="icon" v-else>
        <use xlink:href="/sprite.svg#icon-eye"></use>
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PasswordInput',
  props: {
    /**
     * input placeholder
     */
    placeholder: String,
    /**
     * ClassNames for input
     */
    inputClasses: {
      type: String,
      default: '',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '',
      isVisible: false,
    }
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },
  },
}
</script>
<style scoped>
.password-icon {
  cursor: pointer;
}
</style>

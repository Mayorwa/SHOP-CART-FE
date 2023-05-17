<template>
  <input
    :class="`field__input ${inputClasses}`"
    :type="type"
    v-bind="$attrs"
    v-model="value"
    :placeholder="placeholder"
    :readonly="readonly"
  />
</template>
<script>
import { defineComponent, onMounted, ref, watch } from 'vue'
export default defineComponent({
  name: 'TextInput',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: value =>
        ['text', 'email', 'password', 'url', 'number', 'date'].includes(value),
    },
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
    preValue: {
      type: [String, Number],
      default: 0 || '',
    },
  },
  setup(props) {
    const value = ref('')

    onMounted(() => {
      value.value = props.preValue
    })

    watch(
      () => props.preValue,
      newValue => {
        value.value = newValue
      }
    )

    return { value }
  },
})
</script>

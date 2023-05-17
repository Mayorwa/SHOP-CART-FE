<template>
  <transition name="fade" mode="out-in">
    <div
      v-if="showModal"
      class="modal_wrapper"
      @click="$emit('triggerShowModal', !showModal)"
    ></div>
  </transition>
  <transition name="slide-up" mode="out-in">
    <div v-if="showModal" class="modal_body" :class="classList">
      <div class="d-flex w-100">
        <slot name="header" />
        <div class="modal-icon" @click="$emit('triggerShowModal', false)">
          <svg width="24px" height="24px" viewBox="0 0 24 24" class="icon">
            <use xlink:href="/sprite.svg#icon-close"></use>
          </svg>
        </div>
      </div>
      <slot name="body" />
      <slot name="footer" />
    </div>
  </transition>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Modal-UI',
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    classList: {
      type: String,
      required: true,
    },
  },
  emits: ['triggerShowModal'],
})
</script>

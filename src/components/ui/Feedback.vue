<template>
  <div class="rounded-xl p-4 mb-4" :class="getClassNameWithType()[0]">
    <div class="flex items-center">
      <div
        class="shrink-0"
        :class="getClassNameWithType()[1]"
        v-show="showIcon"
      >
        <Icon
          name="success"
          width="24px"
          height="24px"
          v-if="type === 'success'"
        />
        <Icon name="error" width="24px" height="24px" v-else />
      </div>
      <div class="ms-3">
        <p class="text-sm font-medium" :class="getClassNameWithType()[1]">
          <slot></slot>
        </p>
      </div>
      <div class="ml-auto pl-3" v-if="cancelButton">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            :class="getClassNameWithType()"
          >
            <span class="sr-only">Dismiss</span>
            <svg class="icon" width="24px" height="24px" viewBox="0 0 24 24">
              <use xlink:href="/sprite.svg#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import Icon from '@/components/ui/Icon.vue'
export default defineComponent({
  name: 'FeedBack',
  components: { Icon },
  props: {
    type: {
      type: String,
      default: 'success',
      validator: value =>
        ['success', 'info', 'error', 'warning'].indexOf(value) !== -1,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    cancelButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const getClassNameWithType = () => {
      const { type } = props
      if (type === 'success') {
        return ['bg-success-60', 'text-success-10']
      } else if (type === 'error') {
        return ['bg-failed-50', 'text-failed-60']
      } else {
        return ['bg-primary-50', 'text-primary-50']
      }
    }
    return { getClassNameWithType }
  },
})
</script>

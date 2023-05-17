<template>
  <div class="d-flex justify-content-between border-top py-4">
    <p>Page {{ currentPage }} of {{ pageCount }}</p>
    <div class="d-flex">
      <Button
        :variant="'outline-black'"
        @click="switchPage('decr')"
        :disabled="currentPage <= 1"
        btn-class="fw-semibold me-2 py-2 px-3"
      >
        <Icon name="arrow-left" width="18px" height="18px" />
        <span class="ms-3">Previous</span>
      </Button>
      <Button
        :variant="'outline-black'"
        @click="switchPage('incr')"
        :disabled="currentPage >= pageCount"
        btn-class="fw-semibold ms-2 py-2 px-3"
      >
        <span class="me-3">Next</span>
        <Icon name="arrow-right" width="18px" height="18px" />
      </Button>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
export default defineComponent({
  name: 'TablePagination',
  components: { Button, Icon },
  emits: ['switchPage'],
  props: {
    pageCount: {
      default: 10,
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const switchPage = type => {
      if (type === 'incr') {
        emit('switchPage', props.currentPage + 1)
      } else {
        emit('switchPage', props.currentPage - 1)
      }
    }

    return { switchPage }
  },
})
</script>

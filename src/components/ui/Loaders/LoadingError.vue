<template>
  <section class="text-center" style="padding-top: 20vh">
    <h1 class="text-danger mb-10">
      <Icon name="signal" width="50px" height="50px" />
    </h1>
    <h4 class="text-danger">{{ textDisplay }}</h4>
    <p>Reloading the page most times fixes this.</p>

    <Button
      class="mt-10"
      v-if="showLogout"
      :loading="false"
      :inactive="false"
      variant="primary"
      size="md"
      @click="$router.push('/logout')"
    >
      <Icon name="logout" width="16px" height="16px" />
      <span class="ms-3">Log Out </span>
    </Button>
  </section>
</template>
<script>
import { defineComponent } from 'vue'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
export default defineComponent({
  name: 'LoadingError',
  props: {
    showLogout: {
      type: Boolean,
      default: false,
    },
    textDisplay: {
      type: String,
    },
  },
  components: { Button, Icon },
})
</script>

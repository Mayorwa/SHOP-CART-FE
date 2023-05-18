<template>
  <div class="page-404">
    <h1 class="text-5xl mb-3">4 0h 4</h1>
    <Button
      :loading="false"
      :inactive="false"
      :variant="'primary'"
      :size="'md'"
      type="submit"
      name="nextButton"
      @click="$router.push('/products')"
    >
      <span>Go Back Home </span>
    </Button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Button from '@/components/ui/Button'
export default defineComponent({
  name: '404Page',
  components: { Button },
})
</script>

<style scoped>
.page-404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>

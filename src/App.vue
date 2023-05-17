<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>
<script>
import EmptyLayout from '@/components/layouts/empty.vue'
import AuthLayout from '@/components/layouts/auth.vue'
import DashboardLayout from '@/components/layouts/dashboard.vue'
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()

    const layoutComponent = computed(() => {
      let currentLayout
      const routeLayout = route.meta.layout?.toLowerCase()
      switch (routeLayout) {
        case 'auth':
          currentLayout = AuthLayout
          break
        case 'empty':
          currentLayout = EmptyLayout
          break
        case 'dashboard':
          currentLayout = DashboardLayout
          break
        default:
          currentLayout = EmptyLayout
      }
      return currentLayout
    })

    return { layoutComponent }
  },
})
</script>

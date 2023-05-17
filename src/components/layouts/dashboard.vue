<template>
  <Loader v-if="loading" />
  <loading-error
    v-if="loadingError"
    text-display="There was error loading your account"
    :show-logout="true"
  />
  <template v-if="!loading && !loadingError">
    <main class="h-full">
      <div class="flex flex-col flex-1 app-root pb-20">
        <Header></Header>
        <div class="flex flex-col container mx-auto py-10">
          <slot />
        </div>
      </div>
    </main>
  </template>
</template>
<script>
import Header from '@/components/dashboard/Header'
import Loader from '@/components/ui/Loaders/Loader'
import { computed, defineComponent, onMounted } from 'vue'
import { useAuth } from '@/store/auth/useAuth'
import LoadingError from '@/components/ui/Loaders/LoadingError'
export default defineComponent({
  name: 'DashboardLayout',
  components: {
    LoadingError,
    Header,
    Loader,
  },
  setup() {
    const auth = useAuth()

    const loading = computed(() => {
      return auth.isUserLoading
    })

    const loadingError = computed(() => {
      return auth.isUserError
    })

    onMounted(() => {
      auth.handleGetLoggedInUser()
    })

    return { loading, loadingError }
  },
})
</script>

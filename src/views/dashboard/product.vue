<template>
  <Loader v-if="loading" />
  <div v-else class="container mx-auto">
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/2">
        <img
          class="w-full h-auto object-contain"
          src="product-image.jpg"
          alt="Product Image"
        />
      </div>
      <div class="md:w-1/2 px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">{{ productDetail.title }}</h1>
        <p class="text-gray-700 mb-4">{{ productDetail.description }}</p>
        <p class="text-gray-900 font-bold mb-4">
          {{ formatAmount(productDetail.price) }}
        </p>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <Notification
    :showIcon="notification.show_icon"
    :show="notification.show"
    :message="notification.message"
    :type="notification.type"
    v-on:close-notification="!notification.show"
  />
</template>
<script>
import { formatNumber } from '@/utils/helpers/index'
import { useProduct } from '@/store/product/useProduct'
import Notification from '@/components/ui/Notification.vue'
import { defineComponent, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
export default defineComponent({
  name: 'SingleProductPage',
  components: { Notification },
  setup() {
    const product = useProduct()
    const loading = ref(false)

    const productDetail = ref()
    const formatAmount = amount => {
      return `${formatNumber(amount, true)}`
    }

    const route = useRoute()

    const notification = reactive({
      show: false,
      message: '',
      type: 'success',
      show_icon: true,
    })

    onMounted(() => {
      getProductDetail()
    })

    const getProductDetail = () => {
      loading.value = true
      product
        .handleGetSingleProduct(route.params.id)
        .then(response => {
          productDetail.value = response
          console.log('response', response)
        })
        .catch(() => {
          activateNotification(
            'error',
            'There was an error getting product detail'
          )
        })
        .finally(() => {
          loading.value = false
        })
    }

    const activateNotification = (
      notificationType,
      notificationMessage,
      showNotification = true,
      showIcon = true
    ) => {
      notification.type = notificationType
      notification.message = notificationMessage
      notification.show = showNotification
      notification.show_icon = showIcon
      removeNotificationAfterFewSeconds()
    }

    const removeNotificationAfterFewSeconds = () => {
      setTimeout(() => {
        notification.show = false
        notification.message = ''
      }, 3500)
    }
    return {
      loading,
      notification,
      productDetail,
      activateNotification,
      formatAmount,
      removeNotificationAfterFewSeconds,
    }
  },
})
</script>

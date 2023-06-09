<template>
  <Loader v-if="loading" />
  <div v-else class="container mx-auto">
    <div class="flex flex-col md:flex-row">
      <div class="md:w-1/3">
        <img
          class="w-full h-80 object-contain"
          :src="productDetail.image"
          alt="Product Image"
        />
      </div>
      <div class="md:w-2/3 px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">{{ productDetail.title }}</h1>
        <p class="text-gray-700 mb-4">{{ productDetail.description }}</p>
        <p class="text-gray-900 font-bold mb-4">
          {{ formatAmount(productDetail.price) }}
        </p>
        <Button
          :loading="addCartLoading"
          :inactive="false"
          variant="primary"
          @click="addProductToCart(productDetail.id)"
        >
          <span class="my-2">Add to Cart</span></Button
        >
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
import { useCart } from '@/store/cart/useCart'
import Notification from '@/components/ui/Notification.vue'
import { defineComponent, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import Button from '@/components/ui/Button.vue'
export default defineComponent({
  name: 'SingleProductPage',
  components: { Notification, Button },
  setup() {
    const cart = useCart()
    const product = useProduct()
    const loading = ref(true)
    const addCartLoading = ref(false)

    const addProductToCart = productId => {
      addCartLoading.value = true

      cart
        .handleAddProductToCart(productId)
        .then(() => {
          activateNotification('success', 'Item Added to Cart')
        })
        .catch(() => {
          activateNotification(
            'error',
            'There was an error getting all products'
          )
        })
        .finally(() => {
          addCartLoading.value = false
        })
    }

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
      addCartLoading,
      notification,
      productDetail,
      addProductToCart,
      activateNotification,
      formatAmount,
      removeNotificationAfterFewSeconds,
    }
  },
})
</script>

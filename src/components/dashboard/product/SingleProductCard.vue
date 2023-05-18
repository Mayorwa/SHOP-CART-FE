<template>
  <div class="rounded overflow-hidden shadow-lg bg-white">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ productDetails.title }}</div>
      <p class="text-gray-700 text-base">{{ productDetails.description }}</p>
      <p class="text-gray-900 font-bold mt-2">
        {{ formatTransactionAmount(productDetails.price) }}
      </p>
    </div>
    <div>
      <div class="px-6 py-4 flex items-center justify-between">
        <Button
          :loading="addCartLoading"
          :inactive="false"
          variant="primary"
          @click="addProductToCart(productDetails.id)"
        >
          <span class="my-2">Add to Cart</span></Button
        >
        <Button
          :loading="false"
          :inactive="false"
          variant="primary"
          @click="$router.push(`/product/${productDetails.id}`)"
        >
          <span class="my-2">View Product</span></Button
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
import { defineComponent, reactive, ref } from 'vue'
import { useCart } from '@/store/cart/useCart'
import Notification from '@/components/ui/Notification.vue'
import Button from '@/components/ui/Button.vue'
import { formatNumber } from '@/utils/helpers'
export default defineComponent({
  name: 'SingleProductCard',
  components: { Button, Notification },
  props: {
    productDetails: [Object],
  },
  setup() {
    const cart = useCart()
    const addCartLoading = ref(false)
    const notification = reactive({
      show: false,
      message: '',
      type: 'success',
      show_icon: true,
    })

    const addProductToCart = productId => {
      addCartLoading.value = true
      cart
        .handleAddProductToCart(productId)
        .then(() => {
          console.log('in here')
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

    const formatTransactionAmount = amount => {
      return `${formatNumber(amount, true)}`
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
      addProductToCart,
      addCartLoading,
      notification,
      formatTransactionAmount,
      activateNotification,
      removeNotificationAfterFewSeconds,
    }
  },
})
</script>

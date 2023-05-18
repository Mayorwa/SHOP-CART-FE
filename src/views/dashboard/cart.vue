<template>
  <h1 class="text-3xl mb-6">Cart</h1>
  <div v-if="loading"></div>
  <div v-if="cartProducts.length">
    <div class="grid grid-cols-1 gap-4">
      <cart-item-card
        v-for="(item, index) in cartProducts"
        :key="index"
        :itemDetails="item"
      ></cart-item-card>
    </div>
    <Pagination
      :page-count="productsMetaData.last_page"
      :current-page="productsMetaData.current_page"
      @switchPage="switchPage"
    />
  </div>
  <div v-else class="py-4 w-100">
    <EmptyState info="There are currently no result" />
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
import { useCart } from '@/store/cart/useCart'
import Notification from '@/components/ui/Notification.vue'
import Pagination from '@/components/ui/Table/Pagination.vue'
import CartItemCard from '@/components/dashboard/cart/CartItemCard.vue'
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'DashboardIndex',
  components: { Notification, Pagination, CartItemCard },
  setup() {
    const cart = useCart()
    const loading = ref(false)
    const { cartProducts, productsMetaData } = toRefs(cart)

    const notification = reactive({
      show: false,
      message: '',
      type: 'success',
      show_icon: true,
    })

    onMounted(() => {
      getCartProducts()
    })

    const removeNotificationAfterFewSeconds = () => {
      setTimeout(() => {
        notification.show = false
        notification.message = ''
      }, 3500)
    }

    const getCartProducts = () => {
      loading.value = true
      cart
        .handleGetAllCartProducts()
        .catch(() => {
          activateNotification(
            'error',
            'There was an error getting all products'
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

    return {
      loading,
      cartProducts,
      productsMetaData,
      notification,
      activateNotification,
      removeNotificationAfterFewSeconds,
    }
  },
})
</script>

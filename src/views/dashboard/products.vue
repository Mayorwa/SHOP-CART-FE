<template>
  <h1 class="text-3xl mb-6">Products</h1>
  <Loader v-if="loading" />
  <div v-else>
    <div v-if="products.length">
      <div class="grid grid-cols-3 gap-4">
        <div
          class="rounded overflow-hidden shadow-lg bg-white"
          v-for="(product, index) in products"
          :key="index"
        >
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">{{ product.title }}</div>
            <p class="text-gray-700 text-base">{{ product.description }}</p>
            <p class="text-gray-900 font-bold mt-2">
              {{ formatTransactionAmount(product.price) }}
            </p>
          </div>
          <div>
            <div class="px-6 py-4 flex items-center justify-between">
              <Button
                :loading="loading"
                :inactive="false"
                variant="primary"
                @click="addProductToCart(product.id)"
              >
                <span class="my-2">Add to Cart</span></Button
              >
              <Button
                :loading="false"
                :inactive="false"
                variant="primary"
                @click="$router.push(`/product/${product.id}`)"
              >
                <span class="my-2">View Product</span></Button
              >
            </div>
          </div>
        </div>
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
import { useProduct } from '@/store/product/useProduct'
import { useCart } from '@/store/cart/useCart'
import { formatNumber } from '@/utils/helpers/index'
import Notification from '@/components/ui/Notification.vue'
import Pagination from '@/components/ui/Table/Pagination.vue'
import Button from '@/components/ui/Button.vue'
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'ProductsPage',
  components: { Notification, Pagination, Button },
  setup() {
    const product = useProduct()
    const cart = useCart()
    const loading = ref(false)
    const addCartLoading = ref(false)
    const { products, productsMetaData } = toRefs(product)

    const notification = reactive({
      show: false,
      message: '',
      type: 'success',
      show_icon: true,
    })

    onMounted(() => {
      getProducts()
    })

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

    const formatTransactionAmount = amount => {
      return `${formatNumber(amount, true)}`
    }

    const removeNotificationAfterFewSeconds = () => {
      setTimeout(() => {
        notification.show = false
        notification.message = ''
      }, 3500)
    }

    const getProducts = () => {
      loading.value = true
      product
        .handleGetAllProducts()
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
      products,
      addProductToCart,
      productsMetaData,
      notification,
      activateNotification,
      formatTransactionAmount,
      removeNotificationAfterFewSeconds,
    }
  },
})
</script>

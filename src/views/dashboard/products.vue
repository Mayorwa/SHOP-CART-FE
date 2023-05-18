<template>
  <h1 class="text-3xl mb-6">Products</h1>
  <Loader v-if="loading" />
  <div v-else>
    <div v-if="products.length">
      <div class="grid grid-cols-3 gap-4">
        <single-product-card
          v-for="(product, index) in products"
          :key="index"
          :productDetails="product"
        />
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
import Notification from '@/components/ui/Notification.vue'
import Pagination from '@/components/ui/Table/Pagination.vue'
import SingleProductCard from '@/components/dashboard/product/SingleProductCard.vue'
import { defineComponent, ref, reactive, onMounted, toRefs } from 'vue'
export default defineComponent({
  name: 'ProductsPage',
  components: { Notification, Pagination, SingleProductCard },
  setup() {
    const product = useProduct()
    const loading = ref(false)
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
      loading,
      productsMetaData,
      notification,
      activateNotification,
      removeNotificationAfterFewSeconds,
    }
  },
})
</script>

<template>
  <div class="rounded overflow-hidden shadow-lg bg-white">
    <div class="flex flex-col md:flex-row justify-between">
      <div class="md:w-1/5">
        <img
          class="h-64 object-contain"
          :src="itemDetails.product.image"
          alt="Product Image"
        />
      </div>
      <div class="md:w-4/5 px-6 py-4">
        <div class="font-bold text-xl mb-2">
          {{ itemDetails.product.title }}
        </div>
        <p class="text-gray-700 text-base">
          quantity: {{ itemDetails.quantity }}
        </p>
        <p class="text-gray-900 font-bold mt-2">
          {{ formatTransactionAmount(itemDetails.product.price) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { formatNumber } from '@/utils/helpers/index'

export default defineComponent({
  name: 'CartItemCard',
  props: {
    itemDetails: [Object],
  },
  setup() {
    const formatTransactionAmount = amount => {
      return `${formatNumber(amount, true)}`
    }

    return { formatTransactionAmount }
  },
})
</script>

import { defineStore } from 'pinia'
import { addProductToCart, getAllProducts } from '@/services/cart'
import { formatError } from '@/utils/helpers/errors.helper'

export const useCart = defineStore({
  id: 'cart',
  state: () => ({
    cartProducts: [],
    productsMetaData: {},
  }),
  actions: {
    handleAddProductToCart(productId) {
      return new Promise((resolve, reject) => {
        addProductToCart({ product_id: productId })
          .then(response => {
            const { data } = response.data
            resolve(data)
          })
          .catch(error => {
            reject(formatError(error))
          })
      })
    },
    handleGetAllCartProducts() {
      return new Promise((resolve, reject) => {
        getAllProducts()
          .then(response => {
            const { data } = response.data
            this.cartProducts = data.data
            this.productsMetaData = data.meta
            resolve(data)
          })
          .catch(error => {
            reject(formatError(error))
          })
      })
    },
  },
})

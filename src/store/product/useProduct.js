import { defineStore } from 'pinia'
import {
  createProduct,
  getAllProducts,
  getOneProduct,
} from '@/services/product'
import { formatError } from '@/utils/helpers/errors.helper'

export const useProduct = defineStore({
  id: 'product',
  state: () => ({
    products: [],
    productsMetaData: {},
  }),
  actions: {
    handleCreateProduct(payload) {
      return new Promise((resolve, reject) => {
        createProduct(payload)
          .then(response => {
            const { data } = response.data
            resolve(data)
          })
          .catch(error => {
            reject(formatError(error))
          })
      })
    },
    handleGetAllProducts() {
      return new Promise((resolve, reject) => {
        getAllProducts()
          .then(response => {
            const { data } = response.data
            this.products = data.data
            this.productsMetaData = data.meta
            resolve(data)
          })
          .catch(error => {
            reject(formatError(error))
          })
      })
    },
    handleGetSingleProduct(productId) {
      return new Promise((resolve, reject) => {
        getOneProduct(productId)
          .then(response => {
            const { data } = response.data
            resolve(data)
          })
          .catch(error => {
            reject(formatError(error))
          })
      })
    },
  },
})

import http from '@//config/axios'

export const productUrls = {
  CREATE_URL: 'products/create',
  GET_ONE_URL: 'products',
  GET_ALL_URL: 'products/get-all',
}

// create a Product
const createProduct = async payload => {
  return await http.post(productUrls.CREATE_URL, payload)
}

// get one product
const getOneProduct = async productId => {
  return await http.get(`${productUrls.GET_ONE_URL}/${productId}`)
}

// get all Products
const getAllProducts = async () => {
  return await http.get(productUrls.GET_ALL_URL)
}

export { createProduct, getAllProducts, getOneProduct }

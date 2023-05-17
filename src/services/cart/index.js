import http from '@//config/axios'

export const cartUrls = {
  ADD_PRODUCT_TO_CART_URL: 'cart/add-product',
  GET_ALL_URL: 'cart/get-all',
}

// add a Product To Cart
const addProductToCart = async payload => {
  return await http.post(cartUrls.ADD_PRODUCT_TO_CART_URL, payload)
}

// get all Products in Cart
const getAllProducts = async () => {
  return await http.get(cartUrls.GET_ALL_URL)
}

export { addProductToCart, getAllProducts }

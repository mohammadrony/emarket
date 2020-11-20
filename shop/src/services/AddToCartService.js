import Api from "./Api"

export default {
    getAllCartProduct(credentials) {
        return Api().get('cart/allProduct', {params: credentials})
    },
    getCartProduct(credentials) {
        return Api().get('cart/product', {params: credentials})
    },
    addToCart(cartProduct) {
        return Api().post('cart/product', cartProduct)
    },
    remove(cartProductId) {
        return Api().delete(`cart/product/${cartProductId}`)
    }
}

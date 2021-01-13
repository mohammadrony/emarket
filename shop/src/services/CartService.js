import Api from "./Api"

export default {
    getAllCartProduct() {
        return Api().get('/cart/allProduct')
    },
    getCartProduct(credentials) {
        return Api().get('/cart/product', {params: credentials})
    },
    addToCart(cartProduct) {
        return Api().post('/cart/product', cartProduct)
    },
    remove(productId) {
        return Api().delete(`/cart/product/${productId}`)
    }
}

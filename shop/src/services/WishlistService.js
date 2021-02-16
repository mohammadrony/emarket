import Api from "./Api"

export default {
    getWishlist() {
        return Api().get('/wishlist/getWishlist')
    },
    getWishlistItem(productId) {
        return Api().get(`/wishlist/getWishlistItem/${productId}`)
    },
    addToWishlist(product) {
        return Api().post('/wishlist/createWishlistItem', product)
    },
    remove(productId) {
        return Api().delete(`/wishlist/deleteWishlistItem/${productId}`)
    }
}

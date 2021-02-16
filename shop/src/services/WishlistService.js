import Api from "./Api"

export default {
    getWishlist() {
        return Api().get('/wishlist/getWishlist')
    },
    getWishlistItem(productId) {
        return Api().get(`/wishlist/getWishlistItem/${productId}`)
    },
    createWishlistItem(credentials) {
        return Api().post('/wishlist/createWishlistItem', credentials)
    },
    removeWishlistItem(productId) {
        return Api().delete(`/wishlist/removeWishlistItem/${productId}`)
    }
}

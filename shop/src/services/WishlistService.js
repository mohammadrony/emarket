import Api from "./Api"

export default {
    getWishlist() {
        return Api().get('/wishlist')
    },
    getWishlistById(productId) {
        return Api().get(`/wishlist/${productId}`)
    },
    addToWishlist(product) {
        return Api().post('/wishlist/add', product)
    },
    remove(productId) {
        return Api().delete(`/wishlist/delete/${productId}`)
    }
}

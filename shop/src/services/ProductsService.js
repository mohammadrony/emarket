import Api from "./Api"

export default {
    getAllProducts() {
        return Api().get('products/getAllProducts')
    },
    getHomeProducts() {
        return Api().get('products/getHomeProducts')
    },
    createProduct(credentials) {
        return Api().post('products/createProduct', credentials)
    },
    updateProduct(credentials) {
        return Api().put('products/updateProduct', credentials)
    },
    deleteProduct(productId) {
        return Api().delete(`products/deleteProduct/${productId}`)
    }
}

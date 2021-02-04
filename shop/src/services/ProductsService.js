import Api from "./Api"

export default {
    getAllProducts() {
        return Api().get('/products/getAllProducts')
    },
    topSellProduct(limit){
        return Api().get(`/products/topSellProduct/${limit}`)
    },
    newAddProduct(limit){
        return Api().get(`/products/newAddProduct/${limit}`)
    },
    getRecommendation({subSubCategoryId, limit}){
        return Api().get(`/products/getRecommendation/${subSubCategoryId}/${limit}`)
    },
    getProductSales(productId) {
        return Api().get(`/products/getProductSales/${productId}`)
    },
    getProduct(productId) {
        return Api().get(`/products/getProduct/${productId}`)
    },
    createProduct(credentials) {
        return Api().post('/products/createProduct', credentials)
    },
    updateProduct(credentials) {
        return Api().put('/products/updateProduct', credentials)
    },
    deleteProduct(productId) {
        return Api().delete(`/products/deleteProduct/${productId}`)
    }
}

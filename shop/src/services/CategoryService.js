import Api from "./Api"

export default {
    getCategoryByName(name) {
        return Api().get(`category/getCategoryByName/:${name}`)
    },
    getCategoryList() {
        return Api().get('category/getCategoryList')
    },
    createCategory(credentials) {
        return Api().post('category/createCategory', credentials)
    },
    updateCategory(credentials) {
        return Api().put('category/updateCategory', credentials)
    },
    deleteCategory(categoryId) {
        return Api().delete(`category/deleteCategory/${categoryId}`)
    }
}

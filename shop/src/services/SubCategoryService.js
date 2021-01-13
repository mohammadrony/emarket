import Api from "./Api"

export default {
    getSubCategoryList() {
        return Api().get('/subCategory/getSubCategoryList')
    },
    getSubCategoryByName(name) {
        return Api().get(`/subCategory/getSubCategoryByName/${name}`)
    },
    createSubCategory(credentials) {
        return Api().post('/subCategory/createSubCategory', credentials)
    },
    updateSubCategory(credentials) {
        return Api().put('/subCategory/updateSubCategory', credentials)
    },
    deleteSubCategory(subCategoryId) {
        return Api().delete(`/subCategory/deleteSubCategory/${subCategoryId}`)
    }
}

import Api from "./Api"

export default {
    getSubSubCategoryList() {
        return Api().get('/subSubCategory/getSubSubCategoryList')
    },
    getSubSubCategoryByName(name) {
        return Api().get(`subSubCategory/getSubSubCategoryByName/${name}`)
    },
    createSubSubCategory(credentials) {
        return Api().post('/subSubCategory/createSubSubCategory', credentials)
    },
    updateSubSubCategory(credentials) {
        return Api().put('/subSubCategory/updateSubSubCategory', credentials)
    },
    deleteSubSubCategory(subSubCategoryId) {
        return Api().delete(`/subSubCategory/deleteSubSubCategory/${subSubCategoryId}`)
    }
}

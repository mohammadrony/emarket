import Api from "./Api"

export default {
    getSubSubCategoryByName(name) {
        return Api().get(`category/getSubSubCategoryByName/:${name}`)
    },
    getSubSubCategoryList() {
        return Api().get('subSubCategory/getSubSubCategoryList')
    },
    createSubSubCategory(credentials) {
        return Api().post('subSubCategory/createSubSubCategory', credentials)
    },
    updateSubSubCategory(credentials) {
        return Api().put('subSubCategory/updateSubSubCategory', credentials)
    },
    deleteSubSubCategory(subSubCategoryId) {
        return Api().delete(`subSubCategory/deleteSubSubCategory/${subSubCategoryId}`)
    }
}

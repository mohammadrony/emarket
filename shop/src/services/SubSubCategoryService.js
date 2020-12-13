import Api from "./Api"

export default {
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

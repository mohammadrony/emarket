import Api from "./Api"

export default {
    getSubCategoryList() {
        return Api().get('subCategory/getSubCategoryList')
    },
    createSubCategory(credentials) {
        return Api().post('subCategory/createSubCategory', credentials)
    },
    updateSubCategory(credentials) {
        return Api().put('subCategory/updateSubCategory', credentials)
    },
    deleteSubCategory(subCategoryId) {
        return Api().delete(`subCategory/deleteSubCategory/${subCategoryId}`)
    }
}

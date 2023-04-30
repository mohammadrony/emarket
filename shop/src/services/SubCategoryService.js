import Api from "./Api";

export default {
  getSubCategoryList() {
    return Api().get("/api/subCategory/getSubCategoryList");
  },
  getSubCategoryByName(name) {
    return Api().get(`/api/subCategory/getSubCategoryByName/${name}`);
  },
  createSubCategory(credentials) {
    return Api().post("/api/subCategory/createSubCategory", credentials);
  },
  updateSubCategory(credentials) {
    return Api().put("/api/subCategory/updateSubCategory", credentials);
  },
  deleteSubCategory(subCategoryId) {
    return Api().delete(`/api/subCategory/deleteSubCategory/${subCategoryId}`);
  },
};

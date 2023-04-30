import Api from "./Api";

export default {
  getSubSubCategoryList() {
    return Api().get("/api/subSubCategory/getSubSubCategoryList");
  },
  getSubSubCategoryByName(name) {
    return Api().get(`/api/subSubCategory/getSubSubCategoryByName/${name}`);
  },
  createSubSubCategory(credentials) {
    return Api().post("/api/subSubCategory/createSubSubCategory", credentials);
  },
  updateSubSubCategory(credentials) {
    return Api().put("/api/subSubCategory/updateSubSubCategory", credentials);
  },
  deleteSubSubCategory(subSubCategoryId) {
    return Api().delete(
      `/api/subSubCategory/deleteSubSubCategory/${subSubCategoryId}`
    );
  },
};

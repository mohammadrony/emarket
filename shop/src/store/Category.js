import CategoryService from "@/services/CategoryService.js";
import SubCategoryService from "@/services/SubCategoryService.js";
import SubSubCategoryService from "@/services/SubSubCategoryService.js";
export const CategoryModule = {
  namespaced: true,
  strict: true,
  state: {
    categoryList: [],
    subCategoryList: [],
    subSubCategoryList: [],
  },
  mutations: {
    SET_CATEGORY_LIST(state, categoryList) {
      state.categoryList = categoryList;
    },
    SET_SUB_CATEGORY_LIST(state, subCategoryList) {
      state.subCategoryList = subCategoryList;
    },
    SET_SUB_SUB_CATEGORY_LIST(state, subSubCategoryList) {
      state.subSubCategoryList = subSubCategoryList;
    },
  },
  actions: {
    async setCategoryList({ commit }) {
      try {
        const categoryList = (await CategoryService.getCategoryList()).data;
        commit("SET_CATEGORY_LIST", categoryList);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },

    async setSubCategoryList({ commit }) {
      try {
        const subCategoryList = (await SubCategoryService.getSubCategoryList())
          .data;
        commit("SET_SUB_CATEGORY_LIST", subCategoryList);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },

    async setSubSubCategoryList({ commit }) {
      try {
        const subSubCategoryList = (
          await SubSubCategoryService.getSubSubCategoryList()
        ).data;
        commit("SET_SUB_SUB_CATEGORY_LIST", subSubCategoryList);
      } catch (error) {
        console.log(error.response.data.error);
      }
    },
    async getCategoryList({ state, dispatch }) {
      if (state.categoryList && state.categoryList.length == 0) {
        await dispatch("setCategoryList");
      }
      return state.categoryList;
    },
    async getSubCategoryList({ state, dispatch }) {
      if (state.subCategoryList && state.subCategoryList.length == 0) {
        await dispatch("setSubCategoryList");
      }
      return state.subCategoryList;
    },
    async getSubSubCategoryList({ state, dispatch }) {
      if (state.subSubCategoryList && state.subSubCategoryList.length == 0) {
        await dispatch("setSubSubCategoryList");
      }
      return state.subSubCategoryList;
    },
    async getCategoryName({ state, dispatch }, categoryId) {
      const categoryList = await dispatch("getCategoryList");
      const index = categoryList.findIndex((obj) => obj.id == categoryId);
      return state.categoryList[index].name;
    },
    async getSubCategoryName({ state, dispatch }, subCategoryId) {
      const subCategoryList = await dispatch("getSubCategoryList");
      const index = subCategoryList.findIndex((obj) => obj.id == subCategoryId);
      return state.subCategoryList[index].name;
    },
    async getSubSubCategoryName({ state, dispatch }, subSubCategoryId) {
      const subSubCategoryList = await dispatch("getSubSubCategoryList");
      const index = subSubCategoryList.findIndex(
        (obj) => obj.id == subSubCategoryId
      );
      return state.subSubCategoryList[index].name;
    },
  },
};

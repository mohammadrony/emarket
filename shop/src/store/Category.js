import CategoryService from "@/services/CategoryService.js"
import SubCategoryService from "@/services/SubCategoryService.js"
import SubSubCategoryService from "@/services/SubSubCategoryService.js"
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
        }
    },
    actions: {
        async setCategoryList({ commit }) {
            const categoryList = (await CategoryService.getCategoryList()).data;
            commit("SET_CATEGORY_LIST", categoryList)
        },
        async setSubCategoryList({ commit }) {
            const subCategoryList = (await SubCategoryService.getSubCategoryList()).data;
            commit("SET_SUB_CATEGORY_LIST", subCategoryList)
        },
        async setSubSubCategoryList({ commit }) {
            const subSubCategoryList = (
                await SubSubCategoryService.getSubSubCategoryList()
            ).data;
            commit("SET_SUB_SUB_CATEGORY_LIST", subSubCategoryList);
        },
        async getCategoryList({ state, dispatch }) {
            if (state.categoryList && state.categoryList.length == 0) {
                await dispatch("setCategoryList")
            }
            return state.categoryList
        },
        async getSubCategoryList({ state, dispatch }) {
            if (state.subCategoryList && state.subCategoryList.length == 0) {
                await dispatch("setSubCategoryList")
            }
            return state.subCategoryList
        },
        async getSubSubCategoryList({ state, dispatch }) {
            if (state.subSubCategoryList && state.subSubCategoryList.length == 0) {
                await dispatch("setSubSubCategoryList")
            }
            return state.subSubCategoryList
        },
        async getCategoryName({ state }, categoryId) {
            const category = state.categoryList.filter(obj => obj.id == categoryId)
            return category[0].name;
        },
        async getSubCategoryName({ state }, subCategoryId) {
            const subCategory = state.subCategoryList.filter(obj => obj.id == subCategoryId)
            return subCategory[0].name;
        },
        async getSubSubCategoryName({ state }, subSubCategoryId) {
            const subSubCategory = state.subSubCategoryList.filter(obj => obj.id == subSubCategoryId)
            return subSubCategory[0].name;
        }
    }
}
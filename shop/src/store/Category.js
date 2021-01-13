import CategoryService from "@/services/CategoryService.js"
import SubCategoryService from "@/services/SubCategoryService.js"
import SubSubCategoryService from "@/services/SubSubCategoryService.js"
export const CategoryModule = {
    namespaced: true,
    state: {
        categoryList: null,
        subCategoryList: null,
        subSubCategoryList: null,
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
        async setFullCategoryList({ commit }) {
            const categoryList = (await CategoryService.getCategoryList()).data;
            commit("SET_CATEGORY_LIST", categoryList)
            const subCategoryList = (await SubCategoryService.getSubCategoryList()).data;
            commit("SET_SUB_CATEGORY_LIST", subCategoryList)
            const subSubCategoryList = (
                await SubSubCategoryService.getSubSubCategoryList()
            ).data;
            commit("SET_SUB_SUB_CATEGORY_LIST", subSubCategoryList);
            return categoryList;
        },
    },
    modules: {

    }
}
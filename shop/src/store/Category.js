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
        },
        // ADD_NEW_CATEGORY(state, category){
        //     state.categoryList.push(category)
        // },
        // ADD_NEW_SUB_CATEGORY(state, subCategory){
        //     state.subCategoryList.push(subCategory)
        // },
        // ADD_NEW_SUB_SUB_CATEGORY(state, subSubCategory){
        //     state.subSubCategoryList.push(subSubCategory)
        // },

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
        async getCategoryId({ state, dispatch }, categoryName) {
            if (state.categoryList == null) {
                await dispatch("setFullCategoryList");
            }
            const index = state.categoryList.findIndex(category => category.name === categoryName)
            if (index != -1) {
                return state.categoryList[index].id;
            } else {
                return 0;
            }
        },
        async getSubCategoryId({ state, dispatch }, subCategoryName) {
            if (state.subCategoryList == null) {
                await dispatch("setFullCategoryList");
            }
            const index = state.subCategoryList.findIndex(subCategory => subCategory.name === subCategoryName)
            if (index != -1) {
                return state.subCategoryList[index].id;
            } else {
                return 0;
            }

        },
        async getSubSubCategoryId({ state, dispatch }, subSubCategoryName) {
            if (state.subSubCategoryList == null) {
                await dispatch("setFullCategoryList");
            }
            const index = state.subSubCategoryList.findIndex(subSubCategory => subSubCategory.name === subSubCategoryName)
            if (index != -1) {
                return state.subSubCategoryList[index].id;
            } else {
                return 0;
            }

        },

    },
    modules: {

    }
}
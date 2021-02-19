import ProductsService from "../services/ProductsService";
import CategoryService from "@/services/CategoryService.js";
import SubCategoryService from "@/services/SubCategoryService.js";
import SubSubCategoryService from "@/services/SubSubCategoryService.js";

export const ProductsModule = {
    namespaced: true,
    strict: true,
    state: {
        allProduct: null,
        allBackupProduct: null,
        displayProducts: null,
        apCount: null,
        perPage: null,
        searchParameter: {
            text: "",
            categoryId: 0,
            subCategoryId: 0,
            subSubCategoryId: 0,
            lowestAmount: 0,
            maximumAmount: 1000000000,
        }
    },
    mutations: {
        SET_ALL_BACKUP_PRODUCT(state, allProduct) {
            state.allBackupProduct = allProduct;
        },
        SET_ALL_PRODUCT(state, allProduct) {
            state.allProduct = allProduct;
            state.perPage = 9
        },
        SET_DISPLAY_PRODUCTS(state, displayProducts) {
            state.displayProducts = displayProducts;
        },
        SET_AP_COUNT(state, apCount) {
            state.apCount = apCount
        },
        SET_SEARCH_TEXT(state, searchText) {
            state.searchParameter.text = searchText;
        },
        SET_SEARCH_CATEGORY_ID(state, categoryId) {
            state.searchParameter.categoryId = categoryId;
        },
        SET_SEARCH_SUB_CATEGORY_ID(state, subCategoryId) {
            state.searchParameter.subCategoryId = subCategoryId;
        },
        SET_SEARCH_SUB_SUB_CATEGORY_ID(state, subSubCategoryId) {
            state.searchParameter.subSubCategoryId = subSubCategoryId;
        },
        SET_LOWEST_AMOUNT(state, lowestAmount) {
            state.searchParameter.lowestAmount = lowestAmount;
        },
        SET_MAXIMUM_AMOUNT(state, maximumAmount) {
            state.searchParameter.maximumAmount = maximumAmount;
        }
    },
    actions: {
        async setSearchParameter({ commit }, route) {
            if (route.params.subSubCategory) {
                try {
                    const subSubCategory = (
                        await SubSubCategoryService.getSubSubCategoryByName(
                            route.params.subSubCategory
                        )
                    ).data;

                    commit("SET_SEARCH_CATEGORY_ID", 0);
                    commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
                    commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", subSubCategory.id);

                } catch (error) {
                    console.log("error get sub sub cat id by name", error);
                }
            } else if (route.params.subCategory) {
                try {
                    const subCategory = (
                        await SubCategoryService.getSubCategoryByName(
                            route.params.subCategory
                        )
                    ).data;

                    commit("SET_SEARCH_CATEGORY_ID", 0);
                    commit("SET_SEARCH_SUB_CATEGORY_ID", subCategory.id);
                    commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);

                } catch (error) {
                    console.log("error get sub cat id by name", error);
                }
            } else if (route.params.category) {
                try {
                    const category = (
                        await CategoryService.getCategoryByName(route.params.category)
                    ).data;

                    commit("SET_SEARCH_CATEGORY_ID", category.id);
                    commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
                    commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);

                } catch (error) {
                    console.log("error get cat id by name", error);
                }
            } else {
                commit("SET_SEARCH_CATEGORY_ID", 0);
                commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
                commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);
            }
            if (route.query.q) {
                commit("SET_SEARCH_TEXT", route.query.q)
            } else commit("SET_SEARCH_TEXT", "")
            if (route.query.lo) {
                const lo = parseInt(route.query.lo);
                commit("SET_LOWEST_AMOUNT", lo)
            } else commit("SET_LOWEST_AMOUNT", 0)
            if (route.query.hi) {
                const hi = parseInt(route.query.hi);
                commit("SET_MAXIMUM_AMOUNT", hi)
            } else commit("SET_MAXIMUM_AMOUNT", 1000000000)
        },
        async setAllBackupProduct({ commit }) {
            const allProduct = (await ProductsService.getAllProducts()).data;
            commit("SET_ALL_BACKUP_PRODUCT", allProduct)
        },
        async getAllBackupProduct({ dispatch, state }) {

            if (state.allBackupProduct == null || state.allBackupProduct.length == 0) {
                await dispatch("setAllBackupProduct")
            }
            return state.allBackupProduct;
        },
        async setAllProduct({ commit, state, dispatch }) {
            const allProduct = await dispatch("filterProducts");
            commit("SET_ALL_PRODUCT", allProduct);
            commit("SET_AP_COUNT", allProduct.length);
            const displayProducts = allProduct.slice(0, state.perPage);
            commit("SET_DISPLAY_PRODUCTS", displayProducts)
        },
        paginate({ commit, state }, currentPage) {
            const start = (currentPage - 1) * state.perPage;
            const displayProducts = state.allProduct.slice(start, start + state.perPage);
            commit("SET_DISPLAY_PRODUCTS", displayProducts);
        },
        async filterProducts({ state, dispatch }) {
            var allProduct = await dispatch("getAllBackupProduct");
            if (state.searchParameter.categoryId != 0) {
                allProduct = allProduct.filter(val => {
                    return (
                        val.CategoryId == state.searchParameter.categoryId);
                });
            }
            else if (state.searchParameter.subCategoryId != 0) {
                allProduct = allProduct.filter(val => {
                    return (
                        val.SubCategoryId == state.searchParameter.subCategoryId);
                });
            }
            else if (state.searchParameter.subSubCategoryId != 0) {
                allProduct = allProduct.filter(val => {
                    return (
                        val.SubSubCategoryId == state.searchParameter.subSubCategoryId);
                });
            }
            allProduct = allProduct.filter(val => {
                return (
                    val.title.toLowerCase().includes(state.searchParameter.text.toLowerCase())
                );
            });
            allProduct = allProduct.filter(val => {
                return (
                    val.amount >= state.searchParameter.lowestAmount &&
                    val.amount <= state.searchParameter.maximumAmount
                );
            });
            return allProduct;
        },
    }
}
import ProductsService from "@/services/ProductsService.js";
import CategoryService from "@/services/CategoryService.js";
import SubCategoryService from "@/services/SubCategoryService.js";
import SubSubCategoryService from "@/services/SubSubCategoryService.js";

export const ProductsModule = {
  namespaced: true,
  strict: true,
  state: {
    productsRouteValidate: true,
    allProducts: null,
    allBackupProducts: null,
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
    },
  },
  mutations: {
    SET_ALL_BACKUP_PRODUCTS(state, allProducts) {
      state.allBackupProducts = allProducts;
    },
    SET_ALL_PRODUCTS(state, allProducts) {
      state.allProducts = allProducts;
      state.perPage = 9;
    },
    SET_DISPLAY_PRODUCTS(state, displayProducts) {
      state.displayProducts = displayProducts;
    },
    SET_AP_COUNT(state, apCount) {
      state.apCount = apCount;
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
    },
    SET_ROUTE_STATUS(state, productsRouteValidate) {
      state.productsRouteValidate = productsRouteValidate;
    },
  },
  actions: {
    async setSearchParameter({ commit }, route) {
      commit("SET_SEARCH_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);
      commit("SET_ROUTE_STATUS", true);
      if (route.params.category) {
        try {
          const category = (
            await CategoryService.getCategoryByName(route.params.category)
          ).data;
          if (Object.keys(category).length == 0) {
            commit("SET_ROUTE_STATUS", false);
          }
          commit("SET_SEARCH_CATEGORY_ID", category.id);
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
      if (route.params.subCategory) {
        try {
          const subCategory = (
            await SubCategoryService.getSubCategoryByName(
              route.params.subCategory
            )
          ).data;
          if (Object.keys(subCategory).length == 0) {
            commit("SET_ROUTE_STATUS", false);
          }
          commit("SET_SEARCH_SUB_CATEGORY_ID", subCategory.id);
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
      if (route.params.subSubCategory) {
        try {
          const subSubCategory = (
            await SubSubCategoryService.getSubSubCategoryByName(
              route.params.subSubCategory
            )
          ).data;
          if (Object.keys(subSubCategory).length == 0) {
            commit("SET_ROUTE_STATUS", false);
          }
          commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", subSubCategory.id);
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
      if (route.query.q) {
        commit("SET_SEARCH_TEXT", route.query.q);
      } else commit("SET_SEARCH_TEXT", "");
      if (route.query.lo) {
        const lo = parseInt(route.query.lo);
        commit("SET_LOWEST_AMOUNT", lo);
      } else commit("SET_LOWEST_AMOUNT", 0);
      if (route.query.hi) {
        const hi = parseInt(route.query.hi);
        commit("SET_MAXIMUM_AMOUNT", hi);
      } else commit("SET_MAXIMUM_AMOUNT", 1000000000);
    },
    async setAllBackupProducts({ commit }) {
      const allProducts = (await ProductsService.getAllProducts()).data;
      commit("SET_ALL_BACKUP_PRODUCTS", allProducts);
    },
    async getAllBackupProducts({ dispatch, state }) {
      if (
        state.allBackupProducts == null ||
        state.allBackupProducts.length == 0
      ) {
        await dispatch("setAllBackupProducts");
      }
      return state.allBackupProducts;
    },
    async setAllProducts({ commit, state, dispatch }) {
      const allProducts = await dispatch("filterProducts");
      commit("SET_ALL_PRODUCTS", allProducts);
      commit("SET_AP_COUNT", allProducts.length);
      const displayProducts = allProducts.slice(0, state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts);
    },
    paginate({ commit, state }, currentPage) {
      const start = (currentPage - 1) * state.perPage;
      const displayProducts = state.allProducts.slice(
        start,
        start + state.perPage
      );
      commit("SET_DISPLAY_PRODUCTS", displayProducts);
    },
    async filterProducts({ state, dispatch }) {
      var allProducts = await dispatch("getAllBackupProducts");
      if (state.searchParameter.subSubCategoryId != 0) {
        allProducts = allProducts.filter((val) => {
          return val.SubSubCategoryId == state.searchParameter.subSubCategoryId;
        });
      } else if (state.searchParameter.subCategoryId != 0) {
        allProducts = allProducts.filter((val) => {
          return val.SubCategoryId == state.searchParameter.subCategoryId;
        });
      } else if (state.searchParameter.categoryId != 0) {
        allProducts = allProducts.filter((val) => {
          return val.CategoryId == state.searchParameter.categoryId;
        });
      }
      allProducts = allProducts.filter((val) => {
        return val.title
          .toLowerCase()
          .includes(state.searchParameter.text.toLowerCase());
      });
      allProducts = allProducts.filter((val) => {
        return (
          val.amount >= state.searchParameter.lowestAmount &&
          val.amount <= state.searchParameter.maximumAmount
        );
      });
      return allProducts;
    },
  },
};

import ProductsService from "../services/ProductsService";

export const ProductsModule = {
  namespaced: true,

  state: {
    allProduct: null,         // before display product paginate will be over this object
    allBackupProduct: null,   // all product will be here
    displayProducts: null,    // specific product into the pagination
    apCount: null,
    perPage: null,
    searchParameter: {
      text: "",
      CategoryId: 0,
      SubCategoryId: 0,
      SubSubCategoryId: 0,
      lowestPrice: 0,
      maximumPrice: 1000000000,
    }
  },
  mutations: {
    SET_ALL_BACKUP_PRODUCT(state, allProduct) {
      state.allBackupProduct = allProduct;
    },
    SET_ALL_PRODUCT(state, allProduct) {
      state.allProduct = allProduct;
      state.perPage = 5
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
      state.searchParameter.CategoryId = categoryId;
    },
    SET_SEARCH_SUB_CATEGORY_ID(state, subCategoryId) {
      state.searchParameter.SubCategoryId = subCategoryId;
    },
    SET_SEARCH_SUB_SUB_CATEGORY_ID(state, subSubCategoryId) {
      state.searchParameter.SubSubCategoryId = subSubCategoryId;
    },
    SET_LOWEST_PRICE(state, lowestPrice) {
      state.searchParameter.lowestPrice = lowestPrice;
    },
    SET_MAXIMUM_PRICE(state, maximumPrice) {
      state.searchParameter.maximumPrice = maximumPrice;
    }

  },
  actions: {
    resetSearchParameter({ commit }) {
      commit("SET_SEARCH_TEXT", "");
      commit("SET_SEARCH_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);
      commit("SET_LOWEST_PRICE", 0);
      commit("SET_MAXIMUM_PRICE", 1000000000);

    },
    setSearchText({ commit }, searchText) {
      commit("SET_SEARCH_TEXT", searchText);
    },
    setSearchCategoryId({ commit }, categoryId) {
      commit("SET_SEARCH_CATEGORY_ID", categoryId);
      commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);
    },
    setSearchSubCategoryId({ commit }, subCategoryId) {
      commit("SET_SEARCH_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_CATEGORY_ID", subCategoryId);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", 0);
    },
    setSearchSubSubCategoryId({ commit }, subSubCategoryId) {
      commit("SET_SEARCH_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_CATEGORY_ID", 0);
      commit("SET_SEARCH_SUB_SUB_CATEGORY_ID", subSubCategoryId);
    },
    setSearchLowestPrice({commit}, lowestPrice){
      commit("SET_SEARCH_LOWEST_PRICE", lowestPrice);
    },
    setSearchMaximumPrice({commit}, maximumPrice){
      commit("SET_SEARCH_MAXIMUM_PRICE", maximumPrice);
    },
    async getAllBackupProduct({ commit, state }) {
      if (!state.allBackupProduct) {
        const allProduct = (await ProductsService.getAllProducts()).data;
        commit("SET_ALL_BACKUP_PRODUCT", allProduct)
      }
      return state.allBackupProduct;
    },
    async setAllProduct({ commit, state, dispatch }) {
      const allProduct = await dispatch("filterProducts");
      commit("SET_ALL_PRODUCT", allProduct);
      commit("SET_AP_COUNT", allProduct.length);
      const displayProducts = allProduct.slice(0, state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts);

      // console.log("displayProducts",state.displayProducts)
      // dispatch("paginate", { currentPage: 1 });
    },
    paginate({ commit, state }, currentPage) {
      const start = (currentPage - 1) * state.perPage;
      const displayProducts = state.allProduct.slice(start, start + state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts);
    },
    // async categoryOfProduct({ dispatch }, { categId, subCategId, subSubCategId }) {
    //   const allBackupProduct = await dispatch("getAllBackupProduct");

    // },
    async filterProducts({ state, dispatch }) {
      var allProduct = await dispatch("getAllBackupProduct");
      // var allProduct = null;
      if (state.searchParameter.CategoryId != 0) {
        allProduct = allProduct.filter(val => {
          return (
            val.CategoryId == state.searchParameter.CategoryId);
        });
        // dispatch("updatePagination", allProduct)
      }
      else if (state.searchParameter.SubCategoryId) {
        allProduct = allProduct.filter(val => {
          return (
            val.SubCategoryId == state.searchParameter.SubCategoryId);
        });
        // dispatch("updatePagination", allProduct)
      }
      else if (state.searchParameter.SubSubCategoryId) {
        allProduct = allProduct.filter(val => {
          return (
            val.SubSubCategoryId == state.searchParameter.SubSubCategoryId);
        });
        // dispatch("updatePagination", allProduct)
      }
      allProduct = allProduct.filter(val => {
        return (
          val.title.toLowerCase().includes(state.searchParameter.text.toLowerCase()) ||
          val.subtitle.toLowerCase().includes(state.searchParameter.text.toLowerCase()) ||
          val.Category.name.toLowerCase().includes(state.searchParameter.text.toLowerCase()) ||
          val.SubCategory.name.toLowerCase().includes(state.searchParameter.text.toLowerCase()) ||
          val.SubSubCategory.name.toLowerCase().includes(state.searchParameter.text.toLowerCase())
        );
      });
      return allProduct;
      // dispatch("updatePagination", allProduct)
    },
    // updatePagination({ commit, dispatch }, allProduct) {
    //   commit("SET_ALL_PRODUCT", allProduct);
    //   commit("SET_AP_COUNT", allProduct.length);
    //   dispatch("paginate", { currentPage: 1 });
    // },

  },
  modules: {
  }
}
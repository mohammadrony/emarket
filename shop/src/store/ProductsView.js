import ProductsService from "../services/ProductsService";

export const ProductsView  = {
  namespaced: true,

  state: {
    // allProduct: null,
    displayProducts: null,
    displayProduct: null,
    apCount: null,
    perPage: null
  },
  mutations: {
    SET_PER_PAGE(state) {
      state.perPage = 5
    },
    SET_DISPLAY_PRODUCTS(state, displayProducts) {
      state.displayProducts = displayProducts;
    },
    SET_AP_COUNT(state, apCount) {
      state.apCount = apCount
    },
    SET_DISPLAY_PRODUCT(state, displayProduct) {
      state.displayProduct = displayProduct;
    }
  },
  actions: {
    setDisplayProduct({ commit }, displayProduct) {
      commit("SET_DISPLAY_PRODUCT", displayProduct);
    },
    async setAllProduct({ commit, state }) {
      const allProduct = (await ProductsService.getAllProducts()).data;
      commit("SET_ALL_PRODUCT", allProduct);
      commit("SET_AP_COUNT", allProduct.length);
      const displayProducts = allProduct.slice(0, state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts);
    },
    paginate({ commit, state }, currentPage) {
      const start = (currentPage - 1) * state.perPage;
      const displayProducts = state.allProduct.slice(start, start + state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts);
    },
    async searchProduct({ dispatch }, { text }) {
      const allProduct = (await ProductsService.getAllProducts()).data;
      const myProducts = allProduct.filter(val => {
        return (
          val.title.toLowerCase().includes(text.toLowerCase()) ||
          val.description.toLowerCase().includes(text.toLowerCase()) ||
          val.tags.toLowerCase().includes(text.toLowerCase())
        );
      });
      dispatch("updatePagination", myProducts)
    },
    updatePagination({ commit, dispatch }, myProducts) {
      commit("SET_ALL_PRODUCT", myProducts);
      commit("SET_AP_COUNT", myProducts.length);
      dispatch("paginate", { currentPage: 1 });
    },

  },


}
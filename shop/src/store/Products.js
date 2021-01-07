import ProductsService from "../services/ProductsService";

export const ProductsModule = {
  namespaced: true,

  state: {
    allProduct: null,
    allProductBackup: null,
    displayProducts: [],
    displayProduct: null,
    apCount: null,
    perPage: null
  },
  mutations: {
    SET_ALL_PRODUCT_BACKUP(state, allProduct){
      state.allProductBackup = allProduct;
    },
    SET_ALL_PRODUCT(state, allProduct) {
      state.allProduct = allProduct;
      state.perPage = 20
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
    async setAllProduct({ commit, state }) {
      const allProduct = (await ProductsService.getAllProducts()).data;
      commit("SET_ALL_PRODUCT_BACKUP", allProduct);
      commit("SET_ALL_PRODUCT", allProduct);
      commit("SET_AP_COUNT", allProduct.length);
      const displayProducts = allProduct.slice(0, state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts);
    },
    async setDisplayProduct({ commit }, productId) {
      const displayProduct = (await ProductsService.getProduct(productId)).data;
      commit("SET_DISPLAY_PRODUCT", displayProduct);
    },
    paginate({ commit, state }, currentPage) {
      const start = (currentPage - 1) * state.perPage;
      const displayProducts = state.allProduct.slice(start, start + state.perPage);
      commit("SET_DISPLAY_PRODUCTS", displayProducts);
    },
    async searchProduct({ commit, dispatch, state }, { text }) {
      if(!state.allProductBackup){
        const allProduct = (await ProductsService.getAllProducts()).data;
        commit("SET_ALL_PRODUCT_BACKUP", allProduct);      
      }
      const myProducts = state.allProductBackup.filter(val => {
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
  modules: {
  }
}
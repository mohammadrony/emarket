export const CartModule = {
  namespaced: true,
  strict: true,
  state: {
    cartProducts: [],
  },
  mutations: {
    SET_CART_PRODUCTS(state, cartProducts) {
      state.cartProducts = cartProducts;
    },
    ADD_CART_ITEM(state, newItem) {
      state.cartProducts.unshift(newItem);
    },
    UPDATE_CART_ITEM_QUANTITY(state, { index, quantity }) {
      state.cartProducts[index].quantity = quantity;
    },
    REMOVE_CART_ITEM(state, index) {
      state.cartProducts.splice(index, 1);
    },
  },
  actions: {
    clearCart({ commit }) {
      commit("SET_CART_PRODUCTS", []);
    },
    getCartItem({ state }, productId) {
      const index = state.cartProducts.findIndex(
        (obj) => obj.productId == productId
      );
      return index;
    },
    async addToCart({ commit, dispatch }, cartItem) {
      const index = await dispatch("getCartItem", cartItem.productId);
      if (index == -1) {
        commit("ADD_CART_ITEM", cartItem);
        return 0;
      }
    },

    async updateCartItemQuantity(
      { commit, dispatch },
      { productId, quantity }
    ) {
      const index = await dispatch("getCartItem", productId);
      if (index != -1) {
        commit("UPDATE_CART_ITEM_QUANTITY", { index, quantity });
      }
    },

    async removeCartItem({ commit, dispatch }, productId) {
      const index = await dispatch("getCartItem", productId);
      if (index != -1) {
        commit("REMOVE_CART_ITEM", index);
        return -1;
      }
    },
  },
};

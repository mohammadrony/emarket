import WishlistService from "@/services/WishlistService.js"
export const WishlistModule = {
  namespaced: true,
  strict: true,
  state: {
    wishlist: [],
  },
  mutations: {
    SET_WISHLIST(state, wishlist) {
      state.wishlist = wishlist;
    },
  },
  actions: {
    async setWishlist({ commit }) {
      try {
        const wishlist = (await WishlistService.getWishlist()).data;
        commit("SET_WISHLIST", wishlist)
      } catch (error) {
        console.log(error.response.data.error)
      }
    },

    async getWishlist({ state, dispatch }) {
      if (state.wishlist && state.wishlist.length == 0) {
        await dispatch("setWishlist")
      }
      return state.wishlist
    },
    async getWishlistItem({ state, dispatch }, productId) {
      const wishlist = await dispatch("getWishlist")
      const index = wishlist.findIndex(obj => obj.ProductId == productId)
      return state.wishlist[index];
    }
  }
}
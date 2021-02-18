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
    ADD_WISHLIST_ITEM(state, wishlistItem) {
      state.wishlist.unshift(wishlistItem);
    },
    REMOVE_WISHLIST_ITEM(state, index) {
      state.wishlist.splice(index, 1)
    }
  },
  actions: {
    async clearWishlist({ commit }) {
      commit("SET_WISHLIST", [])
    },
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
    async getWishlistItem({ dispatch }, productId) {
      const wishlist = await dispatch("getWishlist")
      const index = wishlist.findIndex(obj => obj.ProductId == productId)
      return index;
    },
    async addToWishlist({ commit, dispatch }, productId) {
      const index = await dispatch("getWishlistItem", productId)
      if (index == -1) {
        try {
          await WishlistService.createWishlistItem({
            productId: productId
          })
        } catch (error) {
          console.log(error.response.data.error)
        }
        try {
          const wishlistItem = (await WishlistService.getWishlistItem(productId)).data

          commit("ADD_WISHLIST_ITEM", wishlistItem);
          return 0
        } catch (error) {
          console.log(error.response.data.error)
        }
      }
    },
    async removeWishlistItem({ commit, dispatch }, productId) {
      const index = await dispatch("getWishlistItem", productId);
      if (index != -1) {
        try {
          await WishlistService.removeWishlistItem(productId)
          commit("REMOVE_WISHLIST_ITEM", index)
          return -1;
        } catch (error) {
          console.log(error.response.data.error)
        }
      }
    }

  }
}
import Api from "./Api";

export default {
  getWishlist() {
    return Api().get("/api/wishlist/getWishlist");
  },
  getWishlistItem(productId) {
    return Api().get(`/api/wishlist/getWishlistItem/${productId}`);
  },
  createWishlistItem(credentials) {
    return Api().post("/api/wishlist/createWishlistItem", credentials);
  },
  removeWishlistItem(productId) {
    return Api().delete(`/api/wishlist/removeWishlistItem/${productId}`);
  },
  deleteWishItemByProduct(productId) {
    return Api().delete(`/api/wishlist/deleteWishItemByProduct/${productId}`);
  },
};

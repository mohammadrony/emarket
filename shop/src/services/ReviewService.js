import Api from "./Api";

export default {
  getReviewList(productId) {
    return Api().get(`/api/review/getReviewList/${productId}`);
  },
  getUsersReviewList(userId) {
    return Api().get(`/api/review/getUsersReviewList/${userId}`);
  },
  createReview(credentials) {
    return Api().post("/api/review/createReview", credentials);
  },
  updateReview(credentials) {
    return Api().put("/api/review/updateReview", credentials);
  },
  deleteReview(reviewId) {
    return Api().delete(`/api/review/deleteReview/${reviewId}`);
  },
};

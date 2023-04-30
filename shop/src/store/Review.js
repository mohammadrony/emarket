import ProductsService from "@/services/ProductsService.js";
import ReviewService from "@/services/ReviewService.js";
export const ReviewModule = {
  namespaced: true,
  strict: true,
  mutations: {
    DO_SOMETHING() {
      return;
    },
  },
  actions: {
    async createReview(
      { commit },
      { rating, comment, productId, productRating }
    ) {
      commit("DO_SOMETHING");
      try {
        await ReviewService.createReview({
          rating: rating,
          comment: comment,
          productId: productId,
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
      if (rating != 0) {
        const newRating =
          (productRating.peopleRated * productRating.rating + rating) /
          (productRating.peopleRated + 1);
        try {
          await ProductsService.updateProduct({
            id: productId,
            rating: newRating,
            peopleRated: productRating.peopleRated + 1,
          });
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    },
    async updateReview({ commit }, { review, newRating, newComment }) {
      commit("DO_SOMETHING");
      try {
        await ReviewService.updateReview({
          id: review.id,
          rating: newRating,
          comment: newComment,
          productId: review.ProductId,
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
      if (newRating != 0 && newRating != review.rating) {
        var newRatingProduct, peopleRated;
        if (review.rating == 0) {
          peopleRated = review.Product.peopleRated + 1;
          newRatingProduct =
            (review.Product.peopleRated * review.Product.rating + newRating) /
            peopleRated;
        } else {
          peopleRated = review.Product.peopleRated;
          newRatingProduct =
            (review.Product.peopleRated * review.Product.rating +
              newRating -
              review.rating) /
            peopleRated;
        }
        try {
          await ProductsService.updateProduct({
            id: review.ProductId,
            rating: newRatingProduct,
            peopleRated: peopleRated,
          });
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    },
    async deleteReview({ commit }, review) {
      commit("DO_SOMETHING");
      try {
        await ReviewService.deleteReview(review.id);
      } catch (error) {
        console.log(error.response.data.error);
      }
      if (review.rating != 0) {
        var newRatingProduct;
        if (review.Product.peopleRated == 1) {
          newRatingProduct = 0;
        } else {
          newRatingProduct =
            (review.Product.peopleRated * review.Product.rating -
              review.rating) /
            (review.Product.peopleRated - 1);
        }
        try {
          await ProductsService.updateProduct({
            id: review.ProductId,
            rating: newRatingProduct,
            peopleRated: review.Product.peopleRated - 1,
          });
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    },
  },
};

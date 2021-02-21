import ProductsService from "@/services/ProductsService.js";
import ReviewService from "@/services/ReviewService.js";
export const ReviewModule = {
  namespaced: true,
  strict: true,
  state: {
    data: "hello world"
  },
  mutations: {
    DO_SOMETHING() {
      return;
    }
  },
  actions: {
    async createReview({ commit }, { rating, comment, productId, productRating }) {
      commit("DO_SOMETHING")
      try {
        await ReviewService.createReview({
          rating: rating,
          comment: comment,
          productId: productId
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
      if (rating != 0) {
        const newRating = Math.round(10 * ((productRating.peopleRated * productRating.rating + rating)
          / (productRating.peopleRated + 1))) / 10;
        try {
          await ProductsService.updateProduct({
            id: productId,
            rating: newRating,
            peopleRated: productRating.peopleRated + 1
          });
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    },
    async updateReview({ commit }, { review, newRating, newComment }) {
      commit("DO_SOMETHING")
      try {
        await ReviewService.updateReview({
          id: review.id,
          rating: newRating,
          comment: newComment,
          productId: review.ProductId
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
      if (newRating != 0 && newRating != review.rating) {
        const newRatingProduct = Math.round(10 * (review.Product.rating + ((newRating - review.rating)
          / review.Product.peopleRated))) / 10

        try {
          await ProductsService.updateProduct({
            id: review.ProductId,
            rating: newRatingProduct,
          });
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    },
    async deleteReview({ commit }, review) {
      commit("DO_SOMETHING")

      try {
        await ReviewService.deleteReview(review.id);
      } catch (error) {
        console.log(error.response.data.error);
      }
      var newRatingProduct;
      if (review.Product.peopleRated == 1) {
        newRatingProduct = 0
      } else {
        newRatingProduct = Math.round(10 * ((review.Product.peopleRated * review.Product.rating - review.rating)
          / (review.Product.peopleRated - 1))) / 10;
      }

      try {
        await ProductsService.updateProduct({
          id: review.ProductId,
          rating: newRatingProduct,
          peopleRated: review.Product.peopleRated - 1
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  }
}
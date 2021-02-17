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
        const newRating = (productRating.peopleRated * productRating.rating + rating)
          / (productRating.peopleRated + 1);
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
    async updateReview({ commit }, { id, rating, comment, productId, productRating, oldRating }) {
      commit("DO_SOMETHING")
      try {
        await ReviewService.updateReview({
          id: id,
          rating: rating,
          comment: comment,
          productId: productId
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
      if (rating != 0 && rating != oldRating) {
        const newRating = productRating.rating + ((rating - oldRating)
          / productRating.peopleRated)

        try {
          await ProductsService.updateProduct({
            id: productId,
            rating: newRating,
          });
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    },
    async deleteReview({ commit }, { review, productId, productRating }) {
      commit("DO_SOMETHING")

      try {
        await ReviewService.deleteReview(review.id);
        window.location.reload();
      } catch (error) {
        console.log(error.response.data.error);
      }

      const newRating = (productRating.peopleRated * productRating.rating - review.rating)
        / (productRating.peopleRated - 1);

      try {
        await ProductsService.updateProduct({
          id: productId,
          rating: newRating,
          peopleRated: productRating.peopleRated - 1
        });
      } catch (error) {
        console.log(error.response.data.error);
      }
    }
  }
}
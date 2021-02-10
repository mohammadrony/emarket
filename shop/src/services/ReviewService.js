import Api from "./Api"

export default {
    getReviewList(productId) {
        return Api().get(`/review/getReviewList/${productId}`)
    },
    createReview(credentials) {
        return Api().post('/review/createReview', credentials)
    },
    updateReview(credentials) {
        return Api().put('/review/updateReview', credentials)
    },
    deleteReview(reviewId) {
        return Api().delete(`/review/deleteReview/${reviewId}`)
    },
    deleteReviewByUser() {
        return Api().delete("/review/deleteReviewByUser")
    }
}

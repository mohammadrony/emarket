import Api from "./Api"

export default {
    getReviewList(productId) {
        return Api().get(`/review/getReviewList/${productId}`)
    },
    getUsersReviewList(userId) {
        return Api().get(`/review/getUsersReviewList/${userId}`)
    },
    createReview(credentials) {
        return Api().post('/review/createReview', credentials)
    },
    updateReview(credentials) {
        return Api().put('/review/updateReview', credentials)
    },
    deleteReview(reviewId) {
        return Api().delete(`/review/deleteReview/${reviewId}`)
    }
}

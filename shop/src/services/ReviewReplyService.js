import Api from "./Api"

export default {
    getReviewReplyList(reviewId) {
        return Api().get(`/reviewReply/getReviewReplyList/${reviewId}`)
    },
    createReviewReply(credentials) {
        return Api().post('/reviewReply/createReviewReply', credentials)
    },
    updateReview(credentials) {
        return Api().put('/reviewReply/updateReviewReply', credentials)
    },
    deleteReview(reviewReplyId) {
        return Api().delete(`/reviewReply/deleteReviewReply/${reviewReplyId}`)
    }
}

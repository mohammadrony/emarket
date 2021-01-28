import Api from "./Api"

export default {
    getReviewReplyList(reviewId) {
        return Api().get(`/reviewReply/getReviewReplyList/${reviewId}`)
    },
    createReviewReply(credentials) {
        return Api().post('/reviewReply/createReviewReply', credentials)
    },
    updateReviewReply(credentials) {
        return Api().put('/reviewReply/updateReviewReply', credentials)
    },
    deleteReviewReply(reviewReplyId) {
        return Api().delete(`/reviewReply/deleteReviewReply/${reviewReplyId}`)
    }
}

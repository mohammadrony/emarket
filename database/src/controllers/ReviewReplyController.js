const { ReviewReply, User } = require('../models')

module.exports = {
	async getReviewReplyList(req, res) {
		try {
			const reviewId = req.params.reviewId
			const reviewReplies = await ReviewReply.findAll({
				where: {
					ReviewId: reviewId
				},
				include: {
					model: User,
					attributes: [
						'profileImage',
						'firstName',
						'lastName'
					]
				}
			})
			res.send(reviewReplies)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch the review replies.'
			})
		}
	},
	async createReviewReply(req, res) {
		try {
			const reviewReply = { comment: req.body.comment, UserId: req.user.id, ReviewId: req.body.reviewId }
			const updatedReviewReply = await ReviewReply.create(reviewReply)
			res.send(updatedReviewReply)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to create a review reply.'
			})
		}
	},
	async updateReviewReply(req, res) {
		try {
			const reviewReply = { comment: req.body.comment, UserId: req.user.id, ReviewId: req.body.reviewId }
			await ReviewReview.update(reviewReply, {
				where: {
					id: req.body.id
				}
			})
			res.send(reviewReply)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to update a review reply.'
			})
		}
	},
	async deleteReviewReply(req, res) {
		try {
			const reviewReply = await ReviewReply.findByPk(req.params.reviewReplyId)
			if (!reviewReply) {
				return res.status(403).send({
					error: 'No review reply to delete.'
				})
			}
			await reviewReply.destroy()
			res.send(reviewReply)

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a review reply.'
			})
		}
	},
}

const { Showcase } = require('../models')

module.exports = {
	async getShowcaseItems(req, res) {
		try {
			const showcaseItems = await Showcase.findAll({
				order: [
					['createdAt', 'DESC']
				]
			})
			res.send(showcaseItems)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch a showcase items.'
			})
		}
	},
	async createShowcaseItem(req, res) {
		try {
			if (req.user.priority == 1) {
				const showcase = await Showcase.create(req.body)
				res.send(showcase)
			}
			else {
				return res.status(403).send({
					error: "You don't have permission to create a showcase item."
				})
			}
		} catch (err) {
			res.status(500).send({
				error: "An error occured when trying to create a showcase item."
			})
		}
	},
	async updateShowcaseItem(req, res) {
		try {
			if (req.user.priority == 1) {

				await Showcase.update(req.body, {
					where: {
						id: req.body.id
					}
				})
			} else {
				return res.status(403).send({
					error: "You don't have permission to update a showcase item."
				})
			}
			res.send(req.body)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to update a showcase item.'
			})
		}
	},
	async deleteShowcaseItem(req, res) {
		try {
			if (req.user.priority == 1) {
				await Showcase.destroy({
					where: {
						id: req.params.showcaseItemId
					}
				})
				res.send({ id: req.params.showcaseItemId })
			} else {
				return res.status(403).send({
					error: "You don't have permission to do delete a showcase item."
				})
			}
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a category.'
			})
		}
	},
}

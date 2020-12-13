const { SubSubCategory } = require('../models')

module.exports = {
	async getSubSubCategoryList(req, res) {
		try {
			const subSubCategories = await SubSubCategory.findAll()
			res.send(subSubCategories)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch sub categories.'
			})
		}
	},
	async createSubSubCategory(req, res) {
		try {
			const subSubCategory = await SubSubCategory.create(req.body)
			res.send(subSubCategory)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to create a sub sub category.'
			})
		}
	},
	async updateSubSubCategory(req, res) {
		try {
			await SubSubCategory.update(req.body, {
				where: {
					id: req.body.id
				}
			})
			res.send(req.body)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to update a sub sub category.'
			})
		}
	},
	async deleteSubSubCategory(req, res) {
		try {
			const { subSubCategoryId } = req.params
			const subSubCategory = await SubSubCategory.findOne({
				where: {
					id: subSubCategoryId
				}
			})
			if (!subSubCategory) {
				return res.status(403).send({
					error: 'No sub sub category to delete.'
				})
			}
			await subSubCategory.destroy()
			res.send(subSubCategory)

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a sub sub category.'
			})
		}
	},
}

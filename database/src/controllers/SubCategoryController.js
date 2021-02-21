const { SubCategory } = require('../models')

module.exports = {
	async getSubCategoryByName(req, res) {
		try {
			const subCategory = await SubCategory.findOne({
				where: {
					name: req.params.name
				}
			})
			res.send(subCategory)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch a sub category.'
			})
		}
	},
	async getSubCategoryList(req, res) {
		try {
			const subCategories = await SubCategory.findAll()
			res.send(subCategories)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch sub categories.'
			})
		}
	},
	async createSubCategory(req, res) {
		try {
			const subCategory = await SubCategory.create(req.body)
			res.send(subCategory)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to create a sub category.'
			})
		}
	},
	async updateSubCategory(req, res) {
		try {
			await SubCategory.update(req.body, {
				where: {
					id: req.body.id
				}
			})
			res.send(req.body)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to update a sub category.'
			})
		}
	},
	async deleteSubCategory(req, res) {
		try {
			const subCategory = await SubCategory.findByPk(req.params.subCategoryId)
			if (!subCategory) {
				return res.status(403).send({
					error: 'No sub category to delete.'
				})
			}
			await subCategory.destroy()
			res.send(subCategory)

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a sub category.'
			})
		}
	},
}

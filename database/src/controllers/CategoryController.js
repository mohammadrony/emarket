const { Category } = require('../models')

module.exports = {
	async getCategoryList(req, res) {
		try {	
			const categories = await Category.findAll()
			res.send(categories)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch the categories.'
			})
		}
	},
	async createCategory(req, res) {
		try {
			const category = await Category.create(req.body)
			res.send(category)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to create a category.'
			})
		}
	},
	async updateCategory(req, res) {
		try {
			await Category.update(req.body, {
				where: {
					id: req.body.id
				}
			})
			res.send(req.body)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to update a category.'
			})
		}
	},
	async deleteCategory(req, res) {
		try {
			const { categoryId } = req.params
			const category = await Category.findOne({
				where: {
					id: categoryId
				}
			})
			if (!category) {
				return res.status(403).send({
					error: 'No category to delete.'
				})
			}
			await category.destroy()
			res.send(category)

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a category.'
			})
		}
	},
}

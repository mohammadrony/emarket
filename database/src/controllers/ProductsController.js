const { Product } = require('../models')

module.exports = {
	async getProduct(req, res) {
		try {
			const product = await Product.findOne({
				where: {
					id: req.params.productId
				}
			})
			res.send(product)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch a product.'
			})
		}
	},
	async getAllProducts(req, res) {
		try {
			const products = await Product.findAll()
			res.send(products)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch the products.'
			})
		}
	},
	async getHomeProducts(req, res) {
		try {
			const products = await Product.findAll({
				limit: 3
			})
			res.send(products)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch the products.'
			})
		}
	},
	async createProduct(req, res) {
		try {
			console.log("file", req.file,"body",req.body)
			const product = await Product.create(req.body)
			res.send(product)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to create a product.'
			})
		}
	},
	async updateProduct(req, res) {
		try {
			await Product.update(req.body, {
				where: {
					id: req.body.id
				}
			})
			res.send(req.body)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to update a product.'
			})
		}
	},
	async deleteProduct(req, res) {
		try {
			const { productId } = req.params
			const product = await Product.findOne({
				where: {
					id: productId
				}
			})
			if (!product) {
				return res.status(403).send({
					error: 'No product to delete.'
				})
			}
			await product.destroy()
			res.send(product)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete a product.'
			})
		}
	},
}

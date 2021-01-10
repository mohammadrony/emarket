const { Product, Category, SubCategory, SubSubCategory } = require('../models')

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
			const products = await Product.findAll({
				include: [
					// { all: true }
					{ model: Category },
					{ model: SubCategory },
					{ model: SubSubCategory }
				]
			});
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
			req.body.image1 = "http://localhost:8084/" + req.files[0].path
			if (req.files[1]) {
				req.body.image2 = "http://localhost:8084/" + req.files[1].path
			}
			if (req.files[2]) {
				req.body.image3 = "http://localhost:8084/" + req.files[2].path
			}
			if (req.files[3]) {
				req.body.image4 = "http://localhost:8084/" + req.files[3].path
			}
			if (req.files[4]) {
				req.body.image5 = "http://localhost:8084/" + req.files[4].path
			}
			if (req.files[5]) {
				req.body.image6 = "http://localhost:8084/" + req.files[5].path
			}
			if (req.files[6]) {
				req.body.image7 = "http://localhost:8084/" + req.files[6].path
			}
			if (req.files[7]) {
				req.body.image8 = "http://localhost:8084/" + req.files[7].path
			}
			if (req.files[8]) {
				req.body.image9 = "http://localhost:8084/" + req.files[8].path
			}
			if (req.files[9]) {
				req.body.image10 = "http://localhost:8084/" + req.files[9].path
			}
			req.body.sales = 0
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

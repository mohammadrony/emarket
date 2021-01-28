const { Order } = require('../models')

module.exports = {
	async getOrderList(req, res) {
		try {
			const orderList = await Order.findAll({
				order: [['createdAt', 'DESC']]
			});
			res.send(orderList)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch order list.'
			})
		}
	},
	async getOrder(req, res) {
		try {
			const order = await Order.findOne({
				where: {
					id: req.params.orderId
				}
			})
			res.send(order)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch an order.'
			})
		}
	},
	async createOrder(req, res) {
		try {
			const order = await Order.create(req.body)
			res.send(order)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to create an order.'
			})
		}
	},
	async updateOrder(req, res) {
		try {
			await Order.update(req.body, {
				where: {
					id: req.body.id
				}
			})
			res.send(req.body)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to update an order.'
			})
		}
	},
	async deleteOrder(req, res) {
		try {
			const orderId = req.params.orderId
			const order = await Order.findOne({
				where: {
					id: orderId
				}
			})
			if (!order) {
				return res.status(403).send({
					error: 'No order to delete.'
				})
			}
			await order.destroy()
			res.send(order)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete an order.'
			})
		}
	},
}

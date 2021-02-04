const { OrderItem, Product } = require('../models')

module.exports = {
	async getOrderItemList(req, res) {
		try {
			const orderId = req.params.orderId
			const orderItems = await OrderItem.findAll({
				where: {
					OrderId: orderId
				},
				include: {
					model: Product,
					attributes: [
						'id',
						'title',
						'amount',
						'currency',
						'image1'
					]
				}
			})
			res.send(orderItems)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch the order items.'
			})
		}
	},
	async createOrderItem(req, res) {
		try {
			const orderItemCreated = await OrderItem.create(req.body)
			res.send(orderItemCreated)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to create an order item.'
			})
		}
	},
	async deleteOrderItem(req, res) {
		try {
			const orderItem = await OrderItem.findByPk(req.params.orderItemId)
			if (!orderItem) {
				return res.status(403).send({
					error: 'No order item to delete.'
				})
			}
			await orderItem.destroy()
			res.send(orderItem)

		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to delete an order item.'
			})
		}
	},
}

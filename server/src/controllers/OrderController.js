const { Order } = require('../models')
const nodemailer = require('nodemailer')

let emailFrom = `Emarket <${process.env.EMARKET_EMAIL}>`

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
			const order = await Order.findByPk(req.params.orderId)
			res.send(order)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch an order.'
			})
		}
	},
	async getOrderBySessionId(req, res) {
		try {
			const order = await Order.findOne({
				where: {
					checkoutSessionId: req.params.sessionId
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
			var transporter = await nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: process.env.EMARKET_EMAIL,
					pass: process.env.EMARKET_PASSWORD,
				},
				tls: {
					rejectUnauthorized: false
				}
			})
			var mailOptions = {
				from: emailFrom,
				to: order.email,
				subject: "Check Order Status",
				text: 'Hi ' + order.name + ',\n\n' +
					'Thanks for your purchase!\n\n' +
					'Please follow the link to keep track on your order.\n\n' +
					'http://' + 'localhost:8080' + '/order/' + order.checkoutSessionId + '\n\n' +
					'Your session Id: ' + order.checkoutSessionId + '\n\n' +
					'Thanks for using emarket\n'
			}
			await transporter.sendMail(mailOptions, function (err) {
				if (err) {
					return res.status(403).send({
						error: "An error occured when trying to send an email to register."
					});
				}
			});
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
			const order = await Order.findByPk(req.params.orderId)
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

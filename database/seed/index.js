const { sequelize, Shop, User, Category, SubCategory, SubSubCategory, Order, OrderItem, Product, Review, ReviewReply, Cart } = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const shops = require('./shops.json')
const categories = require('./categories.json')
const orders = require('./orders.json')
const orderItems = require('./orderItems.json')
const subCategories = require('./subCategories.json')
const subSubCategories = require('./subSubCategories.json')
const products = require('./products.json')
const reviews = require('./reviews.json')
const reviewReplies = require('./reviewReplies.json')
const cartProducts = require('./cartProducts.json')

sequelize.sync({ force: true })
	.then(async () => {
		await Promise.all(
			shops.map(shop => {
				Shop.create(shop)
			})
		)
		await Promise.all(
			users.map(user => {
				User.create(user)
			})
		)
		await Promise.all(
			categories.map(category => {
				Category.create(category)
			})
		)
		await Promise.all(
			subCategories.map(subCategory => {
				SubCategory.create(subCategory)
			})
		)
		await Promise.all(
			subSubCategories.map(subSubCategory => {
				SubSubCategory.create(subSubCategory)
			})
		)
		await Promise.all(
			products.map(product => {
				Product.create(product)
			})
		)
		await Promise.all(
			reviews.map(review => {
				Review.create(review)
			})
		)
		await Promise.all(
			orders.map(order => {
				Order.create(order)
			})
		)
		await Promise.all(
			orderItems.map(orderItem => {
				OrderItem.create(orderItem)
			})
		)
		await Promise.all(
			reviewReplies.map(reply => {
				ReviewReply.create(reply)
			})
		)
		await Promise.all(
			cartProducts.map(cartProduct => {
				Cart.create(cartProduct)
			})
		)
	})


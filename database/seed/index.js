const { sequelize, Company, User, Showcase, Category, SubCategory, SubSubCategory, Order, OrderItem, Product, Review, Wishlist } = require('../src/models')

const Promise = require('bluebird')
const companies = require('./companies.json')
const users = require('./users.json')
const showcases = require('./showcases.json')
const categories = require('./categories.json')
const orders = require('./orders.json')
const orderItems = require('./orderItems.json')
const subCategories = require('./subCategories.json')
const subSubCategories = require('./subSubCategories.json')
const products = require('./products.json')
const reviews = require('./reviews.json')
const wishlists = require('./wishlists.json')

sequelize.sync({ force: true })
	.then(async () => {
		await Promise.all(
			companies.map(company => {
				Company.create(company)
			})
		)
		await Promise.all(
			users.map(user => {
				User.create(user)
			})
		)
		await Promise.all(
			showcases.map(showcase => {
				Showcase.create(showcase)
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
			wishlists.map(wishlistItem => {
				Wishlist.create(wishlistItem)
			})
		)
	})


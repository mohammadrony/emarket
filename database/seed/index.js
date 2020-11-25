const {sequelize, User, Category, SubCategory, Product, Cart} = require('../src/models')

const Promise = require('bluebird')
const users = require('./users.json')
const categories = require('./categories.json')
const subCategories = require('./subCategories.json')
const products = require('./products.json')
const cartProducts = require('./cartProducts.json')

sequelize.sync({force: true})
	.then(async () => {
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
			products.map(product => {
				Product.create(product)
			})
		)
		await Promise.all(
			cartProducts.map(cartProduct => {
				Cart.create(cartProduct)
			})
		)
	})
  

const _ = require('lodash')
const { Cart, Product } = require('../models')

module.exports = {
  async getAllCartProduct(req, res) {
    try {
      const userId = req.user.id
      const cartProducts = await Cart.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Product
          }
        ]
      })
      res.send(cartProducts)

    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fetch all cart item.'
      })
    }
  },
  async getCartProduct(req, res) {
    try {
      const userId = req.user.id
      const {productId} = req.query
      const cartProduct = await Cart.findOne({
        where: {
          UserId: userId,
          ProductId: productId
        }
      })
      res.send(cartProduct)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fetch cart item.'
      })
    }
  },
  async addToCart(req, res) {
    try {
      console.log(req.body)
      userId = req.userId
      productId = req.body.productId
      quantity = req.body.quantity
      const cartProduct = await Cart.findOne({
        where: {
          UserId: userId,
          ProductId: productId
        }
      })
      if (cartProduct) {
        return res.status(400).send({
          error: 'This item is already in your cart'
        })
      }
      const newCartProduct = await Cart.create({
        UserId: userId,
        ProductId: productId,
        quantity: quantity
      })
      res.send(newCartProduct)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to add cart item.'
      })
    }
  },
  async remove(req, res) {
    try {
      const userId = req.user.id
      const { productId } = req.params
      const cartProduct = await Cart.findOne({
        where: {
          UserId: userId,
          ProductId: productId
        }
      })
      if (!cartProduct) {
        return res.status(403).send({
          error: 'No item to remove.'
        })
      }
      await cartProduct.destroy()
      res.send(cartProduct)

    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to remove a cart item.'
      })
    }
  },
}

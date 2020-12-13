const _ = require('lodash')
const { Wishlist, Product } = require('../models')

module.exports = {
  async getUserWishlist(req, res) {
    try {
      const userId = req.user.id
      const wishlist = await Wishlist.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Product
          }
        ]
      })
      res.send(wishlist)

    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fetch all wishlist item.'
      })
    }
  },
  async getOne(req, res) {
    try {
      const userId = req.user.id
      const { productId } = req.query
      const wishlistProduct = await Wishlist.findOne({
        where: {
          UserId: userId,
          ProductId: productId
        }
      })
      res.send(wishlistProduct)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fetch wishlist item.'
      })
    }
  },
  async addToWishlist(req, res) {
    try {
      console.log(req.body)
      userId = req.userId
      productId = req.body.productId
      quantity = req.body.quantity
      const wishlistProduct = await Wishlist.findOne({
        where: {
          UserId: userId,
          ProductId: productId
        }
      })
      if (wishlistProduct) {
        return res.status(400).send({
          error: 'This item is already in your wishlist'
        })
      }
      const newWishlistProduct = await Wishlist.create({
        UserId: userId,
        ProductId: productId,
        quantity: quantity
      })
      res.send(newWishlistProduct)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to add wishlist item.'
      })
    }
  },
  async remove(req, res) {
    try {
      const userId = req.user.id
      const { productId } = req.params
      const wishlistProduct = await Wishlist.findOne({
        where: {
          UserId: userId,
          ProductId: productId
        }
      })
      if (!wishlistProduct) {
        return res.status(403).send({
          error: 'No item to remove.'
        })
      }
      await wishlistProduct.destroy()
      res.send(wishlistProduct)

    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to remove a wishlist item.'
      })
    }
  },
}

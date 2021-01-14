const _ = require('lodash')
const { Wishlist, Product } = require('../models')

module.exports = {
  async getWishlist(req, res) {
    try {
      const userId = req.user.id
      console.log(req.user.id)
      const wishlist = await Wishlist.findAll({
        where: {
          UserId: userId
        }
      })
      console.log(wishlist)
      res.send(wishlist)

    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fetch all wishlist item.'
      })
    }
  },
  async getWishlistById(req, res) {
    try {
      const userId = req.user.id
      const { productId } = req.params
      const wishlistItem = await Wishlist.findOne({
        where: {
          UserId: userId,
          ProductId: productId
        }
      })
      res.send(wishlistItem)
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

      const wishlistItem = await Wishlist.create({
        UserId: userId,
        ProductId: productId
      })
      res.send(wishlistItem)
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

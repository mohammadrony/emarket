const { Wishlist, Product } = require("../models");

module.exports = {
  async getWishlist(req, res) {
    try {
      const wishlist = await Wishlist.findAll({
        where: {
          UserId: req.user.id,
        },
        include: {
          model: Product,
          attributes: ["id", "title", "image1", "rating", "amount", "currency"],
        },
      });
      res.send(wishlist);
    } catch (err) {
      res.status(500).send({
        error: "An error occured when trying to fetch all wishlist item.",
      });
    }
  },
  async getWishlistItem(req, res) {
    try {
      const wishlistItem = await Wishlist.findOne({
        where: {
          UserId: req.user.id,
          ProductId: req.params.productId,
        },
        include: {
          model: Product,
          attributes: ["id", "title", "image1", "rating", "amount", "currency"],
        },
      });
      res.send(wishlistItem);
    } catch (err) {
      res.status(500).send({
        error: "An error occured when trying to fetch wishlist item.",
      });
    }
  },
  async createWishlistItem(req, res) {
    try {
      const wishlistItem = await Wishlist.create({
        UserId: req.user.id,
        ProductId: req.body.productId,
      });
      res.send(wishlistItem);
    } catch (err) {
      res.status(500).send({
        error: "An error occured when trying to add wishlist item.",
      });
    }
  },
  async removeWishlistItem(req, res) {
    try {
      const wishlistItem = await Wishlist.findOne({
        where: {
          UserId: req.user.id,
          ProductId: req.params.productId,
        },
      });
      if (!wishlistItem) {
        return res.status(403).send({
          error: "No item to remove.",
        });
      }
      await wishlistItem.destroy();
      res.send(wishlistItem);
    } catch (err) {
      res.status(500).send({
        error: "An error occured when trying to remove a wishlist item.",
      });
    }
  },
  async deleteWishItemByProduct(req, res) {
    try {
      if (req.user && req.user.priority == 1) {
        await Wishlist.destroy({
          where: {
            ProductId: req.params.productId,
          },
        });
        res.send({ productId: req.body.productId });
      } else {
        return res.status(403).send({
          error: "You don't have permits to do that.",
        });
      }
    } catch (err) {
      res.status(500).send({
        error:
          "An error occured when trying to delete wishlist item by product.",
      });
    }
  },
};

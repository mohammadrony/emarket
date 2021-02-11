const isAuthenticated = require('./policies/isAuthenticated')
const ImageController = require("./controllers/ImageController")
const CartsController = require("./controllers/CartsController")
const OrderController = require("./controllers/OrderController")
const ReviewController = require("./controllers/ReviewController")
const WishlistController = require("./controllers/WishlistController")
const ProductsController = require("./controllers/ProductsController")
const CheckoutController = require("./controllers/CheckoutController")
const CategoryController = require("./controllers/CategoryController")
const OrderItemController = require("./controllers/OrderItemController")
const ReviewReplyController = require("./controllers/ReviewReplyController")
const SubCategoryController = require("./controllers/SubCategoryController")
const SubSubCategoryController = require("./controllers/SubSubCategoryController")
const AuthenticationController = require("./controllers/AuthenticationController")
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

module.exports = (app) => {
  // cart
  app.get("/cart/allProduct",
    isAuthenticated,
    CartsController.getAllCartProduct)
  app.get("/cart/product",
    isAuthenticated,
    CartsController.getCartProduct)
  app.post("/cart/product",
    isAuthenticated,
    CartsController.addToCart)
  app.delete("/cart/product/:productId",
    isAuthenticated,
    CartsController.remove)

  // category
  app.get("/category/getCategoryByName/:name",
    CategoryController.getCategoryByName)
  app.get("/category/getCategoryList",
    CategoryController.getCategoryList)
  app.post("/category/createCategory",
    CategoryController.createCategory)
  app.put("/category/updateCategory",
    CategoryController.updateCategory)
  app.delete("/category/deleteCategory/:categoryId",
    CategoryController.deleteCategory)

  // checkout
  app.post("/createCheckoutSession",
    CheckoutController.createCheckoutSession)
  app.get("/retrieveCheckoutSession/:sessionId",
    CheckoutController.retrieveCheckoutSession)

  // order
  app.get("/order/getOrderList",
    OrderController.getOrderList)
  app.get("/order/getOrder/:orderId",
    OrderController.getOrder),
    app.get("/order/getOrderBySessionId/:sessionId",
      OrderController.getOrderBySessionId),
    app.post("/order/createOrder",
      OrderController.createOrder)
  app.put("/order/updateOrder",
    isAuthenticated,
    OrderController.updateOrder)
  app.delete("/order/deleteOrder/:orderId",
    isAuthenticated,
    OrderController.deleteOrder)

  // order item
  app.get("/orderItem/getOrderItemList/:orderId",
    isAuthenticated,
    OrderItemController.getOrderItemList)
  app.post("/orderItem/createOrderItem",
    OrderItemController.createOrderItem)
  app.delete("/orderItem/deleteOrderItem/:orderItemId",
    isAuthenticated,
    OrderItemController.deleteOrderItem)

  // product
  app.get("/products/getAllProducts",
    ProductsController.getAllProducts)
  app.get("/products/topSellProduct/:limit",
    ProductsController.topSellProduct)
  app.get("/products/newAddProduct/:limit",
    ProductsController.newAddProduct)
  app.get("/products/getProductSales/:productId",
    ProductsController.getProductSales)
  app.get("/products/getProduct/:productId",
    ProductsController.getProduct)
  app.get("/products/getRecommendation/:subSubCategoryId/:limit",
    ProductsController.getRecommendation)
  app.post("/products/createProduct",
    ImageController.uploadProductImage,
    ProductsController.createProduct)
  app.put("/products/updateProduct",
    ProductsController.updateProduct)
  app.delete("/products/deleteProduct/:productId",
    ProductsController.deleteProduct)

  // review
  app.get("/review/getReviewList/:productId",
    ReviewController.getReviewList)
  app.post("/review/createReview",
    isAuthenticated,
    ReviewController.createReview)
  app.put("/review/updateReview",
    isAuthenticated,
    ReviewController.updateReview)
  app.delete("/review/deleteReview/:reviewId",
    isAuthenticated,
    ReviewController.deleteReview)
  app.delete("/review/deleteReviewByUser",
    isAuthenticated,
    ReviewController.deleteReviewByUser)

  // review reply
  app.get("/reviewReply/getReviewReplyList/:reviewId",
    ReviewReplyController.getReviewReplyList)
  app.post("/reviewReply/createReviewReply",
    ReviewReplyController.createReviewReply)
  app.put("/reviewReply/updateReviewReply",
    ReviewReplyController.updateReviewReply)
  app.delete("/reviewReply/deleteReviewReply/:reviewReplyId",
    ReviewReplyController.deleteReviewReply)

  // sub category
  app.get("/subCategory/getSubCategoryByName/:name",
    SubCategoryController.getSubCategoryByName)
  app.get("/subCategory/getSubCategoryList",
    SubCategoryController.getSubCategoryList)
  app.post("/subCategory/createSubCategory",
    SubCategoryController.createSubCategory)
  app.put("/subCategory/updateSubCategory",
    SubCategoryController.updateSubCategory)
  app.delete("/subCategory/deleteSubCategory/:subCategoryId",
    SubCategoryController.deleteSubCategory)

  // sub sub Category
  app.get("/subSubCategory/getSubSubCategoryByName/:name",
    SubSubCategoryController.getSubSubCategoryByName)
  app.get("/subSubCategory/getSubSubCategoryList",
    SubSubCategoryController.getSubSubCategoryList)
  app.post("/subSubCategory/createSubSubCategory",
    SubSubCategoryController.createSubSubCategory)
  app.put("/subSubCategory/updateSubSubCategory",
    SubSubCategoryController.updateSubSubCategory)
  app.delete("/subSubCategory/deleteSubSubCategory/:subSubCategoryId",
    SubSubCategoryController.deleteSubSubCategory)

  // user
  app.post("/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post("/login",
    AuthenticationController.login)
  app.get("/user/:id",
    isAuthenticated,
    AuthenticationController.user)
  app.post("/updateUser",
    isAuthenticated,
    AuthenticationController.updateUser)
  app.get("/verifyPassword/:password",
    isAuthenticated,
    AuthenticationController.verifyPassword)
  app.delete("/user/deleteAccount",
    isAuthenticated,
    AuthenticationController.deleteAccount)
  app.post("/updatePassword",
    isAuthenticated,
    AuthenticationController.updatePassword)
  app.get("/getUserList",
    isAuthenticated,
    AuthenticationController.getUserList)
  app.get("/validUser/:email",
    AuthenticationController.validUser)
  app.post("/requestToken",
    AuthenticationController.requestToken)
  app.get("/verifyToken/:token",
    AuthenticationController.verifyToken)
  app.get("/verifyRegsToken/:token",
    AuthenticationController.verifyRegsToken)
  app.post("/resetPassword",
    AuthenticationController.resetPassword)
  app.post("/resetRegsToken",
    AuthenticationController.resetRegsToken)

  // wishlist
  app.get("/wishlist",
    isAuthenticated,
    WishlistController.getWishlist)
  app.get("/wishlist/:productId",
    isAuthenticated,
    WishlistController.getWishlistById)
  app.post("/wishlist/add",
    isAuthenticated,
    WishlistController.addToWishlist)
  app.delete("/wishlist/delete/:productId",
    isAuthenticated,
    WishlistController.remove)
}

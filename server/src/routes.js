const isAuthenticated = require("./policies/isAuthenticated")
const UserController = require("./controllers/UserController")
const ImageController = require("./controllers/ImageController")
const OrderController = require("./controllers/OrderController")
const ReviewController = require("./controllers/ReviewController")
const CompanyController = require("./controllers/CompanyController")
const WishlistController = require("./controllers/WishlistController")
const ProductsController = require("./controllers/ProductsController")
const CheckoutController = require("./controllers/CheckoutController")
const CategoryController = require("./controllers/CategoryController")
const ShowcaseController = require("./controllers/ShowcaseController")
const OrderItemController = require("./controllers/OrderItemController")
const SubCategoryController = require("./controllers/SubCategoryController")
const SubSubCategoryController = require("./controllers/SubSubCategoryController")
const AuthenticationController = require("./controllers/AuthenticationController")
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");

module.exports = (app) => {
  // authentication
  app.post("/api/auth/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post("/api/auth/login",
    AuthenticationController.login)
  app.get("/api/auth/verifyPassword/:password",
    isAuthenticated,
    AuthenticationController.verifyPassword)
  app.post("/api/auth/updatePassword",
    isAuthenticated,
    AuthenticationControllerPolicy.updatePassword,
    AuthenticationController.updatePassword)
  app.post("/api/auth/requestPasswordToken",
    AuthenticationController.requestPasswordToken)
  app.get("/api/auth/verifyPasswordToken/:token",
    AuthenticationController.verifyPasswordToken)
  app.post("/api/auth/checkRegsToken",
    AuthenticationController.checkRegsToken)
  app.post("/api/auth/verifyRegsToken",
    AuthenticationController.verifyRegsToken)
  app.post("/api/auth/resetPassword",
    AuthenticationController.resetPassword)
  app.post("/api/auth/resetRegsToken",
    AuthenticationController.resetRegsToken)

  // category
  app.get("/api/category/getCategoryByName/:name",
    CategoryController.getCategoryByName)
  app.get("/api/category/getCategoryList",
    CategoryController.getCategoryList)
  app.post("/api/category/createCategory",
    CategoryController.createCategory)
  app.put("/api/category/updateCategory",
    CategoryController.updateCategory)
  app.delete("/api/category/deleteCategory/:categoryId",
    CategoryController.deleteCategory)

  // checkout
  app.post("/api/checkout/createCheckoutSession",
    CheckoutController.createCheckoutSession)
  app.get("/api/checkout/retrieveCheckoutSession/:sessionId",
    CheckoutController.retrieveCheckoutSession)

  // company
  app.get("/api/company/getCompany/:companyId",
    CompanyController.getCompany)

  // order
  app.get("/api/order/getOrderList",
    OrderController.getOrderList)
  app.get("/api/order/getOrder/:orderId",
    OrderController.getOrder),
    app.get("/api/order/getOrderBySessionId/:sessionId",
      OrderController.getOrderBySessionId),
    app.post("/api/order/createOrder",
      OrderController.createOrder)
  app.put("/api/order/updateOrder",
    isAuthenticated,
    OrderController.updateOrder)
  app.delete("/api/order/deleteOrder/:orderId",
    isAuthenticated,
    OrderController.deleteOrder)

  // order item
  app.get("/api/orderItem/getOrderItemList/:orderId",
    isAuthenticated,
    OrderItemController.getOrderItemList)
  app.post("/api/orderItem/createOrderItem",
    OrderItemController.createOrderItem)
  app.delete("/api/orderItem/deleteOrderItem/:orderItemId",
    isAuthenticated,
    OrderItemController.deleteOrderItem)

  // product
  app.get("/api/products/getAllProducts",
    ProductsController.getAllProducts)
  app.get("/api/products/topSellProduct/:limit",
    ProductsController.topSellProduct)
  app.get("/api/products/newAddProduct/:limit",
    ProductsController.newAddProduct)
  app.get("/api/products/getProductSales/:productId",
    ProductsController.getProductSales)
  app.get("/api/products/getProduct/:productId",
    ProductsController.getProduct)
  app.get("/api/products/getProductId/:productTitle",
    ProductsController.getProductId)
  app.get("/api/products/getProductRating/:productId",
    ProductsController.getProductRating)
  app.get("/api/products/getRecommendation/:subSubCategoryId/:limit",
    ProductsController.getRecommendation)
  app.post("/api/products/createProduct",
    ImageController.uploadProductImage,
    ProductsController.createProduct)
  app.put("/api/products/updateProduct",
    ProductsController.updateProduct)
  app.delete("/api/products/deleteProduct/:productId",
    ProductsController.deleteProduct)

  // review
  app.get("/api/review/getReviewList/:productId",
    ReviewController.getReviewList)
  app.get("/api/review/getUsersReviewList/:userId",
    ReviewController.getUsersReviewList)
  app.post("/api/review/createReview",
    isAuthenticated,
    ReviewController.createReview)
  app.put("/api/review/updateReview",
    isAuthenticated,
    ReviewController.updateReview)
  app.delete("/api/review/deleteReview/:reviewId",
    isAuthenticated,
    ReviewController.deleteReview)

  // showcase
  app.get("/api/showcase/getShowcaseItems",
    ShowcaseController.getShowcaseItems)
  app.post("/api/showcase/createShowcaseItem",
    isAuthenticated,
    ShowcaseController.createShowcaseItem)
  app.put("/api/showcase/updateShowcaseItem",
    isAuthenticated,
    ShowcaseController.updateShowcaseItem)
  app.delete("/api/showcase/deleteShowcaseItem/:showcaseItemId",
    isAuthenticated,
    ShowcaseController.deleteShowcaseItem)

  // sub category
  app.get("/api/subCategory/getSubCategoryByName/:name",
    SubCategoryController.getSubCategoryByName)
  app.get("/api/subCategory/getSubCategoryList",
    SubCategoryController.getSubCategoryList)
  app.post("/api/subCategory/createSubCategory",
    SubCategoryController.createSubCategory)
  app.put("/api/subCategory/updateSubCategory",
    SubCategoryController.updateSubCategory)
  app.delete("/api/subCategory/deleteSubCategory/:subCategoryId",
    SubCategoryController.deleteSubCategory)

  // sub sub Category
  app.get("/api/subSubCategory/getSubSubCategoryByName/:name",
    SubSubCategoryController.getSubSubCategoryByName)
  app.get("/api/subSubCategory/getSubSubCategoryList",
    SubSubCategoryController.getSubSubCategoryList)
  app.post("/api/subSubCategory/createSubSubCategory",
    SubSubCategoryController.createSubSubCategory)
  app.put("/api/subSubCategory/updateSubSubCategory",
    SubSubCategoryController.updateSubSubCategory)
  app.delete("/api/subSubCategory/deleteSubSubCategory/:subSubCategoryId",
    SubSubCategoryController.deleteSubSubCategory)

  // user
  app.get("/api/user/checkUserName/:userName",
    isAuthenticated,
    UserController.checkUserName)
  app.delete("/api/user/deleteAccount/:userId",
    isAuthenticated,
    UserController.deleteAccount)
  app.get("/api/user/getUserById/:userId",
    UserController.getUserById)
  app.get("/api/user/getUserList",
    isAuthenticated,
    UserController.getUserList)
  app.post("/api/user/updateUser",
    isAuthenticated,
    UserController.updateUser)
  app.get("/api/user/getUserByEmail/:email",
    UserController.getUserByEmail)

  // wishlist
  app.get("/api/wishlist/getWishlist",
    isAuthenticated,
    WishlistController.getWishlist)
  app.get("/api/wishlist/getWishlistItem/:productId",
    isAuthenticated,
    WishlistController.getWishlistItem)
  app.post("/api/wishlist/createWishlistItem",
    isAuthenticated,
    WishlistController.createWishlistItem)
  app.delete("/api/wishlist/removeWishlistItem/:productId",
    isAuthenticated,
    WishlistController.removeWishlistItem)
  app.delete("/api/wishlist/deleteWishItemByProduct/:productId",
    isAuthenticated,
    WishlistController.deleteWishItemByProduct)
}

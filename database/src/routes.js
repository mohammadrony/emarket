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
  app.post("/auth/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post("/auth/login",
    AuthenticationController.login)
  app.get("/auth/verifyPassword/:password",
    isAuthenticated,
    AuthenticationController.verifyPassword)
  app.post("/auth/updatePassword",
    isAuthenticated,
    AuthenticationControllerPolicy.updatePassword,
    AuthenticationController.updatePassword)
  app.post("/auth/requestToken",
    AuthenticationController.requestToken)
  app.get("/auth/verifyToken/:token",
    AuthenticationController.verifyToken)
  app.get("/auth/verifyRegsToken/:userId/:registerToken",
    AuthenticationController.verifyRegsToken)
  app.post("/auth/resetPassword",
    AuthenticationController.resetPassword)
  app.post("/auth/resetRegsToken",
    AuthenticationController.resetRegsToken)

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
  app.post("/checkout/createCheckoutSession",
    CheckoutController.createCheckoutSession)
  app.get("/checkout/retrieveCheckoutSession/:sessionId",
    CheckoutController.retrieveCheckoutSession)

  // company
  app.get("/company/getCompanyLogo/:companyId",
    CompanyController.getCompanyLogo)
  app.get("/company/getCompanyName/:companyId",
    CompanyController.getCompanyName)

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
  app.get("/products/getProductRating/:productId",
    ProductsController.getProductRating)
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
  app.get("/review/getUsersReviewList",
    isAuthenticated,
    ReviewController.getUsersReviewList)
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

  // showcase
  app.get("/showcase/getShowcaseItems",
    ShowcaseController.getShowcaseItems)
  app.post("/showcase/createShowcaseItem",
    isAuthenticated,
    ShowcaseController.createShowcaseItem)
  app.put("/showcase/updateShowcaseItem",
    isAuthenticated,
    ShowcaseController.updateShowcaseItem)
  app.delete("/showcase/deleteShowcaseItem/:showcaseItemId",
    isAuthenticated,
    ShowcaseController.deleteShowcaseItem)

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
  app.get("/user/checkUserName/:userName",
    isAuthenticated,
    UserController.checkUserName)
  app.delete("/user/deleteAccount/:userId",
    isAuthenticated,
    UserController.deleteAccount)
  app.get("/user/getUserById/:userId",
    UserController.getUserById)
  app.get("/user/getUserList",
    isAuthenticated,
    UserController.getUserList)
  app.post("/user/updateUser",
    isAuthenticated,
    UserController.updateUser)
  app.get("/user/getUserByEmail/:email",
    UserController.getUserByEmail)

  // wishlist
  app.get("/wishlist/getWishlist",
    isAuthenticated,
    WishlistController.getWishlist)
  app.get("/wishlist/getWishlistItem/:productId",
    isAuthenticated,
    WishlistController.getWishlistItem)
  app.post("/wishlist/createWishlistItem",
    isAuthenticated,
    WishlistController.createWishlistItem)
  app.delete("/wishlist/removeWishlistItem/:productId",
    isAuthenticated,
    WishlistController.removeWishlistItem)
  app.delete("/wishlist/deleteWishItemByProduct/:productId",
    isAuthenticated,
    WishlistController.deleteWishItemByProduct)
}

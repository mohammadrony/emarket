const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(new Error("Image Upload Problem"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const isAuthenticated = require('./policies/isAuthenticated')
const ImageController = require("./controllers/ImageController")
const CartsController = require("./controllers/CartsController")
const WishlistController = require("./controllers/WishlistController")
const ProductsController = require("./controllers/ProductsController")
const CheckoutController = require("./controllers/CheckoutController")
const CategoryController = require("./controllers/CategoryController")
const SubCategoryController = require("./controllers/SubCategoryController")
const SubSubCategoryController = require("./controllers/SubSubCategoryController")
const AuthenticationController = require("./controllers/AuthenticationController")
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  // user
  app.post("/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post("/login",
    AuthenticationController.login)
  app.get("/user/:id",
    isAuthenticated,
    AuthenticationController.user)
  app.post("/requestToken",
    AuthenticationController.requestToken)
  app.get("/verifyToken/:token",
    AuthenticationController.verifyToken)
  app.post("/resetPassword",
    AuthenticationController.resetPassword)

  // checkout
  app.post("/createCheckoutSession",
    CheckoutController.createCheckoutSession)

  // category
  app.get("/category/getCategoryList",
    CategoryController.getCategoryList)
  app.post("/category/createCategory",
    CategoryController.createCategory)
  app.put("/category/updateCategory",
    CategoryController.updateCategory)
  app.delete("/category/deleteCategory/:categoryId",
    CategoryController.deleteCategory)

  // sub category
  app.get("/subCategory/getSubCategoryList",
    SubCategoryController.getSubCategoryList)
  app.post("/subCategory/createSubCategory",
    SubCategoryController.createSubCategory)
  app.put("/subCategory/updateSubCategory",
    SubCategoryController.updateSubCategory)
  app.delete("/subCategory/deleteSubCategory/:subCategoryId",
    SubCategoryController.deleteSubCategory)

  // sub sub Category
  app.get("/subSubCategory/getSubSubCategoryList",
    SubSubCategoryController.getSubSubCategoryList)
  app.post("/subSubCategory/createSubSubCategory",
    SubSubCategoryController.createSubSubCategory)
  app.put("/subSubCategory/updateSubSubCategory",
    SubSubCategoryController.updateSubSubCategory)
  app.delete("/subSubCategory/deleteSubSubCategory/:subSubCategoryId",
    SubSubCategoryController.deleteSubSubCategory)

  // product
  app.get("/products/getProduct/:productId",
    ProductsController.getProduct)
  app.get("/products/getAllProducts",
    ProductsController.getAllProducts)
  app.get("/products/getHomeProducts",
    ProductsController.getHomeProducts)
  app.post("/products/createProduct",
    upload.single('imageFile'),
    ProductsController.createProduct)
  app.put("/products/updateProduct",
    ProductsController.updateProduct)
  app.delete("/products/deleteProduct/:productId",
    ProductsController.deleteProduct)

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

  // wishlist
  app.get("/wishlist/user",
    isAuthenticated,
    WishlistController.getUserWishlist)
  app.get("/wishlist/one",
    isAuthenticated,
    WishlistController.getOne)
  app.post("/wishlist/add",
    isAuthenticated,
    WishlistController.addToWishlist)
  app.delete("/wishlist/delete/:productId",
    isAuthenticated,
    WishlistController.remove)


  //image
  app.get("/image",
    ImageController.getImage)
  app.post("/image",
    upload.single('imageFile'),
    ImageController.setImage)
}

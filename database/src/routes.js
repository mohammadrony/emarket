const isAuthenticated = require('./policies/isAuthenticated')
const CartsController = require("./controllers/CartsController")
const ProductsController = require("./controllers/ProductsController")
const CategoryController = require("./controllers/CategoryController")
const SubCategoryController = require("./controllers/SubCategoryController")
const AuthenticationController = require("./controllers/AuthenticationController")
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.post("/register", 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post("/login", 
        AuthenticationController.login)

    app.get("/category/getCategoryList", 
        CategoryController.getCategoryList)
    app.post("/category/createCategory",
        CategoryController.createCategory)
    app.put("/category/updateCategory",
        CategoryController.updateCategory)
    app.delete("/category/deleteCategory/:categoryId",
        CategoryController.deleteCategory)

    app.get("/subCategory/getSubCategoryList", 
        SubCategoryController.getSubCategoryList)
    app.post("/subCategory/createSubCategory",
        SubCategoryController.createSubCategory)
    app.put("/subCategory/updateSubCategory",
        SubCategoryController.updateSubCategory)
    app.delete("/subCategory/deleteSubCategory/:subCategoryId",
        SubCategoryController.deleteSubCategory)

    app.get("/products/getAllProducts", 
        ProductsController.getAllProducts)
    app.get("/products/getHomeProducts", 
        ProductsController.getHomeProducts)
    app.post("/products/createProduct",
        ProductsController.createProduct)
    app.put("/products/updateProduct",
        ProductsController.updateProduct)
    app.delete("/products/deleteProduct/:productId",
        ProductsController.deleteProduct)
    
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
}

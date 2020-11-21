const isAuthenticated = require('./policies/isAuthenticated')
const CartsController = require("./controllers/CartsController")
const ProductsController = require("./controllers/ProductsController")
const AuthenticationController = require("./controllers/AuthenticationController")
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
    app.post("/register", 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post("/login", 
        AuthenticationController.login)

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

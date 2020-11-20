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
        CartsController.getAllCartProduct)
    app.get("/cart/product",
        CartsController.getCartProduct)
    app.post("/cart/product",
        CartsController.addToCart)
    app.delete("/cart/product/:cartProductId",
        CartsController.remove)
}

import Api from "./Api"

export default {
    createCheckoutSession(checkoutProducts) {
        return Api().post('/createCheckoutSession', checkoutProducts)
    }
}

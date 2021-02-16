import Api from "./Api"

export default {
    createCheckoutSession(checkoutProducts) {
        return Api().post('/checkout/createCheckoutSession', checkoutProducts)
    },
    retrieveCheckoutSession(sessionId){
        return Api().get(`/checkout/retrieveCheckoutSession/${sessionId}`)
    }
}

import Api from "./Api"

export default {
    createCheckoutSession(checkoutProducts) {
        return Api().post('/createCheckoutSession', checkoutProducts)
    },
    retrieveCheckoutSession(sessionId){
        return Api().get(`/retrieveCheckoutSession/${sessionId}`)
    }
}

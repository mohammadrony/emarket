import Api from "./Api"

export default {
    getOrderList() {
        return Api().get('/order/getOrderList')
    },
    getOrder(orderId) {
        return Api().get(`/order/getOrder/${orderId}`)
    },
    getOrderBySessionId(sessionId) {
        return Api().get(`/order/getOrderBySessionId/${sessionId}`)
    },
    createOrder(credentials) {
        return Api().post('/order/createOrder', credentials)
    },
    updateOrder(credentials) {
        return Api().put('/order/updateOrder', credentials)
    },
    deleteOrder(orderId) {
        return Api().delete(`/order/deleteOrder/${orderId}`)
    }
}

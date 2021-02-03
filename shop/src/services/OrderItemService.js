import Api from "./Api"

export default {
    getOrderItemList(orderId) {
        return Api().get(`/orderItem/getOrderItemList/${orderId}`)
    },
    createOrderItem(credentials) {
        return Api().post('/orderItem/createOrderItem', credentials)
    },
    deleteOrderItem(orderId) {
        return Api().delete(`/orderItem/deleteOrderItem/${orderId}`)
    }
}

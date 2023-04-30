import Api from "./Api";

export default {
  getOrderItemList(orderId) {
    return Api().get(`/api/orderItem/getOrderItemList/${orderId}`);
  },
  createOrderItem(credentials) {
    return Api().post("/api/orderItem/createOrderItem", credentials);
  },
  deleteOrderItem(orderItemId) {
    return Api().delete(`/api/orderItem/deleteOrderItem/${orderItemId}`);
  },
};

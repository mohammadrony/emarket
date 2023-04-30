import Api from "./Api";

export default {
  getOrderList() {
    return Api().get("/api/order/getOrderList");
  },
  getOrder(orderId) {
    return Api().get(`/api/order/getOrder/${orderId}`);
  },
  getOrderBySessionId(sessionId) {
    return Api().get(`/api/order/getOrderBySessionId/${sessionId}`);
  },
  createOrder(credentials) {
    return Api().post("/api/order/createOrder", credentials);
  },
  updateOrder(credentials) {
    return Api().put("/api/order/updateOrder", credentials);
  },
  deleteOrder(orderId) {
    return Api().delete(`/api/order/deleteOrder/${orderId}`);
  },
};

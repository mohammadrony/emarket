import Api from "./Api";

export default {
  createCheckoutSession(checkoutProducts) {
    return Api().post("/api/checkout/createCheckoutSession", checkoutProducts);
  },
  retrieveCheckoutSession(sessionId) {
    return Api().get(`/api/checkout/retrieveCheckoutSession/${sessionId}`);
  },
};

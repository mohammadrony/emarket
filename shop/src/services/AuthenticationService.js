import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("/register", credentials);
  },
  login(credentials) {
    return Api().post("/login", credentials);
  },
  verifyPassword(currentPassword){
    return Api().get(`/verifyPassword/${currentPassword}`)
  },
  updatePassword(credentials){
    return Api().post("/updatePassword", credentials);
  },
  requestToken(credentials) {
    return Api().post("/requestToken", credentials);
  },
  verifyToken(token) {
    return Api().get(`/verifyToken/${token}`);
  },
  verifyRegsToken(token) {
    return Api().get(`/verifyRegsToken/${token}`);
  },
  resetPassword(credentials) {
    return Api().post("/resetPassword", credentials);
  },
  resetRegsToken(credentials) {
    return Api().post("/resetRegsToken", credentials)
  }
};

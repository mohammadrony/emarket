import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("/auth/register", credentials);
  },
  login(credentials) {
    return Api().post("/auth/login", credentials);
  },
  verifyPassword(currentPassword){
    return Api().get(`/auth/verifyPassword/${currentPassword}`)
  },
  updatePassword(credentials){
    return Api().post("/auth/updatePassword", credentials);
  },
  requestToken(credentials) {
    return Api().post("/auth/requestToken", credentials);
  },
  verifyToken(token) {
    return Api().get(`/auth/verifyToken/${token}`);
  },
  verifyRegsToken(token) {
    return Api().get(`/auth/verifyRegsToken/${token}`);
  },
  resetPassword(credentials) {
    return Api().post("/auth/resetPassword", credentials);
  },
  resetRegsToken(credentials) {
    return Api().post("/auth/resetRegsToken", credentials)
  }
};

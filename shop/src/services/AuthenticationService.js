import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("register", credentials);
  },
  login(credentials) {
    return Api().post("login", credentials);
  },
  requestToken(credentials) {
    return Api().post("requestToken", credentials);
  },
  verifyToken(credentials) {
    return Api().get("verifyToken", credentials);
  },
  resetPassword(credentials) {
    return Api().post("resetPassword", credentials);
  }

};

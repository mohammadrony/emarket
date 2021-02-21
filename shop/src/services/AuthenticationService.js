import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("/auth/register", credentials);
  },
  login(credentials) {
    return Api().post("/auth/login", credentials);
  },
  verifyPassword(currentPassword) {
    return Api().get(`/auth/verifyPassword/${currentPassword}`)
  },
  updatePassword(credentials) {
    return Api().post("/auth/updatePassword", credentials);
  },
  requestPasswordToken(credentials) {
    return Api().post("/auth/requestPasswordToken", credentials);
  },
  verifyPasswordToken(token) {
    return Api().get(`/auth/verifyPasswordToken/${token}`);
  },
  checkRegsToken(credentials) {
    return Api().post("/auth/checkRegsToken", credentials);
  },
  verifyRegsToken(credentials) {
    return Api().post('/auth/verifyRegsToken', credentials);
  },
  resetPassword(credentials) {
    return Api().post("/auth/resetPassword", credentials);
  },
  resetRegsToken(credentials) {
    return Api().post("/auth/resetRegsToken", credentials)
  }
};

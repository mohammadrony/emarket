import Api from "./Api";

export default {
  register(credentials) {
    return Api().post("/register", credentials);
  },
  login(credentials) {
    return Api().post("/login", credentials);
  },
  updateUser(credentials){
    return Api().post("/updateUser", credentials);
  },
  verifyPassword(userDeletePasscode){
    return Api().get(`/verifyPassword/${userDeletePasscode}`)
  },
  deleteAccount(){
    return Api().delete("/user/deleteAccount");
  },
  updatePassword(credentials){
    return Api().post("/updatePassword", credentials);
  },
  user(id) {
    return Api().get(`/user/${id}`);
  },
  getUserList() {
    return Api().get("/getUserList");
  },
  validUser(email) {
    return Api().get(`/validUser/${email}`)
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

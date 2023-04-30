import Api from "./Api";

export default {
  checkUserName(userName) {
    return Api().get(`/api/user/checkUserName/${userName}`);
  },
  deleteAccount(userId) {
    return Api().delete(`/api/user/deleteAccount/${userId}`);
  },
  getUserList() {
    return Api().get("/api/user/getUserList");
  },
  updateUser(credentials) {
    return Api().post("/api/user/updateUser", credentials);
  },
  getUserById(userId) {
    return Api().get(`/api/user/getUserById/${userId}`);
  },
  getUserByEmail(email) {
    return Api().get(`/api/user/getUserByEmail/${email}`);
  },
};

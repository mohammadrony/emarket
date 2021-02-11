import Api from "./Api";

export default {
  checkUserName(userName) {
    return Api().get(`/user/checkUserName/${userName}`);
  },
  deleteAccount() {
    return Api().delete("/user/deleteAccount");
  },
  getUserList() {
    return Api().get("/user/getUserList");
  },
  updateUser(credentials) {
    return Api().post("/user/updateUser", credentials);
  },
  getUserById(userId) {
    return Api().get(`/user/getUserById/${userId}`);
  },
  getUserByEmail(email) {
    return Api().get(`/user/getUserByEmail/${email}`);
  }
};

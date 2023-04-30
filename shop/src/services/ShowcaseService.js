import Api from "./Api";

export default {
  getShowcaseItems() {
    return Api().get("/api/showcase/getShowcaseItems");
  },
  createShowcaseItem(credentials) {
    return Api().post("/api/showcase/createShowcaseItem", credentials);
  },
  updateShowcaseItem(credentials) {
    return Api().put("/api/showcase/updateShowcaseItem", credentials);
  },
  deleteShowcaseItem(showcaseItemId) {
    return Api().delete(`/api/showcase/deleteShowcaseItem/${showcaseItemId}`);
  },
};

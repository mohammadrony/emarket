import axios from "axios";
import store from "../store";

export default () => {
  return axios.create({
    baseURL: `http://localhost:8084`,
    headers: {
      Authorization: `Bearer ${store.state.CurrentUser.token}`,
    },
  });
};

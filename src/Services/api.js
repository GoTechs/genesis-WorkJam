/**
 *
 * all the call api to the proxy
 *
 */

import axios from "axios";
import Auth from "../Services/auth";
axios.defaults.baseURL = "https://hacker-news.firebaseio.com/v0/";

const api = {
  apiCall(method, id) {
    return axios({
      url: `${method}.json`,
      method: "GET",
      data: null
    }).then(response => response.data);
  },
  login(data) {
    return axios({
      url: `/proxy/login.php`,
      method: "POST",
      data: data
    }).then(response => response);
  },
  logout() {
    Auth.clearAppStorage();
  }
};

export default api;

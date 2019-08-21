/**
 *
 * all the call api to the proxy
 *
 */

import axios from "axios";
import Auth from "../Services/auth";

const api = {
  apiCall(data, method) {
    return axios({
      url: `/proxy/${method}.php`,
      method: "POST",
      data: data
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

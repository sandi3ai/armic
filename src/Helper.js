import Axios from "axios";

export function post(url, data = {}) {
  return Axios.post(url, data, { withCredentials: true });
}

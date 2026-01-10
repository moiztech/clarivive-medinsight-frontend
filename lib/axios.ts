import axios from "axios";

const api = axios.create({
  baseURL: "https://api.clarvivemedinsight.cloud/",
  timeout: 1000,
  headers: {
    "Accept": 'application/json',
  }
});

export default api;

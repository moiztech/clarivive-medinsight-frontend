import axios from "axios";

const api = axios.create({
  baseURL: "https://fake-api.example.com", // fake for now
  timeout: 1000,
});

export default api;

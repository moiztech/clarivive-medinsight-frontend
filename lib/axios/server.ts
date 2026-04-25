import axios from "axios";
import { apiBaseUrl, withApiPrefix } from "../api-url";

export const serverApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: "application/json",
  },
  timeout: 20000,
});

serverApi.interceptors.request.use((config) => {
  if (typeof config.url === "string") {
    config.url = withApiPrefix(config.url);
  }

  return config;
});
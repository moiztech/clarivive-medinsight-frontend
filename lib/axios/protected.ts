import axios from "axios";
import { getCookie } from "../cookies";

const protectedApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 20000,
  withCredentials: true,
});

protectedApi.interceptors.request.use(
  (config) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default protectedApi;

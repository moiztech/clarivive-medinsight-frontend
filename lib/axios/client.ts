import axios from "axios";

export const clientApi = axios.create({
  baseURL: "/api",
  headers: { Accept: "application/json" },
  timeout: 20000,
  withCredentials: true, // allow cookies
});

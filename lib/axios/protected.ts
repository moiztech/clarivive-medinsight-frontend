import axios from "axios";
import { getCookie } from "../cookies";
import { tokenStore } from "../auth/tokenStore";

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
    const token = getCookie("access_token") || tokenStore.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

protectedApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      tokenStore.clear();
      if (typeof window !== "undefined") {
        const requestUrl = String(error.config?.url || "");
        const isBootstrapCheck = requestUrl.includes("/verify-token");
        const isAuthPage = window.location.pathname.startsWith("/login");
        if (!isAuthPage && !isBootstrapCheck) {
          const callbackUrl =
            window.location.pathname + window.location.search;
          window.location.href = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;
        }
      }
    }
    return Promise.reject(error);
  },
);

export default protectedApi;

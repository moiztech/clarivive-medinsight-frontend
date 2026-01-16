import { clientApi } from "./client";
import { tokenStore } from "@/lib/auth/tokenStore";

let isRefreshing = false;
let queue: Array<(token: string | null) => void> = [];

function resolveQueue(token: string | null) {
  queue.forEach((cb) => cb(token));
  queue = [];
}

clientApi.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

clientApi.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status !== 401 || original._retry) {
      throw err;
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push((token) => {
          if (!token) return reject(err);
          original.headers.Authorization = `Bearer ${token}`;
          resolve(clientApi(original));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshRes = await clientApi.post("/auth/refresh"); // uses cookie
      const newToken = refreshRes.data?.access_token ?? null;
      tokenStore.set(newToken);

      resolveQueue(newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return clientApi(original);
    } catch (e) {
      tokenStore.clear();
      resolveQueue(null);
      throw e;
    } finally {
      isRefreshing = false;
    }
  }
);

let accessToken: string | null = null;

export const tokenStore = {
  get() {
    if (accessToken) return accessToken;
    // Optional fallback (if you want persistence):
    if (typeof window !== "undefined") return localStorage.getItem("access_token");
    return null;
  },
  set(token: string | null) {
    accessToken = token;
    if (typeof window !== "undefined") {
      if (token) localStorage.setItem("access_token", token);
      else localStorage.removeItem("access_token");
    }
  },
  clear() {
    this.set(null);
  },
};

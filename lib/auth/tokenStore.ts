let accessToken: string | null = null;

export const tokenStore = {
  get() {
    if (accessToken) return accessToken;
    if (typeof window !== "undefined") {
      const match = document.cookie.match(
        new RegExp(`(^| )access_token=([^;]+)`),
      );
      if (match) return match[2];
    }
    return null;
  },
  set(token: string | null) {
    accessToken = token;
    if (typeof window !== "undefined") {
      if (token) {
        // localStorage.setItem("access_token", token);
        document.cookie = `access_token=${token}; path=/; max-age=2592000; samesite=lax`;
      } else {
        // localStorage.removeItem("access_token");
        document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
  },
  clear() {
    // this.set(null, type);
    accessToken = null;
    if (typeof window !== "undefined") {
      // localStorage.removeItem("access_token");
      document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },
};

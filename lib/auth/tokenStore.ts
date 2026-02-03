let accessToken: string | null = null;

export const tokenStore = {
  get(type = "access") {
    if (accessToken) return accessToken;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`${type}_token`);
      if (stored) return stored;

      // Fallback to cookie
      const match = document.cookie.match(
        new RegExp(`(^| )${type}_token=([^;]+)`),
      );
      if (match) return match[2];
    }
    return null;
  },
  set(token: string | null, type = "access") {
    accessToken = token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem(`${type}_token`, token);
        document.cookie = `${type}_token=${token}; path=/; max-age=2592000; samesite=lax`;
      } else {
        localStorage.removeItem(`${type}_token`);
        document.cookie = `${type}_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
    }
  },
  clear(type = "access") {
    // this.set(null, type);
    accessToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem(`${type}_token`);
      document.cookie = `${type}_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  },
};

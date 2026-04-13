import { UserType } from "../types";

export const userStore = {
  get(): UserType | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("auth_user");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserType;
    } catch {
      localStorage.removeItem("auth_user");
      return null;
    }
  },
  set(user: UserType | null) {
    if (typeof window === "undefined") return;
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  },
  clear() {
    this.set(null);
  },
};

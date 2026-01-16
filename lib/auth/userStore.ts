type User = { id: number; name: string; email: string; role: string };

export const userStore = {
  get(): User | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("auth_user");
    return raw ? (JSON.parse(raw) as User) : null;
  },
  set(user: User | null) {
    if (typeof window === "undefined") return;
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  },
  clear() {
    this.set(null);
  },
};

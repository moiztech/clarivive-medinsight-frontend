"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { clientApi } from "@/lib/axios/client";
import { tokenStore } from "@/lib/auth/tokenStore";
import { userStore } from "@/lib/auth/userStore";

type User = any;

type AuthCtx = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string, remember = false) {
    const res = await clientApi.post("/auth/login", {
      email,
      password,
      remember,
    });

    if (!res.data?.access_token) {
      throw new Error(res.data?.message || "Login failed");
    }

    tokenStore.set(res.data.access_token);
    setUser(res.data.user ?? null);
    userStore.set(res.data.user ?? null);
  }

  async function signup(name: string, email: string, password: string) {
    const res = await clientApi.post("/auth/signup", { name, email, password });

    // If signup returns tokens (it does), auto-login user in app state:
    if (res.data?.access_token) tokenStore.set(res.data.access_token);
    setUser(res.data.user ?? null);
    userStore.set(res.data.user ?? null);
  }

  async function logout() {
    const token = tokenStore.get();
    tokenStore.clear();
    setUser(null);
    userStore.clear();
    await clientApi.post(
      "/auth/logout",
      {},
      token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
    );
  }

  // Optional: bootstrap session by attempting refresh once on load
  useEffect(() => {
    (async () => {
      try {
        // ✅ Restore user immediately (prevents “disappearing user” UI)
        const savedUser = userStore.get();
        if (savedUser) setUser(savedUser);

        // ✅ If access token missing, try refresh using cookie
        if (!tokenStore.get()) {
          const res = await clientApi.post("/auth/refresh");
          if (res.data?.access_token) tokenStore.set(res.data.access_token);
        }

        // If you later add /me endpoint, call it here to verify user is real.
      } catch {
        tokenStore.clear();
        userStore.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

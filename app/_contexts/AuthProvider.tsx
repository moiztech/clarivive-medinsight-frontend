"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { clientApi } from "@/lib/axios";
import { tokenStore } from "@/lib/auth/tokenStore";

import { UserType } from "@/lib/types";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthCtx = {
  user: UserType | null;
  loading: boolean;
  setUser: (user: UserType | null) => void;
  login: (email: string, password: string) => Promise<UserType>;
  signup: (name: string, email: string, password: string) => Promise<UserType>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    const res = await clientApi.post("/auth/login", {
      email,
      password,
    });

    if (!res.data?.access_token) {
      throw new Error(res.data?.message || "Login failed");
    }

    tokenStore.set(res.data.access_token);
    const nextUser = res.data.user ?? null;
    setUser(nextUser);

    return nextUser;
  }

  async function signup(name: string, email: string, password: string) {
    const res = await clientApi.post("/auth/signup", { name, email, password });

    if (res.data?.access_token) tokenStore.set(res.data.access_token);
    const nextUser = res.data.user ?? null;
    setUser(nextUser);
    return nextUser;
  }

  async function logout() {
    try {
      // Attempt server-side logout, but don't let failures block the UI logout
      // We try both common logout paths to be safe
      await Promise.allSettled([
        protectedApi.post("/auth/logout"),
        protectedApi.post("/learner/logout")
      ]);
      toast.success("Logout successful");
    } catch (error) {
      console.log("Server logout failed, clearing local session", error);
    } finally {
      // Always clear local state regardless of server response
      tokenStore.clear();
      setUser(null);
      router.push("/");
      // Force a window reload to clear any residual cache/state if needed
      setTimeout(() => {
        if (typeof window !== 'undefined') window.location.href = "/";
      }, 100);
    }
  }

  // Optional: bootstrap session by attempting refresh once on load
  useEffect(() => {
    (async () => {
      try {
        const token = tokenStore.get();
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await protectedApi.get("/verify-token");
        if (res.status != 401) {
          const nextUser =
            res.data?.user ?? res.data?.data?.user ?? res.data?.data ?? null;
          setUser(nextUser);
        }
        return;
      } catch (err) {
        console.log("Failed to bootstrap session", err);
        tokenStore.clear();
        // userStore.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Ctx.Provider value={{ user, loading, login, signup, logout, setUser }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

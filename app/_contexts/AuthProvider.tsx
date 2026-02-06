"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { clientApi, serverApi } from "@/lib/axios";
import { tokenStore } from "@/lib/auth/tokenStore";

import { UserType } from "@/lib/types";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthCtx = {
  user: UserType | null;
  loading: boolean;
  setUser: (user: UserType | null) => void;
  login: (email: string, password: string) => Promise<string>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    const res = await serverApi.post("/auth/login", {
      email,
      password,
    });

    if (!res.data?.token) {
      throw new Error(res.data?.message || "Login failed");
    }

    tokenStore.set(res.data.token);
    setUser(res.data.data ?? null);
    return res.data.data.role.name;
    // userStore.set(res.data.data ?? null);
  }

  async function signup(name: string, email: string, password: string) {
    const res = await clientApi.post("/auth/signup", { name, email, password });

    if (res.data?.token) tokenStore.set(res.data.token);
    // setUser(res.data.user ?? null);
    // userStore.set(res.data.user ?? null);
  }

  async function logout() {
    try {
      await protectedApi.post("/company/auth/logout");
      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    } finally {
      tokenStore.clear();
      setUser(null);
      router.push("/");
    }
  }

  // Optional: bootstrap session by attempting refresh once on load
  useEffect(() => {
    (async () => {
      try {
        const res = await protectedApi.get("/verify-token");
        if (res.status != 401) {
          setUser(res.data.data ?? null);
          // userStore.set(res.data.data ?? null);
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

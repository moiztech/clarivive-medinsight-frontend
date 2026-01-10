"use client";
import React from "react";
import { useAuth } from "./useAuth";
import { UserType } from "@/lib/types";

type AuthResponse = {
  user: UserType;
  token: string;
};

const TOKEN_KEY = "auth_token";

export function useAuthActions() {
  const { saveUser } = useAuth();

  const login = (response: AuthResponse) => {
    saveUser(response.user);
    localStorage.setItem(TOKEN_KEY, response.token);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    saveUser(null as any); // we’ll fix this properly below
  };

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  return {
    login,
    logout,
    getToken,
  };
}

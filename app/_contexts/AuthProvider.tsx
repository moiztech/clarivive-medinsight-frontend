"use client";
import React, { createContext, useState } from "react";
import { AuthContextType, UserType } from "@/lib/types";

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<UserType | null>(null);
  const saveUser = (user: UserType) => {
    setUser(user);
  };
  return <AuthContext.Provider value={{ user, saveUser }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/app/_contexts/AuthProvider";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

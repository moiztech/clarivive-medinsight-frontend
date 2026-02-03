"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CompanyType } from "@/lib/types";

type CompanyCtx = {
  company: CompanyType | null;
  loading: boolean;
  setCompany: (company: CompanyType | null) => void;
};

const Ctx = createContext<CompanyCtx | null>(null);

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompanyState] = useState<CompanyType | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("company_data");
        if (stored) {
          setCompanyState(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Failed to load company data", err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const setCompany = (data: CompanyType | null) => {
    setCompanyState(data);
    if (typeof window !== "undefined") {
      if (data) {
        localStorage.setItem("company_data", JSON.stringify(data));
      } else {
        localStorage.removeItem("company_data");
      }
    }
  };

  return (
    <Ctx.Provider value={{ company, loading, setCompany }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCompany() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompany must be used within CompanyProvider");
  return ctx;
}

// app/(root)/layout.tsx
import type React from "react";
import MainLayout from "@/components/MainLayout";

export default function RootGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MainLayout>{children}</MainLayout>;
}

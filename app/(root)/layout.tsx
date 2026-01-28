// app/(root)/layout.tsx
import type React from "react";
import MainLayout from "@/components/MainLayout";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      disableTransitionOnChange
    >
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  );
}

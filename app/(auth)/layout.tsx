// app/(auth)/layout.tsx
import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";

export default function AuthGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      disableTransitionOnChange
    >
      <div className="min-h-screen flex items-center relative justify-between bg-background">
        <div className="absolute top-10 left-10">
          <Link href={"/"}>
            <Button variant="link" size="icon-lg" className="text-primary-blue">
              <ArrowLeft className="size-6" />
            </Button>
          </Link>
        </div>

        {children}
      </div>
    </ThemeProvider>
  );
}

import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import NextTopLoader from "nextjs-toploader";
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "../_contexts/AuthProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Clarivive Medinsight  - Your trusted partner for digital healthcare excellence & compliance",
  description: "Expand your skills in development, testing, analysis, and designing. Join 50K+ students in our learning platform.",
};

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <NextTopLoader
          color="#000066"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD, 0 0 5px #2299DD"
        />
        <div className="min-h-screen flex items-center relative justify-between bg-background">
          <div className="absolute top-10 left-10">
            <Link href={'/'}>
              <Button variant={'link'} size={'icon-lg'} className="text-primary-blue">
                <ArrowLeft className="size-6"/>
              </Button>
            </Link>
          </div>
          <AuthProvider>{children}</AuthProvider>
          <Toaster richColors position="bottom-right" />
        </div>
        <Analytics />
      </body>
    </html>
  );
}

import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/app/globals.css";
import NextTopLoader from "nextjs-toploader";
import Image from "next/image";

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
          color="#1321f1"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD, 0 0 5px #2299DD"
        />
        <div className="min-h-screen flex items-center justify-between bg-background">
            {children}
            <div className="h-screen hidden lg:block lg:w-1/2 overflow-hidden rounded-l-4xl">
                <Image src={'/images/auth-page-side.jpg'} alt="Auth page side image" height={100} width={400} className="w-full! h-full! object-cover object-center"/>
            </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}

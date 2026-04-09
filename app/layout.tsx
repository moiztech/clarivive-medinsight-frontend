// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "./_contexts/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title:
    "Clarivive Medinsight  - Your trusted partner for digital healthcare excellence & compliance",
  description:
    "Expand your skills in development, testing, analysis, and designing. Join 50K+ students in our learning platform.",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.png" },
      { rel: "icon", url: "/favicon.png", sizes: "192x192" },
      { rel: "icon", url: "/favicon.png", sizes: "512x512" },
    ],
    apple: [
      { rel: "apple-touch-icon", url: "/favicon.png" },
      { rel: "apple-touch-icon", url: "/favicon.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" id="root" suppressHydrationWarning>
        <NextTopLoader
          color="#000099"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD, 0 0 5px #2299DD"
        />

        <AuthProvider>
          <Providers>{children}</Providers>
          <Toaster richColors position="bottom-right" />
        </AuthProvider>

        {/* <Analytics /> */}
      </body>
    </html>
  );
}

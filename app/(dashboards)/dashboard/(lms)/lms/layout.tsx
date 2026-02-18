import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative min-h-[100vh-5rem]">{children}</div>;
}

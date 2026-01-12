"use client";
import React, { useState } from "react";
import LoadingSkeleton from "@/components/home/LoadingSkeleton";
import { LoadingSkeletonProps } from "@/components/home/LoadingSkeleton";
import TopBar from "./home/top-bar";
import Header from "./home/header";
import { Footer } from "./home/footer";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [loadingFinished, setLoadingFinished] = useState(false);

  const loadingSkeletonProps: LoadingSkeletonProps = {
    minDuration: 1200,
    onFinish: () => setLoadingFinished(true),
  };

  return (
    <LoadingSkeleton {...loadingSkeletonProps}>
      <div className="min-h-screen" >
        <TopBar />
        <Header />
        {children}
      </div>
      <Footer />
    </LoadingSkeleton>
  );
}

export default MainLayout;

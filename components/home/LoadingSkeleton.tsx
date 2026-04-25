"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export type LoadingSkeletonProps = {
  minDuration?: number;
  onFinish?: () => void;
  children?: React.ReactNode;
};

function LoadingSkeleton({
  minDuration = 500,
  onFinish,
  children,
}: LoadingSkeletonProps) {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const ms = Math.max(0, minDuration ?? 0);
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, ms);
    return () => clearTimeout(timer);
  }, [minDuration, onFinish]);

  if (!mounted) {
    return (
      <div className="h-screen w-full bg-white flex justify-center items-center">
        <Image
          src={"/Clarivive medinsight logo-01.png"}
          alt="logo"
          width={220}
          height={100}
        />
      </div>
    );
  }

  if (visible) {
    return (
      <div className="h-screen w-full bg-white flex justify-center items-center" suppressHydrationWarning>
        <Image
          src={"/Clarivive medinsight logo-01.png"}
          alt="logo"
          className="animate-bounce spin-in"
          width={220}
          height={100}
        />
      </div>
    );
  }

  return <>{children}</>;
}

export default LoadingSkeleton;

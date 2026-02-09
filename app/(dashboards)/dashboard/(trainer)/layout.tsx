"use client";

import React from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Home, BookOpen, Loader2 } from "lucide-react";

const lmsNavItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard/trainer",
  },
  {
    icon: BookOpen,
    label: "Assigned Courses",
    href: "/dashboard/trainer/assigned-courses",
  },
];

import { useAuth } from "@/app/_contexts/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LmsSidebar } from "../(lms)/_components/lms-sidebar";
import { TrainerHeader } from "./_components/TrainerHeader";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("You are not logged in");
        router.push("/login?callbackUrl=/dashboard/trainer");
      } else if (user.role.name !== "trainer") {
        toast.error("You need to login as a trainer to access this page");
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary-blue" />
      </div>
    );
  }

  if (!user || user.role.name !== "trainer") {
    return null; // Will redirect via useEffect
  }

  return (
    <DashboardLayoutContent
      sidebar={<LmsSidebar navItems={lmsNavItems} />}
      header={<TrainerHeader />}
    >
      {children}
    </DashboardLayoutContent>
  );
}

"use client";

import React from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Home, BookOpen, Award, Settings } from "lucide-react";

const lmsNavItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard/lms",
  },
  {
    icon: BookOpen,
    label: "My Courses",
    href: "/dashboard/lms/courses",
  },
  {
    icon: Award,
    label: "Certificates",
    href: "/dashboard/lms/certificates",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/lms/settings",
  },
];

import { LmsSidebar } from "./_components/lms-sidebar";
import { LmsHeader } from "./_components/lms-header";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) {
    toast.error("You are not logged in");
    return redirect("/login?callbackUrl=/dashboard/lms");
  } else if (user.role.name !== "learner") {
    toast.error("You need to login as a learner to access this page");
    return redirect("/");
  }
  return (
    <DashboardLayoutContent
      sidebar={<LmsSidebar navItems={lmsNavItems} />}
      header={<LmsHeader />}
    >
      {children}
    </DashboardLayoutContent>
  );
}

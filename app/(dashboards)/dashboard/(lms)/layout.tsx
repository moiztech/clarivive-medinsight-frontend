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

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutContent
      sidebar={<LmsSidebar navItems={lmsNavItems} />}
      header={<LmsHeader />}
    >
      {children}
    </DashboardLayoutContent>
  );
}

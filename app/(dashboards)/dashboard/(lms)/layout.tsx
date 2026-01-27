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

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutContent navItems={lmsNavItems}>
      {children}
    </DashboardLayoutContent>
  );
}

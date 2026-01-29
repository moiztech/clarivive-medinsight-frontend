"use client";

import React from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Home, Users, Settings } from "lucide-react";

const companyNavItems = [
  {
    icon: Home,
    label: "Dashboard",
    children: [
      {
        label: "Company Overview",
        href: "/company",
      },
      {
        label: "LMS",
        href: "/lms",
      },
    ],
  },
  {
    icon: Users,
    label: "Employees",
    href: "/company/employees",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/company/settings",
  },
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutContent navItems={companyNavItems}>
      {children}
    </DashboardLayoutContent>
  );
}

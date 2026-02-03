"use client";

import React, { Children } from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Home, Users, Settings } from "lucide-react";
import { CompanySidebar } from "../_components/company-sidebar";
import { CompanyHeader } from "../_components/company-header";

const companyNavItems = [
  {
    icon: Home,
    label: "Dashboard",
    children: [
      {
        label: "Company Overview",
        href: "/company",
      },
    ],
  },
  {
    icon: Users,
    label: "Employees",
    // href: "/company/employees",
    children: [
      {
        label: "Add New Employee",
        href: "/company/employees/add",
      },
      {
        label: "Employees List",
        href: "/company/employees",
      },
    ],
  },
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutContent
      sidebar={<CompanySidebar navItems={companyNavItems} />}
      header={<CompanyHeader />}
    >
      {children}
    </DashboardLayoutContent>
  );
}

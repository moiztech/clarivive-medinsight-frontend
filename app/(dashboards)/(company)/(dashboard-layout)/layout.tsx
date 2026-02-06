"use client";

import React from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Home, Users } from "lucide-react";
import { CompanySidebar } from "../_components/company-sidebar";
import { CompanyHeader } from "../_components/company-header";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { redirect } from "next/navigation";
import { toast } from "sonner";

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
  const { user } = useAuth();
  if (!user) {
    toast.error("You are not logged in");
    return redirect("/login?callbackUrl=/company");
  } else if (user.role.name !== "company_admin") {
    toast.error("You are not authorized to access this page");
    return redirect("/");
  }
  return (
    <DashboardLayoutContent
      sidebar={<CompanySidebar navItems={companyNavItems} />}
      header={<CompanyHeader />}
    >
      {children}
    </DashboardLayoutContent>
  );
}

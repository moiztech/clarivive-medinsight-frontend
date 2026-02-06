"use client";

import React from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Book, Home, Users } from "lucide-react";
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
  {
    icon: Book,
    label: "Courses",
    children: [
      {
        label: "Assign Courses",
        href: "/company/courses/assign",
      },
      {
        label: "Courses List",
        href: "/company/courses/list",
      },
    ],
  },
];

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
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

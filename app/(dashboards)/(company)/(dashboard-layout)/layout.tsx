"use client";

import React from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Book, Home, MessageCircle, Users } from "lucide-react";
import { CompanySidebar } from "../_components/company-sidebar";
import { CompanyHeader } from "../_components/company-header";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

const companyNavItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/company",
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
        label: "Book Trainings",
        href: "/company/courses/book",
      },
      {
        label: "Booked Schedules",
        href: "/company/bookings",
      },
      {
        label: "Courses List",
        href: "/company/courses/list",
      },
    ],
  },
  {
    icon: MessageCircle,
    label: "Chats",
    href: "/company/chats",
  },
];

export default function CompanyLayout({
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
        router.push("/login?callbackUrl=/company");
        return;
      }
      const roleName = (typeof user.role === "string" ? user.role : user.role?.name)?.toLowerCase() || "";
      if (roleName !== "company_admin" && roleName !== "companyadmin") {
        toast.error("You are not authorized to access this page");
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentRoleName = (typeof user?.role === "string" ? user.role : user?.role?.name)?.toLowerCase() || "";
  if (!user || (currentRoleName !== "company_admin" && currentRoleName !== "companyadmin")) {
    return null; // Will redirect via useEffect
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

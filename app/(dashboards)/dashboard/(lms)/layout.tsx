"use client";

import React from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Home, BookOpen, MessageCircle, List } from "lucide-react";

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
    icon: BookOpen,
    label: "Booked Sessions",
    href: "/dashboard/lms/booked-sessions",
  },
  {
    icon: MessageCircle,
    label: "Chats",
    href: "/dashboard/lms/chats",
  },
  // if user role is employee, skip this one:
  {
    icon: List,
    label: "Orders",
    href: "/dashboard/lms/orders",
  },
];

import { LmsSidebar } from "./_components/lms-sidebar";
import { LmsHeader } from "./_components/lms-header";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LMSLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("You are not logged in");
        router.push("/login?callbackUrl=/dashboard/lms");
        return;
      }
      const roleName = (typeof user.role === "string" ? user.role : user.role?.name)?.toLowerCase() || "";
      if (roleName !== "learner" && roleName !== "employee") {
        toast.error("You need to login as a learner to access this page");
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentRoleName = (typeof user?.role === "string" ? user.role : user?.role?.name)?.toLowerCase() || "";
  if (!user || (currentRoleName !== "learner" && currentRoleName !== "employee")) {
    return null; // Will redirect via useEffect
  }

  const filteredNavItems = lmsNavItems.filter((item) => {
    const currentRoleName = typeof user?.role === "string" ? user.role : user?.role?.name;
    if (currentRoleName === "employee" && item.label === "Orders") return false;
    return true;
  });

  return (
    <DashboardLayoutContent
      sidebar={<LmsSidebar navItems={filteredNavItems} />}
      header={<LmsHeader />}
    >
      {children}
    </DashboardLayoutContent>
  );
}

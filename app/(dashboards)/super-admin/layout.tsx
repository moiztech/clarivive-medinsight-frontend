"use client";

import React, { useEffect } from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { SuperAdminSidebar } from "./_components/super-admin-sidebar";
import { SuperAdminHeader } from "./_components/super-admin-header";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("You must be logged in to access this area.");
        router.push("/login?callbackUrl=/super-admin");
        return;
      }

      const roleName = (typeof user.role === "string" ? user.role : user.role?.name)?.toLowerCase() || "";
      const allowedRoles = ["super-admin", "super_admin", "superadmin", "admin"];
      if (!allowedRoles.includes(roleName)) {
        toast.error("Unauthorized access.");
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const roleName = (typeof user?.role === "string" ? user.role : user?.role?.name)?.toLowerCase() || "";
  const allowedRoles = ["super-admin", "super_admin", "superadmin", "admin"];
  if (!user || !allowedRoles.includes(roleName)) {
    return null;
  }

  return (
    <DashboardLayoutContent
      sidebar={<SuperAdminSidebar />}
      header={<SuperAdminHeader />}
    >
      {children}
    </DashboardLayoutContent>
  );
}

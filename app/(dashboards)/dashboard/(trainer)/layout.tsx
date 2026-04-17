"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayoutContent } from "@/components/dashboard/dashboard-layout-content";
import { Book, Calendar, Home, Loader2, MessageSquare } from "lucide-react";

const lmsNavItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard/trainer",
  },
  {
    icon: Book,
    label: "Assigned Courses",
    href: "/dashboard/trainer/courses/list",
  },
  {
    icon: Calendar,
    label: "Assigned Trainings",
    href: "/dashboard/trainer/assigned-trainings",
  },
  {
    icon: MessageSquare,
    label: "Chats",
    href: "/dashboard/trainer/chats",
  },
];

import { useAuth } from "@/app/_contexts/AuthProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TrainerSidebar } from "./_components/trainer-sidebar";
import { TrainerHeader } from "./_components/TrainerHeader";
import { useUnreadMessageCount } from "@/hooks/useUnreadMessageCount";
import { AnnouncementBar } from "@/components/dashboard/announcement-bar";
import protectedApi from "@/lib/axios/protected";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const unreadCount = useUnreadMessageCount(!!user && user.role.name === "trainer");
  const [newTrainingCount, setNewTrainingCount] = useState(0);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("You are not logged in");
        router.push("/login?callbackUrl=/dashboard/trainer");
        return;
      }
      const roleName = (typeof user.role === "string" ? user.role : user.role?.name)?.toLowerCase() || "";
      if (user.must_accept_declaration) {
        router.push("/declaration?callbackUrl=%2Fdashboard%2Ftrainer");
      } else if (roleName !== "trainer") {
        toast.error("You need to login as a trainer to access this page");
        router.push("/");
      }
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchTrainingNotifications = async () => {
      if (!user || user.role.name !== "trainer") return;

      try {
        const res = await protectedApi.get("/trainer/schedules");
        const schedules = res.data?.data ?? [];
        const freshSchedules = schedules.filter((schedule: { created_at?: string }) => {
          if (!schedule.created_at) return false;
          const createdAt = new Date(schedule.created_at).getTime();
          return Date.now() - createdAt <= 7 * 24 * 60 * 60 * 1000;
        });
        setNewTrainingCount(freshSchedules.length);
      } catch (error) {
        console.error("Failed to fetch trainer notifications", error);
      }
    };

    fetchTrainingNotifications();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary-blue" />
      </div>
    );
  }

  const currentRoleName = (typeof user?.role === "string" ? user.role : user?.role?.name)?.toLowerCase() || "";
  if (!user || user.must_accept_declaration || currentRoleName !== "trainer") {
    return null; // Will redirect via useEffect
  }

  const navItems = lmsNavItems.map((item) => {
    if (item.label === "Chats" && unreadCount > 0) {
      return { ...item, badge: unreadCount };
    }

    if (item.label === "Assigned Trainings" && newTrainingCount > 0) {
      return { ...item, badge: newTrainingCount };
    }

    return item;
  });

  return (
    <DashboardLayoutContent
      sidebar={<TrainerSidebar navItems={navItems} />}
      header={<TrainerHeader />}
    >
      <AnnouncementBar />
      {children}
    </DashboardLayoutContent>
  );
}

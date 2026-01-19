"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { AttendanceChart } from "@/components/dashboard/attendance-chart";
import { NoticeBoard } from "@/components/dashboard/notice-board";
import { LeaveRequests } from "@/components/dashboard/leave-requests";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";
import { UpcomingEvents } from "@/components/dashboard/upcoming-events";
import { UserOverview } from "@/components/dashboard/user-overview";
import { IncomeVsExpense } from "@/components/dashboard/income-vs-expense";
import { TopTeachers } from "@/components/dashboard/top-teachers";
import { NewAdmissions } from "@/components/dashboard/new-admissions";
import { TopStudents } from "@/components/dashboard/top-students";
import { Users, Users2, BookOpen, BarChart3, Award, Zap } from "lucide-react";

export default function Dashboard() {
  const statCards = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "bg-orange-500",
    },
    {
      icon: <Users2 className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "bg-blue-500",
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "bg-purple-500",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "bg-emerald-500",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "bg-cyan-500",
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "bg-indigo-500",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="p-6 space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
              <p className="text-sm text-muted-foreground">
                School • Manage your school, track attendance, expense, and net
                worth.
              </p>
            </div>
            <div className="flex flex-col xl:flex-row gap-4 w-full justify-stretch">
              {/* Stat Cards - 3x2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-3 gap-4">
                {statCards.map((card, index) => (
                  <StatCard
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    value={card.value}
                    change={card.change}
                    trend={card.trend}
                    backgroundColor={card.backgroundColor}
                  />
                ))}
              </div>
              <div className="grow min-w-md">
                <AttendanceChart />
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-4 w-full justify-stretch">
              {/* Charts Row - Revenue (2/3) + Attendance (1/3) */}
              <div className="flex flex-col gap-4 h-full">
                <RevenueChart />
                {/* Notice Board & Leave Requests + Calendar & Events */}
                <div className="grid grid-cols-1 lg:grid-cols-4 h-full gap-4">
                  <div className="lg:col-span-2 flex flex-col h-full">
                    <NoticeBoard />
                  </div>
                  <div className="lg:col-span-2 flex flex-col h-full">
                    <LeaveRequests />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 min-w-md">
                <CalendarWidget />
                <UpcomingEvents />
              </div>
            </div>

            {/* Charts Row - User Overview + Income vs Expense */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <UserOverview />
              <IncomeVsExpense />
            </div>

            {/* Bottom Row - Top Teachers, New Admissions, Top Students */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TopTeachers />
              <NewAdmissions />
              <TopStudents />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import { StatCard, StatCardProps } from "@/components/dashboard/stat-card";
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
      backgroundColor: "orange-500",
      chartType: "bar" as const,
      chartData: [
        { month: "Jan", desktop: 186 },
        { month: "Feb", desktop: 305 },
        { month: "Mar", desktop: 237 },
        { month: "Apr", desktop: 273 },
      ],
    },
    {
      icon: <Users2 className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "blue-500",
      chartType: "line" as const,
      chartData: [
        { month: "Jan", desktop: 200 },
        { month: "Feb", desktop: 280 },
        { month: "Mar", desktop: 320 },
        { month: "Apr", desktop: 350 },
      ],
    },
    {
      icon: <Users className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "purple-500",
      chartType: "bar" as const,
      chartData: [
        { month: "Jan", desktop: 150 },
        { month: "Feb", desktop: 220 },
        { month: "Mar", desktop: 290 },
        { month: "Apr", desktop: 310 },
      ],
    },
    {
      icon: <BookOpen className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "emerald-500",
      chartType: "line" as const,
      chartData: [
        { month: "Jan", desktop: 180 },
        { month: "Feb", desktop: 240 },
        { month: "Mar", desktop: 300 },
        { month: "Apr", desktop: 330 },
      ],
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "cyan-500",
      chartType: "bar" as const,
      chartData: [
        { month: "Jan", desktop: 210 },
        { month: "Feb", desktop: 260 },
        { month: "Mar", desktop: 315 },
        { month: "Apr", desktop: 340 },
      ],
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      title: "Total Student",
      value: "20,000",
      change: 8,
      trend: "up" as const,
      backgroundColor: "indigo-500",
      chartType: "line" as const,
      chartData: [
        { month: "Jan", desktop: 190 },
        { month: "Feb", desktop: 270 },
        { month: "Mar", desktop: 325 },
        { month: "Apr", desktop: 360 },
      ],
    },
  ] as StatCardProps[];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          School • Manage your school, track attendance, expense, and net worth.
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
              chartType={card.chartType}
              chartData={card.chartData}
            />
          ))}
        </div>
        <div className="grow min-w-md flex flex-col gap-4">
          <AttendanceChart />
          <CalendarWidget />
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
  );
}

"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { EarningsChart } from "@/components/dashboard/earnings-chart";
import { BookOpen, Users, Book, DollarSign } from "lucide-react";
import { useAuth } from "@/app/_contexts/AuthProvider";

const enrolledCoursesData = [
  { month: "Jan", desktop: 50 },
  { month: "Feb", desktop: 80 },
  { month: "Mar", desktop: 60 },
  { month: "Apr", desktop: 120 },
  { month: "May", desktop: 90 },
  { month: "Jun", desktop: 150 },
];

const totalStudentsData = [
  { month: "Jan", desktop: 200 },
  { month: "Feb", desktop: 400 },
  { month: "Mar", desktop: 300 },
  { month: "Apr", desktop: 500 },
  { month: "May", desktop: 450 },
  { month: "Jun", desktop: 600 },
];

const totalCoursesData = [
  { month: "Jan", desktop: 10 },
  { month: "Feb", desktop: 15 },
  { month: "Mar", desktop: 12 },
  { month: "Apr", desktop: 25 },
  { month: "May", desktop: 20 },
  { month: "Jun", desktop: 30 },
];

const totalEarningsData = [
  { month: "Jan", desktop: 1000 },
  { month: "Feb", desktop: 2500 },
  { month: "Mar", desktop: 1800 },
  { month: "Apr", desktop: 3000 },
  { month: "May", desktop: 2000 },
  { month: "Jun", desktop: 4500 },
];

export default function LMSDashboardPage() {
  const { user } = useAuth();
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome {user?.name}, to your Trainer Dashboard
        </h2>
        <p className="text-muted-foreground">
          Trainer Dashboard → Manage courses, sessions, and performance metrics
          in one centralized Trainer Dashboard.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 grid gap-6 md:grid-cols-2">
          <StatCard
            icon={<BookOpen className="h-6 w-6 text-blue-500" />}
            title="Enrolled Courses"
            value="500"
            change={43.9}
            trend="up"
            backgroundColor="blue-500"
            chartData={enrolledCoursesData}
            chartType="line"
            chartColor="#3b82f6" // Blue
          />
          <StatCard
            icon={<Users className="h-6 w-6 text-purple-500" />}
            title="Total Students"
            value="3,570"
            change={43.9}
            trend="up"
            backgroundColor="purple-500"
            chartData={totalStudentsData}
            chartType="bar"
            chartColor="#a855f7" // Purple
          />
          <StatCard
            icon={<Book className="h-6 w-6 text-orange-500" />}
            title="Total Courses"
            value="30"
            change={43.9}
            trend="up"
            backgroundColor="orange-500"
            chartData={totalCoursesData}
            chartType="bar"
            chartColor="#f97316" // Orange
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6 text-emerald-500" />}
            title="Total Earnings"
            value="$50,000"
            change={-20.3}
            trend="down"
            backgroundColor="emerald-500"
            chartData={totalEarningsData}
            chartType="line"
            chartColor="#10b981" // Emerald
          />
        </div>
        <div className="col-span-3">
          <EarningsChart />
        </div>
      </div>
    </div>
  );
}

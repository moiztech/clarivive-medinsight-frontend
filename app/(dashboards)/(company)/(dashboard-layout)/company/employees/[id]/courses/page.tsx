"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEmployee } from "../../../_hooks/useEmployee";
import EmployeeCourseCard, {
  EmployeeCourse,
} from "@/components/company/EmployeeCourseCard";
import {
  Loader2,
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface EmployeeData {
  id: number;
  name: string;
  email: string;
  contact: string;
  logo: string | null;
  role: {
    name: string;
  };
  created_at: string;
  courses: EmployeeCourse[];
  company_id: number;
}

function EmployeeCoursesPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { getEmployeeCourses } = useEmployee();

  const {
    data: employee,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employee-courses", id],
    queryFn: () => getEmployeeCourses(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="h-10 w-10 size-10 animate-spin text-primary-blue" />
          <p className="text-muted-foreground animate-pulse block">
            Loading courses...
          </p>
        </div>
      </div>
    );
  }

  if (isError || !employee) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-destructive">
        <p className="text-lg font-medium">Failed to load employee courses.</p>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  const empData = employee as EmployeeData;

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Employee Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Employee Profile Card */}
        <Card className="md:col-span-1 h-fit md:sticky top-4">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-2 border-primary/10">
              <AvatarImage src={empData.logo || ""} alt={empData.name} />
              <AvatarFallback className="text-2xl">
                {empData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">{empData.name}</h2>
              <Badge variant="outline" className="capitalize">
                {empData.role?.name || "Employee"}
              </Badge>
            </div>

            <Separator />

            <div className="w-full space-y-3 text-sm text-muted-foreground text-left">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="truncate" title={empData.email}>
                  {empData.email}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span>{empData.contact || "N/A"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-primary" />
                <span>Company ID: {empData.company_id}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  Joined {format(new Date(empData.created_at), "PPP")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Courses Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Assigned Courses</h2>
            <Badge variant="outline">
              {empData.courses?.length || 0} Courses
            </Badge>
          </div>

          {empData.courses && empData.courses.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              {empData.courses.map((course) => (
                <EmployeeCourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              <p>No courses assigned to this employee.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeeCoursesPage;

"use client";

import ContentWrapper from "@/components/dashboard/content-wrapper";
import React, { useState, useEffect, useMemo } from "react";
import {
  Check,
  Loader2,
  Search,
  Clock,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEmployee } from "../../_hooks/useEmployee";
import { useCourse } from "../../_hooks/useCourse";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import protectedApi from "@/lib/axios/protected";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Types
export interface Branch {
  id: number;
  title: string;
  slug: string;
  icon: string | null;
  location: string | null;
}

export interface Session {
  id: number;
  schedule_id: number;
  date: string;
  start_time: string;
  end_time: string;
}

export interface Schedule {
  id: number;
  course_id: number;
  branch_id: number;
  trainer_id: number;
  title: string;
  spaces_available: number;
  location: string;
  description: string;
  instruction: string;
  image: string | null;
  branch: Branch;
  course: any;
  sessions: Session[];
}

function BookTrainingsPage() {
  const { employees, getEmployees, loading: employeesLoading } = useEmployee();
  const { courses, getCourses, loading: coursesLoading } = useCourse();

  // Local state
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);

  // Selection state
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [selectedSchedule, setSelectedSchedule] = useState<number | null>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");

  const triggerSelectedCourse = (id: number) => {
    setSelectedCourse(id);
    setSelectedBranch(null);
    setSelectedSchedule(null);
    setSelectedEmployees([]);
  };

  // Filter face-to-face courses
  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) => course.course_type.slug === "face-to-face",
    );
  }, [courses]);

  const filteredBranches = useMemo(() => {
    if (!selectedCourse) return [];

    const course = courses.find((c) => c.id === selectedCourse);
    if (!course || !course.branches) return [];

    const courseBranchIds = course.branches.map((b) => b.id);
    return branches.filter((b) => courseBranchIds.includes(b.id));
  }, [selectedCourse, courses, branches]);

  useEffect(() => {
    getEmployees();
    getCourses();
    fetchBranches();
  }, [getEmployees, getCourses]);

  const fetchBranches = async () => {
    setLoadingBranches(true);
    try {
      // Trying public API first as requested
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/branches`,
      );
      if (res.ok) {
        const data = await res.json();
        setBranches(data.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch branches", error);
      toast.error("Failed to fetch branches");
    } finally {
      setLoadingBranches(false);
    }
  };

  useEffect(() => {
    const fetchSchedules = async () => {
      if (selectedCourse && selectedBranch) {
        setLoadingSchedules(true);
        try {
          const res = await protectedApi.get(
            `/company/branch-course-schedule`,
            {
              params: {
                branch_id: selectedBranch,
                course_id: selectedCourse,
              },
            },
          );
          if (res.data?.status) {
            setSchedules(res.data.data || []);
          } else {
            setSchedules([]);
          }
        } catch (error) {
          console.error("Failed to fetch schedules", error);
          toast.error("Failed to fetch schedules");
          setSchedules([]);
        } finally {
          setLoadingSchedules(false);
        }
      } else {
        setSchedules([]);
      }
    };

    // Reset schedule selection when dependencies change
    setSelectedSchedule(null);
    fetchSchedules();
  }, [selectedCourse, selectedBranch]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
        emp.email.toLowerCase().includes(employeeSearch.toLowerCase()),
    );
  }, [employees, employeeSearch]);

  const handleBookTrainings = async () => {
    if (!selectedSchedule) {
      toast.error("Please select a schedule");
      return;
    }
    if (selectedEmployees.length === 0) {
      toast.error("Please select at least one employee");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await protectedApi.post("/create-learner-booking", {
        schedule_id: selectedSchedule,
        student_ids: selectedEmployees,
      });

      if (res.data) {
        toast.success(res.data.message || "Bookings created successfully");

        // Reset selections on success
        setSelectedCourse(null);
        setSelectedBranch(null);
        setSelectedSchedule(null);
        setSelectedEmployees([]);
      }
    } catch (error: any) {
      console.error("Failed to book training:", error);
      toast.error(error.response?.data?.message || "Failed to book training");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleEmployee = (empId: number) => {
    setSelectedEmployees((prev) =>
      prev.includes(empId)
        ? prev.filter((id) => id !== empId)
        : [...prev, empId],
    );
  };

  const isLoading = coursesLoading || loadingBranches || employeesLoading;

  return (
    <ContentWrapper
      heading="Book Trainings"
      subHeading="Book face-to-face courses and schedule sessions for your employees"
    >
      <div className="max-w-6xl mx-auto space-y-8 pb-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Select Course */}
          <div className="md:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-blue">
                  <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-lg">Select Course</h3>
                </div>

                <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
                  <CardContent className="p-4 pt-6 space-y-4">
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {filteredCourses.map((course) => (
                        <button
                          key={course.id}
                          onClick={() => triggerSelectedCourse(course.id)}
                          className={`w-full flex cursor-pointer items-start gap-3 p-3 rounded-xl border transition-all ${
                            selectedCourse === course.id
                              ? "bg-primary-blue/10 border-primary-blue shadow-sm"
                              : "bg-background/30 border-border/50 hover:bg-muted/50"
                          }`}
                        >
                          {course.icon && (
                            <Image
                              src={course.icon}
                              alt={course.title}
                              width={40}
                              height={40}
                              className="rounded-md object-cover h-10 w-10"
                            />
                          )}
                          <div className="flex flex-col flex-1 items-start text-left">
                            <span className="font-semibold text-sm line-clamp-2">
                              {course.title}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" /> {course.duration}
                            </span>
                          </div>
                          {selectedCourse === course.id && (
                            <div className="text-primary-blue self-center">
                              <Check className="size-4" />
                            </div>
                          )}
                        </button>
                      ))}
                      {filteredCourses.length === 0 && !coursesLoading && (
                        <div className="text-center py-8 text-muted-foreground text-sm italic">
                          No face-to-face courses found.
                        </div>
                      )}
                      {coursesLoading && (
                        <div className="flex justify-center py-8">
                          <Loader2 className="size-6 animate-spin text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Step 2: Select Branch */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary-blue">
                  <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-lg">Select Branch</h3>
                </div>

                <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
                  <CardContent className="p-4 pt-6 space-y-4">
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {filteredBranches.map((branch) => (
                        <button
                          key={branch.id}
                          onClick={() => setSelectedBranch(branch.id)}
                          className={`w-full flex items-start p-3 gap-3 rounded-xl border transition-all ${
                            selectedBranch === branch.id
                              ? "bg-primary-blue/10 border-primary-blue shadow-sm"
                              : "bg-background/30 border-border/50 hover:bg-muted/50"
                          }`}
                        >
                          {branch.icon && (
                            <Image
                              src={branch.icon}
                              alt={branch.title}
                              width={40}
                              height={40}
                              className="rounded-md object-cover h-10 w-10"
                            />
                          )}
                          <div className="flex flex-col items-start justify-center flex-1 text-left">
                            <span className="font-semibold text-sm">
                              {branch.title}
                            </span>
                            {branch.location && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <MapPin className="h-3 w-3 shrink-0" />
                                <Link
                                  href={`/branches/${branch.slug}`}
                                  target="_blank"
                                  className="text-primary-blue hover:underline"
                                >
                                  View Branch
                                </Link>
                              </span>
                            )}
                          </div>
                          {selectedBranch === branch.id && (
                            <div className="text-primary-blue self-center">
                              <Check className="size-4" />
                            </div>
                          )}
                        </button>
                      ))}
                      {filteredBranches.length === 0 && !loadingBranches && (
                        <div className="text-center py-8 text-muted-foreground text-sm italic">
                          {selectedCourse
                            ? "No branches found for this course."
                            : "Please select a course to view available branches."}
                        </div>
                      )}
                      {loadingBranches && (
                        <div className="flex justify-center py-8">
                          <Loader2 className="size-6 animate-spin text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Step 3 & 4: Schedules and Employees */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg flex items-center justify-between w-full">
                  <span>Available Schedules</span>
                  {selectedCourse && selectedBranch && loadingSchedules && (
                    <span className="text-xs flex items-center gap-1 font-normal text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" /> Fetching
                      schedules...
                    </span>
                  )}
                </h3>
              </div>

              <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
                <CardContent className="p-6">
                  {!selectedCourse || !selectedBranch ? (
                    <div className="text-center py-12 text-muted-foreground">
                      Please select both a course and a branch to view
                      schedules.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {schedules.map((schedule) => (
                        <div
                          key={schedule.id}
                          className={`flex flex-col gap-4 p-5 rounded-xl border transition-all ${
                            selectedSchedule === schedule.id
                              ? "bg-primary-blue/5 border-primary-blue shadow-sm cursor-pointer ring-1 ring-primary-blue"
                              : "bg-background/30 border-border/50 hover:bg-muted/50 cursor-pointer"
                          }`}
                          onClick={() => setSelectedSchedule(schedule.id)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-4">
                              <div className="mt-1">
                                <div
                                  className={`h-5 w-5 rounded-full border flex shrink-0 items-center justify-center ${selectedSchedule === schedule.id ? "border-primary-blue bg-primary-blue" : "border-muted-foreground"}`}
                                >
                                  {selectedSchedule === schedule.id && (
                                    <Check className="h-3 w-3 text-white" />
                                  )}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-semibold text-base">
                                  {schedule.title}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />{" "}
                                    {schedule.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />{" "}
                                    {schedule.spaces_available} spaces
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                  {schedule.description}
                                </p>
                              </div>
                            </div>
                            {schedule.image && (
                              <Image
                                src={schedule.image}
                                alt={schedule.title}
                                width={80}
                                height={60}
                                className="rounded-lg object-cover h-16 w-24 shrink-0 shadow-sm"
                              />
                            )}
                          </div>

                          <div className="bg-background/50 rounded-lg p-3 mt-2 shadow-sm border border-border/40">
                            <h5 className="text-xs font-semibold mb-2 flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> Training Sessions
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {schedule.sessions?.map((session) => (
                                <div
                                  key={session.id}
                                  className="text-xs flex items-center gap-2 bg-primary-blue/10 p-2 rounded-md"
                                >
                                  <div className="font-medium">
                                    {new Date(
                                      session.date,
                                    ).toLocaleDateString()}
                                  </div>
                                  <div className="text-muted-foreground">
                                    {session.start_time.substring(0, 5)} -{" "}
                                    {session.end_time.substring(0, 5)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                      {schedules.length === 0 && !loadingSchedules && (
                        <div className="text-center py-10 text-muted-foreground italic">
                          No schedules available for this course and branch.
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Step 4: Employees Select */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold">
                  4
                </div>
                <h3 className="font-semibold text-lg flex items-center justify-between w-full">
                  <span>Select Employees</span>
                </h3>
              </div>

              <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
                <CardContent className="p-6">
                  <div className="relative group mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employee..."
                      className="pl-10 h-10 bg-background/50"
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredEmployees.map((emp) => {
                      const isSelected = selectedEmployees.includes(emp.id);
                      return (
                        <div
                          key={emp.id}
                          className={`flex items-start gap-4 p-3 rounded-xl border transition-all ${
                            isSelected
                              ? "bg-primary-blue/5 border-primary-blue shadow-sm cursor-pointer"
                              : "bg-background/30 border-border/50 hover:bg-muted/50 cursor-pointer"
                          }`}
                          onClick={() => toggleEmployee(emp.id)}
                        >
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => {}} // Controlled by parent div
                            className="mt-1"
                          />
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={emp.logo ? emp.logo : ""} />
                            <AvatarFallback>
                              {emp.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <span className="font-semibold text-sm block">
                              {emp.name}
                            </span>
                            <span className="text-xs text-muted-foreground block truncate">
                              {emp.email}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    {filteredEmployees.length === 0 && !employeesLoading && (
                      <div className="col-span-full text-center py-10 text-muted-foreground italic">
                        No employees found.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 5: Summary & Action */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold">
                  5
                </div>
                <h3 className="font-semibold text-lg">Confirm Booking</h3>
              </div>

              <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                      <div className="flex-1 space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                          Selected Schedule
                        </Label>
                        {selectedSchedule ? (
                          <Badge
                            variant="default"
                            className="py-1 px-3 text-sm flex items-center gap-2"
                          >
                            <Calendar className="size-3" />
                            {
                              schedules.find((s) => s.id === selectedSchedule)
                                ?.title
                            }
                          </Badge>
                        ) : (
                          <span className="text-sm text-destructive font-medium italic block">
                            No schedule selected
                          </span>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                          Employees ({selectedEmployees.length})
                        </Label>
                        {selectedEmployees.length > 0 ? (
                          <div className="flex -space-x-2 overflow-hidden items-center group">
                            {selectedEmployees.slice(0, 5).map((id) => {
                              const emp = employees.find((e) => e.id === id);
                              return (
                                <div
                                  key={id}
                                  className="h-8 w-8 rounded-full ring-2 ring-background bg-muted flex items-center justify-center text-xs font-semibold z-10"
                                  title={emp?.name}
                                >
                                  {emp?.name.charAt(0)}
                                </div>
                              );
                            })}
                            {selectedEmployees.length > 5 && (
                              <div className="h-8 w-8 rounded-full ring-2 ring-background bg-primary-blue text-white flex items-center justify-center text-xs font-semibold z-10">
                                +{selectedEmployees.length - 5}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-destructive font-medium italic block">
                            No employees selected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex flex-col md:flex-row gap-4 md:items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      This will book {selectedEmployees.length} employee
                      {selectedEmployees.length !== 1 ? "s" : ""} into the
                      selected schedule.
                    </p>
                    <Button
                      variant="primary"
                      size="xl"
                      className="px-10 shadow-lg shadow-primary-blue/20"
                      disabled={
                        isSubmitting ||
                        !selectedSchedule ||
                        selectedEmployees.length === 0
                      }
                      onClick={handleBookTrainings}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Booking...
                        </>
                      ) : (
                        "Book Trainings"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default BookTrainingsPage;

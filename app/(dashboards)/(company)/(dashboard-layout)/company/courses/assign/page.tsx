"use client";

import ContentWrapper from "@/components/dashboard/content-wrapper";
import React, { useState, useEffect, useMemo } from "react";
import { User, Check, Loader2, Search, X, Clock, Layout } from "lucide-react";
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
import { EmployeeCourse } from "@/components/company/EmployeeCourseCard";

function AssignCoursesPage() {
  const {
    employees,
    getEmployees,
    loading: employeesLoading,
    getEmployeeCourses,
  } = useEmployee();
  const {
    courses,
    getCourses,
    assignCourses,
    loading: coursesLoading,
  } = useCourse();

  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [assignedCourseIds, setAssignedCourseIds] = useState<number[]>([]);
  const [fetchingCourses, setFetchingCourses] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeSearch, setEmployeeSearch] = useState("");

  useEffect(() => {
    getEmployees();
    getCourses();
  }, [getEmployees, getCourses]);

  // Fetch employee courses when an employee is selected
  useEffect(() => {
    const fetchAssignedCourses = async () => {
      if (selectedEmployee) {
        setFetchingCourses(true);
        const employeeCourses = await getEmployeeCourses(selectedEmployee);

        let coursesList: EmployeeCourse[] = [];

        if (employeeCourses) {
          if (Array.isArray(employeeCourses)) {
            coursesList = employeeCourses;
          } else if (
            typeof employeeCourses === "object" &&
            "courses" in employeeCourses
          ) {
            const coursesWithIds = (
              employeeCourses as { courses: EmployeeCourse[] }
            ).courses;
            if (Array.isArray(coursesWithIds)) {
              coursesList = coursesWithIds;
            }
          }
        }

        if (coursesList.length > 0) {
          const ids = coursesList.map((c) => c.id);
          setAssignedCourseIds(ids);
        } else {
          setAssignedCourseIds([]);
        }

        setFetchingCourses(false);
        // Clear selected courses when switching employees to avoid confusion
        setSelectedCourses([]);
      } else {
        setAssignedCourseIds([]);
        setSelectedCourses([]);
      }
    };

    fetchAssignedCourses();
  }, [selectedEmployee, getEmployeeCourses]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
        emp.email.toLowerCase().includes(employeeSearch.toLowerCase()),
    );
  }, [employees, employeeSearch]);

  const selectedEmployeeData = useMemo(() => {
    return employees.find((emp) => emp.id === selectedEmployee);
  }, [employees, selectedEmployee]);

  const toggleCourse = (courseId: number) => {
    // Prevent toggling if course is already assigned
    if (assignedCourseIds.includes(courseId)) return;

    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const handleAssign = async () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }
    if (selectedCourses.length === 0) {
      toast.error("Please select at least one course");
      return;
    }

    setIsSubmitting(true);
    const result = await assignCourses({
      employee_id: selectedEmployee,
      course_ids: selectedCourses,
    });

    if (result) {
      // Refresh the assigned courses list
      const employeeCourses = await getEmployeeCourses(selectedEmployee);
      if (employeeCourses && Array.isArray(employeeCourses)) {
        const ids = (employeeCourses as EmployeeCourse[]).map((c) => c.id);
        setAssignedCourseIds(ids);
      }
      setSelectedCourses([]);
    }
    setIsSubmitting(false);
  };

  const isLoading = employeesLoading || coursesLoading;

  return (
    <ContentWrapper
      heading="Assign Courses"
      subHeading="Assign available courses to your organization's employees"
    >
      <div className="max-w-6xl mx-auto space-y-8 pb-10 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Select Employee */}
          <div className="md:col-span-1 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg">Select Employee</h3>
              </div>

              <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
                <CardContent className="p-4 pt-6 space-y-4">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employee..."
                      className="pl-10 h-10 bg-background/50"
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredEmployees.map((emp) => (
                      <button
                        key={emp.id}
                        onClick={() => setSelectedEmployee(emp.id)}
                        className={`w-full flex flex-col items-start p-3 rounded-xl border transition-all ${
                          selectedEmployee === emp.id
                            ? "bg-primary-blue/10 border-primary-blue shadow-sm"
                            : "bg-background/30 border-border/50 hover:bg-muted/50"
                        }`}
                      >
                        <span className="font-semibold text-sm">
                          {emp.name}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {emp.email}
                        </span>
                        {selectedEmployee === emp.id && (
                          <div className="absolute right-10 mt-2 text-primary-blue">
                            <Check className="size-4" />
                          </div>
                        )}
                      </button>
                    ))}
                    {filteredEmployees.length === 0 && !isLoading && (
                      <div className="text-center py-8 text-muted-foreground text-sm italic">
                        No employees found.
                      </div>
                    )}
                    {isLoading && (
                      <div className="flex justify-center py-8">
                        <Loader2 className="size-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Step 2 & 3: Selection and Summary */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold text-lg flex items-center justify-between w-full">
                  <span>Select Courses</span>
                  {selectedEmployee && fetchingCourses && (
                    <span className="text-xs flex items-center gap-1 font-normal text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" /> Checking
                      assigned courses...
                    </span>
                  )}
                </h3>
              </div>

              <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-3">
                    {courses.map((course) => {
                      const isAssigned = assignedCourseIds.includes(course.id);
                      return (
                        <div
                          key={course.id}
                          className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                            isAssigned
                              ? "bg-muted/50 border-border/30 opacity-60 cursor-not-allowed"
                              : selectedCourses.includes(course.id)
                                ? "bg-primary-blue/5 border-primary-blue shadow-sm cursor-pointer"
                                : "bg-background/30 border-border/50 hover:bg-muted/50 cursor-pointer"
                          }`}
                          onClick={() => !isAssigned && toggleCourse(course.id)}
                        >
                          <Checkbox
                            checked={
                              selectedCourses.includes(course.id) || isAssigned
                            }
                            disabled={isAssigned}
                            onCheckedChange={() => {}} // Controlled by parent div
                            className="mt-1"
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Image
                                  src={course.icon}
                                  alt={course.title}
                                  width={100}
                                  height={50}
                                  className="rounded-md text-xs h-10 w-16 object-cover"
                                />
                                <span className="font-semibold">
                                  {course.title}
                                </span>
                              </div>
                              {isAssigned && (
                                <Badge
                                  variant="secondary"
                                  className="text-[10px] px-2 h-5"
                                >
                                  Assigned
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground ml-[76px]">
                              <span className="flex items-center gap-1">
                                <Clock className="size-3" /> {course.duration}m
                              </span>
                              <span className="flex items-center gap-1">
                                <Layout className="size-3" /> {course.modules}{" "}
                                Modules
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {courses.length === 0 && !isLoading && (
                      <div className="text-center py-10 text-muted-foreground italic">
                        No courses available subscription found.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Summary & Action */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary-blue">
                <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg">Confirm Assignment</h3>
              </div>

              <Card className="border-none shadow-xl bg-card/60 backdrop-blur-md ring-1 ring-border/50">
                <CardContent className="p-6 space-y-6">
                  <div className="flex flex-wrap gap-4 justify-between items-start">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                        Target Employee
                      </Label>
                      <div className="flex items-center gap-2">
                        {selectedEmployee ? (
                          <Badge
                            variant="default"
                            className="py-1 px-3 text-sm flex items-center gap-2"
                          >
                            <User className="size-3" />
                            {selectedEmployeeData?.name}
                          </Badge>
                        ) : (
                          <span className="text-sm text-destructive font-medium italic">
                            No employee selected
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 flex-1">
                      <Label className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                        Selected Courses
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourses.length > 0 ? (
                          selectedCourses.map((id) => {
                            const course = courses.find((c) => c.id === id);
                            return (
                              <Badge
                                key={id}
                                variant="outline"
                                className="bg-background/50 flex items-center gap-2"
                              >
                                {course?.title}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCourse(id);
                                  }}
                                >
                                  <X className="size-3 hover:text-destructive" />
                                </button>
                              </Badge>
                            );
                          })
                        ) : (
                          <span className="text-sm text-destructive font-medium italic">
                            No courses selected
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/50 flex items-center justify-end">
                    <Button
                      variant="primary"
                      size="xl"
                      className="px-10 shadow-lg shadow-primary-blue/20"
                      disabled={
                        isSubmitting ||
                        !selectedEmployee ||
                        selectedCourses.length === 0
                      }
                      onClick={handleAssign}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Assigning...
                        </>
                      ) : (
                        "Assign Successfully"
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

export default AssignCoursesPage;

"use client";

import ContentWrapper from "@/components/dashboard/content-wrapper";
import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Book,
  Clock,
  Layout,
  ArrowUpDown,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTrainerCourse, Course } from "../_hooks/useCourse";
import Image from "next/image";

function CoursesListPage() {
  const { courses, loading, getCourses } = useTrainerCourse();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Course;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  // Sorting Logic
  const handleSort = (key: keyof Course) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter & Sort Data
  const filteredCourses = useMemo(() => {
    const safeCourses = Array.isArray(courses) ? courses : [];

    const result = safeCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (aValue < bValue) {
          return direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [courses, searchTerm, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentData = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) {
    return (
      <ContentWrapper
        heading="Courses List"
        subHeading="View all available courses for your organization"
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="size-10 border-4 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin" />
            <p className="text-muted-foreground animate-pulse">
              Loading courses...
            </p>
          </div>
        </div>
      </ContentWrapper>
    );
  }

  return (
    <ContentWrapper
      heading="Courses List"
      subHeading="View all available courses for your organization"
    >
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
            <Input
              placeholder="Search by title or description..."
              className="pl-10 h-10 bg-background/50 border-border/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 h-10 border-border/50 bg-background/30"
            >
              <Filter className="size-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Table Card */}
        <Card className="border-none shadow-xl pt-0 bg-card/60 backdrop-blur-md ring-1 ring-border/50 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[400px]">
                    <button
                      onClick={() => handleSort("title")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Course
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("duration")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Duration
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("modules")}
                      className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                    >
                      Modules
                      <ArrowUpDown className="size-3" />
                    </button>
                  </TableHead>
                  <TableHead className="text-right font-semibold pr-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                  currentData.map((course) => (
                    <TableRow
                      key={course.id}
                      className="group border-border/40 hover:bg-muted/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {/* <Book className="size-6 text-primary-blue" /> */}
                          <Image
                            src={course.icon}
                            alt={course.title}
                            width={200}
                            height={48}
                            className="rounded-lg"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground group-hover:text-primary-blue transition-colors">
                              {course.title}
                            </span>
                            <span className="text-xs text-muted-foreground line-clamp-1 max-w-[300px]">
                              {course.description}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="size-4" />
                          {course.duration} mins
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Layout className="size-4" />
                          {course.modules} Modules
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="hover:bg-primary-blue/10 hover:text-primary-blue"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-48 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Book className="size-8 opacity-20" />
                        <p className="text-sm">
                          No courses found matching your search.
                        </p>
                        <Button
                          variant="link"
                          onClick={() => setSearchTerm("")}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 py-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground font-medium">
            Showing{" "}
            <span className="text-foreground">{currentData.length}</span> of{" "}
            <span className="text-foreground">{filteredCourses.length}</span>{" "}
            courses
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 bg-background/30 border-border/50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "primary" : "ghost"}
                    size="icon-sm"
                    className={`size-8 font-medium ${currentPage === page ? "shadow-md shadow-primary-blue/20" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ),
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 bg-background/30 border-border/50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default CoursesListPage;

"use client";

import React, { useState, useMemo } from "react";
import ContentWrapper from "@/components/dashboard/content-wrapper";
import {
  Search,
  Calendar,
  MapPin,
  ArrowUpDown,
  Filter,
  ChevronLeft,
  ChevronRight,
  UserCheck,
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
import Image from "next/image";
import Link from "next/link";
import { TrainerCalendar } from "../../_components/trainer-calendar";
import { isWithinInterval, startOfDay } from "date-fns";

interface AssignedTraining {
  id: number;
  courseTitle: string;
  courseImage: string;
  scheduleTitle: string;
  scheduleDates: string;
  startDate: Date;
  endDate: Date;
  scheduleDescription: string;
  scheduleLocation: string;
  branchName: string;
  branchLocation: string;
}

const STATIC_TRAININGS: AssignedTraining[] = [
  {
    id: 1,
    courseTitle: "Advanced Pediatric Life Support (APLS)",
    courseImage:
      "https://images.unsplash.com/photo-1576091160550-2173bc9995a5?auto=format&fit=crop&q=80&w=200&h=120",
    scheduleTitle: "Spring Intakes - Batch A",
    scheduleDates: "12 March to 15 March",
    startDate: new Date(2026, 2, 12),
    endDate: new Date(2026, 2, 15),
    scheduleDescription:
      "Comprehensive training on pediatric emergency care and stabilization techniques.",
    scheduleLocation: "Room 402, Medical Wing",
    branchName: "London Central Branch",
    branchLocation: "123 Healthcare Way, London, UK",
  },
  {
    id: 2,
    courseTitle: "Basic Life Support (BLS)",
    courseImage:
      "https://images.unsplash.com/photo-1505751172107-59d00a29906d?auto=format&fit=crop&q=80&w=200&h=120",
    scheduleTitle: "Standard Certification - Q1",
    scheduleDates: "20 March to 21 March",
    startDate: new Date(2026, 2, 20),
    endDate: new Date(2026, 2, 21),
    scheduleDescription:
      "Foundation course for healthcare providers in high-quality CPR and team dynamics.",
    scheduleLocation: "Main Auditorium",
    branchName: "Manchester Hub",
    branchLocation: "45 Innovation Blvd, Manchester, UK",
  },
  {
    id: 3,
    courseTitle: "Mental Health First Aid",
    courseImage:
      "https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?auto=format&fit=crop&q=80&w=200&h=120",
    scheduleTitle: "Community Outreach Group",
    scheduleDates: "05 April to 07 April",
    startDate: new Date(2026, 3, 5),
    endDate: new Date(2026, 3, 7),
    scheduleDescription:
      "Skills to provide initial support to someone experiencing a mental health problem.",
    scheduleLocation: "Seminar Room B",
    branchName: "Birmingham Education Centre",
    branchLocation: "88 Learning Lane, Birmingham, UK",
  },
];

function AssignedTrainingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AssignedTraining;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (key: keyof AssignedTraining) => {
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

  const bookedDates = useMemo(() => {
    const dates: Date[] = [];
    STATIC_TRAININGS.forEach((t) => {
      const curr = new Date(t.startDate);
      while (curr <= t.endDate) {
        dates.push(new Date(curr));
        curr.setDate(curr.getDate() + 1);
      }
    });
    return dates;
  }, []);

  const filteredTrainings = useMemo(() => {
    let result = STATIC_TRAININGS.filter(
      (t) =>
        t.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.scheduleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.scheduleLocation.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (selectedDate) {
      const day = startOfDay(selectedDate);
      result = result.filter((t) =>
        isWithinInterval(day, {
          start: startOfDay(t.startDate),
          end: startOfDay(t.endDate),
        }),
      );
    }

    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a, b) => {
        const aValue = a[key] as any;
        const bValue = b[key] as any;

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchTerm, sortConfig, selectedDate]);

  const totalPages = Math.ceil(filteredTrainings.length / itemsPerPage);
  const currentData = filteredTrainings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <ContentWrapper
      heading="Assigned Trainings"
      subHeading="View all assigned trainings with calendar and list view"
    >
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Left: Calendar Sidebar */}
        <div className="w-full xl:w-auto xl:sticky xl:top-24">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-2">
              Select date
            </h3>
            <TrainerCalendar
              selected={selectedDate}
              onSelect={setSelectedDate}
              bookedDates={bookedDates}
            />
            {selectedDate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(undefined)}
                className="text-primary-blue font-bold hover:bg-primary-blue/10"
              >
                Clear date filter
              </Button>
            )}
          </div>
        </div>

        {/* Right: Table Content */}
        <div className="flex-1 space-y-6 w-full">
          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
              <Input
                placeholder="Search by course, schedule or location..."
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
                    <TableHead className="w-[350px]">
                      <button
                        onClick={() => handleSort("courseTitle")}
                        className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                      >
                        Assigned Training
                        <ArrowUpDown className="size-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("scheduleDates")}
                        className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                      >
                        Schedule Info
                        <ArrowUpDown className="size-3" />
                      </button>
                    </TableHead>
                    <TableHead>Branch Details</TableHead>
                    <TableHead className="text-right font-semibold pr-6">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length > 0 ? (
                    currentData.map((training) => (
                      <TableRow
                        key={training.id}
                        className="group border-border/40 hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="relative w-24 h-14 rounded overflow-hidden shrink-0">
                              <Image
                                src={training.courseImage}
                                alt={training.courseTitle}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground group-hover:text-primary-blue transition-colors line-clamp-1">
                                {training.courseTitle}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {training.scheduleTitle}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary-blue">
                              <Calendar className="size-3.5" />
                              {training.scheduleDates}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="size-3" />
                              {training.scheduleLocation}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">
                              {training.branchName}
                            </span>
                            <span className="text-[10px] text-muted-foreground line-clamp-1">
                              {training.branchLocation}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Link
                            href={`/dashboard/trainer/assigned-trainings/${training.id}/learners`}
                          >
                            <Button
                              variant="primary"
                              size="sm"
                              className="gap-2 text-[11px] font-bold h-9 px-4"
                            >
                              <UserCheck className="size-3.5" />
                              VIEW LEARNERS
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="h-64 text-center text-muted-foreground"
                      >
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-4 bg-muted/50 rounded-full">
                            <Calendar className="size-8 opacity-40" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">
                              No trainings found
                            </p>
                            <p className="text-sm">
                              {selectedDate
                                ? "Nothing scheduled for this specific date."
                                : "No results for your current search criteria."}
                            </p>
                          </div>
                          {(searchTerm || selectedDate) && (
                            <Button
                              variant="link"
                              onClick={() => {
                                setSearchTerm("");
                                setSelectedDate(undefined);
                              }}
                              className="text-primary-blue font-bold px-0"
                            >
                              Clear all filters
                            </Button>
                          )}
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
              <span className="text-foreground font-bold">
                {currentData.length}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-bold">
                {filteredTrainings.length}
              </span>{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-border/50 font-bold bg-background/30"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-border/50 font-bold bg-background/30"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default AssignedTrainingsPage;

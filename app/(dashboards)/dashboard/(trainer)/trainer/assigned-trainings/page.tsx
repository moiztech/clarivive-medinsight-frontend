"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
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
import { TrainerCalendar } from "../../_components/trainer-calendar";
import { parseISO, format } from "date-fns";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LearnersSheet,
  ScheduleLearner,
  TrainerSchedule,
} from "../../_components/learners-sheet";

function AssignedTrainingsPage() {
  const [schedules, setSchedules] = useState<TrainerSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<{
    key: "course_title" | "schedule_title" | "location";
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedSchedule, setSelectedSchedule] =
    useState<TrainerSchedule | null>(null);
  const [learners, setLearners] = useState<ScheduleLearner[]>([]);
  const [loadingLearners, setLoadingLearners] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      const res = await protectedApi.get("/trainer/schedules");
      if (res.data?.status) {
        setSchedules(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch schedules");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const fetchLearners = async (scheduleId: number) => {
    try {
      setLoadingLearners(true);
      const res = await protectedApi.get(`/schedule/${scheduleId}/learners`);
      if (res.data?.status) {
        setLearners(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch learners");
      console.error(error);
    } finally {
      setLoadingLearners(false);
    }
  };

  const handleViewLearners = (schedule: TrainerSchedule) => {
    setSelectedSchedule(schedule);
    setLearners([]);
    setIsSheetOpen(true);
    fetchLearners(schedule.id);
  };

  const handleSort = (key: "course_title" | "schedule_title" | "location") => {
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
    schedules.forEach((s) => {
      if (s.sessions && s.sessions.length > 0) {
        s.sessions.forEach((session) => {
          dates.push(parseISO(session.date));
        });
      }
    });
    return dates;
  }, [schedules]);

  const filteredTrainings = useMemo(() => {
    let result = schedules.filter(
      (s) =>
        s.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (selectedDate) {
      const dayStr = format(selectedDate, "yyyy-MM-dd");
      result = result.filter((s) =>
        s.sessions?.some((session) => session.date === dayStr),
      );
    }

    if (sortConfig) {
      const { key, direction } = sortConfig;
      result.sort((a, b) => {
        let aValue = "";
        let bValue = "";

        if (key === "course_title") {
          aValue = a.course.title;
          bValue = b.course.title;
        } else if (key === "schedule_title") {
          aValue = a.title;
          bValue = b.title;
        } else {
          aValue = a.location;
          bValue = b.location;
        }

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [schedules, searchTerm, sortConfig, selectedDate]);

  const totalPages = Math.ceil(filteredTrainings.length / itemsPerPage);
  const currentData = filteredTrainings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const formatDateRange = (sessions?: { date: string }[]) => {
    if (!sessions || sessions.length === 0) return "No dates scheduled";
    if (sessions.length === 1) {
      return format(parseISO(sessions[0].date), "dd MMMM");
    }

    const sortedSessions = [...sessions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const startDate = parseISO(sortedSessions[0].date);
    const endDate = parseISO(sortedSessions[sortedSessions.length - 1].date);

    if (format(startDate, "MMMM") === format(endDate, "MMMM")) {
      return `${format(startDate, "dd")} to ${format(endDate, "dd MMMM")}`;
    }

    return `${format(startDate, "dd MMMM")} to ${format(endDate, "dd MMMM")}`;
  };

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
                        onClick={() => handleSort("course_title")}
                        className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                      >
                        Assigned Training
                        <ArrowUpDown className="size-3" />
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort("schedule_title")}
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
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell colSpan={4}>
                          <div className="flex items-center gap-4 py-2">
                            <Skeleton className="h-12 w-20" />
                            <div className="space-y-2 flex-1">
                              <Skeleton className="h-4 w-1/3" />
                              <Skeleton className="h-3 w-1/4" />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : currentData.length > 0 ? (
                    currentData.map((training) => (
                      <TableRow
                        key={training.id}
                        className="group border-border/40 hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="relative w-24 h-14 rounded overflow-hidden shrink-0 bg-muted">
                              <Image
                                src={
                                  training.image ||
                                  training.course.icon ||
                                  "/placeholder.jpg"
                                }
                                alt={training.course.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-foreground group-hover:text-primary-blue transition-colors line-clamp-1">
                                {training.course.title}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground font-medium truncate max-w-[150px]">
                                  {training.title}
                                </span>
                                {training.sessions && (
                                  <Badge
                                    variant="outline"
                                    className="h-4 text-[9px] px-1.5 font-bold bg-primary-blue/5 text-primary-blue border-primary-blue/20"
                                  >
                                    {training.sessions.length} SESSION
                                    {training.sessions.length !== 1 ? "S" : ""}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary-blue">
                              <Calendar className="size-3.5" />
                              {formatDateRange(training.sessions)}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="size-3" />
                              {training.location}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">
                              {training.branch.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground line-clamp-1">
                              {training.branch.location}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="primary"
                            size="sm"
                            className="gap-2 text-[11px] font-bold h-9 px-4"
                            onClick={() => handleViewLearners(training)}
                          >
                            <UserCheck className="size-3.5" />
                            VIEW LEARNERS
                          </Button>
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

      <LearnersSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        selectedSchedule={selectedSchedule}
        learners={learners}
        loading={loadingLearners}
      />
    </ContentWrapper>
  );
}

export default AssignedTrainingsPage;

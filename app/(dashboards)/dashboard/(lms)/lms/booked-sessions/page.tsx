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
  Clock,
  BookOpen,
  Info,
  User,
  UserCheck,
  Download,
  ExternalLink,
  Award,
  CalendarPlus,
  RotateCw,
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
import { TrainerCalendar } from "@/app/(dashboards)/dashboard/(trainer)/_components/trainer-calendar";
import { parseISO, format } from "date-fns";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { formatInLocalTime } from "@/components/courses/CourseSchedule";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContactLearner from "../../../(trainer)/_components/ContactLearner";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createGoogleCalendarUrl, downloadAppleCalendarFile } from "@/lib/calendar";

interface BookedSchedule {
  id: number;
  student_id: number;
  branch_id?: number;
  course_id?: number;
  schedule_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  progress: number;
  company: string | null;
  course: {
    id: number;
    title: string;
    slug: string;
    course_type_id: number;
    icon: string;
    certificate: {
      certificate_number: string | null;
      issue_date: string | null;
      view_url: string | null;
      download_url: string | null;
      eligible?: boolean;
      eligibility_reason?: string | null;
    };
    course_type: {
      id: number;
      name: string;
    };
  };
  branch: {
    id: number;
    title: string;
    slug: string;
    icon?: string;
  };
  schedule: {
    id: number;
    title: string;
    location?: string;
    description: string;
    instruction?: string;
    image: string | null;
    trainer_id: number;
    sessions: {
      id: number;
      schedule_id: number;
      date: string;
      status?: string;
      start_time: string;
      end_time: string;
      attendance_status: string | null;
      attendances:
      | {
        id: number;
        session_id: number;
        student_id: number;
        status: string;
      }[]
      | [];
    }[];
    trainer?: {
      id: number;
      name: string;
      email: string;
      logo?: string;
    };
  };
  alternatives?: {
    id: number;
    title: string;
    location?: string;
    branch?: {
      title: string;
    };
    sessions?: {
      id: number;
      date: string;
    }[];
  }[];
}
export const formatSessionDates = (
  sessions?: { date: string }[],
  visibleCount: number = 2,
) => {
  if (!sessions || sessions.length === 0) return "No dates scheduled";

  const sorted = [...sessions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const dates = sorted.map((s) => parseISO(s.date));

  // only one date
  if (dates.length === 1) {
    return format(dates[0], "dd MMM yyyy");
  }

  const visibleDates = dates.slice(0, visibleCount);
  const remaining = dates.length - visibleDates.length;

  const formatted = visibleDates.map((d) => format(d, "dd MMM"));

  let result = formatted.join(", ");

  if (remaining > 0) {
    result += ` +${remaining} more`;
  }

  return result;
};
function BookedSessionsPage() {
  const [bookings, setBookings] = useState<BookedSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<{
    key: "course_title" | "schedule_title" | "status";
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedBooking, setSelectedBooking] = useState<BookedSchedule | null>(
    null,
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [selectedCourseForCertificate, setSelectedCourseForCertificate] =
    useState<BookedSchedule["course"] | null>(null);
  const [userTimeZone, setUserTimeZone] = useState("");
  const [alternativeSchedules, setAlternativeSchedules] = useState<
    BookedSchedule["alternatives"]
  >([]);
  const [loadingAlternatives, setLoadingAlternatives] = useState(false);
  const [rescheduleLoading, setRescheduleLoading] = useState<number | null>(null);

  useEffect(() => {
    // Only get timezone on client to avoid hydration mismatch
    setUserTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await protectedApi.get("/learner-bookings");
      if (res.data?.status) {
        setBookings(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch booked sessions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleViewDetails = (booking: BookedSchedule) => {
    setSelectedBooking(booking);
    setAlternativeSchedules([]);
    setIsSheetOpen(true);
  };

  const handleCertificateDialog = (course: BookedSchedule["course"]) => {
    setSelectedCourseForCertificate(course);
    setIsCertificateOpen(true);
  };

  const handleFetchAlternatives = useCallback(async (bookingId: number) => {
    try {
      setLoadingAlternatives(true);
      const res = await protectedApi.get(`/learner-bookings/${bookingId}/alternatives`);
      setAlternativeSchedules(res.data?.data?.alternatives ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load alternative sessions right now.");
    } finally {
      setLoadingAlternatives(false);
    }
  }, []);

  const handleRescheduleRequest = async (
    bookingId: number,
    scheduleId: number,
  ) => {
    try {
      setRescheduleLoading(scheduleId);
      const res = await protectedApi.post(
        `/learner-bookings/${bookingId}/reschedule-request`,
        {
          new_schedule_id: scheduleId,
          reason: "Learner requested an alternative available session.",
        },
      );

      toast.success(
        res.data?.message || "Reschedule request submitted successfully.",
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit the reschedule request.");
    } finally {
      setRescheduleLoading(null);
    }
  };

  useEffect(() => {
    if (!selectedBooking) return;
    handleFetchAlternatives(selectedBooking.id);
  }, [handleFetchAlternatives, selectedBooking]);

  const getCombinedStatus = useCallback((sessions: { status?: string }[]) => {
    if (!sessions || sessions.length === 0) return null;

    const statuses = sessions.map((s) => s.status);
    const allCompleted = statuses.every((s) => s === "completed");
    const allScheduled = statuses.every((s) => s === "scheduled");
    const anyInProgress = statuses.some(
      (s) => s === "in_progress" || s === "inprogress",
    );
    const anyCompleted = statuses.some((s) => s === "completed");

    if (allCompleted) {
      return {
        label: "COMPLETED",
        className:
          "bg-green-500/10 text-green-600 border-green-500/20 font-bold",
      };
    }

    if (anyInProgress || (anyCompleted && !allCompleted)) {
      return {
        label: "ON GOING",
        className: "bg-blue-500/10 text-blue-600 border-blue-500/20 font-bold",
      };
    }

    if (allScheduled) {
      return {
        label: "SCHEDULED",
        className:
          "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 font-bold",
      };
    }

    return {
      label: "SCHEDULED",
      className:
        "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 font-bold",
    };
  }, []);

  const handleSort = (key: "course_title" | "schedule_title" | "status") => {
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
    bookings.forEach((b) => {
      if (b.schedule.sessions && b.schedule.sessions.length > 0) {
        b.schedule.sessions.forEach((session) => {
          dates.push(parseISO(session.date));
        });
      }
    });
    return dates;
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    let result = bookings.filter(
      (b) =>
        b.course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.schedule?.location?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (selectedDate) {
      const dayStr = format(selectedDate, "yyyy-MM-dd");
      result = result.filter((b) =>
        b.schedule.sessions?.some((session) => session.date === dayStr),
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
          aValue = a.schedule.title;
          bValue = b.schedule.title;
        } else {
          aValue = a.status;
          bValue = b.status;
        }

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [bookings, searchTerm, sortConfig, selectedDate]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentData = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <ContentWrapper
      heading="My Booked Schedules"
      subHeading="Track your progress and view upcoming study sessions"
    >
      <div className="flex flex-col xl:flex-row gap-6 items-stretch">

        {/* Left: Calendar Sidebar */}
        <div className="w-full xl:w-auto mb-5">
          <div className="xl:sticky xl:top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-1 self-start">
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest px-2">
                Study Calendar
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
        </div>

        {/* Right: Table Content */}
        <div className="flex-1 space-y-6 w-full min-w-0">

          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card/40 p-4 rounded-xl border border-border/50 backdrop-blur-sm">
            <div className="relative flex-1 max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary-blue transition-colors" />
              <Input
                placeholder="Search by course or schedule..."
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

            {/* RESPONSIVE FIX */}
            <CardContent className="p-0 overflow-x-auto">
              <div className="min-w-[900px]">

                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent border-border/50">

                      <TableHead className="text-nowrap pe-0!">
                        Booking ID
                      </TableHead>

                      {/* FIX */}
                      <TableHead className="min-w-[250px] md:min-w-[300px]">
                        <button
                          onClick={() => handleSort("course_title")}
                          className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                        >
                          Booked Course
                          <ArrowUpDown className="size-3" />
                        </button>
                      </TableHead>

                      <TableHead>
                        <button
                          onClick={() => handleSort("schedule_title")}
                          className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                        >
                          Schedule Details
                          <ArrowUpDown className="size-3" />
                        </button>
                      </TableHead>

                      <TableHead>
                        <button
                          onClick={() => handleSort("status")}
                          className="flex items-center gap-1 hover:text-primary-blue transition-colors font-semibold"
                        >
                          Status
                          <ArrowUpDown className="size-3" />
                        </button>
                      </TableHead>

                      <TableHead className="text-right font-semibold pr-6">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={5}>
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
                      currentData.map((booking) => (
                        <TableRow
                          key={booking.id}
                          className="group border-border/40 hover:bg-muted/30 transition-colors"
                        >
                          <TableCell>{booking.id}</TableCell>

                          <TableCell>
                            {/* FIX */}
                            <div className="flex items-start gap-4 min-w-0">
                              <div className="relative w-24 h-14 rounded overflow-hidden shrink-0 bg-muted shadow-sm">
                                <Image
                                  src={
                                    booking.schedule.image ||
                                    booking.course.icon ||
                                    "/placeholder.jpg"
                                  }
                                  alt={booking.course.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <div className="flex flex-col min-w-0 w-full">
                                <Link
                                  href={`/course/face-to-face/${booking.course.slug}`}
                                  target="_blank"
                                >
                                  <span className="font-bold text-foreground group-hover:text-primary-blue transition-colors line-clamp-1">
                                    {booking.course.title}
                                  </span>
                                </Link>

                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-[10px] h-4 px-1.5 font-bold bg-primary-blue/10 text-primary-blue border-none"
                                  >
                                    {booking.course.course_type.name}
                                  </Badge>
                                  {booking.schedule.sessions && (
                                    <span className="text-[10px] text-muted-foreground font-bold">
                                      {booking.schedule.sessions.length} SESSIONS
                                    </span>
                                  )}
                                </div>

                                <div className="mt-2 space-y-1.5">
                                  <div className="flex justify-between items-center text-[10px] font-bold">
                                    <span className="text-muted-foreground uppercase">
                                      Progress
                                    </span>
                                    <span className="text-primary-blue">
                                      {booking.progress || 0}%
                                    </span>
                                  </div>
                                  <Progress
                                    value={booking.progress || 0}
                                    className="h-1.5"
                                  />
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div
                              className="space-y-1 cursor-pointer"
                              onClick={() => handleViewDetails(booking)}
                            >
                              <div className="flex items-center gap-2 text-sm font-semibold text-primary-blue flex-wrap">
                                <Calendar className="size-3.5" />
                                {formatSessionDates(booking.schedule.sessions)}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground break-all">
                                <MapPin className="size-3" />
                                {booking.schedule.location}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1 flex-wrap">
                                <div className="size-4 rounded-full bg-primary-blue/10 flex items-center justify-center shrink-0">
                                  <User className="size-2.5 text-primary-blue" />
                                </div>
                                Trainer:{" "}
                                <span className="font-medium text-foreground/80">
                                  {booking.schedule.trainer?.name || "TBA"}
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          {/* STATUS — UNCHANGED */}
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                className={
                                  booking.status === "paid"
                                    ? "bg-green-500/10 text-green-600 border-green-500/20 font-bold"
                                    : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 font-bold"
                                }
                                variant="outline"
                              >
                                {booking.status.toUpperCase()}
                              </Badge>
                              {(() => {
                                const status = getCombinedStatus(
                                  booking.schedule.sessions,
                                );
                                if (!status) return null;
                                return (
                                  <Badge
                                    className={status.className}
                                    variant="outline"
                                  >
                                    {status.label}
                                  </Badge>
                                );
                              })()}
                            </div>
                          </TableCell>

                          {/* ACTIONS — UNCHANGED */}
                          <TableCell className="text-right pr-6 min-w-[140px]">
                            <div className="flex flex-col gap-2 items-center justify-center">
                              <Button
                                variant="primary"
                                size="sm"
                                className="gap-2 text-[11px] font-bold h-9 px-4"
                                onClick={() => handleViewDetails(booking)}
                              >
                                <Info className="size-3.5" />
                                VIEW DETAILS
                              </Button>

                              {(() => {
                                const status = getCombinedStatus(
                                  booking.schedule.sessions,
                                );
                                if (!status) return null;

                                if (
                                  status.label === "COMPLETED" &&
                                  booking.course.certificate
                                    .certificate_number !== null
                                ) {
                                  return (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="gap-2 text-[11px] font-bold h-9 px-4"
                                      onClick={() =>
                                        handleCertificateDialog(booking.course)
                                      }
                                    >
                                      <Info className="size-3.5" />
                                      VIEW CERTIFICATE
                                    </Button>
                                  );
                                } else {
                                  return (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Badge
                                            className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 font-bold"
                                            variant="outline"
                                          >
                                            NOT ISSUED/ELIGIBLE
                                          </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p className="text-xs">
                                            {booking.course.certificate
                                              ?.eligibility_reason ||
                                              "Not eligible for certificate"}
                                          </p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  );
                                }
                              })()}
                            </div>
                          </TableCell>

                        </TableRow>
                      ))
                    ) : null}
                  </TableBody>
                </Table>

              </div>
            </CardContent>
          </Card>

          {/* Pagination (unchanged) */}
          <div className="flex items-center justify-between px-2 py-4 border-t border-border/50">
            ...
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default BookedSessionsPage;

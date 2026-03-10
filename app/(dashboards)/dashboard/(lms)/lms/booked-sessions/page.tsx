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

interface BookedSchedule {
  id: number;
  student_id: number;
  branch_id?: number;
  course_id?: number;
  schedule_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  course: {
    id: number;
    title: string;
    slug: string;
    course_type_id: number;
    icon: string;
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
      start_time: string;
      end_time: string;
    }[];
    trainer?: {
      id: number;
      name: string;
      email: string;
      logo?: string;
    };
  };
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
  const [userTimeZone, setUserTimeZone] = useState("");

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
    setIsSheetOpen(true);
  };

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
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Left: Calendar Sidebar */}
        <div className="w-full xl:w-auto xl:sticky xl:top-24">
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

        {/* Right: Table Content */}
        <div className="flex-1 space-y-6 w-full">
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
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="text-nowrap">Booking ID</TableHead>
                    <TableHead className="w-[350px]">
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
                    currentData.map((booking) => (
                      <TableRow
                        key={booking.id}
                        className="group border-border/40 hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>{booking.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
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
                            <div className="flex flex-col min-w-0">
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
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="space-y-1 cursor-pointer"
                            onClick={() => handleViewDetails(booking)}
                          >
                            <div className="flex items-center gap-2 text-sm font-semibold text-primary-blue">
                              <Calendar className="size-3.5" />
                              {formatSessionDates(booking.schedule.sessions)}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="size-3" />
                              {booking.schedule.location}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
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
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="primary"
                            size="sm"
                            className="gap-2 text-[11px] font-bold h-9 px-4"
                            onClick={() => handleViewDetails(booking)}
                          >
                            <Info className="size-3.5" />
                            VIEW DETAILS
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
                            <BookOpen className="size-8 opacity-40" />
                          </div>
                          <div>
                            <p className="font-bold text-foreground">
                              No bookings found
                            </p>
                            <p className="text-sm">
                              {selectedDate
                                ? "You have no sessions on this specific date."
                                : "You haven't booked any course schedules yet."}
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
                {filteredBookings.length}
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

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader className="mb-6">
            <VisuallyHidden>Session Details</VisuallyHidden>
          </SheetHeader>
          <SheetTitle className="text-2xl font-bold flex items-center px-4 gap-2 mb-2">
            <BookOpen className="text-primary-blue" />
            Session Details
          </SheetTitle>
          <SheetDescription className="px-4 mb-6">
            Detailed schedule for:{" "}
            <span className="font-bold text-foreground">
              {selectedBooking?.course.title}
            </span>
          </SheetDescription>

          <ScrollArea className="h-[calc(100vh-200px)] px-4">
            <div className="space-y-6">
              {/* Schedule Info */}
              <div className="bg-primary-blue/5 border border-primary-blue/10 rounded-xl p-4">
                <h4 className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
                  Schedule Overview
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Calendar size={14} className="text-primary-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Schedule Title
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {selectedBooking?.schedule.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <MapPin size={14} className="text-primary-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">
                        Location
                      </p>
                      <p className="text-sm font-bold text-foreground">
                        {selectedBooking?.schedule?.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessions List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Individual Sessions
                </h4>
                {selectedBooking?.schedule.sessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="flex items-center gap-4 p-4 border border-border/50 rounded-xl bg-card/30 hover:bg-card/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground truncate">
                        {format(parseISO(session.date), "EEEE, dd MMMM yyyy")}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock size={12} className="text-primary-blue" />
                          {formatInLocalTime(
                            session.date,
                            session.start_time,
                          )}{" "}
                          - {formatInLocalTime(session.date, session.end_time)}
                        </div>
                      </div>
                      {userTimeZone && (
                        <span className="text-[9px] text-gray-400 px-1 font-medium bg-gray-100/30 rounded-sm pointer-events-none">
                          Shown in {userTimeZone} time
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Instructions */}
              <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4">
                <h4 className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-2">
                  Instructions
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  &ldquo;{selectedBooking?.schedule.instruction}&rdquo;
                </p>
              </div>
              {/* Trainer Information */}
              {selectedBooking?.schedule.trainer && (
                <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                    Your Trainer
                  </h4>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary-blue/20">
                      <AvatarImage
                        src={selectedBooking.schedule.trainer.logo}
                      />
                      <AvatarFallback className="bg-primary-blue/10 text-primary-blue font-bold">
                        {selectedBooking.schedule.trainer.name
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground truncate">
                        {selectedBooking.schedule.trainer.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {selectedBooking.schedule.trainer.email}
                      </p>
                    </div>
                    <ContactLearner
                      learner_id={selectedBooking.schedule.trainer.id}
                    />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </ContentWrapper>
  );
}

export default BookedSessionsPage;

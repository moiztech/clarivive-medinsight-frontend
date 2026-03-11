"use client";

import React, { useEffect, useState } from "react";
import ContentWrapper from "@/components/dashboard/content-wrapper";
import {
  useCompanyBookings,
  CompanyBookingSchedule,
} from "../_hooks/useCompanyBookings";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Eye,
} from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { format, parseISO } from "date-fns";
import { formatInLocalTime } from "@/components/courses/CourseSchedule";

export default function CompanyBookingsPage() {
  const { data, loading, pagination, getBookings } = useCompanyBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSchedule, setSelectedSchedule] =
    useState<CompanyBookingSchedule | null>(null);

  useEffect(() => {
    getBookings(currentPage, 10);
  }, [getBookings, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.last_page) {
      setCurrentPage(newPage);
    }
  };
  const userTimeZone =
    typeof window !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";

  return (
    <ContentWrapper
      heading="Booked Schedules"
      subHeading="View all your assigned schedules and their respective students"
    >
      <div className="space-y-6">
        {/* Table Card */}
        <Card className="border-none shadow-xl pt-0 bg-card/60 backdrop-blur-md ring-1 ring-border/50 overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="w-[300px] font-semibold">
                    Course & Branch
                  </TableHead>
                  <TableHead className="font-semibold">Trainer</TableHead>
                  <TableHead className="font-semibold">Next Session</TableHead>
                  <TableHead className="font-semibold text-center">
                    Students
                  </TableHead>
                  <TableHead className="text-right font-semibold pr-6">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-48 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="size-8 border-4 border-primary-blue/30 border-t-primary-blue rounded-full animate-spin" />
                        <p className="animate-pulse">Loading schedules...</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data.length > 0 ? (
                  data.map((item) => {
                    const nextSession =
                      item.schedule.sessions.length > 0
                        ? item.schedule.sessions[0]
                        : null;

                    return (
                      <TableRow
                        key={`schedule-${item.schedule_id}`}
                        className="group border-border/40 hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>
                          <div className="flex items-start gap-3">
                            {item.course.icon && (
                              <Image
                                src={item.course.icon}
                                alt={item.course.title}
                                width={48}
                                height={48}
                                className="rounded-md object-cover size-12 shadow-sm"
                              />
                            )}
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-foreground group-hover:text-primary-blue transition-colors line-clamp-2">
                                {item.course.title}
                              </span>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <span className="px-1.5 py-0.5 rounded-sm bg-primary-blue/10 text-primary-blue font-medium whitespace-nowrap">
                                  {item.course.course_type?.name}
                                </span>
                                {item.branch && (
                                  <>
                                    <span className="text-border">•</span>
                                    <span className="flex items-center gap-1 whitespace-nowrap">
                                      <MapPin className="size-3" />
                                      {item.branch.title}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.schedule.trainer && (
                            <div className="flex items-center gap-2">
                              {item.schedule.trainer.logo ? (
                                <Image
                                  src={item.schedule.trainer.logo}
                                  alt={item.schedule.trainer.name}
                                  width={32}
                                  height={32}
                                  className="rounded-full size-8 object-cover border border-border/50"
                                />
                              ) : (
                                <div className="size-8 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-semibold text-xs border border-primary-blue/20">
                                  {item.schedule.trainer.name.charAt(0)}
                                </div>
                              )}
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  {item.schedule.trainer.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {item.schedule.trainer.email}
                                </span>
                              </div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {nextSession ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1.5 text-sm font-medium">
                                <Calendar className="size-3.5 text-primary-blue" />
                                <span>
                                  {format(
                                    new Date(nextSession.date),
                                    "MMM d, yyyy",
                                  )}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="size-3.5" />
                                <span>
                                  {nextSession.start_time.slice(0, 5)} -{" "}
                                  {nextSession.end_time.slice(0, 5)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm italic">
                              No sessions scheduled
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center">
                            <div className="flex items-center gap-1.5 bg-primary-blue/5 text-primary-blue px-2.5 py-1 rounded-full text-xs font-semibold border border-primary-blue/10">
                              <Users className="size-3.5" />
                              {item.students.length} Learners
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-primary-blue/10 hover:text-primary-blue gap-2"
                            onClick={() => setSelectedSchedule(item)}
                          >
                            <Eye className="size-4" />
                            <span className="hidden sm:inline">Details</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-48 text-center text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Calendar className="size-8 opacity-20" />
                        <p className="text-sm">No booked schedules found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex items-center justify-between px-2 py-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground font-medium">
              Showing page{" "}
              <span className="text-foreground">{pagination.current_page}</span>{" "}
              of <span className="text-foreground">{pagination.last_page}</span>
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-background/30 border-border/50"
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1 || loading}
              >
                <ChevronLeft className="size-4" />
                Previous
              </Button>
              <div className="items-center gap-1 hidden sm:flex">
                {Array.from(
                  { length: pagination.last_page },
                  (_, i) => i + 1,
                ).map((page) => (
                  <Button
                    key={page}
                    variant={
                      pagination.current_page === page ? "primary" : "ghost"
                    }
                    size="icon-sm"
                    className={`size-8 font-medium ${pagination.current_page === page ? "shadow-md shadow-primary-blue/20" : ""}`}
                    onClick={() => handlePageChange(page)}
                    disabled={loading}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-1 bg-background/30 border-border/50"
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={
                  pagination.current_page === pagination.last_page || loading
                }
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Details Sheet */}
      <Sheet
        open={!!selectedSchedule}
        onOpenChange={(open) => !open && setSelectedSchedule(null)}
      >
        <SheetContent className="sm:max-w-md w-full overflow-y-auto">
          {selectedSchedule && (
            <>
              <SheetHeader className="mb-0 mt-6">
                <SheetTitle className="text-xl">Schedule Details</SheetTitle>
                <SheetDescription>
                  View learners and session details for{" "}
                  {selectedSchedule.course.title}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-6 px-4">
                {/* Info Card */}
                <div className="bg-muted/50 dark:bg-card rounded-xl p-4 border border-border/50 space-y-4">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                    {selectedSchedule.course.icon && (
                      <Image
                        src={selectedSchedule.course.icon}
                        alt={selectedSchedule.course.title}
                        width={40}
                        height={40}
                        className="rounded-md object-cover size-10 shadow-sm"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-2 leading-tight">
                        {selectedSchedule.course.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{selectedSchedule.branch?.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    {selectedSchedule?.schedule.sessions?.map(
                      (session, index) => (
                        <div
                          key={session.id}
                          className="p-4 border border-border/50 rounded-xl dark:bg-slate-900 hover:dark:bg-slate-950 bg-card/30 hover:bg-card/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-bold shrink-0">
                              {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-foreground truncate">
                                {format(
                                  parseISO(session.date),
                                  "EEEE, dd MMMM yyyy",
                                )}
                              </p>

                              <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Clock
                                    size={12}
                                    className="text-primary-blue"
                                  />
                                  {formatInLocalTime(
                                    session.date,
                                    session.start_time,
                                  )}{" "}
                                  -{" "}
                                  {formatInLocalTime(
                                    session.date,
                                    session.end_time,
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    )}

                    {userTimeZone && (
                      <p className="text-[9px] text-muted-foreground text-center italic mt-2">
                        All times are shown in {userTimeZone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Students List */}
                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <Users className="size-4 text-primary-blue" />
                    Assigned Learners ({selectedSchedule.students.length})
                  </h4>

                  {selectedSchedule.students.length > 0 ? (
                    <div className="space-y-3">
                      {selectedSchedule.students.map((student) => (
                        <div
                          key={`student-${student.id}`}
                          className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card hover:border-primary-blue/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {student.logo ? (
                              <Image
                                src={student.logo}
                                alt={student.name}
                                width={36}
                                height={36}
                                className="rounded-full size-9 object-cover border border-border/50"
                              />
                            ) : (
                              <div className="size-9 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-semibold text-sm border border-primary-blue/20">
                                {student.name.charAt(0)}
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold">
                                {student.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {student.email}
                              </span>
                            </div>
                          </div>

                          <div className="text-right flex flex-col items-end">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">
                              Booking ID
                            </span>
                            <span className="text-xs font-mono bg-card   px-2 py-0.5 rounded text-foreground font-medium">
                              #{student.booking.id}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground text-sm border border-dashed border-border/60 rounded-xl bg-muted/20">
                      No learners assigned to this schedule yet.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </ContentWrapper>
  );
}

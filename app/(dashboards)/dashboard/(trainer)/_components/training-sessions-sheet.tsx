"use client";

import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Info,
  Play,
  UserCheck,
  CheckCheck,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { formatInLocalTime } from "@/components/courses/CourseSchedule";
import { TrainerSchedule } from "./learners-sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import protectedApi from "@/lib/axios/protected";
import { Badge } from "@/components/ui/badge";

interface TrainingSessionsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: TrainerSchedule | null;
  setSchedules: React.Dispatch<React.SetStateAction<TrainerSchedule[]>>;
}

export function TrainingSessionsSheet({
  isOpen,
  onOpenChange,
  schedule,
  setSchedules,
}: TrainingSessionsSheetProps) {
  const router = useRouter();

  const [startingSession, setStartingSession] = useState<number | null>(null);

  const userTimeZone =
    typeof window !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";

  useEffect(() => {
    const handleFocus = () => {
      router.refresh();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [router]);

  const handleStartSession = async (sessionId: number) => {
    try {
      setStartingSession(sessionId);

      const res = await protectedApi.post(
        `/trainer/session/${sessionId}/start`
      );

      toast.success(res.data?.message || "Session started successfully");

      setSchedules((prev) =>
        prev.map((s) => ({
          ...s,
          sessions: s.sessions?.map((ss) =>
            ss.id === sessionId
              ? { ...ss, status: res.data?.data.status }
              : ss
          ),
        }))
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to start session");
      console.error(error);
    } finally {
      setStartingSession(null);
    }
  };

  const handleMarkAttendance = (sessionId: number) => {
    router.push(`/dashboard/trainer/session/${sessionId}/attendance`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader className="mb-6">
          <VisuallyHidden>Training Schedule Details</VisuallyHidden>
        </SheetHeader>

        <SheetTitle className="text-2xl font-bold flex items-center px-4 gap-2 mb-2">
          <Clock className="text-primary-blue" />
          Schedule Details
        </SheetTitle>

        <SheetDescription className="px-4 mb-6">
          Detailed session plan for:{" "}
          <span className="font-bold text-foreground">
            {schedule?.course.title}
          </span>
        </SheetDescription>

        <ScrollArea className="h-[calc(100vh-200px)] px-4">
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-primary-blue/5 border border-primary-blue/10 rounded-xl p-4">
              <h4 className="text-xs font-bold text-primary-blue uppercase tracking-widest mb-3">
                Overview
              </h4>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <Calendar size={14} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Training Title
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {schedule?.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <MapPin size={14} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Exact Location
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {schedule?.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <BookOpen size={14} className="text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">
                      Branch
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {schedule?.branch.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sessions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Sessions Plan
                </h4>

                <span className="text-[10px] font-bold bg-muted px-2 py-0.5 rounded-full">
                  {schedule?.sessions?.length || 0} TOTAL
                </span>
              </div>

              {schedule?.sessions?.map((session, index) => (
                <div
                  key={session.id}
                  className="p-4 border border-border/50 rounded-xl bg-card/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary-blue/10 flex items-center justify-center text-primary-blue font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground truncate">
                        {format(parseISO(session.date), "EEEE, dd MMMM yyyy")}
                      </p>

                      <div className="flex items-center gap-3 mt-1">
                        <div className="text-xs text-muted-foreground">
                          {formatInLocalTime(
                            session.date,
                            session.start_time
                          )}{" "}
                          -{" "}
                          {formatInLocalTime(
                            session.date,
                            session.end_time
                          )}
                        </div>

                        <Badge
                          variant={
                            session.status === "completed"
                              ? "primary"
                              : "outline"
                          }
                        >
                          {session.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">
                    {session.status === "completed" ? (
                      <Button size="sm" variant="outline" disabled>
                        <CheckCheck size={14} />
                        Completed
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStartSession(session.id)}
                        disabled={
                          startingSession === session.id ||
                          session.status === "in_progress"
                        }
                      >
                        <Play size={14} />
                        {startingSession === session.id
                          ? "Starting..."
                          : session.status === "in_progress"
                          ? "Started"
                          : "Start Session"}
                      </Button>
                    )}

                    <Button
                      size="sm"
                      onClick={() => handleMarkAttendance(session.id)}
                      disabled={
                        session.status === "scheduled" || !session.status
                      }
                    >
                      <UserCheck size={14} />
                      {session.status !== "completed"
                        ? "Mark Attendance"
                        : "View Attendance"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {userTimeZone && (
              <p className="text-[9px] text-muted-foreground text-center italic mt-2">
                All times are shown in {userTimeZone}
              </p>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { formatInLocalTime } from "@/components/courses/CourseSchedule";
import { TrainerSchedule } from "./learners-sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TrainingSessionsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: TrainerSchedule | null;
}

export function TrainingSessionsSheet({
  isOpen,
  onOpenChange,
  schedule,
}: TrainingSessionsSheetProps) {
  const router = useRouter();

  const [startingSession, setStartingSession] = useState<number | null>(null);

  const userTimeZone =
    typeof window !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";

  /**
   * Mock Start Session API
   */
  const handleStartSession = async (sessionId: number) => {
    try {
      setStartingSession(sessionId);

      // mock delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Session started successfully");

      // later replace with:
      // await protectedApi.post(`/trainer/sessions/${sessionId}/start`);
    } catch (error) {
      toast.error("Failed to start session");
      console.error(error);
    } finally {
      setStartingSession(null);
    }
  };

  /**
   * Navigate to Attendance Page
   */
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
            {/* Schedule Info */}
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

            {/* Sessions List */}
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
                  className="p-4 border border-border/50 rounded-xl bg-card/30 hover:bg-card/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
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
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 text-[11px] font-bold"
                      onClick={() => handleStartSession(session.id)}
                      disabled={startingSession === session.id}
                    >
                      <Play size={14} />
                      {startingSession === session.id
                        ? "Starting..."
                        : "Start Session"}
                    </Button>

                    <Button
                      size="sm"
                      className="gap-2 text-[11px] font-bold"
                      onClick={() => handleMarkAttendance(session.id)}
                    >
                      <UserCheck size={14} />
                      Mark Attendance
                    </Button>
                  </div>
                </div>
              ))}

              {userTimeZone && (
                <p className="text-[9px] text-muted-foreground text-center italic mt-2">
                  All times are shown in {userTimeZone}
                </p>
              )}
            </div>

            {/* Instructions */}
            {schedule?.instruction && (
              <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} className="text-yellow-600" />
                  <h4 className="text-xs font-bold text-yellow-600 uppercase tracking-widest">
                    Pre-training Instructions
                  </h4>
                </div>

                <p className="text-sm text-foreground/80 leading-relaxed italic">
                  &ldquo;{schedule.instruction}&rdquo;
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

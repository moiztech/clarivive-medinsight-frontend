"use client";

import React, { useCallback, useEffect, useState } from "react";
import ContentWrapper from "@/components/dashboard/content-wrapper";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { UserCheck, MapPin, Clock, ArrowLeft, CheckCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { formatInLocalTime } from "@/components/courses/CourseSchedule";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Learner {
  id: number;
  name: string;
  company: string;
  attendance_status: string | null;
  logo?: string;
}

interface SessionInfo {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  status?: string;
  course_title: string;
}

const statuses = ["present", "absent", "late", "excused"];

export default function AttendancePage() {
  const params = useParams();
  const sessionId = params.sessionId;

  const [learners, setLearners] = useState<Learner[]>([]);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [savedAttendance, setSavedAttendance] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const userTimeZone =
    typeof window !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : "";
  const fetchSessionAttendance = useCallback(async () => {
    try {
      const res = await protectedApi.get(
        `/trainer/session/${sessionId}/attendance`,
      );
      //   console.log(res);
      if (res?.data?.data?.session.status === "scheduled") {
        toast.error("Session is not started yet");
        router.back();
      }
      if (res?.status) {
        setSession(res.data.data.session);
        setLearners(res.data.data.learners);
        setSavedAttendance(
          res.data.data.learners.filter((l: Learner) => l.attendance_status)
            .length,
        );
      }
    } catch (error) {
      toast.error("Failed to load attendance data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [router, sessionId]);

  useEffect(() => {
    fetchSessionAttendance();
  }, [fetchSessionAttendance]);

  const updateStatus = (learnerId: number, status: string) => {
    setLearners((prev) =>
      prev.map((l) =>
        l.id === learnerId ? { ...l, attendance_status: status } : l,
      ),
    );
  };

  const markAll = (status: string) => {
    setLearners((prev) =>
      prev.map((l) => ({
        ...l,
        attendance_status: status,
      })),
    );
  };

  const saveAttendance = async () => {
    try {
      /*
      example payload
      {
  "attendance": [
    {
      "student_id": 31,
      "status": "present" 
    },
    {
      "student_id": 28,
      "status": "present" 
    }
  ]
}
      */
      const payload = learners.map((l) => ({
        student_id: l.id,
        status: l.attendance_status || "absent",
      }));

      const res = await protectedApi.post(
        `/trainer/session/${sessionId}/attendance`,
        {
          attendance: payload,
        },
      );

      if (res?.status) {
        setSavedAttendance(payload.length);
        // Keep local learner state in sync with submitted payload so the
        // "Complete Session" action enables immediately without a refresh.
        setLearners((prev) =>
          prev.map((learner) => {
            const submitted = payload.find((p) => p.student_id === learner.id);
            return submitted
              ? { ...learner, attendance_status: submitted.status }
              : learner;
          }),
        );
        toast.success("Attendance saved successfully");
        fetchSessionAttendance();
      }
    } catch (error: { response?: { data?: { message?: string } } } | any) {
      toast.error("Failed to save attendance." + error.response?.data?.message);
      console.error(error);
    }
  };

  const allAttendanceMarked =
    learners.length > 0 &&
    learners.every((learner) => Boolean(learner.attendance_status));

  const completeSession = async () => {
    if (session?.status === "completed") {
      toast.error("Session is already completed");
      return;
    }
    if (!allAttendanceMarked || savedAttendance !== learners.length) {
      toast.error("Please finalize attendance for all learners");
      return;
    }
    try {
      const res = await protectedApi.post(
        `/trainer/session/${sessionId}/complete`,
      );
      if (res?.status) {
        toast.success("Session completed successfully");
        setSession((prev) => (prev ? { ...prev, status: "completed" } : prev));
      }
    } catch (error: any) {
      toast.error(
        "Failed to complete session." + error.response?.data?.message,
      );
      console.error(error);
    }
  };

  return (
    <ContentWrapper
      heading="Session Attendance"
      subHeading="Mark learner attendance for this training session"
      rightContent={
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="font-bold"
        >
          <ArrowLeft />
          Back
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Session Info */}
        {session && (
          <div className="flex flex-wrap items-center gap-6 p-5 rounded-xl border bg-card">
            <div>
              <p className="text-xs text-muted-foreground">Course</p>
              <p className="font-bold">{session.course_title}</p>
            </div>
            <div className="flex flex-col gap-0">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>
                  {session.date} |{" "}
                  {formatInLocalTime(session.date, session.start_time)} -{" "}
                  {formatInLocalTime(session.date, session.end_time)}
                </span>
              </div>
              {userTimeZone && (
                <p className="text-[9px] text-muted-foreground text-center italic">
                  All times are shown in {userTimeZone}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{session.location}</span>
            </div>
          </div>
        )}

        {/* Quick actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => markAll("present")}
            className="font-bold"
          >
            Mark All Present
          </Button>

          <Button
            variant="outline"
            onClick={() => markAll("absent")}
            className="font-bold"
          >
            Mark All Absent
          </Button>
        </div>

        {/* Attendance Table */}
        <div className="border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Learner</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {learners.map((learner) => (
                <TableRow key={learner.id}>
                  <TableCell className="font-semibold flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src={learner.logo} />
                      <AvatarFallback>{learner.name[0]}</AvatarFallback>
                    </Avatar>
                    <Badge variant={"outline"}>{learner.id}</Badge>
                    {learner.name}
                  </TableCell>

                  <TableCell>{learner?.company || "N/A"}</TableCell>

                  <TableCell>
                    {session?.status !== "completed" ? (
                      <Select
                        value={learner.attendance_status || ""}
                        onValueChange={(value) =>
                          updateStatus(learner.id, value)
                        }
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant={
                          learner.attendance_status === "present"
                            ? "success"
                            : "destructive"
                        }
                      >
                        {learner.attendance_status}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-4">
          {/* <Button
            variant="outline"
            onClick={() => saveAttendance(false)}
            className="font-bold"
          >
            Save Draft
          </Button> */}
          {session?.status === "completed" ? (
            ""
          ) : (
            <Button
              variant="primary"
              onClick={() => saveAttendance()}
              className="gap-2 font-bold"
            >
              <UserCheck size={16} />
              Finalize Attendance
            </Button>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant="outline"
                    onClick={() => completeSession()}
                    disabled={
                      !allAttendanceMarked ||
                      savedAttendance !== learners.length ||
                      session?.status === "completed"
                    }
                    className="gap-2 font-bold"
                  >
                    <CheckCheck size={16} />
                    {session?.status === "completed"
                      ? "Session Completed"
                      : "Complete Session"}
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {!allAttendanceMarked ? (
                  <p className="text-xs text-muted-foreground">
                    Mark attendance for every learner first.
                  </p>
                ) : savedAttendance !== learners.length ? (
                  <p className="text-xs text-muted-foreground">
                    Finalize attendance before completing the session.
                  </p>
                ) : null}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </ContentWrapper>
  );
}

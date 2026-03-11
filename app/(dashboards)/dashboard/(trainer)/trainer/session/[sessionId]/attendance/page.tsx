"use client";

import React, { useEffect, useState } from "react";
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

import { UserCheck, MapPin, Clock } from "lucide-react";
import { useParams } from "next/navigation";

interface Learner {
  id: number;
  name: string;
  company: string;
  attendance_status: string | null;
}

interface SessionInfo {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  course_title: string;
}

const statuses = ["present", "absent", "late", "no_show", "cancelled"];

export default function AttendancePage() {
  const params = useParams();
  const sessionId = params.sessionId;

  const [learners, setLearners] = useState<Learner[]>([]);
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSessionAttendance = async () => {
    try {
      //   const res = await protectedApi.get(
      //     `/trainer/sessions/${sessionId}/attendance`,
      //   );
      const res = {
        data: JSON.parse(
          `{
      "status": true,
      "data": {
        "session": {
          "id": 5,
          "date": "2026-03-12",
          "start_time": "10:00",
          "end_time": "12:00",
          "location": "Main Branch",
          "course_title": "Manual Handling Training"
        },
        "learners": [
          {
            "id": 1,
            "name": "Ali Raza",
            "company": "ABC Ltd",
            "attendance_status": "present"
          },
          {
            "id": 2,
            "name": "Sarah Khan",
            "company": "XYZ Ltd",
            "attendance_status": null
          }
        ]
      }
    }`,
        ),
        status: true,
      };
      //   console.log(res);
      if (res?.status) {
        setSession(res.data.data.session);
        setLearners(res.data.data.learners);
      }
    } catch (error) {
      toast.error("Failed to load attendance data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessionAttendance();
  }, [sessionId]);

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

  const saveAttendance = async (finalize = false) => {
    try {
      const payload = learners.map((l) => ({
        learner_id: l.id,
        status: l.attendance_status || "absent",
      }));

      await protectedApi.post(`/trainer/sessions/${sessionId}/attendance`, {
        attendance: payload,
      });

      if (finalize) {
        await protectedApi.post(`/trainer/sessions/${sessionId}/finalize`);
      }

      toast.success(
        finalize
          ? "Attendance finalized successfully"
          : "Attendance saved successfully",
      );
    } catch (error) {
      toast.error("Failed to save attendance");
      console.error(error);
    }
  };

  return (
    <ContentWrapper
      heading="Session Attendance"
      subHeading="Mark learner attendance for this training session"
    >
      <div className="space-y-6">
        {/* Session Info */}
        {session && (
          <div className="flex flex-wrap gap-6 p-5 rounded-xl border bg-card">
            <div>
              <p className="text-xs text-muted-foreground">Course</p>
              <p className="font-bold">{session.course_title}</p>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>
                {session.date} | {session.start_time} - {session.end_time}
              </span>
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
                  <TableCell className="font-semibold">
                    {learner.name}
                  </TableCell>

                  <TableCell>{learner.company}</TableCell>

                  <TableCell>
                    <Select
                      value={learner.attendance_status || ""}
                      onValueChange={(value) => updateStatus(learner.id, value)}
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => saveAttendance(false)}
            className="font-bold"
          >
            Save Draft
          </Button>

          <Button
            variant="primary"
            onClick={() => saveAttendance(true)}
            className="gap-2 font-bold"
          >
            <UserCheck size={16} />
            Finalize Attendance
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Schedule, Session } from "@/lib/types";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ScrollArea } from "../ui/scroll-area";

const CourseSchedule = ({
  schedules,
  courseThumbnail,
}: {
  schedules?: Schedule[];
  courseThumbnail?: string;
}) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );
  const detailsRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (selectedScheduleId && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedScheduleId]);

  if (!schedules?.length || schedules?.length === 0) {
    return (
      <div className="min-h-screen">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
          Schedule
        </h2>
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">
            No schedules available, check back later
          </p>
        </div>
      </div>
    );
  }

  const activeId = selectedScheduleId ?? schedules?.[0]?.id ?? null;
  const selectedSchedule = schedules?.find((s) => s.id === activeId);

  const formatDateRange = (sessions?: Session[]) => {
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

  const groupedSchedules = schedules?.reduce(
    (acc, schedule) => {
      const month =
        schedule?.sessions?.[0]?.month ||
        (schedule?.sessions?.[0]?.date && schedule.sessions[0]
          ? format(parseISO(schedule.sessions[0].date), "MMMM")
          : "Other");
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(schedule);
      return acc;
    },
    {} as Record<string, Schedule[]>,
  );

  return (
    <>
      {/* <div className="max-w-7xl mx-auto px-4 py-12 bg-[#F9FAFB] min-h-screen"> */}
      {/* <div className="flex flex-col lg:flex-row gap-6"> */}
      {/* LEFT SIDEBAR - SESSIONS LIST */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden h-fit lg:sticky lg:top-28 lg:row-span-2 lg:order-1 order-2">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2 text-slate-500 text-sm">
          <Calendar size={16} />
          <span>Available Dates</span>
        </div>
        <ScrollArea>
          <div className="divide-y divide-gray-50">
            {groupedSchedules &&
              Object.entries(groupedSchedules).map(
                ([month, monthSchedules]) => (
                  <div key={month}>
                    <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-700 uppercase">
                      {month}
                    </div>
                    {monthSchedules.map((schedule) => (
                      <button
                        key={schedule.id}
                        onClick={() => setSelectedScheduleId(schedule.id)}
                        className={cn(
                          "w-full flex cursor-pointer items-center gap-4 px-4 py-4 text-sm transition-colors text-left",
                          activeId === schedule.id
                            ? "bg-primary-blue/10 border-l-4 border-primary-blue"
                            : "hover:bg-gray-50 border-l-4 border-transparent",
                        )}
                      >
                        <div className="flex flex-col flex-1 gap-1">
                          <span className="font-bold text-gray-800">
                            {schedule.title}
                          </span>
                          <span className="text-primary-blue font-medium flex items-center gap-1.5 ">
                            <Calendar size={14} />
                            {formatDateRange(schedule.sessions)}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-[10px] font-medium py-0 px-2 h-5"
                            >
                              {schedule.branch?.title}
                            </Badge>
                            <span className="text-[10px] text-gray-400">
                              {schedule.sessions?.length || 0} Session
                              {schedule.sessions?.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ),
              )}
          </div>
        </ScrollArea>
      </div>

      {/* RIGHT SIDE - DETAIL VIEW */}
      <div
        ref={detailsRef}
        className="space-y-6 order-3 lg:col-span-2 col-span-3 scroll-mt-28"
      >
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-800">
              {selectedSchedule?.title}{" "}
              {selectedSchedule?.branch
                ? `(${selectedSchedule?.branch?.title})`
                : ""}
            </h3>
          </div>

          {/* Hero Image */}
          <div className="w-full">
            <div>
              {selectedSchedule?.image ? (
                <div className="relative h-64 md:h-80 max-w-3xl min-w-2xl border-b border-gray-100">
                  <Image
                    src={selectedSchedule?.image}
                    alt="Course context"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative h-64 md:h-80 max-w-3xl min-w-2xl border-b border-gray-100">
                  <Image
                    src={courseThumbnail ? courseThumbnail : "/placeholder.jpg"}
                    alt="Course context"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {/* Quick Info */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={18} className="text-primary-blue" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Date
                      </span>
                      <span className="font-medium text-gray-800">
                        {selectedSchedule
                          ? formatDateRange(selectedSchedule.sessions)
                          : "Select a schedule"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <MapPin size={18} className="text-primary-blue mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Location
                      </span>
                      <span className="font-medium text-gray-800">
                        {selectedSchedule?.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users size={18} className="text-primary-blue" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Availability
                      </span>
                      <span className="font-medium text-gray-800">
                        {selectedSchedule?.spaces_available} spaces available
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={18} className="text-primary-blue" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Format
                      </span>
                      <span className="font-medium text-gray-800">
                        {selectedSchedule?.sessions?.length || 0} Session
                        {selectedSchedule?.sessions?.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grow">
              {/* Sessions Detailed List */}
              {selectedSchedule?.sessions &&
                selectedSchedule.sessions.length > 0 && (
                  <div className="border-t border-gray-100 px-6 py-6 pb-2">
                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                      Session Schedule
                    </h4>
                    <div className="space-y-2">
                      {selectedSchedule.sessions.map((session, index) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-gray-50 bg-gray-50/50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-primary-blue shadow-sm">
                              {index + 1}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-800">
                                {format(
                                  parseISO(session.date),
                                  "EEEE, dd MMMM",
                                )}
                              </span>
                              <span className="text-xs text-gray-500">
                                {session.month}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm">
                            <Clock size={14} className="text-primary-blue" />
                            <span className="text-xs font-semibold text-gray-700">
                              {session.start_time.substring(0, 5)} -{" "}
                              {session.end_time.substring(0, 5)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Accordion Information */}
              <div className="border-t border-gray-100 mt-0">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:no-underline">
                      View More Details
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm mb-1">
                          Description
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {selectedSchedule?.description}
                        </p>
                      </div>
                      {selectedSchedule?.branch && (
                        <div>
                          <Link
                            href={`/branches/${selectedSchedule?.branch?.slug}`}
                            className="inline-block"
                          >
                            <h4 className="font-bold text-gray-800 text-sm mb-1 hover:underline underline-offset-2 decoration-1 decoration-primary-blue flex items-center gap-1">
                              Branch Location <MapPin size={14} />
                            </h4>
                          </Link>
                          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-sm border border-gray-100 mt-1">
                            <p className="font-medium text-gray-800 mb-1">
                              {selectedSchedule?.branch?.title}
                            </p>
                            <a
                              href={`${selectedSchedule?.branch?.location}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-blue hover:underline break-all"
                            >
                              {selectedSchedule?.branch?.location}
                            </a>
                          </div>
                        </div>
                      )}
                      <div className="pt-2">
                        <h4 className="font-bold text-gray-800 text-sm mb-2">
                          Pre-course Instructions
                        </h4>
                        <div className="text-sm text-gray-600 bg-blue-50/30 p-4 rounded-sm border border-blue-100/50 italic">
                          {selectedSchedule?.instruction}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default CourseSchedule;

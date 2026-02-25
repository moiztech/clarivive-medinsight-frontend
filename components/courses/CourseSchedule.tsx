"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Schedule } from "@/lib/types";
import { Badge } from "../ui/badge";
import Link from "next/link";

// Dummy Data
// const SCHEDULE_DATA = [
//   {
//     month: "March, 2026",
//     sessions: [
//       {
//         id: "m1",
//         day: "12",
//         weekday: "Thu",
//         time: "9:30am GMT",
//         title: "3 Day Full PMVA in Birmingham",
//       },
//       {
//         id: "m2",
//         day: "13",
//         weekday: "Fri",
//         time: "9:30am GMT",
//         title: "PMVA Refresher in Birmingham",
//       },
//     ],
//   },
//   {
//     month: "April",
//     sessions: [
//       {
//         id: "a1",
//         day: "16",
//         weekday: "Thu",
//         time: "9:30am BST",
//         title: "3 Day Full PMVA in Birmingham",
//       },
//       {
//         id: "a2",
//         day: "17",
//         weekday: "Fri",
//         time: "9:30am BST",
//         title: "PMVA Refresher in Birmingham",
//       },
//     ],
//   },
//   {
//     month: "May",
//     sessions: [
//       {
//         id: "may1",
//         day: "14",
//         weekday: "Thu",
//         time: "9:30am BST",
//         title: "3 Day Full PMVA in Birmingham",
//       },
//       {
//         id: "may2",
//         day: "15",
//         weekday: "Fri",
//         time: "9:30am BST",
//         title: "PMVA Refresher in Birmingham",
//       },
//     ],
//   },
//   {
//     month: "June",
//     sessions: [
//       {
//         id: "j1",
//         day: "11",
//         weekday: "Thu",
//         time: "9:30am BST",
//         title: "3 Day Full PMVA in Birmingham",
//       },
//       {
//         id: "j2",
//         day: "12",
//         weekday: "Fri",
//         time: "9:30am BST",
//         title: "PMVA Refresher in Birmingham",
//       },
//     ],
//   },
// ];

// const TICKETS_DATA = [
//   {
//     id: "t1",
//     name: "Winter Promotion",
//     price: "250.00",
//     limit: "18 available until Wed 25 Feb 4pm",
//   },
//   {
//     id: "t2",
//     name: "Full PMVA Training",
//     price: "300.00",
//     limit: "18 available until Wed 11 Mar 4pm",
//   },
// ];

const CourseSchedule = ({ schedules }: { schedules?: Schedule[] }) => {
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null,
  );

  if (!schedules?.length || schedules?.length === 0) {
    return null;
  }

  const activeId = selectedSessionId ?? schedules?.[0]?.id ?? null;
  const selectedSession = schedules?.find((s) => s.id === activeId);

  const groupedSessions = schedules?.reduce(
    (acc, session) => {
      const month = session.month.split(" ")[0];
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(session);
      return acc;
    },
    {} as Record<string, Schedule[]>,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-[#F9FAFB] min-h-screen">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
        Schedule
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDEBAR - SESSIONS LIST */}
        <div className="lg:w-1/3 bg-white border lg:sticky top-24 border-gray-200 rounded-sm shadow-sm overflow-hidden h-fit">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2 text-slate-500 text-sm">
            <Calendar size={16} />
            <span>
              From{" "}
              {schedules?.[0]?.date
                ? new Date(schedules[0].date).toLocaleDateString()
                : "..."}
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {groupedSessions &&
              Object.entries(groupedSessions).map(([month, sessions]) => (
                <div key={month}>
                  <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-700 uppercase">
                    {month}
                  </div>
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => setSelectedSessionId(session.id)}
                      className={cn(
                        "w-full flex cursor-pointer items-center gap-4 px-2 py-3 text-sm transition-colors text-left",
                        activeId === session.id
                          ? "bg-primary-blue/10 border-l-4 border-primary-blue"
                          : "hover:bg-gray-50 border-l-4 border-transparent",
                      )}
                    >
                      <span className="font-bold w-4">
                        #{session.schedule_no}
                      </span>
                      <span className="text-gray-500 w-22">{session.date}</span>
                      <span className="text-gray-400 text-xs w-20">
                        {session.start_time} - {session.end_time}
                      </span>
                      <span className="flex-1 text-gray-700 truncate">
                        {session.title} <br />
                        <Badge variant="outline">{session.branch?.title}</Badge>
                      </span>
                    </button>
                  ))}
                </div>
              ))}
          </div>
          <div className="p-4 text-[10px] text-gray-400 border-t border-gray-100">
            Times shown in timezone: London
          </div>
        </div>

        {/* RIGHT SIDE - DETAIL VIEW */}
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                {selectedSession?.title}{" "}
                {selectedSession?.branch
                  ? `(${selectedSession?.branch?.title})`
                  : ""}
              </h3>
            </div>

            {/* Hero Image */}
            {selectedSession?.image && (
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src={selectedSession.image}
                  alt="Course context"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Quick Info */}
            <div className="p-6 space-y-3 bg-white">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={18} className="text-gray-800" />
                {/* 2026-02-24 */}
                <span>
                  {selectedSession?.date
                    ? new Date(selectedSession.date).toLocaleDateString()
                    : "Select a session"}
                </span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={18} className="text-gray-800 mt-0.5" />
                <span>{selectedSession?.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Users size={18} className="text-gray-800" />
                <span>
                  {selectedSession?.spaces_available} spaces available
                </span>
              </div>
            </div>

            {/* Accordion Information */}
            <div className="border-t border-gray-100">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:no-underline">
                    Information
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 space-y-3">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">
                        Details
                      </h4>
                      <p className="text-sm text-gray-600">
                        {selectedSession?.description}
                      </p>
                    </div>
                    {selectedSession?.branch && (
                      <div>
                        <Link
                          href={`/branches/${selectedSession?.branch?.slug}`}
                        >
                          <h4 className="font-bold text-gray-800 text-sm mb-1 hover:underline underline-offset-2 decoration-1">
                            Branch
                          </h4>
                        </Link>
                        <p className="text-sm text-gray-600 flex gap-1 items-center">
                          {selectedSession?.branch?.title}, <MapPin size={16} />{" "}
                          <a
                            href={`${selectedSession?.branch?.location}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {selectedSession?.branch?.location}
                          </a>
                        </p>
                      </div>
                    )}
                    <div className="border-t border-gray-50">
                      <h4 className="font-bold text-gray-800 text-sm mb-2">
                        Instructions
                      </h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        {selectedSession?.instruction}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Tickets Section */}
            {/* <div className="border-t border-gray-100 bg-white">
              <div className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-gray-50">
                Tickets
              </div>
              <div className="divide-y divide-gray-50">
                {TICKETS_DATA.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-6 flex justify-between items-center group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-gray-800">
                        <Ticket size={16} />
                        <span>{ticket.name}</span>
                      </div>
                      <div className="text-lg font-bold text-gray-900 leading-none">
                        £{ticket.price}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        {ticket.limit}
                      </div>
                    </div>
                    <Button
                      onClick={() => toggleTicket(ticket.id)}
                      className={cn(
                        "rounded-sm text-xs font-semibold px-6 transition-all",
                        selectedTickets.includes(ticket.id)
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-primary-blue hover:bg-primary-blue/80 text-white",
                      )}
                    >
                      {selectedTickets.includes(ticket.id)
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Sticky/Bottom Action */}
            {/* <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <Button
                disabled={selectedTickets.length === 0}
                className={cn(
                  "rounded-sm text-sm font-semibold px-8 py-2 transition-all",
                  selectedTickets.length > 0
                    ? "bg-primary-blue hover:bg-primary-blue/80 text-white cursor-pointer"
                    : "bg-primary-blue/40 text-white cursor-not-allowed",
                )}
              >
                View selections
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSchedule;

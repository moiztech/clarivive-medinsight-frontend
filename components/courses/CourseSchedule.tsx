"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  ChevronUp,
  Info,
  Ticket,
  Clock,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Dummy Data
const SCHEDULE_DATA = [
  {
    month: "March, 2026",
    sessions: [
      {
        id: "m1",
        day: "12",
        weekday: "Thu",
        time: "9:30am GMT",
        title: "3 Day Full PMVA in Birmingham",
      },
      {
        id: "m2",
        day: "13",
        weekday: "Fri",
        time: "9:30am GMT",
        title: "PMVA Refresher in Birmingham",
      },
    ],
  },
  {
    month: "April",
    sessions: [
      {
        id: "a1",
        day: "16",
        weekday: "Thu",
        time: "9:30am BST",
        title: "3 Day Full PMVA in Birmingham",
      },
      {
        id: "a2",
        day: "17",
        weekday: "Fri",
        time: "9:30am BST",
        title: "PMVA Refresher in Birmingham",
      },
    ],
  },
  {
    month: "May",
    sessions: [
      {
        id: "may1",
        day: "14",
        weekday: "Thu",
        time: "9:30am BST",
        title: "3 Day Full PMVA in Birmingham",
      },
      {
        id: "may2",
        day: "15",
        weekday: "Fri",
        time: "9:30am BST",
        title: "PMVA Refresher in Birmingham",
      },
    ],
  },
  {
    month: "June",
    sessions: [
      {
        id: "j1",
        day: "11",
        weekday: "Thu",
        time: "9:30am BST",
        title: "3 Day Full PMVA in Birmingham",
      },
      {
        id: "j2",
        day: "12",
        weekday: "Fri",
        time: "9:30am BST",
        title: "PMVA Refresher in Birmingham",
      },
    ],
  },
];

const TICKETS_DATA = [
  {
    id: "t1",
    name: "Winter Promotion",
    price: "250.00",
    limit: "18 available until Wed 25 Feb 4pm",
  },
  {
    id: "t2",
    name: "Full PMVA Training",
    price: "300.00",
    limit: "18 available until Wed 11 Mar 4pm",
  },
];

const CourseSchedule = () => {
  const [selectedSessionId, setSelectedSessionId] = useState("m1");
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);

  const toggleTicket = (id: string) => {
    setSelectedTickets((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const selectedSession = SCHEDULE_DATA.flatMap((m) => m.sessions).find(
    (s) => s.id === selectedSessionId,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-[#F9FAFB] min-h-screen">
      <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-2">
        Schedule
      </h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDEBAR - SESSIONS LIST */}
        <div className="lg:w-1/3 bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden h-fit">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2 text-slate-500 text-sm">
            <Calendar size={16} />
            <span>From 16 Feb 2026</span>
          </div>

          <div className="divide-y divide-gray-50">
            {SCHEDULE_DATA.map((group) => (
              <div key={group.month}>
                <div className="bg-gray-50 px-4 py-2 text-xs font-bold text-gray-700 uppercase">
                  {group.month}
                </div>
                {group.sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSessionId(session.id)}
                    className={cn(
                      "w-full flex cursor-pointer items-center gap-4 px-4 py-3 text-sm transition-colors text-left",
                      selectedSessionId === session.id
                        ? "bg-primary-blue/10 border-l-4 border-primary-blue"
                        : "hover:bg-gray-50 border-l-4 border-transparent",
                    )}
                  >
                    <span className="font-bold w-6">{session.day}</span>
                    <span className="text-gray-500 w-8">{session.weekday}</span>
                    <span className="text-gray-400 text-xs w-20">
                      {session.time}
                    </span>
                    <span className="flex-1 text-gray-700 truncate">
                      {session.title}
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
                {selectedSession?.title}
              </h3>
              <Button variant="primary" size="sm">
                View details
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1000"
                alt="Course context"
                fill
                className="object-cover"
              />
            </div>

            {/* Quick Info */}
            <div className="p-6 space-y-3 bg-white">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={18} className="text-gray-800" />
                <span>Thursday, 12 March '26 &nbsp; 9:30am – 4pm GMT</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-gray-600">
                <MapPin size={18} className="text-gray-800 mt-0.5" />
                <span>
                  Wood Lane Community Centre, 157 Wood Lane, West Bromwich, B70
                  9PT
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Users size={18} className="text-gray-800" />
                <span>36 spaces available</span>
              </div>
            </div>

            {/* Accordion Information */}
            <div className="border-t border-gray-100">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="px-6 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:no-underline">
                    Information
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1">
                        Details
                      </h4>
                      <p className="text-sm text-gray-600">
                        Prevention and Management of Violence and Aggression
                      </p>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                      <h4 className="font-bold text-gray-800 text-sm mb-2">
                        Instructions
                      </h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <p className="uppercase font-bold text-[10px]">
                          Dress Code:
                        </p>
                        <p>
                          Please dress appropriately for physical activity. No
                          high heels or open shoes and restrictive clothing and
                          jewellery. Trainers and tracksuit are ideal
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Tickets Section */}
            <div className="border-t border-gray-100 bg-white">
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
            </div>

            {/* Sticky/Bottom Action */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSchedule;

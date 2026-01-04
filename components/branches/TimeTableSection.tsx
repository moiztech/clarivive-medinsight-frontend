"use client";

import { EventType } from "@/lib/types";
import { useState } from "react";

const departments = ["All Events", "Radiation Therapy", "Neurology", "Orthopedics", "Dental Care", "Oncology", "Cardiology", "Diagnostic"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function TimetableSection() {
  const events: EventType[] = [
    {
      id: 1,
      department: "Radiation Therapy",
      day: "Monday",
      start: "09:00",
      end: "11:00",
      doctor: "Dr. Whitney Rain",
    },
    {
      id: 2,
      department: "Dental Care",
      day: "Wednesday",
      start: "10:00",
      end: "12:00",
      doctor: "Dr. Hailey Star",
    },
    {
      id: 3,
      department: "Cardiology",
      day: "Friday",
      start: "11:00",
      end: "13:00",
      doctor: "Dr. Blanco Smith",
    },
    {
      id: 4,
      department: "Orthopedics",
      day: "Saturday",
      start: "09:00",
      end: "10:00",
      doctor: "Dr. Hailey Star",
    },
    {
      id: 5,
      department: "Neurology",
      day: "Monday",
      start: "16:00",
      end: "18:00",
      doctor: "Dr. Alice Luv",
    },
    {
      id: 6,
      department: "Oncology",
      day: "Thursday",
      start: "15:00",
      end: "16:00",
      doctor: "Dr. Sofia Mac",
    },
  ];

  const [activeDept, setActiveDept] = useState("All Events");

  const filteredEvents = activeDept === "All Events" ? events : events.filter((e) => e.department === activeDept);

  return (
    <section className="py-20 lg:px-15 2xl:px-20">
      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {departments.map((dep) => (
          <button
            key={dep}
            onClick={() => setActiveDept(dep)}
            className={`px-5 py-2 cursor-pointer rounded-md text-sm font-medium transition
              ${activeDept === dep ? "bg-[#1321F1] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            {dep}
          </button>
        ))}
      </div>

      {/* TIMETABLE */}
      <Timetable events={filteredEvents} />
    </section>
  );
}

function Timetable({ events }: { events: EventType[] }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[900px] border rounded-xl overflow-hidden">
        {/* HEADER */}
        <div className="grid grid-cols-7 bg-slate-900 text-white text-sm">
          <div className="p-4">Time</div>
          {days.map((day) => (
            <div key={day} className="p-4 text-center font-medium">
              {day}
            </div>
          ))}
        </div>

        {/* BODY */}
        {["09:00", "11:00", "13:00", "15:00", "17:00"].map((time) => (
          <div key={time} className="grid grid-cols-7 border-t">
            <div className="p-4 text-sm text-slate-500">{time}</div>

            {days.map((day) => {
              const event = events.find((e) => e.day === day && e.start === time);

              return (
                <div key={day} className="p-3 border-l min-h-[90px]">
                  {event && (
                    <div className="bg-teal-50 rounded-lg p-3 text-sm">
                      <p className="font-semibold text-slate-800">{event.department}</p>
                      <p className="text-slate-600">
                        {event.start} – {event.end}
                      </p>
                      <p className="text-xs text-slate-500">{event.doctor}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

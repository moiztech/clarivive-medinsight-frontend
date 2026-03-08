"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { es } from "react-day-picker/locale";

export function TrainerCalendar({
  selected,
  onSelect,
  bookedDates = [],
}: {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  bookedDates?: Date[];
}) {
  return (
    <Card className="mx-auto w-fit p-0 shadow-lg border-none bg-card/60 backdrop-blur-md ring-1 ring-border/50">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          buttonVariant={"primary"}
          //   disabled={bookedDates}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked:
              "[&>button]:bg-primary-blue text-white opacity-100! font-bold",
          }}
          className="rounded-xl"
        />
      </CardContent>
    </Card>
  );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CalendarWidget() {
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const firstDayOfMonth = 2; // Wednesday for December 2025

  // Create array with empty slots for days before month starts
  const calendarDays = [...Array(firstDayOfMonth).fill(null), ...days];

  return (
    <Card className="p-6 bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Calendar</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center mb-4">
        <p className="text-sm font-semibold text-foreground">December 2025</p>
      </div>

      <div className="space-y-2">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-xs font-semibold text-muted-foreground text-center py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div key={index} className="aspect-square">
              {day ? (
                <Button
                  variant="ghost"
                  className={`h-full w-full p-0 text-xs ${
                    day === 12
                      ? "bg-primary-blue hover:bg-primary-blue/90"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  {day}
                </Button>
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

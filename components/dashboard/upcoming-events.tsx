import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const events = [
  {
    id: 1,
    time: "09:00 - 09:45 AM",
    title: "Marketing Strategy Kickoff",
    organizer: "Kandy Nelson King",
    action: "View",
  },
  {
    id: 2,
    time: "11:15 - 12:00 AM",
    title: "Product Design Brainstorm",
    organizer: "Lydia Anderson",
    action: "View",
  },
  {
    id: 3,
    time: "02:00 - 03:00 AM",
    title: "Client Feedback Review",
    organizer: "Courtney Henry",
    action: "View",
  },
  {
    id: 4,
    time: "04:15 - 05:00 AM",
    title: "Sprint Planning & Task Allocation",
    organizer: "Eleanor Terry",
    action: "View",
  },
  {
    id: 5,
    time: "01:15 - 02:00 AM",
    title: "Client Feedback Review",
    organizer: "John",
    action: "View",
  },
];

export function UpcomingEvents() {
  return (
    <Card className="p-6 bg-card flex flex-col">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Upcoming Events
      </h3>
      <div className="space-y-3 flex-1 overflow-y-auto max-h-96">
        {events.map((event) => (
          <div
            key={event.id}
            className="pb-3 border-b border-border last:border-b-0"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-muted-foreground">
                  {event.time}
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {event.title}
                </p>
                <p className="text-xs text-primary mt-1">
                  Lead by {event.organizer}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex-shrink-0 text-primary border-primary hover:bg-primary/10 bg-transparent"
              >
                {event.action}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

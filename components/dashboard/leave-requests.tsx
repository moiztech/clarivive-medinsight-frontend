import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const leaveRequests = [
  {
    id: 1,
    name: "Darlene Robertson",
    role: "Teacher",
    days: "3 Days",
    dueDate: "Apply on: 10 April",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darlene",
  },
  {
    id: 2,
    name: "Esther Howard",
    role: "English Teacher",
    days: "3 Days",
    dueDate: "Apply on: 10 April",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esther",
  },
  {
    id: 3,
    name: "Kristin Watson",
    role: "English Teacher",
    days: "3 Days",
    dueDate: "Apply on: 10 April",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin",
  },
  {
    id: 4,
    name: "Leslie Alexander",
    role: "English Teacher",
    days: "3 Days",
    dueDate: "Apply on: 10 April",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leslie",
  },
  {
    id: 5,
    name: "Dianne Russell",
    role: "English Teacher",
    days: "3 Days",
    dueDate: "Apply on: 10 April",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dianne",
  },
  {
    id: 6,
    name: "Kristin Watson",
    role: "English Teacher",
    days: "3 Days",
    dueDate: "Apply on: 10 April",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin2",
  },
];

export function LeaveRequests() {
  return (
    <Card className="p-6 bg-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Leave Requests
        </h3>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto min-h-110 max-h-120">
        {leaveRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-start justify-between gap-3 pb-3 border-b border-border last:border-b-0"
          >
            <div className="flex gap-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={request.avatar || "/placeholder.svg"} />
                <AvatarFallback>{request.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {request.name}
                </p>
                <p className="text-xs text-muted-foreground">{request.role}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary text-xs"
              >
                {request.days}
              </Badge>
              <p className="text-xs text-muted-foreground text-right">
                {request.dueDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

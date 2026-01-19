import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const students = [
  {
    id: 1,
    name: "Brooklyn Simmons",
    class: "Class: Six",
    marks: "20",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Brooklyn",
  },
  {
    id: 2,
    name: "Floyd Miles",
    class: "Class: Seven",
    marks: "30",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd",
  },
  {
    id: 3,
    name: "Courtney Henry",
    class: "Class: Eight",
    marks: "40",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Courtney",
  },
  {
    id: 4,
    name: "Kathryn Murphy",
    class: "Class: Nine",
    marks: "60",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn",
  },
  {
    id: 5,
    name: "Annette Black",
    class: "Class: Ten",
    marks: "80",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Annette",
  },
];

const markColors: { [key: string]: string } = {
  "20": "bg-red-500/20 text-red-500",
  "30": "bg-orange-500/20 text-orange-500",
  "40": "bg-yellow-500/20 text-yellow-500",
  "60": "bg-blue-500/20 text-blue-500",
  "80": "bg-green-500/20 text-green-500",
};

export function TopStudents() {
  return (
    <Card className="p-6 bg-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Top Student</h3>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3 flex-1">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between gap-3 pb-3 border-b border-border last:border-b-0"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={student.avatar || "/placeholder.svg"} />
                <AvatarFallback>{student.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {student.name}
                </p>
                <p className="text-xs text-muted-foreground">{student.class}</p>
              </div>
            </div>
            <Badge
              className={`flex-shrink-0 ${
                markColors[student.marks] ||
                "bg-primary/20 text-primary hover:bg-primary/30"
              }`}
            >
              {student.marks}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}

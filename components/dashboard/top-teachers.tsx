import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const teachers = [
  {
    id: 1,
    name: "Theresa Webb",
    email: "example@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Theresa",
  },
  {
    id: 2,
    name: "Darrell Steward",
    email: "example@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darrell",
  },
  {
    id: 3,
    name: "Jane Cooper",
    email: "example@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: 4,
    name: "Savannah Nguyen",
    email: "example@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Savannah",
  },
  {
    id: 5,
    name: "Eleanor Pena",
    email: "example@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eleanor",
  },
];

export function TopTeachers() {
  return (
    <Card className="p-6 bg-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Top Teachers</h3>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3 flex-1">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="flex items-center gap-3 pb-3 border-b border-border last:border-b-0"
          >
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
              <AvatarFallback>{teacher.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {teacher.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {teacher.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

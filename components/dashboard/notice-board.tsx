import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

const notices = [
  {
    id: 1,
    author: "Admin",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting",
    date: "Jan 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  },
  {
    id: 2,
    author: "Kathryn Murphy",
    content:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry",
    date: "Jan 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathryn",
  },
  {
    id: 3,
    author: "Admin",
    content: "Lorem ipsum is simply dummy text of the printing and typesetting",
    date: "Jan 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin2",
  },
  {
    id: 4,
    author: "John Doe",
    content:
      "Lorem ipsum is simply dummy text of conjunction and typesetting with",
    date: "Jan 2025",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
];

export function NoticeBoard() {
  return (
    <Card className="p-6 bg-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Notice Board</h3>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4 flex-1 overflow-y-auto min-h-110 max-h-140">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="flex gap-3 pb-3 border-b border-border  last:border-b-0"
          >
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={notice.avatar || "/placeholder.svg"} />
              <AvatarFallback>{notice.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {notice.author}
              </p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {notice.content}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {notice.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

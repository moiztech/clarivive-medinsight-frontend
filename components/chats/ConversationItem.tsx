import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

interface Props {
  conversation: {
    name: string;
    avatar?: string;
    lastMessage: string;
    unreadCount: number;
  };
  isActive?: boolean;
}

export function ConversationItem({ conversation, isActive }: Props) {
  return (
    <Button
      variant="ghost"
      className={clsx(
        "w-full justify-start gap-3 px-3 py-3 h-auto",
        isActive && "bg-accent",
      )}
    >
      <Avatar className="h-8 w-8 shadow-md">
        <AvatarImage src={conversation.avatar} />
        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex-1 text-left overflow-hidden">
        <div className="flex items-center justify-between">
          <p className="font-medium truncate text-sm">{conversation.name}</p>

          {conversation.unreadCount > 0 && (
            <Badge className="ml-2 bg-primary-blue">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>

        <p className="text-xs text-muted-foreground truncate">
          {conversation.lastMessage}
        </p>
      </div>
    </Button>
  );
}

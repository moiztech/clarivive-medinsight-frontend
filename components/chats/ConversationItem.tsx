import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Conversation } from "./ChatSidebar";
import Link from "next/link";
import { useAuth } from "@/app/_contexts/AuthProvider";

interface Props {
  conversation: Conversation;
  isActive?: boolean;
}

export function ConversationItem({ conversation, isActive }: Props) {
  const { user } = useAuth();
  let linkPrefix;
  if (user?.role.name === "company_admin") {
    linkPrefix = "company";
  } else if (user?.role.name === "trainer") {
    linkPrefix = "dashboard/trainer";
  } else {
    linkPrefix = "dashboard/lms";
  }
  return (
    <Link
      href={`/${linkPrefix}/chats/${conversation.conversation_id}`}
      className="block"
    >
      <Button
        variant="ghost"
        className={clsx(
          "w-full justify-start gap-3 px-3 py-3 h-auto",
          isActive && "bg-accent",
        )}
      >
        <Avatar className="h-8 w-8 shadow-md">
          <AvatarImage src={""} />
          <AvatarFallback>{conversation.user?.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 text-left overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="font-medium truncate text-sm">
              {conversation.user?.name}
            </p>
          </div>

          <p className="text-xs text-muted-foreground truncate">
            {conversation.last_message}
          </p>
        </div>
      </Button>
    </Link>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Conversation } from "./ChatSidebar";
import Link from "next/link";
import { useAuth } from "@/app/_contexts/AuthProvider";
import { Badge } from "../ui/badge";
import {
  CheckCircle,
  CheckCircle2Icon,
  CheckIcon,
  Circle,
  CircleAlertIcon,
  CircleDot,
} from "lucide-react";

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
      onClick={(e) => {
        if (isActive) {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent("refresh-chat"));
        }
      }}
    >
      <Button
        variant="ghost"
        className={clsx(
          "w-full justify-start gap-3 px-3 py-3 h-auto",
          isActive && "bg-accent",
          conversation.unread_count > 0 && "bg-accent/50",
        )}
      >
        <div className="relative">
          <Avatar className="h-8 w-8 shadow-md">
            <AvatarImage src={conversation.user?.logo} />
            <AvatarFallback>{conversation.user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {conversation.unread_count > 0 && (
            <Badge
              variant="secondary"
              className="rounded-full text-xs size-4 absolute -top-1 -right-1"
            >
              {conversation.unread_count}
            </Badge>
          )}
          {conversation.user?.role === "super_admin" && (
            <span className="bg-primary-blue w-4 h-4 flex items-center justify-center rounded-full text-xs size-3 absolute -bottom-1 -right-1">
              <CheckIcon className="size-3 text-white" />
            </span>
          )}
        </div>

        <div className="flex-1 text-left overflow-hidden hidden xl:block">
          <div className="flex items-center justify-between">
            <p className="font-medium truncate text-sm">
              {conversation.user?.name}
            </p>
          </div>

          <p className="text-xs text-muted-foreground truncate">
            {conversation.last_message?.message}
          </p>
        </div>
        {conversation.unread_count > 0 && (
          <Circle className="size-4 fill-primary-blue text-primary-blue animate-pulse" />
        )}
        {conversation.user?.role === "super_admin" && (
          <Badge variant={"destructive"} className="text-[10px]">
            admin
          </Badge>
        )}
      </Button>
    </Link>
  );
}

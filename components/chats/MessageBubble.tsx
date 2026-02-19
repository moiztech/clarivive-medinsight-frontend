import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Message } from "./types";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const { is_me, sender, created_at, message: text } = message;

  const timeString = new Date(created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex items-end gap-3", is_me && "flex-row-reverse")}>
      {/* Avatar */}
      <Avatar className="size-8 shrink-0 shadow-lg">
        <AvatarImage src={sender?.logo} />
        <AvatarFallback className="text-xs font-semibold">
          {sender?.name?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      {/* Bubble + Meta */}
      <div
        className={cn("flex flex-col gap-1 max-w-[70%]", is_me && "items-end")}
      >
        {/* Sender name + time */}
        <div
          className={cn(
            "flex items-baseline gap-2",
            is_me && "flex-row-reverse",
          )}
        >
          {!is_me && (
            <p className="text-xs font-semibold text-foreground">
              {sender.name}
            </p>
          )}
          <p className="text-[11px] text-muted-foreground">{timeString}</p>
        </div>

        {/* Message bubble */}
        <div
          className={cn(
            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words",
            is_me
              ? "bg-primary-blue text-white rounded-br-sm"
              : "bg-muted text-secondary rounded-bl-sm",
          )}
        >
          {text}
        </div>
        {is_me && message.is_read && (
          <p className="text-[11px] text-muted-foreground">
            <CheckCheck className="size-3 text-primary-blue" />
          </p>
        )}
        {is_me && !message.is_read && (
          <p className="text-[11px] text-muted-foreground">
            <Check className="size-3" />
          </p>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;

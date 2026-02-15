"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ConversationItem } from "./ConversationItem";
import { useState } from "react";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/avatars/john.png",
    lastMessage: "Are we meeting today?",
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    avatar: "/avatars/sarah.png",
    lastMessage: "Thanks! That helps a lot.",
    unreadCount: 0,
  },
  {
    id: 3,
    name: "Team Chat",
    avatar: "/avatars/team.png",
    lastMessage: "You: Okay noted 👍",
    unreadCount: 1,
  },
];

export default function ChatSidebar() {
  const [search, setSearch] = useState("");
  return (
    <aside className="w-80 border-r bg-card h-full  flex flex-col">
      {/* Search */}
      <div className="p-2 border-b">
        <Input
          className="rounded-full"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search conversations..."
        />
      </div>

      {/* Conversation list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations
            .filter((conv) =>
              conv.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                isActive={conv.id === 1}
              />
            ))}
        </div>
      </ScrollArea>
    </aside>
  );
}

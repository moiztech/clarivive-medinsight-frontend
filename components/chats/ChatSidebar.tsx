"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ConversationItem } from "./ConversationItem";
import { useEffect, useState } from "react";
import protectedApi from "@/lib/axios/protected";

import { useParams } from "next/navigation";

export type Conversation = {
  conversation_id: number;
  user: {
    id: number;
    name: string;
    role_id: number;
    pivot: {
      conversation_id: number;
      user_id: number;
    };
  };
  last_message: string;
  last_message_time: string;
};

export default function ChatSidebar() {
  const params = useParams();
  const { id: activeId } = params;
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await protectedApi.get("/conversations/list");
        // console.log("Co  nversations API Response:", response.data);

        let data: Conversation[] = [];
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (response.data && typeof response.data === "object") {
          // Sometimes APIs return the list under a different key like 'conversations' or 'messages'
          data = response.data.conversations || response.data.messages || data;
        }

        setConversations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <aside className="w-80 border-r rounded-l-3xl bg-card h-full  flex flex-col">
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
          {conversations.length > 0 ? (
            conversations
              .filter((conv) => {
                const searchLower = search.toLowerCase();
                return (
                  conv.user?.name?.toLowerCase().includes(searchLower) ||
                  conv.last_message?.toLowerCase().includes(searchLower)
                );
              })
              .map((conv) => (
                <ConversationItem
                  key={conv.conversation_id}
                  conversation={conv}
                  isActive={activeId === conv.conversation_id.toString()}
                />
              ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground p-4 text-center">
              <p className="text-sm">No conversations found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

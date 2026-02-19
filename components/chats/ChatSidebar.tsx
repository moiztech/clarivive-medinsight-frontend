"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { ConversationItem } from "./ConversationItem";
import { useCallback, useEffect, useState } from "react";
import protectedApi from "@/lib/axios/protected";

import { useParams } from "next/navigation";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type Conversation = {
  conversation_id: number;
  user: {
    id: number;
    name: string;
    role_id: number;
    logo?: string;
  };
  unread_count: number;
  last_message: {
    message: string;
    created_at: string;
    is_read: boolean;
    is_me: boolean;
  };
};

export default function ChatSidebar() {
  const params = useParams();
  const { id: activeId } = params;
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (isAuto = false) => {
      try {
        if (!isAuto) setLoading(true);
        const response = await protectedApi.get("/conversations/list");
        let data: Conversation[] = [];
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          data = response.data.data;
        } else if (response.data && typeof response.data === "object") {
          data = response.data.conversations || response.data.messages || data;
        }
        setConversations(Array.isArray(data) ? data : []);

        // If it's a manual refresh or we are currently viewing a chat,
        // sync the current conversation details
        if (!isAuto || activeId) {
          window.dispatchEvent(new CustomEvent("refresh-chat"));
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        if (!isAuto) setLoading(false);
      }
    },
    [activeId],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh logic
  useEffect(() => {
    const ACTIVE_INTERVAL = 4 * 60 * 1000; // 4 minutes
    const INACTIVE_INTERVAL = 10 * 60 * 1000; // 10 minutes
    let lastFetchDate = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const isVisible = document.visibilityState === "visible";
      const timeSinceLastFetch = now - lastFetchDate;

      const threshold = isVisible ? ACTIVE_INTERVAL : INACTIVE_INTERVAL;

      if (timeSinceLastFetch >= threshold) {
        fetchData(true);
        lastFetchDate = now;
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <aside className="xl:w-80 w-full border-r shadow-2xl xl:rounded-l-3xl bg-card h-full flex flex-col overflow-hidden">
      {/* Search & Refresh */}
      <div className="p-2 py-4 border-b flex justify-center xl:justify-between items-center gap-2">
        <Input
          className="rounded-full hidden xl:block flex-1"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search..."
        />
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 size-5 rounded-full"
              onClick={() => fetchData()}
              disabled={loading}
              asChild
            >
              <RefreshCcw
                className={clsx("size-4", loading && "animate-spin")}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Refresh</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Conversation list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-muted-foreground p-4 text-center">
              <p className="text-sm">
                <Loader2 className="animate-spin" />.
              </p>
            </div>
          ) : conversations.length > 0 ? (
            conversations
              .filter((conv) => {
                const searchLower = search.toLowerCase();
                return (
                  conv.user?.name?.toLowerCase().includes(searchLower) ||
                  conv.last_message?.message
                    ?.toLowerCase()
                    .includes(searchLower)
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

"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { ConversationItem } from "./ConversationItem";
import { useCallback, useEffect, useRef, useState } from "react";
import protectedApi from "@/lib/axios/protected";

import { useParams } from "next/navigation";
import { Loader2, RefreshCcw, ShieldUser, UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useAuth } from "@/app/_contexts/AuthProvider";

export type Conversation = {
  conversation_id: number;
  user: {
    id: number;
    name: string;
    role?: string;
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
  const [adminId, setAdminId] = useState<number | null>(null);
  const [isAdminChatExists, setIsAdminChatExists] = useState(false);
  const [isCompanyAdminChatExists, setIsCompanyAdminChatExists] =
    useState(false);
  const [creatingChat, setCreatingChat] = useState(false);
  const hasLoadedOnce = useRef(false);

  const { user } = useAuth();
  const currentRole =
    typeof user?.role === "string" ? user.role : user?.role?.name;

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
        window.dispatchEvent(new CustomEvent("sidebar-refresh"));

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
    fetchData(hasLoadedOnce.current);
    hasLoadedOnce.current = true;
  }, [fetchData]);

  // Listen for sidebar refresh events from other components
  useEffect(() => {
    const handleSidebarRefresh = () => {
      fetchData(true);
    };
    window.addEventListener("sidebar-refresh", handleSidebarRefresh);
    return () =>
      window.removeEventListener("sidebar-refresh", handleSidebarRefresh);
  }, [fetchData]);

  // Fetch admin status on mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await protectedApi.get("/get-admin");
        const admin = response.data?.data;
        if (admin?.id) {
          setAdminId(admin.id);
        }
      } catch (error) {
        console.error("Failed to fetch admin:", error);
      }
    };
    fetchAdmin();
  }, []);

  // Check if a conversation with the admin or company admin already exists
  useEffect(() => {
    if (adminId) {
      const exists = conversations.some((conv) => conv.user?.id === adminId);
      setIsAdminChatExists(exists);
    }
    if (currentRole === "employee" && user?.company_id) {
      const exists = conversations.some(
        (conv) => conv.user?.id === user.company_id,
      );
      setIsCompanyAdminChatExists(exists);
    }
  }, [conversations, adminId, user, currentRole]);

  const handleContactAdmin = async (targetUserId?: number | null) => {
    const idToContact = targetUserId || adminId;
    if (!idToContact) return;
    try {
      setCreatingChat(true);
      await protectedApi.post("/conversations", { user_id: idToContact });
      toast.success(
        targetUserId
          ? `Conversation with ${user?.company?.name || "Company Admin"} created`
          : "Conversation with admin created",
      );
      fetchData(); // Reload sidebar
    } catch (error) {
      console.error("Failed to create conversation:", error);
      toast.error("Failed to contact admin");
    } finally {
      setCreatingChat(false);
    }
  };

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

      {/* Contact Admin Button */}
      {!loading &&
        ((adminId && !isAdminChatExists && currentRole !== "employee") ||
          (currentRole === "employee" &&
            user?.company_id &&
            !isCompanyAdminChatExists)) && (
          <div className="p-4 border-t bg-muted/30">
            <Button
              onClick={() =>
                handleContactAdmin(
                  currentRole === "employee" ? (user?.company_id ?? null) : null,
                )
              }
              disabled={creatingChat}
              variant={"primary"}
              className="rounded-full w-full"
            >
              <div className="hidden lg:flex items-center gap-2">
                {creatingChat ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <UserPlus className="size-4" />
                )}
                {currentRole === "employee"
                  ? `Contact ${user.company?.name || "Company Admin"}`
                  : "Contact Clarivive Support"}
              </div>
              <div className="lg:hidden">
                {creatingChat ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ShieldUser className="size-4" />
                )}
              </div>
            </Button>
          </div>
        )}
    </aside>
  );
}

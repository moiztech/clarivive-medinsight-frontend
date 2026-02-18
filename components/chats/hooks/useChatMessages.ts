import { useState, useEffect, useCallback } from "react";
import protectedApi from "@/lib/axios/protected";
import { Message } from "../types";

export function useChatMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await protectedApi.get(
        `/messages/conversation/${conversationId}`,
      );

      // Handle different API response structures
      let messageData: Message[] = [];
      if (Array.isArray(response.data)) {
        messageData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        messageData = response.data.data;
      } else if (response.data && typeof response.data === "object") {
        messageData = response.data.messages || response.data.data || [];
      }

      setMessages(messageData);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError(
        err instanceof Error ? err : new Error("Failed to fetch messages"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [conversationId]);

  const markAsRead = useCallback(async () => {
    if (!conversationId) return;
    try {
      await protectedApi.post(`/conversations/${conversationId}/mark-as-read`);
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  }, [conversationId]);

  useEffect(() => {
    fetchMessages();
    markAsRead();
  }, [fetchMessages, markAsRead]);

  // Listen for global refresh events
  useEffect(() => {
    const handleRefresh = () => {
      fetchMessages();
      markAsRead();
    };
    window.addEventListener("refresh-chat", handleRefresh);
    return () => window.removeEventListener("refresh-chat", handleRefresh);
  }, [fetchMessages, markAsRead]);

  return {
    messages,
    isLoading,
    error,
    refreshMessages: fetchMessages,
    markAsRead,
  };
}

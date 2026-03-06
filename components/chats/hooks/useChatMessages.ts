import { useState, useEffect, useCallback } from "react";
import protectedApi from "@/lib/axios/protected";
import { Message } from "../types";

export function useChatMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMessages = useCallback(
    async (isAuto = false) => {
      if (!conversationId) return;

      if (!isAuto) setIsLoading(true);
      setError(null);
      try {
        const response = await protectedApi.get(
          `/messages/conversation/${conversationId}`,
        );

        // Handle different API response structures
        let messageData: Message[] = [];
        const responseData = response.data;
        if (responseData && Array.isArray(responseData)) {
          messageData = responseData;
        } else if (responseData && Array.isArray(responseData.data)) {
          messageData = responseData.data;
        } else if (responseData && typeof responseData === "object") {
          messageData =
            responseData.messages || responseData.data || messageData;
        }

        // Only update state if messages actually changed to prevent unnecessary re-renders
        setMessages((prev) => {
          if (JSON.stringify(prev) === JSON.stringify(messageData)) return prev;
          return messageData;
        });
      } catch (err) {
        if (!isAuto) {
          console.error("Failed to fetch messages:", err);
          setError(
            err instanceof Error ? err : new Error("Failed to fetch messages"),
          );
        }
      } finally {
        if (!isAuto) setIsLoading(false);
      }
    },
    [conversationId],
  );

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

  // Polling logic
  useEffect(() => {
    if (!conversationId) return;

    const POLLING_INTERVAL = 4000; // 4 seconds

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchMessages(true);
      }
    }, POLLING_INTERVAL);

    const handleFocus = () => {
      fetchMessages(true);
      markAsRead();
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("refresh-chat", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("refresh-chat", handleFocus);
    };
  }, [conversationId, fetchMessages, markAsRead]);

  return {
    messages,
    isLoading,
    error,
    refreshMessages: fetchMessages,
    markAsRead,
  };
}

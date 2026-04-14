"use client";

import { useCallback, useEffect, useState } from "react";
import protectedApi from "@/lib/axios/protected";

export function useUnreadMessageCount(enabled: boolean = true) {
  const [count, setCount] = useState(0);

  const fetchUnreadCount = useCallback(async () => {
    if (!enabled) return;

    try {
      const res = await protectedApi.get("/conversations/un-read/messages");
      setCount(Number(res.data?.data?.unread_count ?? 0));
    } catch (error) {
      console.error("Failed to fetch unread message count", error);
    }
  }, [enabled]);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  useEffect(() => {
    if (!enabled) return;

    const onRefresh = () => {
      fetchUnreadCount();
    };

    window.addEventListener("sidebar-refresh", onRefresh);
    window.addEventListener("refresh-chat", onRefresh);

    const interval = window.setInterval(fetchUnreadCount, 60000);

    return () => {
      window.removeEventListener("sidebar-refresh", onRefresh);
      window.removeEventListener("refresh-chat", onRefresh);
      window.clearInterval(interval);
    };
  }, [enabled, fetchUnreadCount]);

  return count;
}

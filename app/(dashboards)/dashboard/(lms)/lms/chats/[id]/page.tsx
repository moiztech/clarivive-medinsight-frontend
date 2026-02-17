"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import protectedApi from "@/lib/axios/protected";
import Conversation from "@/components/chats/Conversation";
import { Message } from "@/components/chats/Conversation";

function Page() {
  const params = useParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const { id } = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await protectedApi.get(`/messages/conversation/${id}`);
        setMessages(response.data || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    }
    fetchData();
  }, [id]);

  const handleMessageSent = useCallback(async () => {
    try {
      const response = await protectedApi.get(`/messages/conversation/${id}`);
      setMessages(response.data || []);
    } catch (error) {
      console.error("Failed to refresh messages:", error);
    }
  }, [id]);

  return (
    <div className="h-full">
      <Conversation
        messages={messages}
        conversationId={id}
        onMessageSent={handleMessageSent}
      />
    </div>
  );
}

export default Page;

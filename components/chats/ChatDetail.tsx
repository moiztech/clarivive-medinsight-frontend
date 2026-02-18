"use client";
import React from "react";
import Conversation from "./Conversation";
import { useChatMessages } from "./hooks/useChatMessages";

export default function ChatDetail({ id }: { id: string }) {
  const { messages, refreshMessages } = useChatMessages(id);

  return (
    <div className="h-full overflow-hidden">
      <Conversation
        messages={messages}
        conversationId={id}
        onMessageSent={refreshMessages}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send, Loader2 } from "lucide-react";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";

export type Message = {
  id: number;
  conversation_id: number;
  sender_id: number;
  message: string;
  created_at: string;
  updated_at: string;
  sender: {
    id: number;
    name: string;
  };
};

interface ConversationProps {
  messages: Message[];
  conversationId: string;
  onMessageSent?: () => void;
}

function Conversation({
  messages,
  conversationId,
  onMessageSent,
}: ConversationProps) {
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isSending) return;

    setIsSending(true);
    try {
      await protectedApi.post("/messages", {
        conversation_id: conversationId,
        message: messageInput.trim(),
      });

      setMessageInput("");
      toast.success("Message sent!");

      // Trigger callback to refresh messages
      onMessageSent?.();
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-card relative rounded-r-3xl border-l border-border h-full flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className="flex items-start gap-3">
                <div className="bg-primary-blue/10 text-primary-blue rounded-full w-8 h-8 flex items-center justify-center text-xs font-semibold">
                  {message.sender.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {message.sender.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <p className="text-sm text-foreground mt-1">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        )}
      </div>

      {/* Chat Input Box */}
      <div className="p-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-end gap-3">
          {/* Action Buttons - Optional for future features */}
          {/* <div className="flex items-center gap-1 mb-2">
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-9 text-muted-foreground hover:text-primary-blue hover:bg-primary-blue/10 transition-colors"
            >
              <Smile className="size-4" />
            </Button>
          </div> */}

          {/* Input Container */}
          <div className="flex-1 relative">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-12 h-11 bg-background border-border/50 focus-visible:ring-primary-blue/20 focus-visible:border-primary-blue rounded-xl"
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!messageInput.trim() || isSending}
            variant="primary"
            size="icon"
            className="size-11 rounded-xl shadow-lg shadow-primary-blue/20 hover:shadow-primary-blue/30 disabled:opacity-50 disabled:shadow-none transition-all"
          >
            {isSending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <Send className="size-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Conversation;

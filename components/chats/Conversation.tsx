"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Send, Loader2, Trash2, X } from "lucide-react";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_contexts/AuthProvider";

import MessageBubble from "./MessageBubble";
import { Message } from "./types";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  let linkPrefix;
  if (user?.role.name === "company_admin") {
    linkPrefix = "company";
  } else if (user?.role.name === "trainer") {
    linkPrefix = "dashboard/trainer";
  } else {
    linkPrefix = "dashboard/lms";
  }
  const handleConversationDelete = async () => {
    if (!confirm("Are you sure you want to delete this conversation?")) return;

    setIsDeleting(true);
    try {
      await protectedApi.delete(`/delete/conversation/${conversationId}`);
      toast.success("Conversation deleted successfully");
      window.dispatchEvent(new CustomEvent("sidebar-refresh"));
      router.push(`/${linkPrefix}/chats`);
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      toast.error("Failed to delete conversation");
    } finally {
      setIsDeleting(false);
    }
  };

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

      // Trigger callback and global event to sync sidebar
      onMessageSent?.();
      window.dispatchEvent(new CustomEvent("sidebar-refresh"));
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

  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseChat = () => {
    router.push(`/${linkPrefix}/chats`);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-card relative xl:rounded-r-3xl border-l border-border h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center bg-card/25 justify-between shadow-sm backdrop-blur-lg sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <p className="font-semibold text-sm">Conversation</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          onClick={handleConversationDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Trash2 className="size-4" />
          )}
        </Button>
      </div>

      <ContextMenu>
        <ContextMenuTrigger asChild>
          {/* Messages Area */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-4 xl:p-6 space-y-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <p className="text-sm">
                    No messages yet. Start the conversation!
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleCloseChat}>
            <X className="size-4" /> Close Chat
          </ContextMenuItem>
          <ContextMenuItem
            variant="destructive"
            onClick={handleConversationDelete}
          >
            <Trash2 className="size-4" /> Delete Conversation
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Chat Input Box */}
      <div className="p-4 xl:p-6 border-t border-border/50 bg-card/50 backdrop-blur-sm">
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

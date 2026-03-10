"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, MessageCircle } from "lucide-react";
import protectedApi from "@/lib/axios/protected";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function ContactLearner({ learner_id }: { learner_id: number }) {
  const [creatingChat, setCreatingChat] = useState(false);
  const router = useRouter();
  const createChat = async () => {
    setCreatingChat(true);
    try {
      const res = await protectedApi.post("/conversations", {
        user_id: learner_id,
      });
      toast.success(res.data.message);
      router.push(`chats/${res.data.data.id}`);
    } catch (error) {
      toast.error("Failed to create conversation");
    } finally {
      setCreatingChat(false);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="primary"
          onClick={createChat}
          size="icon"
          disabled={creatingChat}
          className="hidden md:flex"
        >
          {creatingChat ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <MessageCircle className="w-5 h-5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Start Chat</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default ContactLearner;

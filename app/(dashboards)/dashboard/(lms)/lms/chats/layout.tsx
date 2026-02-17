import ChatLayout from "@/components/chats/ChatLayout";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return <ChatLayout>{children}</ChatLayout>;
}

export default layout;

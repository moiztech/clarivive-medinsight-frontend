import ChatSidebar from "@/components/chats/ChatSidebar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center  h-[calc(100vh-6rem)] p-5 lg:px-8 2xl:px-15 max-w-7xl mx-auto overflow-hidden">
      <div className="w-80 h-full min-h-full overflow-y-auto">
        <ChatSidebar />
      </div>
      <div className="flex-1 h-full min-h-full overflow-y-auto">{children}</div>
    </div>
  );
}

export default layout;

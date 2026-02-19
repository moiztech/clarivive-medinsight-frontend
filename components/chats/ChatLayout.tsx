import React from "react";
import ChatSidebar from "./ChatSidebar";

function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center  h-[calc(100vh-6rem)] p-0 lg:py-5 lg:px-8 2xl:px-15 max-w-7xl mx-auto overflow-hidden">
      <div className="xl:w-80 w-20 h-full min-h-full overflow-hidden">
        <ChatSidebar />
      </div>
      <div className="flex-1 h-full min-h-full overflow-hidden">{children}</div>
    </div>
  );
}

export default ChatLayout;

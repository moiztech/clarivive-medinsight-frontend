"use client";
import React from "react";
import { useParams } from "next/navigation";
import ChatDetail from "@/components/chats/ChatDetail";

function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;

  return <ChatDetail id={id} />;
}

export default Page;

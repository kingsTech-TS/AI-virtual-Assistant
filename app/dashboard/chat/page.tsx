"use client";

import { Suspense } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { LoadingState } from "@/components/shared/LoadingState";

export default function ChatPage() {
  return (
    <div className="-m-4 sm:-m-6 lg:-m-8">
      <Suspense fallback={<LoadingState message="Initializing AI Assistant..." />}>
        <ChatContainer />
      </Suspense>
    </div>
  );
}

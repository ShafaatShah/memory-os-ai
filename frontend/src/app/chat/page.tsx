import { Suspense } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ChatLayout from "@/components/chat/ChatLayout";

export default function ChatPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div />}>
        <ChatLayout />
      </Suspense>
    </AppLayout>
  );
}
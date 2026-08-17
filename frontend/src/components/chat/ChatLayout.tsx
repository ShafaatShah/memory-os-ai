"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ChatSidebar from "./ChatSidebar";
import Conversation from "./Conversation";
import MemoryContext from "./MemoryContext";

export default function ChatLayout() {
  const searchParams = useSearchParams();

  const [refreshKey, setRefreshKey] = useState(0);
  const [activeConversationId, setActiveConversationId] =
    useState<string | null>(null);

  const projectId = searchParams.get("project_id");

  // ---------------------------------------
  // Restore previously selected conversation
  // ---------------------------------------
  useEffect(() => {
    const savedConversationId =
      sessionStorage.getItem("memoryos_active_conversation");

    if (savedConversationId) {
      setActiveConversationId(savedConversationId);
    }
  }, []);

  // ---------------------------------------
  // Save selected conversation
  // ---------------------------------------
  const handleConversationSelect = (id: string | null) => {
    setActiveConversationId(id);

    if (id) {
      sessionStorage.setItem(
        "memoryos_active_conversation",
        id
      );
    } else {
      sessionStorage.removeItem(
        "memoryos_active_conversation"
      );
    }
  };

  useEffect(() => {
    console.log("Project ID:", projectId);
    console.log(
      "Selected conversation:",
      activeConversationId
    );
  }, [projectId, activeConversationId]);

  const refreshMemory = () => {
    setRefreshKey((previous) => previous + 1);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Sidebar */}
      <div className="col-span-3">
        <ChatSidebar
          activeConversationId={activeConversationId}
          onConversationSelect={handleConversationSelect}
          projectId={projectId}
        />
      </div>

      {/* Main Conversation */}
      <div className="col-span-6">
        <Conversation
          activeConversationId={activeConversationId}
          onMemoryUpdated={refreshMemory}
        />
      </div>

      {/* Right Sidebar / Memory */}
      <div className="col-span-3">
        <MemoryContext
          refreshKey={refreshKey}
          projectId={projectId}
          activeConversationId={activeConversationId}
        />
      </div>
    </div>
  );
}
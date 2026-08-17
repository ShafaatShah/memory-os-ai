"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Conversation = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export default function RecentActivity() {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    async function loadActivity() {
      try {
        const data = await api.conversations();

        setConversations(data.slice(0, 5));
      } catch (error) {
        console.error(
          "Failed to load recent activity:",
          error
        );
      }
    }

    loadActivity();
  }, []);

  function formatTime(date: string) {
    return new Date(date).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <span className="text-xs text-slate-500">
          Live
        </span>
      </div>

      {conversations.length === 0 ? (
        <p className="text-sm text-slate-400">
          No conversations yet.
        </p>
      ) : (
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 last:border-none last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate text-slate-200">
                  {conversation.title}
                </p>

                <p className="mt-1 text-xs text-blue-400">
                  AI conversation
                </p>
              </div>

              <span className="shrink-0 text-xs text-slate-500">
                {formatTime(conversation.updated_at)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
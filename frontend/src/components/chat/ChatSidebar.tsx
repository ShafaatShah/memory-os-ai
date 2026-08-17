"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";

interface Conversation {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ChatSidebarProps {
  activeConversationId: string | null;
  onConversationSelect: (id: string | null) => void;
  projectId: string | null;
}

export default function ChatSidebar({
  activeConversationId,
  onConversationSelect,
  projectId,
}: ChatSidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadConversations();
  }, [projectId]);

  async function loadConversations() {
    try {
      const data = projectId
        ? await api.projectConversations(projectId)
        : await api.conversations();

      setConversations(data);
    } catch (error) {
      console.error(
        "Failed to load conversations:",
        error
      );
    }
  }

  async function deleteConversation(
    event: React.MouseEvent,
    conversationId: string
  ) {
    event.stopPropagation();

    const conversation = conversations.find(
      (chat) => chat.id === conversationId
    );

    const confirmed = window.confirm(
      `Delete "${conversation?.title || "this conversation"}"?\n\nThis will permanently delete the conversation and its messages.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(conversationId);

      const API_BASE_URL =
        "https://vadlibzzespcn7nojtivz3wm6y0fyuxi.lambda-url.eu-north-1.on.aws";

      const response = await fetch(
        `${API_BASE_URL}/api/conversations/${conversationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Delete API error:",
          response.status,
          errorText
        );

        throw new Error(
          `Delete failed: ${response.status}`
        );
      }

      setConversations((previous) =>
        previous.filter(
          (chat) => chat.id !== conversationId
        )
      );

      if (activeConversationId === conversationId) {
        onConversationSelect(null);
      }

    } catch (error) {
      console.error(
        "Failed to delete conversation:",
        error
      );

      window.alert(
        "Failed to delete the conversation. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <aside className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            AI Chats
          </h2>

          <button
            onClick={async () => {
              try {
                const conversation =
                  await api.createConversation(
                    projectId || undefined
                  );

                setConversations((previous) => [
                  conversation,
                  ...previous,
                ]);

                onConversationSelect(conversation.id);
              } catch (error) {
                console.error(
                  "Failed to create conversation:",
                  error
                );
              }
            }}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            + New
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-5">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
          </svg>

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-5 pb-5">
        <button className="rounded-md bg-blue-600 px-3 py-1 text-xs text-white">
          All
        </button>

        <button className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
          Today
        </button>

        <button className="rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-300">
          Pinned
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-5 pb-5">
        <div className="space-y-3">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              className={`w-full rounded-xl border transition ${
                activeConversationId === chat.id
                  ? "border-blue-500 bg-slate-900"
                  : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-start">
                {/* Conversation */}
                <button
                  type="button"
                  onClick={() => {
                    console.log(
                      "Selected conversation:",
                      chat.id
                    );

                    onConversationSelect(chat.id);
                  }}
                  className="min-w-0 flex-1 p-4 text-left"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate font-semibold text-white">
                      {chat.title}
                    </h3>

                    <span className="shrink-0 text-xs text-slate-500">
                      #{chat.id}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Updated{" "}
                    {new Date(
                      chat.updated_at
                    ).toLocaleDateString()}
                  </p>
                </button>

                {/* Delete */}
                <button
                  type="button"
                  aria-label={`Delete ${chat.title}`}
                  disabled={deletingId === chat.id}
                  onClick={(event) =>
                    deleteConversation(
                      event,
                      chat.id
                    )
                  }
                  className="mr-3 mt-3 rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Delete conversation"
                >
                  {deletingId === chat.id ? (
                    <span className="text-xs">
                      ...
                    </span>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="M19 6l-1 14H6L5 6" />
                      <path d="M10 11v5" />
                      <path d="M14 11v5" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>
            {conversations.length} Conversations
          </span>

          <span>2.4 GB</span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-2/3 rounded-full bg-blue-500" />
        </div>
      </div>
    </aside>
  );
}
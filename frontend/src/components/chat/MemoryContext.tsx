"use client";

import { useEffect, useState } from "react";

interface Memory {
  key: string;
  value: string;
  confidence: number;
}

interface MemoryContextProps {
  refreshKey: number;
  projectId: string | null;
  activeConversationId: string | null;
}

const API_BASE_URL =
  "https://vadlibzzespcn7nojtivz3wm6y0fyuxi.lambda-url.eu-north-1.on.aws";

export default function MemoryContext({
  refreshKey,
  projectId,
  activeConversationId,
}: MemoryContextProps) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [projectName, setProjectName] = useState<string | null>(null);
  const [conversationName, setConversationName] =
    useState<string | null>(null);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  async function fetchProject() {
    if (!projectId) {
      setProjectName(null);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/projects/`
      );

      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      const projects = await response.json();

      const project = projects.find(
        (item: { id: string; name: string }) =>
          String(item.id) === String(projectId)
      );

      setProjectName(project?.name || null);
    } catch (error) {
      console.error("Failed to fetch project:", error);
      setProjectName(null);
    }
  }

  async function fetchConversation() {
    if (!activeConversationId) {
      setConversationName(null);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/conversations`
      );

      if (!response.ok) {
        throw new Error("Failed to load conversations");
      }

      const conversations = await response.json();

      const conversation = conversations.find(
        (item: { id: string; title: string }) =>
          String(item.id) === String(activeConversationId)
      );

      setConversationName(conversation?.title || null);
    } catch (error) {
      console.error("Failed to fetch conversation:", error);
      setConversationName(null);
    }
  }

  async function fetchMemories() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/memory`
      );

      if (!response.ok) {
        throw new Error("Failed to load memories");
      }

      const data = await response.json();
      setMemories(data.memories || []);
    } catch (error) {
      console.error("Failed to fetch memories:", error);
    }
  }

  useEffect(() => {
    fetchMemories();
    fetchProject();
    fetchConversation();
  }, [refreshKey, projectId, activeConversationId]);

  function startEditing(memory: Memory) {
    setEditingKey(memory.key);
    setEditingValue(memory.value);
  }

  function cancelEditing() {
    setEditingKey(null);
    setEditingValue("");
  }

  async function saveEdit(key: string) {
    const value = editingValue.trim();

    if (!value) {
      return;
    }

    try {
      setSavingKey(key);

      const response = await fetch(
        `${API_BASE_URL}/api/memory/${encodeURIComponent(key)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update memory");
      }

      const updatedMemory = await response.json();

      setMemories((previous) =>
        previous.map((memory) =>
          memory.key === key
            ? {
                ...memory,
                value: updatedMemory.value,
              }
            : memory
        )
      );

      cancelEditing();
    } catch (error) {
      console.error("Failed to update memory:", error);
      window.alert("Failed to update memory. Please try again.");
    } finally {
      setSavingKey(null);
    }
  }

  async function removeMemory(key: string) {
    const confirmed = window.confirm(
      `Delete "${key.replace(/_/g, " ")}" from memory?\n\nThis cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingKey(key);

      const response = await fetch(
        `${API_BASE_URL}/api/memory/${encodeURIComponent(key)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete memory");
      }

      setMemories((previous) =>
        previous.filter((memory) => memory.key !== key)
      );
    } catch (error) {
      console.error("Failed to delete memory:", error);
      window.alert("Failed to delete memory. Please try again.");
    } finally {
      setDeletingKey(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 p-5">
        <h2 className="text-lg font-semibold text-white">
          Memory Context
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          AI retrieval context
        </p>
      </div>

      {/* Body */}
      <div className="space-y-6 p-5">
        {/* Retrieved Memories */}
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Stored Memories
          </h3>

          <div className="space-y-3">
            {memories.length === 0 ? (
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <p className="text-sm text-slate-400">
                  No memories stored yet.
                </p>
              </div>
            ) : (
              memories.map((memory) => {
                const isEditing = editingKey === memory.key;
                const isSaving = savingKey === memory.key;
                const isDeleting = deletingKey === memory.key;

                return (
                  <div
                    key={memory.key}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-4"
                  >
                    {/* Memory Header */}
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="font-medium capitalize text-white">
                        {memory.key.replace(/_/g, " ")}
                      </h4>

                      <span className="shrink-0 text-xs font-medium text-green-400">
                        {memory.confidence}%
                      </span>
                    </div>

                    {/* Editing */}
                    {isEditing ? (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(event) =>
                            setEditingValue(event.target.value)
                          }
                          autoFocus
                          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              saveEdit(memory.key);
                            }

                            if (event.key === "Escape") {
                              cancelEditing();
                            }
                          }}
                        />

                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => saveEdit(memory.key)}
                            disabled={isSaving}
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
                          >
                            {isSaving ? "Saving..." : "Save"}
                          </button>

                          <button
                            type="button"
                            onClick={cancelEditing}
                            disabled={isSaving}
                            className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Memory Value */}
                        <p className="mt-2 text-sm text-slate-400">
                          {memory.value}
                        </p>

                        {/* Actions */}
                        <div className="mt-3 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEditing(memory)}
                            disabled={isDeleting}
                            className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-blue-500/10 hover:text-blue-400 disabled:opacity-50"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => removeMemory(memory.key)}
                            disabled={isDeleting}
                            className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                          >
                            {isDeleting ? "Deleting..." : "🗑️ Delete"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Current Context & Active Tags */}
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Current Context
          </h3>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="mb-4">
              <p className="text-xs uppercase text-slate-500">
                Project
              </p>

              <p className="mt-1 font-medium text-white">
                {projectName || (projectId ? "Loading project..." : "MemoryOS AI")}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">
                Conversation
              </p>

              <p className="mt-1 font-medium text-white">
                {conversationName ||
                  (activeConversationId
                    ? "Loading conversation..."
                    : "No conversation selected")}
              </p>
            </div>
          </div>

          {/* Active Tags */}
          <div className="mt-4">
            <p className="mb-3 text-xs uppercase text-slate-500">
              Active Tags
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-300">
                #AI
              </span>

              <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-300">
                #CockroachDB
              </span>

              <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-300">
                #Research
              </span>
            </div>
          </div>
        </section>

        {/* Knowledge Links */}
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Knowledge Links
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-slate-950 p-3">
              <span className="text-sm text-white">
                Workflow Automation
              </span>

              <span className="text-xs text-blue-400">
                95%
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-950 p-3">
              <span className="text-sm text-white">
                Research Archive
              </span>

              <span className="text-xs text-blue-400">
                91%
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-950 p-3">
              <span className="text-sm text-white">
                Meeting Notes
              </span>

              <span className="text-xs text-blue-400">
                88%
              </span>
            </div>
          </div>
        </section>

        {/* Confidence */}
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Confidence
          </h3>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-white">
                Retrieval Score
              </span>

              <span className="font-semibold text-green-400">
                94%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[94%] rounded-full bg-green-500" />
            </div>
          </div>
        </section>

        {/* Memory Status */}
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
            Memory Status
          </h3>

          <div className="rounded-lg border border-green-700/40 bg-green-900/10 p-4">
            <p className="font-medium text-green-400">
              ✓ Memory Updated
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Conversation has been indexed and linked to related memories.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
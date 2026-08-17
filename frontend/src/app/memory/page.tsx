"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";

interface Memory {
  key: string;
  value: string;
  confidence: number;
}

const API_BASE_URL =
  "https://vadlibzzespcn7nojtivz3wm6y0fyuxi.lambda-url.eu-north-1.on.aws";

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);

  const loadMemories = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/memory`);

      if (!response.ok) {
        throw new Error("Failed to load memories");
      }

      const data = await response.json();

      setMemories(data.memories || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemories();
  }, []);

  const startEdit = (memory: Memory) => {
    setEditingKey(memory.key);
    setEditValue(memory.value);
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditValue("");
  };

  const saveEdit = async (key: string) => {
    if (!editValue.trim()) return;

    try {
      setSaving(true);

      const response = await fetch(
        `${API_BASE_URL}/api/memory/${encodeURIComponent(key)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value: editValue.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update memory");
      }

      cancelEdit();

      await loadMemories();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const deleteMemory = async (key: string) => {
    const confirmed = window.confirm(
      `Delete memory "${key.replace(/_/g, " ")}"?`
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/memory/${encodeURIComponent(key)}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete memory");
      }

      await loadMemories();
    } catch (error) {
      console.error(error);
    }
  };

  const formatKey = (key: string) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-400">
              MemoryOS AI
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
              Memory
            </h1>

            <p className="mt-2 text-slate-300">
              Everything your AI remembers about you.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Total Memories
            </p>

            <p className="mt-1 text-2xl font-bold text-white">
              {memories.length}
            </p>
          </div>
        </div>

        {/* Memory list */}
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 p-5">
            <h2 className="text-lg font-semibold text-white">
              Stored Memories
            </h2>

            <p className="mt-1 text-sm text-slate-300">
              Persistent facts retrieved from your conversations.
            </p>
          </div>

          <div className="p-5">
            {loading ? (
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-6 text-center">
                <p className="text-sm text-slate-400">
                  Loading memories...
                </p>
              </div>
            ) : memories.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-700 bg-slate-950 p-10 text-center">
                <div className="text-4xl">🧠</div>

                <h3 className="mt-4 font-semibold text-white">
                  No memories yet
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Tell MemoryOS something about yourself in Chat.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {memories.map((memory) => (
                  <div
                    key={memory.key}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-slate-700"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-white">
                          {formatKey(memory.key)}
                        </h3>

                        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                          Memory
                        </p>
                      </div>

                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                        {memory.confidence}%
                      </span>
                    </div>

                    {editingKey === memory.key ? (
                      <div className="mt-5">
                        <textarea
                          value={editValue}
                          onChange={(e) =>
                            setEditValue(e.target.value)
                          }
                          rows={3}
                          className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-white outline-none focus:border-blue-500"
                        />

                        <div className="mt-3 flex gap-2">
                          <button
                            onClick={() =>
                              saveEdit(memory.key)
                            }
                            disabled={saving}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                          >
                            {saving ? "Saving..." : "Save"}
                          </button>

                          <button
                            onClick={cancelEdit}
                            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mt-5 rounded-lg bg-slate-900 p-4 text-sm leading-6 text-slate-200">
                          {memory.value}
                        </p>

                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={() => startEdit(memory)}
                            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-blue-500 hover:text-white"
                          >
                            ✏️ Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteMemory(memory.key)
                            }
                            className="rounded-lg border border-red-900/60 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
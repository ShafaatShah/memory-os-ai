"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@/lib/api";

export default function ProjectsSection() {
  const [memoryCount, setMemoryCount] = useState(0);
  const [conversationCount, setConversationCount] = useState(0);

  useEffect(() => {
    async function loadWorkspaceData() {
      try {
        const [memoryData, conversations] = await Promise.all([
          api.memories(),
          api.conversations(),
        ]);

        setMemoryCount(memoryData.count);
        setConversationCount(conversations.length);
      } catch (error) {
        console.error(
          "Failed to load workspace data:",
          error
        );
      }
    }

    loadWorkspaceData();
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Workspace
        </h2>

        <Link
          href="/projects"
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          View Projects →
        </Link>
      </div>

      <div className="rounded-xl border border-blue-500/20 bg-slate-900 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            MemoryOS AI
          </h3>

          <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
            Active
          </span>
        </div>

        <p className="mt-3 text-slate-400">
          Your personal AI memory and retrieval workspace.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-950 p-4">
            <p className="text-xs text-slate-500">
              Memories
            </p>

            <p className="mt-1 text-2xl font-semibold text-white">
              {memoryCount}
            </p>
          </div>

          <div className="rounded-lg bg-slate-950 p-4">
            <p className="text-xs text-slate-500">
              Conversations
            </p>

            <p className="mt-1 text-2xl font-semibold text-white">
              {conversationCount}
            </p>
          </div>
        </div>

        <Link
          href="/chat"
          className="mt-6 inline-block rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
        >
          Continue to Chat →
        </Link>
      </div>
    </div>
  );
}
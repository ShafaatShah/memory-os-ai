"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Stats = {
  projects: number;
  memories: number;
  tasks: number;
  conversations: number;
};

export default function StatsCards() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        setError(false);

        const data = await api.stats();

        if (!cancelled) {
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);

        if (!cancelled) {
          setError(true);
        }
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    {
      title: "Projects",
      value: stats?.projects,
    },
    {
      title: "Memories",
      value: stats?.memories,
    },
    {
      title: "Tasks",
      value: stats?.tasks,
    },
    {
      title: "AI Chats",
      value: stats?.conversations,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border border-slate-800 bg-slate-900 p-6"
        >
          <p className="text-sm text-slate-400">
            {card.title}
          </p>

          <h3 className="mt-3 text-4xl font-bold text-white">
            {error
              ? "—"
              : card.value === undefined
                ? "..."
                : card.value.toLocaleString()}
          </h3>
        </div>
      ))}
    </div>
  );
}
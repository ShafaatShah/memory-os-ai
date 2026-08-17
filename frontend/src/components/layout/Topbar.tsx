"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pageInfo: Record<
  string,
  { title: string; description: string }
> = {
  "/": {
    title: "Dashboard",
    description: "Welcome back to MemoryOS AI",
  },

  "/chat": {
    title: "Chat",
    description: "Talk with your AI and use your memories",
  },

  "/projects": {
    title: "Projects",
    description: "Organize conversations, memories, and knowledge",
  },

  "/memory": {
    title: "Memory",
    description: "Everything MemoryOS AI remembers about you",
  },

  "/settings": {
    title: "Settings",
    description: "Configure how MemoryOS AI works for you",
  },
};

export default function Topbar() {
  const pathname = usePathname();

  const current =
    pageInfo[pathname] ?? pageInfo["/"];

  return (
    <header className="flex min-h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-6 md:px-8">

      <div>
        <h2 className="text-2xl font-bold text-white">
          {current.title}
        </h2>

        <p className="text-sm text-slate-400">
          {current.description}
        </p>
      </div>

      <div className="flex items-center gap-4">

        <Link
          href="/projects"
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          New Project
        </Link>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          S
        </div>

      </div>

    </header>
  );
}
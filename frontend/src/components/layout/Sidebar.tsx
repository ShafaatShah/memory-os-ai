"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  // Helper function to return dynamic styling based on active route
  const navItem = (path: string) => {
    const isActive = pathname === path;
    return `block w-full rounded-lg px-4 py-3 text-left transition-colors ${
      isActive
        ? "bg-slate-800 text-white font-medium"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;
  };

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-white">MemoryOS AI</h1>

      <p className="text-slate-400 mt-2 text-sm">
        The Operating System for AI Memory
      </p>

      <nav className="mt-10 space-y-3">
        <Link href="/" className={navItem("/")}>
          Dashboard
        </Link>

        <Link href="/chat" className={navItem("/chat")}>
          Chat
        </Link>

        <Link href="/projects" className={navItem("/projects")}>
          Projects
        </Link>

        <Link href="/memory" className={navItem("/memory")}>
          Memory
        </Link>

        <Link href="/settings" className={navItem("/settings")}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}
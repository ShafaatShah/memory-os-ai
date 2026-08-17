"use client";

import Link from "next/link";

export default function QuickActions() {
  const actions = [
    {
      label: "New Chat",
      href: "/chat",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Memory",
      href: "/memory",
    },
    {
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="rounded-lg border border-slate-700 bg-slate-800 px-6 py-4 text-center text-white transition hover:border-blue-500 hover:bg-slate-700"
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
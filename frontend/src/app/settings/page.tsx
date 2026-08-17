"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function SettingsPage() {
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-400">MemoryOS AI</p>

          <h1 className="text-3xl font-bold text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-300">
            Configure how MemoryOS AI works for you.
          </p>
        </div>

        {/* AI Settings */}
        <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white">
              AI & Memory
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Control how MemoryOS AI remembers and uses your information.
            </p>
          </div>

          <div className="divide-y divide-slate-800">

            {/* Memory */}
            <SettingRow
              title="Memory"
              description="Allow MemoryOS AI to remember important information about you."
              enabled={memoryEnabled}
              onToggle={() => setMemoryEnabled(!memoryEnabled)}
            />

            {/* Auto save */}
            <SettingRow
              title="Automatic memory saving"
              description="Automatically save information detected from your conversations."
              enabled={autoSave}
              onToggle={() => setAutoSave(!autoSave)}
            />

          </div>
        </section>

        {/* Appearance */}
        <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Customize your MemoryOS AI experience.
            </p>
          </div>

          <div className="p-6">

            <div className="flex items-center justify-between gap-6">
              <div>
                <h3 className="font-medium text-white">
                  Compact mode
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Use a more compact interface for conversations.
                </p>
              </div>

              <Toggle
                enabled={compactMode}
                onClick={() => setCompactMode(!compactMode)}
              />
            </div>

          </div>
        </section>

        {/* Model */}
        <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="border-b border-slate-800 p-6">
            <h2 className="text-lg font-semibold text-white">
              AI Model
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Current model configuration.
            </p>
          </div>

          <div className="p-6">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    Active model
                  </p>

                  <p className="mt-1 font-semibold text-slate-100">
                    GPT-5.5
                  </p>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  Active
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="rounded-xl border border-slate-800 bg-slate-900/70">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white">
              About MemoryOS AI
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              MemoryOS AI is an intelligent operating system designed
              to remember important user information and provide
              personalized AI conversations.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                AI Memory
              </span>

              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                Retrieval
              </span>

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                Personal AI
              </span>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              MemoryOS AI · Hackathon Prototype
            </p>
          </div>
        </section>

      </div>
    </AppLayout>
  );
}

/* -----------------------------------------
   Setting Row
----------------------------------------- */

function SettingRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 p-6">
      <div>
        <h3 className="font-medium text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {description}
        </p>
      </div>

      <Toggle
        enabled={enabled}
        onClick={onToggle}
      />
    </div>
  );
}

/* -----------------------------------------
   Toggle
----------------------------------------- */

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle setting"
      className={`relative h-6 w-12 rounded-full transition ${
        enabled
          ? "bg-blue-600"
          : "bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled
            ? "left-7"
            : "left-1"
        }`}
      />
    </button>
  );
}
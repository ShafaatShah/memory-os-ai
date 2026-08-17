import React from "react";

// Step 1 — Create the Data Array
const connections = [
  {
    title: "Research Notes",
    reason: "Shared Tags",
    similarity: "94%",
  },
  {
    title: "Workflow Automation",
    reason: "Referenced Together",
    similarity: "89%",
  },
  {
    title: "AI Agent Design",
    reason: "Vector Similarity",
    similarity: "92%",
  },
  {
    title: "Meeting Notes",
    reason: "Same Project",
    similarity: "87%",
  },
];

// Step 2 — Component
export default function SemanticConnections() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      {/* Step 3 — Title */}
      <h2 className="text-2xl font-bold text-white">Semantic Connections</h2>

      {/* Step 4 — Current Memory */}
      <div className="mt-6 mb-8 rounded-lg border border-slate-800 bg-slate-950 p-4">
        <p className="text-sm text-slate-400">Current Memory</p>
        <h3 className="mt-2 text-xl font-semibold text-white">
          AI Prompt Library
        </h3>
      </div>

      {/* Step 5 — Connections List */}
      <div className="space-y-4">
        {connections.map((connection) => (
          /* Step 6 — Item Container */
          <div
            key={connection.title}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4"
          >
            {/* Step 7 — Left Section */}
            <div className="flex items-center gap-4">
              {/* Step 8 — Blue Dot */}
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>

              {/* Step 9 — Text */}
              <div>
                <h4 className="font-semibold text-white">
                  {connection.title}
                </h4>
                <p className="mt-1 text-sm text-slate-400">
                  {connection.reason}
                </p>
              </div>
            </div>

            {/* Step 10 — Similarity Badge */}
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              {connection.similarity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
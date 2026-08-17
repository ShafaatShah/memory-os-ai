import React from "react";

const insights = [
  {
    title: "Most Active Category",
    value: "Research",
    subtitle: "38 Memories",
  },
  {
    title: "Most Connected Memory",
    value: "AI Prompt Library",
    subtitle: "26 Connections",
  },
  {
    title: "Most Used Tags",
    value: "#AI  #Research  #Automation",
    subtitle: "124 Uses",
  },
  {
    title: "Knowledge Growth",
    value: "+27 Memories",
    subtitle: "This Week",
  },
];

export default function MemoryInsights() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      {/* Title */}
      <h2 className="mb-6 text-2xl font-bold text-white">AI Insights</h2>

      {/* Grid of Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-sm text-slate-400">{item.title}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {item.value}
            </h3>
            <p className="mt-2 text-sm text-slate-500">{item.subtitle}</p>
          </div>
        ))}
      </div>

      {/* AI Recommendation Card */}
      <div className="mt-6 rounded-lg border border-blue-900 bg-blue-950/20 p-5">
        <h3 className="text-lg font-semibold text-blue-400">
          AI Recommendation
        </h3>
        <p className="mt-3 text-slate-300">
          Create a new project from your Research Archive. Several memories are
          strongly connected and can be grouped into a reusable AI workspace.
        </p>
      </div>
    </div>
  );
}
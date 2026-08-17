const stats = [
  {
    label: "Total Memories",
    value: "248",
  },
  {
    label: "AI Summaries",
    value: "73",
  },
  {
    label: "Projects",
    value: "12",
  },
  {
    label: "Knowledge Links",
    value: "489",
  },
];

export default function MemoryAnalytics() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Memory Analytics
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-slate-800 bg-slate-950 p-5"
          >
            <p className="text-sm text-slate-400">
              {stat.label}
            </p>

            <h3 className="mt-3 text-4xl font-bold text-white">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
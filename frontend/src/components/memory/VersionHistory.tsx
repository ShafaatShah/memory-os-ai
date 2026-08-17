const versions = [
  {
    version: "v3.0",
    date: "Today",
    author: "You",
    changes: "Added AI workflow prompts",
  },
  {
    version: "v2.0",
    date: "Yesterday",
    author: "AI Assistant",
    changes: "Updated research summary",
  },
  {
    version: "v1.0",
    date: "24 July 2026",
    author: "You",
    changes: "Initial memory created",
  },
];

export default function VersionHistory() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Version History
      </h2>

      <div className="space-y-5">
        {versions.map((item) => (
          <div
            key={item.version}
            className="rounded-lg border border-slate-800 bg-slate-950 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">
                {item.version}
              </h3>

              <span className="text-sm text-slate-400">
                {item.date}
              </span>
            </div>

            <p className="mt-3 text-slate-300">
              {item.changes}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Edited by {item.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
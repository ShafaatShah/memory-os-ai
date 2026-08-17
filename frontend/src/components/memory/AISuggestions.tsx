const suggestions = [
  {
    title: "Meeting Notes",
    reason: "Related to your AI Prompt Library",
    confidence: "97%",
  },
  {
    title: "Research Archive",
    reason: "Contains similar AI workflow concepts",
    confidence: "92%",
  },
  {
    title: "Automation Workflow",
    reason: "Referenced in recent conversations",
    confidence: "88%",
  },
];

export default function AISuggestions() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          AI Suggested Memories
        </h2>

        <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
          AI
        </span>
      </div>

      <div className="space-y-4">
        {suggestions.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-slate-800 bg-slate-950 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">
                {item.title}
              </h3>

              <span className="text-blue-400 font-semibold">
                {item.confidence}
              </span>
            </div>

            <p className="mt-3 text-slate-400">
              {item.reason}
            </p>

            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Open Memory
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
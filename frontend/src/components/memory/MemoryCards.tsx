const memories = [
  {
    title: "AI Prompt Library",
    description: "Collection of reusable AI prompts for daily workflows.",
    category: "Productivity",
    updated: "2 hours ago",
    importance: 5,
    tags: ["AI", "Prompt", "Work"],
  },
  {
    title: "Meeting Notes",
    description: "Discussion with client about MemoryOS roadmap.",
    category: "Business",
    updated: "Yesterday",
    importance: 4,
    tags: ["Client", "Meeting"],
  },
  {
    title: "Research Archive",
    description: "Saved articles and AI research documents.",
    category: "Research",
    updated: "3 days ago",
    importance: 5,
    tags: ["AI", "Research"],
  },
];

export default function MemoryCards() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Memory Library
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {memories.map((memory) => (
          <div
            key={memory.title}
            className="rounded-xl border border-slate-800 bg-slate-950 p-6 transition hover:border-blue-500"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {memory.title}
              </h3>

              <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs text-blue-400">
                {memory.category}
              </span>
            </div>

            <p className="mb-5 text-slate-400">
              {memory.description}
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {memory.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">
                Updated {memory.updated}
              </span>

              <span className="text-yellow-400">
                {"★".repeat(memory.importance)}
              </span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 rounded-lg border border-slate-700 py-2 text-white transition hover:border-blue-500">
                View
              </button>

              <button className="flex-1 rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
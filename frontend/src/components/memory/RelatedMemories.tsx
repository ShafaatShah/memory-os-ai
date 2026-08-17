const memories = [
  {
    title: "AI Prompt Library",
    similarity: "98% Match",
    category: "AI",
  },
  {
    title: "Research Notes",
    similarity: "91% Match",
    category: "Research",
  },
  {
    title: "Workflow Automation",
    similarity: "87% Match",
    category: "Projects",
  },
];

export default function RelatedMemories() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Related Memories
      </h2>

      <div className="space-y-4">
        {memories.map((memory) => (
          <div
            key={memory.title}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4"
          >
            <div>
              <h3 className="font-semibold text-white">
                {memory.title}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {memory.category}
              </p>
            </div>

            <span className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
              {memory.similarity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
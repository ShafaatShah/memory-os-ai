const nodes = [
  {
    title: "AI Prompt Library",
    links: 24,
    color: "bg-blue-500",
  },
  {
    title: "Meeting Notes",
    links: 15,
    color: "bg-green-500",
  },
  {
    title: "Research Archive",
    links: 31,
    color: "bg-purple-500",
  },
  {
    title: "Automation Workflow",
    links: 18,
    color: "bg-yellow-500",
  },
];

export default function KnowledgeGraph() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Knowledge Graph
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        {nodes.map((node) => (
          <div
            key={node.title}
            className="rounded-lg border border-slate-800 bg-slate-950 p-5"
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-5 w-5 rounded-full ${node.color}`}
              ></div>

              <div>
                <h3 className="font-semibold text-white">
                  {node.title}
                </h3>

                <p className="text-sm text-slate-400">
                  {node.links} Connected Memories
                </p>
              </div>
            </div>

            <div className="mt-5 h-2 rounded-full bg-slate-800">
              <div
                className={`${node.color} h-2 rounded-full`}
                style={{
                  width: `${Math.min(node.links * 3, 100)}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function FloatingAIAssistant() {
  return (
    /* Step 1 — Container */
    <div className="fixed bottom-6 right-6 z-50 w-80 rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
      
      {/* Step 2 — Header */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-xl">
            🤖
          </div>

          <div>
            <h3 className="font-semibold text-white">
              MemoryOS AI
            </h3>

            <p className="text-sm text-slate-400">
              AI Assistant
            </p>
          </div>
        </div>
      </div>

      {/* Step 3 — Body */}
      <div className="space-y-4 p-4">
        <p className="text-slate-300">
          Need help with your memories?
        </p>

        <div className="space-y-3 text-sm text-slate-400">
          <p>🔍 Search memories instantly</p>
          <p>📝 Generate AI summaries</p>
          <p>🧠 Explain knowledge graph</p>
          <p>🔗 Find related memories</p>
        </div>

        {/* Step 4 — Button */}
        <button className="mt-2 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700">
          Open AI Assistant
        </button>
      </div>
    </div>
  );
}
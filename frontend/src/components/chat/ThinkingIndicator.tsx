export default function ThinkingIndicator() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg">
          🤖
        </div>

        <div>

          <h3 className="font-semibold text-white">
            MemoryOS AI
          </h3>

          <p className="text-sm text-slate-400">
            Thinking...
          </p>

        </div>

      </div>

    </div>
  );
}
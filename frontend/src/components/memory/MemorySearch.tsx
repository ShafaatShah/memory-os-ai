export default function MemorySearch() {
  const filters = [
    "All",
    "AI",
    "Projects",
    "Research",
    "Business",
  ];

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Search Memories
      </h2>

      {/* Search Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search memories..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
        />

        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500">
          🔍
        </span>
      </div>

      {/* Filter Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`rounded-lg px-4 py-2 transition ${
              index === 0
                ? "bg-blue-600 text-white"
                : "border border-slate-700 bg-slate-950 text-slate-300 hover:border-blue-500"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
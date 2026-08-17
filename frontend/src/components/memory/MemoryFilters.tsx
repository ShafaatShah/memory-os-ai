const filterGroups = [
  {
    label: "Category",
    options: ["All", "AI", "Business", "Research"],
  },
  {
    label: "Date",
    options: ["Any Time", "Today", "This Week", "This Month"],
  },
  {
    label: "Importance",
    options: ["All", "★★★★★", "★★★★", "★★★"],
  },
  {
    label: "Sort",
    options: ["Newest", "Oldest", "A-Z"],
  },
];

export default function MemoryFilters() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Memory Filters
        </h2>

        <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-red-500 hover:text-red-400">
          Reset Filters
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {filterGroups.map((group) => (
          <div key={group.label}>
            <label className="mb-2 block text-sm font-medium text-slate-400">
              {group.label}
            </label>

            <select className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none">
              {group.options.map((option) => (
                <option
                  key={option}
                  className="bg-slate-950"
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function MemoryEditor() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Edit Memory
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Title */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">
            Memory Title
          </label>

          <input
            type="text"
            placeholder="Enter memory title..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Category
          </label>

          <select className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white">
            <option>AI</option>
            <option>Business</option>
            <option>Research</option>
            <option>Projects</option>
            <option>Personal</option>
          </select>
        </div>

        {/* Importance */}
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Importance
          </label>

          <select className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white">
            <option>⭐</option>
            <option>⭐⭐</option>
            <option>⭐⭐⭐</option>
            <option>⭐⭐⭐⭐</option>
            <option>⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">
            Tags
          </label>

          <input
            type="text"
            placeholder="#AI #Prompt #Research"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Content */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">
            Memory Content
          </label>

          <textarea
            rows={10}
            placeholder="Write your memory..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* Upload */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-300">
            Attachments
          </label>

          <input
            type="file"
            className="block w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-300"
          />
        </div>

      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button className="rounded-lg border border-slate-700 px-6 py-3 text-white hover:bg-slate-800">
          Cancel
        </button>

        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Save Memory
        </button>
      </div>
    </div>
  );
}
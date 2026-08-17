export default function MemoryDetail() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            AI Prompt Library
          </h2>

          <p className="mt-2 text-slate-400">
            Collection of reusable prompts for AI workflows.
          </p>
        </div>

        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-400">
          Productivity
        </span>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">

        <div>
          <p className="text-sm text-slate-500">
            Created
          </p>

          <p className="mt-2 text-white">
            24 July 2026
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Last Updated
          </p>

          <p className="mt-2 text-white">
            Today
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Importance
          </p>

          <p className="mt-2 text-yellow-400">
            ★★★★★
          </p>
        </div>

      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Tags
        </h3>

        <div className="flex flex-wrap gap-3">

          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
            #AI
          </span>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
            #Prompt
          </span>

          <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
            #Automation
          </span>

        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Memory Content
        </h3>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 leading-8 text-slate-300">

          This memory stores reusable AI prompts that can be
          used for blog generation, coding assistance,
          documentation writing, research summaries,
          brainstorming and automation workflows.

          <br /><br />

          The content will later be loaded dynamically from
          CockroachDB and searchable using semantic AI search.

        </div>
      </div>

      <div className="mb-8">

        <h3 className="mb-4 text-xl font-semibold text-white">
          Attachments
        </h3>

        <div className="space-y-3">

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            Prompt-Library.pdf
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
            Workflow.png
          </div>

        </div>

      </div>

      <div className="flex flex-wrap gap-4">

        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          Edit Memory
        </button>

        <button className="rounded-lg border border-red-500 px-6 py-3 text-red-400 hover:bg-red-500 hover:text-white">
          Delete
        </button>

        <button className="rounded-lg border border-slate-700 px-6 py-3 text-white hover:border-blue-500">
          Share
        </button>

      </div>

    </div>
  );
}
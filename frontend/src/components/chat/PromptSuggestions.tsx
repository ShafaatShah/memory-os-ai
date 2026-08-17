export default function PromptSuggestions() {
  const suggestions = [
    "Summarize related memories",
    "Find similar conversations",
    "Explain this project",
    "Generate workflow",
    "Search Research Archive",
    "Show connected memories",
  ];

  return (
    <div className="mt-4">

      {/* Title */}

      <h3 className="mb-3 text-sm font-semibold text-slate-400">
        Suggested Prompts
      </h3>

      {/* Chips */}

      <div className="flex flex-wrap gap-3">

        {suggestions.map((item) => (

          <button
            key={item}
            className="
              rounded-full
              border
              border-slate-700
              bg-slate-900
              px-4
              py-2
              text-sm
              text-slate-300
              transition-all
              duration-200
              hover:border-blue-500
              hover:bg-slate-800
              hover:text-white
            "
          >
            {item}
          </button>

        ))}

      </div>

    </div>
  );
}
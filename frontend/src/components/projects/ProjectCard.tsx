type ProjectCardProps = {
  title: string;
  description: string;
  updated: string;
  status: "Active" | "Paused";
};

export default function ProjectCard({
  title,
  description,
  updated,
  status,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500 transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs ${
            status === "Active"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-4 text-slate-400">
        {description}
      </p>

      <p className="mt-6 text-sm text-slate-500">
        Updated {updated}
      </p>
    </div>
  );
}
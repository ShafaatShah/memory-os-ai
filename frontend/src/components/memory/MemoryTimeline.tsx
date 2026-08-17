const timeline = [
  {
    date: "Today",
    events: [
      {
        title: "New memory created",
        description: "Saved conversation with ChatGPT",
        time: "2 minutes ago",
      },
      {
        title: "AI summary generated",
        description: "Summarised project discussion",
        time: "10 minutes ago",
      },
    ],
  },
  {
    date: "Yesterday",
    events: [
      {
        title: "Project updated",
        description: "MemoryOS Dashboard",
        time: "Yesterday",
      },
    ],
  },
  {
    date: "Last Week",
    events: [
      {
        title: "Research completed",
        description: "AI Memory Engine",
        time: "7 days ago",
      },
    ],
  },
];

export default function MemoryTimeline() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-8 text-2xl font-bold text-white">Memory Timeline</h2>

      {timeline.map((group) => (
        <div key={group.date} className="mb-10 last:mb-0">
          <h3 className="mb-5 text-lg font-semibold text-slate-300">
            {group.date}
          </h3>

          {/* Added index to loop */}
          {group.events.map((event, index) => (
            <div key={event.title} className="flex gap-5 pb-8 last:pb-0">
              
              {/* Timeline Dot & Connecting Line */}
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                
                {/* 1. Only render connecting line if it's NOT the last item in the group */}
                {index !== group.events.length - 1 && (
                  <div className="mt-2 h-full w-px bg-slate-700"></div>
                )}
              </div>

              {/* 2. Enhanced Card with smooth hover effects */}
              <div className="flex-1 rounded-lg border border-slate-800 bg-slate-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">
                <h4 className="font-semibold text-white">{event.title}</h4>
                <p className="mt-2 text-slate-400">{event.description}</p>
                <p className="mt-3 text-sm text-slate-500">{event.time}</p>
              </div>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
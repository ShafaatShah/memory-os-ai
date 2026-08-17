"use client";

import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({
  onSendMessage,
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();

    if (!trimmed) return;

    onSendMessage(trimmed);

    setInput("");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      {/* Text Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Ask anything about your memories..."
        className="min-h-[60px] w-full resize-none bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
      />

      {/* Bottom Toolbar */}
      <div className="mt-4 flex items-center justify-between">
        {/* Left Actions */}
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
            📎 Attach
          </button>

          <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
            🌐 Web
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
            Memory
          </button>

          <button className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
            🎤
          </button>

          <button
            onClick={handleSend}
            disabled={input.trim() === ""}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
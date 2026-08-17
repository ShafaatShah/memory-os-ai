'use client';

import React, { useState } from 'react';

const suggestions = [
  "Summarise AI Prompt Library",
  "Merge similar memories",
  "Generate project documentation",
  "Find duplicate memories",
];

export const AICopilot: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    console.log('Submitted prompt:', prompt);
    setPrompt('');
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-100">
      <h2 className="text-xl font-bold tracking-tight text-white">AI Copilot</h2>
      <p className="text-sm text-slate-400 mt-1 mb-4">AI Suggestions</p>

      <div className="space-y-2 mb-6">
        {suggestions.map((item, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(item)}
            className="w-full text-left px-4 py-3 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-800/60 hover:border-slate-700 transition-colors duration-150 text-sm font-medium flex items-center gap-2 group"
          >
            <span className="text-base group-hover:scale-110 transition-transform">💡</span>
            <span className="text-slate-300 group-hover:text-slate-100">{item}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-slate-800 my-6" />

      <h3 className="text-md font-semibold text-slate-200 mb-3">Ask AI</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI anything about your memories..."
          rows={3}
          className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors duration-150 shadow-lg shadow-blue-500/10 active:scale-[0.98]"
          >
            Ask AI
          </button>
        </div>
      </form>
    </div>
  );
};

export default AICopilot;
"use client";

import {
  Brain,
  FileText,
  MessageSquare,
  Rocket,
} from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-10 py-16">
      {/* Logo */}
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
        <Brain className="h-12 w-12 text-white" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-white">
        MemoryOS AI
      </h1>

      <p className="mt-4 max-w-2xl text-center text-lg text-slate-400">
        The Operating System for AI Memory.
        Organize conversations, search memories,
        upload documents and build intelligent
        knowledge connections.
      </p>

      {/* Feature Cards */}
      <div className="mt-12 grid w-full max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500">
          <MessageSquare className="mb-4 h-8 w-8 text-cyan-400" />

          <h3 className="text-lg font-semibold text-white">
            Ask Questions
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Ask MemoryOS AI about projects,
            conversations, code or research.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500">
          <Brain className="mb-4 h-8 w-8 text-purple-400" />

          <h3 className="text-lg font-semibold text-white">
            Search Memories
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Instantly retrieve related memories
            using semantic search.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500">
          <FileText className="mb-4 h-8 w-8 text-emerald-400" />

          <h3 className="text-lg font-semibold text-white">
            Upload Documents
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Upload PDFs, Word documents,
            spreadsheets and research papers.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-500">
          <Rocket className="mb-4 h-8 w-8 text-orange-400" />

          <h3 className="text-lg font-semibold text-white">
            Build Knowledge
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Create connected knowledge graphs
            and AI-powered workflows.
          </p>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="mt-14 w-full max-w-5xl">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Suggested Prompts
        </h2>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-white">
            Explain Retrieval-Augmented Generation
          </button>

          <button className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-white">
            Summarize my research
          </button>

          <button className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-white">
            Find related memories
          </button>

          <button className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-slate-300 transition hover:border-cyan-500 hover:text-white">
            Build a vector database
          </button>
        </div>
      </div>
    </div>
  );
}
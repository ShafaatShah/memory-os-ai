"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { api } from "@/lib/api";

type Project = {
  id: string;
  name: string;
  description: string;
  memories: number;
  conversations: number;
  tags: string[];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await api.projects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  async function createProject() {
    const cleanName = name.trim();

    if (!cleanName) return;

    try {
      const project = await api.createProject(
        cleanName,
        description.trim()
      );

      setProjects((current) => [...current, project]);

      setName("");
      setDescription("");
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  }

  async function deleteProject(id: string) {
    try {
      await api.deleteProject(id);

      setProjects((current) =>
        current.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-blue-400 mb-2">
              MemoryOS AI
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Projects
            </h1>

            <p className="text-slate-300 mt-2">
              Organize conversations, memories, and knowledge into projects.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition shadow-sm"
          >
            + New Project
          </button>
        </div>

        {/* Create project */}
        {showForm && (
          <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Create Project
                </h2>

                <p className="text-sm text-slate-300 mt-1">
                  Start a new workspace for your AI knowledge.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Project name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. My AI Research"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this project about?"
                  rows={3}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={createProject}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium text-white"
                >
                  Create Project
                </button>

                <button
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Project grid */}
        {loading ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-12 text-center">
            <p className="text-slate-400">
              Loading projects...
            </p>
          </div>
        ) : projects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:border-slate-700 transition"
              >
                {/* Project icon */}
                <div className="w-11 h-11 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl mb-5">
                  ◈
                </div>

                <h2 className="text-xl font-semibold text-white">
                  {project.name}
                </h2>

                <p className="text-sm text-slate-300 mt-2 min-h-[42px]">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/60">
                    <p className="text-xs text-slate-400 font-medium">
                      Memories
                    </p>

                    <p className="text-lg font-bold text-white mt-1">
                      {project.memories}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-950 p-3 border border-slate-800/60">
                    <p className="text-xs text-slate-400 font-medium">
                      Conversations
                    </p>

                    <p className="text-lg font-bold text-white mt-1">
                      {project.conversations}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      window.location.href = `/chat?project_id=${project.id}`;
                    }}
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-medium transition text-sm text-center"
                  >
                    Open
                  </button>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="px-4 py-2 rounded-lg border border-red-900/60 text-red-400 hover:bg-red-500/10 font-medium transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center">
            <div className="text-4xl mb-4 text-blue-400">
              ◈
            </div>

            <h2 className="text-xl font-semibold text-white">
              No projects yet
            </h2>

            <p className="text-slate-300 mt-2">
              Create your first project to organize your AI workspace.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-5 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
            >
              Create Project
            </button>
          </div>
        )}

        {/* Footer note */}
        <p className="text-xs text-slate-500 mt-8 text-center">
          Projects organize your MemoryOS AI workspace.
        </p>

      </div>
    </AppLayout>
  );
}
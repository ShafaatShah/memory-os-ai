const API_BASE_URL = process.env.NODE_ENV === "development" 
  ? "http://127.0.0.1:8000" 
  : "https://vadlibzzespcn7nojtivz3wm6y0fyuxi.lambda-url.eu-north-1.on.aws";

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "no-store", // <--- THIS IS THE MAGIC LINE!
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}


export const api = {
  chat: (conversationId: string, message: string) =>
    request<{
      response: string;
      memories: {
        key: string;
        value: string;
        confidence: number;
      }[];
    }>("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        conversation_id: conversationId,
        message,
      }),
    }),

  memories: () =>
    request<{
      count: number;
      memories: {
        key: string;
        value: string;
        confidence: number;
      }[];
    }>("/api/memory"),

  stats: () =>
    request<{
      projects: number;
      memories: number;
      tasks: number;
      conversations: number;
    }>("/api/stats"),

  projects: () =>
    request<
      {
        id: number;
        name: string;
        description: string;
        memories: number;
        conversations: number;
        tags: string[];
        created_at: string;
        updated_at: string;
      }[]
    >("/api/projects"),

  createProject: (name: string, description: string) =>
    request<{
      id: number;
      name: string;
      description: string;
      memories: number;
      conversations: number;
      tags: string[];
      created_at: string;
      updated_at: string;
    }>("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
      }),
    }),

  deleteProject: (projectId: number) =>
    request<{
      success: boolean;
      id: number;
    }>(`/api/projects/${projectId}`, {
      method: "DELETE",
    }),

  projectConversations: (projectId: string) =>
    request<
      {
        id: string;
        title: string;
        created_at: string;
        updated_at: string;
      }[]
    >(`/api/conversations/project/${projectId}`),

  createConversation: (projectId?: string) =>
    request<{
      id: string;
      title: string;
      created_at: string;
      updated_at: string;
    }>(
      projectId
        ? `/api/conversations?project_id=${projectId}`
        : "/api/conversations",
      {
        method: "POST",
      }
    ),

  conversations: () =>
    request<
      {
        id: string;
        title: string;
        created_at: string;
        updated_at: string;
      }[]
    >("/api/conversations"),

  conversationMessages: (conversationId: string) =>
    request<
      {
        id: string;
        role: string;
        content: string;
        created_at: string;
      }[]
    >(`/api/conversations/${conversationId}/messages`),
};
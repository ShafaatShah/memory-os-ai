"use client";

import { useEffect, useRef, useState } from "react";

import ChatInput from "./ChatInput";
import ThinkingIndicator from "./ThinkingIndicator";
import PromptSuggestions from "./PromptSuggestions";
import ChatMessage from "./ChatMessage";
import FileUpload from "./FileUpload";
import { api } from "@/lib/api";

interface MemoryUsed {
  key: string;
  value: string;
  confidence: number;
}

interface Message {
  id: string;
  role: "assistant" | "user";
  message: string;
  time: string;
  memories?: MemoryUsed[];
}

interface ConversationProps {
  activeConversationId: string | null;
  onMemoryUpdated: () => void;
}

export default function Conversation({
  activeConversationId,
  onMemoryUpdated,
}: ConversationProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      message:
        "Hello! I'm your MemoryOS AI assistant. How can I help you today?",
      time: "",
    },
  ]);

  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    setMessages((current) =>
      current.map((message) =>
        message.id === "welcome-1"
          ? {
              ...message,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : message
      )
    );
  }, []);

  useEffect(() => {
    if (!activeConversationId) return;

    async function loadMessages() {
      try {
        const data = await api.conversationMessages(
          activeConversationId!
        );

        const loadedMessages: Message[] = data.map((message) => ({
          id: message.id,
          role: message.role as "user" | "assistant",
          message: message.content,
          time: new Date(message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setMessages(loadedMessages);
      } catch (error) {
        console.error(error);
      }
    }

    loadMessages();
  }, [activeConversationId]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  const handleSendMessage = async (text: string) => {
    if (!activeConversationId) {
      console.error("No conversation selected");
      return;
    }

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      message: text,
      time: currentTime,
    };

    setMessages((previous) => [...previous, userMessage]);
    setIsThinking(true);

    try {
      const data = await api.chat(activeConversationId, text);

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        message: data.response,
        memories: data.memories,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((previous) => [...previous, aiMessage]);

      onMemoryUpdated();
    } catch (error) {
      console.error(error);

      const aiMessage: Message = {
        id: `err-${Date.now()}`,
        role: "assistant",
        message: "Unable to connect to the backend.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((previous) => [...previous, aiMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-800 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              MemoryOS Assistant
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Retrieval-Augmented Generation Discussion
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm font-medium text-white">
              GPT-5.5
            </p>

            <span className="text-xs text-green-400">
              ● Active
            </span>
          </div>
        </div>
      </div>

      {/* Conversation content */}
      <div className="p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <ChatMessage
                role={message.role}
                author={
                  message.role === "assistant"
                    ? "MemoryOS"
                    : "You"
                }
                message={message.message}
                time={message.time}
              />

              {message.role === "assistant" &&
                message.memories &&
                message.memories.length > 0 && (
                  <div className="mt-2 ml-10 rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-2">
                    <p className="text-xs font-medium text-blue-400">
                      🧠 Memory Used
                    </p>

                    <div className="mt-1 space-y-1">
                      {message.memories.map((memory) => (
                        <p
                          key={memory.key}
                          className="text-xs text-slate-400"
                        >
                          <span className="text-slate-300">
                            {memory.key.replace(/_/g, " ")}
                          </span>
                          {" → "}
                          {memory.value}
                          {" · "}
                          <span className="text-green-400">
                            {memory.confidence}%
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ))}

          {isThinking && <ThinkingIndicator />}

          {/* Suggested prompts */}
          <PromptSuggestions />

          {/* File upload */}
          <FileUpload />

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-slate-800 bg-slate-900 p-4">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
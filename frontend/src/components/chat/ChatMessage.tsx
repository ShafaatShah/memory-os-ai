import React from "react";

export interface ChatMessageProps {
  role: "user" | "assistant";
  author: string;
  message: string;
  time: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  author,
  message,
  time,
}) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full gap-3 mb-4 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar (Step 5) */}
      <div className="flex-shrink-0 text-xl select-none pt-1">
        {isUser ? "😊" : "🤖"}
      </div>

      {/* Message & Header Container */}
      <div
        className={`flex flex-col ${
          isUser ? "items-end max-w-[65%]" : "items-start max-w-[70%]"
        }`}
      >
        {/* Header: Author & Time (Step 6) */}
        <div
          className={`flex items-center gap-2 mb-1 text-xs text-slate-500 ${
            isUser ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <span className="font-medium text-slate-400">{author}</span>
          <span>{time}</span>
        </div>

        {/* Message Bubble (Steps 2, 3, 4, 7, 8) */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-xs"
              : "bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-xs"
          }`}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
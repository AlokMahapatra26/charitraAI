"use client";

import React, { useState, useRef, useEffect } from "react";
import { askAIAboutNotesAction } from "@/actions/characters";

interface ChatProps {
  characterName: string;
  characterDescription: string;
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat: React.FC<ChatProps> = ({ characterName, characterDescription }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const userMessages = updatedMessages
        .filter((m) => m.role === "user")
        .map((m) => m.content);
      const aiMessages = updatedMessages
        .filter((m) => m.role === "assistant")
        .map((m) => m.content);

      const response = await askAIAboutNotesAction(
        userMessages,
        aiMessages,
        characterName,
        characterDescription
      );

      setMessages([...updatedMessages, { role: "assistant", content: response }]);
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100dvh-180px)] max-w-full overflow-hidden px-2 sm:px-4">
      <div className="flex-1 overflow-y-auto rounded-md border bg-white p-3 space-y-2 max-h-full">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] text-sm md:text-base break-words p-2 rounded-lg shadow-sm ${
              msg.role === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "mr-auto bg-gray-100 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-3 flex items-center gap-2 border-t pt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask something to ${characterName}...`}
          className="flex-1 min-w-0 p-2 text-sm sm:text-base rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 text-sm sm:text-base bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;

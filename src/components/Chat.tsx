"use client";

import React, { useState } from "react";
import { askAIAboutNotesAction } from "@/actions/characters"

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

  const handleSend = async () => {
    if (!input.trim()) return;

    const updatedMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const isUserMessage = (m: Message): m is Message & { role: "user" } => m.role === "user";
      const isAssistantMessage = (m: Message): m is Message & { role: "assistant" } => m.role === "assistant";

      const userMessages = updatedMessages.filter(isUserMessage).map((m) => m.content);
      const aiMessages = updatedMessages.filter(isAssistantMessage).map((m) => m.content);

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

  return (
    <div className="flex flex-col gap-4">
      <div className="border rounded p-4 h-[300px] overflow-y-auto bg-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-2 rounded-md ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask something to ${characterName}...`}
          className="flex-1 p-2 border rounded"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;

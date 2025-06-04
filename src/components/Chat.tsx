"use client";

import React, { useState, useRef, useEffect } from "react";
import { askAIAboutNotesAction } from "@/actions/characters";
import { SendHorizonal } from "lucide-react";

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
      console.log(err);
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
<div className="flex flex-col h-[calc(100dvh-180px)] max-w-full px-2 sm:px-4">
      {/* Message Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 rounded-xl bg-muted/40 border shadow-inner">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] text-sm md:text-base break-words px-4 py-3 rounded-2xl shadow-sm transition-all ${
              msg.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "mr-auto bg-secondary text-secondary-foreground"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 flex items-center gap-2 border-t pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask something to ${characterName}...`}
          className="flex-1 min-w-0 p-2.5 text-sm sm:text-base rounded-lg border bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="p-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
          ) : (
            <SendHorizonal size={20} />
          )}
        </button>
      </div>
    </div>

  );
};

export default Chat;

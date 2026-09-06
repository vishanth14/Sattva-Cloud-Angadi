import { useState, useRef, useEffect } from "react";
import { rootsEntries, getRootsResponse, suggestedQuestions } from "../data/roots";
import type { RootsEntry } from "../types";

interface Message {
  id: string;
  type: "user" | "companion";
  text: string;
  tags?: RootsEntry["tags"];
}

const TAG_STYLES: Record<string, { label: string; color: string }> = {
  traditional: { label: "TRADITIONAL KNOWLEDGE", color: "#b87333" },
  ayurvedic: { label: "AYURVEDIC CONTEXT", color: "#c9a84c" },
  scientific: { label: "SCIENTIFIC CONTEXT", color: "#a0a8b0" },
};

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.type === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`max-w-lg ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 border border-[#b87333] flex items-center justify-center">
              <span className="text-[8px] text-[#b87333]">R</span>
            </div>
            <span className="text-[9px] tracking-[0.2em] text-[#7a6a58]">ROOTS COMPANION</span>
          </div>
        )}
        <div
          className="px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap"
          style={{
            background: isUser ? "rgba(184,115,51,0.15)" : "#161210",
            border: `1px solid ${isUser ? "rgba(184,115,51,0.3)" : "#2e2820"}`,
            color: "#c8b89a",
          }}
        >
          {msg.text}
        </div>
        {msg.tags && msg.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {msg.tags.map((tag) => (
              <span
                key={tag}
                className="text-[8px] tracking-[0.15em] px-2 py-0.5 border"
                style={{
                  borderColor: TAG_STYLES[tag]?.color || "#2e2820",
                  color: TAG_STYLES[tag]?.color || "#7a6a58",
                }}
              >
                {TAG_STYLES[tag]?.label || tag.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Roots() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "companion",
      text: "Welcome to ROOTS — your heritage guide for traditional Indian materials.\n\nI can help you understand how to use, clean, maintain, and care for copper, brass, bronze, Kansa, iron, and terracotta objects. I can also guide you through traditional practices and Ayurvedic context.\n\nWhat would you like to know?",
      tags: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: Message = { id: Date.now().toString(), type: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setThinking(true);

    setTimeout(() => {
      const entry = getRootsResponse(text);
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: "companion",
        text: entry
          ? entry.response
          : "That's a thoughtful question. For the most specific guidance, I recommend consulting the care guide for your particular material — available on each product page and in the materials section.\n\nYou might also explore the material story pages, where each material's heritage, craft process, and traditional use is documented in detail.",
        tags: entry?.tags || [],
      };
      setMessages((prev) => [...prev, response]);
      setThinking(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div style={{ background: "#0e0c0a", minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-36 pb-12 px-8 md:px-16 border-b" style={{ borderColor: "#2e2820" }}>
        <p className="text-[10px] tracking-[0.35em] text-[#7a6a58] mb-4">ROOTS COMPANION</p>
        <h1 className="font-['Fraunces'] text-5xl md:text-6xl" style={{ color: "#f0e8d6" }}>
          YOUR HERITAGE
          <br />
          <span style={{ color: "#b87333" }}>GUIDE</span>
        </h1>
        <p className="mt-5 text-sm text-[#c8b89a] max-w-lg">
          Ask ROOTS anything about traditional Indian materials — care, use, history, Ayurvedic context, and craft knowledge.
        </p>

        {/* Tags legend */}
        <div className="flex flex-wrap gap-3 mt-6">
          {Object.entries(TAG_STYLES).map(([key, { label, color }]) => (
            <span
              key={key}
              className="text-[9px] tracking-[0.15em] px-2 py-0.5 border"
              style={{ borderColor: color, color }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
        {/* Suggested questions sidebar */}
        <aside
          className="w-full lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r p-6"
          style={{ borderColor: "#2e2820" }}
        >
          <p className="text-[10px] tracking-[0.25em] text-[#7a6a58] mb-4">SUGGESTED QUESTIONS</p>
          <div className="flex flex-col gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-left text-xs text-[#7a6a58] hover:text-[#b87333] py-2 border-b transition-colors"
                style={{ borderColor: "#1a1614" }}
              >
                {q}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} />
            ))}
            {thinking && (
              <div className="flex justify-start mb-6">
                <div className="px-5 py-4 border text-sm text-[#7a6a58] italic" style={{ borderColor: "#2e2820", background: "#161210" }}>
                  Consulting the archive...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t px-6 md:px-10 py-5" style={{ borderColor: "#2e2820" }}>
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about copper care, Kansa traditions, brass maintenance..."
                className="flex-1 bg-transparent border text-sm text-[#f0e8d6] px-4 py-3 placeholder-[#4a3f34] focus:outline-none focus:border-[#b87333] transition-colors"
                style={{ borderColor: "#2e2820" }}
                disabled={thinking}
                aria-label="Your question"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                className="px-6 py-3 text-xs tracking-[0.2em] transition-all duration-200 disabled:opacity-40"
                style={{ background: "#b87333", color: "#0e0c0a" }}
              >
                ASK
              </button>
            </form>
            <p className="text-[10px] text-[#4a3f34] mt-3">
              ROOTS provides traditional knowledge and general guidance. For health decisions, consult qualified practitioners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

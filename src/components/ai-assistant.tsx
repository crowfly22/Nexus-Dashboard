"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  { id: "1", role: "assistant", content: "Hello! I'm your Nexus AI assistant. How can I help you today?", timestamp: "3:24 PM" },
  { id: "2", role: "user", content: "Show me a summary of this week's performance", timestamp: "3:25 PM" },
  { id: "3", role: "assistant", content: "This week's performance is strong! Revenue is up 12.4% to $12,400, with 2,847 new users (+8.2%). Project delivery rate is at 94.6% and AI processing handled 45.2K requests successfully.", timestamp: "3:25 PM" },
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I've analyzed the data. Your key metrics are trending upward with a 12% increase in engagement. Would you like me to generate a detailed report?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex flex-col rounded-2xl border border-border bg-surface backdrop-blur-xl overflow-hidden"
      style={{ height: 420 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border px-5 py-3.5">
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
          <Bot className="h-4 w-4 text-white" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-success border-2 border-background" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">AI Assistant</h3>
          <p className="text-xs text-success">Online</p>
        </div>
        <Sparkles className="ml-auto h-4 w-4 text-primary-light" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-primary to-accent"
                    : "bg-surface-hover"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-3.5 w-3.5 text-white" />
                ) : (
                  <User className="h-3.5 w-3.5 text-text-secondary" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary/15 text-text-primary rounded-br-md"
                    : "bg-surface-hover text-text-primary border border-border rounded-bl-md"
                }`}
              >
                <p>{msg.content}</p>
                <p className="mt-1 text-[10px] text-text-tertiary">{msg.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl bg-surface-hover border border-border px-4 py-3 rounded-bl-md">
              <div className="typing-dot h-1.5 w-1.5 rounded-full bg-text-tertiary" />
              <div className="typing-dot h-1.5 w-1.5 rounded-full bg-text-tertiary" />
              <div className="typing-dot h-1.5 w-1.5 rounded-full bg-text-tertiary" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-xl bg-surface-hover border border-border px-3 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI anything..."
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="rounded-lg bg-gradient-to-r from-primary to-accent p-2 text-white transition-opacity disabled:opacity-30 hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

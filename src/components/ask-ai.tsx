"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { config } from "@/data/config";

type ChatMessage = { role: "user" | "assistant"; content: string };

const firstName = config.author.split(" ")[0];
const SUGGESTIONS = [
  `What does ${firstName} work on?`,
  `Which AI projects has ${firstName} built?`,
  "How can I get in touch?",
];

// Keep requests small: the API only accepts the most recent messages.
const MAX_HISTORY = 11;

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = async (question: string) => {
    const text = question.trim();
    if (!text || loading) return;
    setInput("");
    setLoading(true);

    let history: ChatMessage[] = [...messages, { role: "user", content: text }];
    // Start on a user turn after trimming.
    history = history.slice(-MAX_HISTORY);
    while (history.length && history[0].role !== "user") history = history.slice(1);
    setMessages([...history, { role: "assistant", content: "" }]);

    const setReply = (reply: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content: reply }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply(reply);
      }
    } catch (err) {
      setReply(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ask(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label={`Ask about ${config.author}`}
          className="flex h-[min(32rem,calc(100dvh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-zinc-700 bg-zinc-950/95 text-zinc-200 shadow-2xl backdrop-blur font-sans"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
            <div>
              <p className="text-sm font-semibold">Ask my portfolio</p>
              <p className="text-xs text-zinc-500">
                AI answers based on this site. It can make mistakes.
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="rounded p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">
                  Hi! Ask me anything about {firstName}&apos;s work.
                </p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="block w-full rounded-lg border border-zinc-800 px-3 py-2 text-left text-sm text-zinc-300 hover:border-zinc-600"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm",
                  m.role === "user" ? "ml-auto bg-zinc-200 text-zinc-900" : "bg-zinc-800"
                )}
              >
                {m.content ||
                  (loading && i === messages.length - 1 ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-label="Thinking" />
                  ) : null)}
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-zinc-800 p-3">
            <label htmlFor="ask-ai-input" className="sr-only">
              Your question
            </label>
            <input
              id="ask-ai-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1000}
              placeholder="Ask a question…"
              className="flex-1 rounded-md bg-zinc-900 px-3 py-2 text-sm outline-none ring-1 ring-zinc-800 focus:ring-zinc-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="rounded-md bg-zinc-200 px-3 text-zinc-900 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Ask my portfolio (AI assistant)"}
        className="flex items-center gap-2 rounded-full bg-zinc-200 px-4 py-3 text-sm font-medium text-zinc-900 shadow-lg hover:bg-white"
      >
        {open ? <X className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask AI"}</span>
      </button>
    </div>
  );
}

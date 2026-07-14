import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Check, Copy, Loader2, MessageCircle, Minus, RotateCcw, Send, Sprout, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { cn } from "@/lib/utils";
import { chatWithBloom } from "@/lib/chat.functions";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! 👋 I'm **Bloom**, your KitchenBloom assistant. Ask me anything about herbs, nurseries, bookings, suppliers or plant care.",
};

const STARTERS = [
  "How do I book a nursery visit?",
  "Which nursery has Rosemary?",
  "How do I care for Tulsi?",
  "Which herbs grow indoors?",
  "How do I become a supplier?",
  "What is KitchenBloom?",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chat = useServerFn(chatWithBloom);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, busy, open, minimized]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: clean }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const { reply } = await chat({ data: { messages: next.slice(-20) } });
      setMsgs((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong reaching Bloom. Please try again in a moment." },
      ]);
    } finally {
      setBusy(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const copy = async (i: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1500);
    } catch {
      /* ignore */
    }
  };

  const clear = () => setMsgs([GREETING]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "mb-3 flex w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border bg-card shadow-2xl",
              minimized ? "h-14" : "h-[540px] max-h-[80vh]",
            )}
          >
            <div className="flex items-center justify-between border-b bg-primary/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Sprout className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-tight">Bloom</p>
                  <p className="text-[11px] text-muted-foreground">Your KitchenBloom assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {!minimized && (
                  <button
                    onClick={clear}
                    className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    aria-label="Clear conversation"
                    title="Clear conversation"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setMinimized((v) => !v)}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  aria-label={minimized ? "Maximize" : "Minimize"}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {!minimized && (
              <>
                <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
                  {msgs.map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        "group flex flex-col gap-1",
                        m.role === "user" ? "items-end" : "items-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-3 py-2",
                          m.role === "assistant"
                            ? "bg-secondary text-foreground"
                            : "bg-primary text-primary-foreground",
                        )}
                      >
                        {m.role === "assistant" ? (
                          <div className="space-y-1 [&_a]:text-primary [&_a]:underline [&_code]:rounded [&_code]:bg-background/60 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_ol]:ml-4 [&_ol]:list-decimal [&_p]:my-1 [&_strong]:font-semibold [&_ul]:ml-4 [&_ul]:list-disc">
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{m.content}</p>
                        )}
                      </div>
                      {m.role === "assistant" && (
                        <button
                          onClick={() => copy(i, m.content)}
                          className="flex items-center gap-1 text-[10px] text-muted-foreground opacity-0 transition group-hover:opacity-100"
                        >
                          {copied === i ? (
                            <><Check className="h-3 w-3" /> Copied</>
                          ) : (
                            <><Copy className="h-3 w-3" /> Copy</>
                          )}
                        </button>
                      )}
                    </div>
                  ))}
                  {busy && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
                      </span>
                      Bloom is typing…
                    </div>
                  )}
                </div>

                {msgs.length <= 1 && (
                  <div className="border-t px-3 pt-2 pb-1">
                    <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      Try asking
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {STARTERS.map((q) => (
                        <button
                          key={q}
                          onClick={() => void send(q)}
                          className="rounded-full border bg-background px-2.5 py-1 text-[11px] hover:bg-secondary"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <form onSubmit={onSubmit} className="flex items-end gap-2 border-t p-3">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKey}
                    placeholder="Ask Bloom about herbs, nurseries, bookings…"
                    rows={1}
                    className="flex-1 resize-none rounded-2xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    disabled={busy}
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
                    aria-label="Send"
                  >
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => { setOpen((v) => !v); setMinimized(false); }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
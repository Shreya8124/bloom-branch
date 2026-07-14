import { useState } from "react";
import { MessageCircle, Sprout, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const QA: { q: string; a: string }[] = [
  { q: "Where can I buy herbs?", a: "Browse our Herbs page to see live availability at nurseries near you, then reserve a pickup slot in seconds." },
  { q: "How does pickup work?", a: "You choose a nursery, pick a date & time slot, and collect your plant. No online payment — pay directly at the nursery." },
  { q: "Do you deliver?", a: "KitchenBloom is pickup-only today. This keeps prices fair and plants healthy on the ride home." },
  { q: "How do I become a supplier?", a: "Head to Become a Supplier or Sign Up to create your nursery profile in under 3 minutes." },
  { q: "How do I care for Tulsi?", a: "Give Tulsi 5–6 hours of direct sun, water every 2 days, and pinch the tops to keep it bushy." },
  { q: "What payment methods are accepted?", a: "All payments happen at the nursery — cash, UPI, or card, whatever the nursery accepts." },
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hi! I'm Bloom 🌿 How can I help?" },
  ]);

  const ask = (q: string) => {
    const a = QA.find((x) => x.q === q)?.a ?? "";
    setMsgs((m) => [...m, { from: "user", text: q }, { from: "bot", text: a }]);
  };

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
            className="mb-3 flex h-[440px] w-[340px] flex-col overflow-hidden rounded-3xl border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b bg-primary/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><Sprout className="h-4 w-4" /></span>
                <div>
                  <p className="text-sm font-semibold">Bloom</p>
                  <p className="text-[11px] text-muted-foreground">Your herb assistant</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-secondary" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto p-4 text-sm">
              {msgs.map((m, i) => (
                <div key={i} className={cn("max-w-[80%] rounded-2xl px-3 py-2",
                  m.from === "bot" ? "bg-secondary text-foreground" : "ml-auto bg-primary text-primary-foreground")}>{m.text}</div>
              ))}
            </div>
            <div className="border-t p-3">
              <p className="mb-2 text-[11px] font-medium text-muted-foreground">Quick questions</p>
              <div className="flex flex-wrap gap-1.5">
                {QA.map((x) => (
                  <button key={x.q} onClick={() => ask(x.q)} className="rounded-full border bg-background px-3 py-1 text-xs hover:bg-secondary">{x.q}</button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}
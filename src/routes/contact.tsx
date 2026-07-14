import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Mail, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — KitchenBloom" },
      { name: "description", content: "Get in touch with the KitchenBloom team." },
      { property: "og:title", content: "Contact KitchenBloom" },
      { property: "og:description", content: "Questions, partnerships, feedback — say hello." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error("Please fill all fields.");
    toast.success("Message sent! We'll reply within a day.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">Say hello.</h1>
        <p className="mt-3 text-muted-foreground">Have a question, partnership idea, or feedback? We'd love to hear from you.</p>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        <form onSubmit={submit} className="grid gap-4 rounded-3xl border bg-card p-8 shadow-sm">
          <div className="grid gap-1.5">
            <Label htmlFor="cname">Name</Label>
            <Input id="cname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cemail">Email</Label>
            <Input id="cemail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cmsg">Message</Label>
            <Textarea id="cmsg" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </div>
          <Button type="submit" className="rounded-full">Send message</Button>
        </form>
        <div className="space-y-6">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-secondary">
            <iframe title="Map placeholder" src="https://www.openstreetmap.org/export/embed.html?bbox=72.55%2C23.00%2C72.62%2C23.05&layer=mapnik" className="h-full w-full" />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4"><Mail className="h-5 w-5 text-primary" /> hello@kitchenbloom.co</div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4"><Phone className="h-5 w-5 text-primary" /> +91 90000 12345</div>
            <div className="flex items-center gap-3 rounded-2xl border bg-card p-4"><Clock className="h-5 w-5 text-primary" /> Mon–Sat · 9 AM – 7 PM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/supplier/profile")({ component: Profile });

function Profile() {
  const [form, setForm] = useState({
    nursery: "Green Roots Nursery", address: "12 Fateh Sagar Road, Udaipur", hours: "8:00 AM – 7:00 PM",
    about: "Family-run nursery growing chemical-free kitchen herbs for 18 years.",
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Nursery profile</h1>
        <p className="text-sm text-muted-foreground">This is how customers see your nursery.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved."); }} className="grid max-w-2xl gap-4 rounded-3xl border bg-card p-6 shadow-sm">
        <div className="grid gap-1.5"><Label>Nursery name</Label><Input value={form.nursery} onChange={(e) => setForm({ ...form, nursery: e.target.value })} /></div>
        <div className="grid gap-1.5"><Label>Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
        <div className="grid gap-1.5"><Label>Opening hours</Label><Input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} /></div>
        <div className="grid gap-1.5"><Label>About</Label><Textarea rows={4} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} /></div>
        <Button className="justify-self-start rounded-full">Save changes</Button>
      </form>
    </div>
  );
}
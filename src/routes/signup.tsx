import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — KitchenBloom" }, { name: "description", content: "Create your KitchenBloom account or list your nursery." }] }),
  component: Signup,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || `nursery-${Math.random().toString(36).slice(2, 8)}`;
}

function Signup() {
  const nav = useNavigate();
  const [role, setRole] = useState<"customer" | "supplier">("customer");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "", nursery: "", email: "", phone: "", password: "",
    address: "", city: "", hours: "9:00 AM – 7:00 PM", about: "",
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.name) return toast.error("Fill required fields.");
    if (role === "supplier" && !form.nursery) return toast.error("Nursery name is required.");
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { emailRedirectTo: `${window.location.origin}/` , data: { name: form.name, role } },
    });
    if (error || !data.user) {
      setBusy(false);
      return toast.error(error?.message || "Sign up failed.");
    }
    if (role === "supplier") {
      const { error: sErr } = await supabase.from("suppliers").insert({
        user_id: data.user.id,
        slug: slugify(form.nursery),
        name: form.nursery,
        city: form.city,
        address: form.address,
        hours: form.hours,
        about: form.about,
      });
      if (sErr) { setBusy(false); return toast.error(sErr.message); }
    } else {
      await supabase.from("customers").insert({ id: data.user.id, name: form.name, phone: form.phone }).select();
    }
    setBusy(false);
    toast.success("Account created!");
    nav({ to: role === "supplier" ? "/supplier" : "/browse-herbs" });
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="rounded-3xl border bg-card p-8 shadow-sm">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><Sprout className="h-5 w-5" /></span>
        <h1 className="mt-4 font-display text-3xl font-semibold">Join KitchenBloom.</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create your account in seconds.</p>
        <div className="mt-6 flex gap-2 rounded-full bg-secondary p-1 text-xs font-medium">
          {(["customer","supplier"] as const).map((r) => (
            <button type="button" key={r} onClick={() => setRole(r)}
              className={`flex-1 rounded-full py-2 capitalize ${role === r ? "bg-background shadow-sm" : "text-muted-foreground"}`}>{r === "supplier" ? "Nursery / supplier" : "Customer"}</button>
          ))}
        </div>
        <form onSubmit={submit} className="mt-4 grid gap-3">
          <div className="grid gap-1.5"><Label htmlFor="sname">{role === "supplier" ? "Owner name" : "Your name"}</Label><Input id="sname" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          {role === "supplier" && (
            <div className="grid gap-1.5"><Label htmlFor="nursery">Nursery name</Label><Input id="nursery" value={form.nursery} onChange={(e) => setForm({ ...form, nursery: e.target.value })} /></div>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5"><Label htmlFor="semail">Email</Label><Input id="semail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="grid gap-1.5"><Label htmlFor="sphone">Phone</Label><Input id="sphone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="grid gap-1.5"><Label htmlFor="spass">Password</Label><Input id="spass" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          {role === "supplier" && (
            <>
              <div className="grid gap-1.5"><Label htmlFor="sadd">Address</Label><Input id="sadd" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-1.5"><Label htmlFor="scity">City</Label><Input id="scity" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                <div className="grid gap-1.5"><Label htmlFor="shrs">Opening hours</Label><Input id="shrs" value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} /></div>
              </div>
              <div className="grid gap-1.5"><Label htmlFor="sabout">About your nursery</Label><Textarea id="sabout" rows={3} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} /></div>
            </>
          )}
          <Button type="submit" disabled={busy} className="mt-2 rounded-full">{busy ? "Creating…" : "Create account"}</Button>
          <p className="text-center text-xs text-muted-foreground">Already have one? <Link to="/login" className="underline">Log in</Link></p>
        </form>
      </div>
    </div>
  );
}

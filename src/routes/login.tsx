import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { fetchSupplierByUserId } from "@/lib/queries";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — KitchenBloom" }, { name: "description", content: "Log into your KitchenBloom account." }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Enter your email and password.");
    setBusy(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    const supplier = data.user ? await fetchSupplierByUserId(data.user.id) : null;
    nav({ to: supplier ? "/supplier" : "/" });
  };
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-16">
      <div className="w-full rounded-3xl border bg-card p-8 shadow-sm">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><Sprout className="h-5 w-5" /></span>
        <h1 className="mt-4 font-display text-3xl font-semibold">Welcome back.</h1>
        <p className="mt-1 text-sm text-muted-foreground">Log into KitchenBloom.</p>
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <div className="grid gap-1.5"><Label htmlFor="lemail">Email</Label><Input id="lemail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div className="grid gap-1.5"><Label htmlFor="lpass">Password</Label><Input id="lpass" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          <Button type="submit" disabled={busy} className="mt-2 rounded-full">{busy ? "Signing in…" : "Log in"}</Button>
          <p className="text-center text-xs text-muted-foreground">No account? <Link to="/signup" className="underline">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}

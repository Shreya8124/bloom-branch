import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — KitchenBloom" }, { name: "description", content: "Log into your KitchenBloom account." }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", role: "supplier" as "customer" | "supplier" });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Enter your email and password.");
    setUser({ role: form.role, email: form.email, name: form.email.split("@")[0], nursery: form.role === "supplier" ? "Your Nursery" : undefined });
    toast.success("Welcome back!");
    nav({ to: form.role === "supplier" ? "/supplier" : "/" });
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
          <div className="flex gap-2 rounded-full bg-secondary p-1 text-xs font-medium">
            {(["customer","supplier"] as const).map((r) => (
              <button type="button" key={r} onClick={() => setForm({ ...form, role: r })}
                className={`flex-1 rounded-full py-1.5 capitalize ${form.role === r ? "bg-background shadow-sm" : "text-muted-foreground"}`}>{r}</button>
            ))}
          </div>
          <Button type="submit" className="mt-2 rounded-full">Log in</Button>
          <p className="text-center text-xs text-muted-foreground">No account? <Link to="/signup" className="underline">Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}
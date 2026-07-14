import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sprout } from "lucide-react";
import { setUser } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — KitchenBloom" }, { name: "description", content: "Create your KitchenBloom account or list your nursery." }] }),
  component: Signup,
});

function Signup() {
  const nav = useNavigate();
  const [role, setRole] = useState<"customer" | "supplier">("supplier");
  const [form, setForm] = useState({
    name: "", nursery: "", email: "", phone: "", password: "", address: "", city: "", gst: "",
  });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.name) return toast.error("Fill required fields.");
    setUser({ role, email: form.email, name: form.name, nursery: form.nursery || undefined });
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
            <button key={r} onClick={() => setRole(r)}
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
                <div className="grid gap-1.5"><Label htmlFor="gst">GST (optional)</Label><Input id="gst" value={form.gst} onChange={(e) => setForm({ ...form, gst: e.target.value })} /></div>
              </div>
            </>
          )}
          <Button type="submit" className="mt-2 rounded-full">Create account</Button>
          <p className="text-center text-xs text-muted-foreground">Already have one? <Link to="/login" className="underline">Log in</Link></p>
        </form>
      </div>
    </div>
  );
}
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage } from "@/lib/queries";
import { resolveSupplierImage } from "@/lib/images";

export const Route = createFileRoute("/_authenticated/supplier/profile")({ component: Profile });

function Profile() {
  const { supplier, user } = useAuth();
  const [form, setForm] = useState({ name: "", city: "", address: "", hours: "", about: "", image_url: "" as string | null });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supplier) return;
    setForm({ name: supplier.name, city: supplier.city, address: supplier.address, hours: supplier.hours, about: supplier.about, image_url: supplier.image_url });
  }, [supplier]);

  if (!supplier || !user) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("suppliers").update({
      name: form.name, city: form.city, address: form.address, hours: form.hours, about: form.about,
    }).eq("id", supplier.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved.");
  };

  const onFile = async (file: File) => {
    setBusy(true);
    try {
      const url = await uploadImage("supplier-images", user.id, file);
      const { error } = await supabase.from("suppliers").update({ image_url: url }).eq("id", supplier.id);
      if (error) throw error;
      setForm((f) => ({ ...f, image_url: url }));
      toast.success("Image updated.");
    } catch (e: any) { toast.error(e.message ?? "Upload failed"); }
    finally { setBusy(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Nursery profile</h1>
        <p className="text-sm text-muted-foreground">This is how customers see your nursery.</p>
      </div>
      <div className="flex items-center gap-4 rounded-3xl border bg-card p-6 shadow-sm">
        <img src={resolveSupplierImage(form.image_url, supplier.slug)} alt="" className="h-24 w-24 rounded-2xl object-cover" />
        <div>
          <Label htmlFor="pic" className="text-sm font-medium">Profile image</Label>
          <input id="pic" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} className="mt-2 block text-sm" />
        </div>
      </div>
      <form onSubmit={submit} className="grid max-w-2xl gap-4 rounded-3xl border bg-card p-6 shadow-sm">
        <div className="grid gap-1.5"><Label>Nursery name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div className="grid gap-1.5"><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
        <div className="grid gap-1.5"><Label>Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
        <div className="grid gap-1.5"><Label>Opening hours</Label><Input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} /></div>
        <div className="grid gap-1.5"><Label>About</Label><Textarea rows={4} value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} /></div>
        <Button disabled={busy} className="justify-self-start rounded-full">{busy ? "Saving…" : "Save changes"}</Button>
      </form>
    </div>
  );
}

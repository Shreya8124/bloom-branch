import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { fetchHerbsBySupplier, uploadImage } from "@/lib/queries";
import type { Herb } from "@/lib/types";
import { resolveHerbImage } from "@/lib/images";

export const Route = createFileRoute("/_authenticated/supplier/herbs")({ component: MyHerbs });

type HerbForm = {
  id?: string;
  slug: string; name: string; local: string;
  price: number; availability: string; stock: number;
  description: string; image_url: string | null;
};

const blank: HerbForm = { slug: "", name: "", local: "", price: 0, availability: "In stock", stock: 0, description: "", image_url: null };

function slugify(s: string) { return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60); }

function MyHerbs() {
  const { supplier, user } = useAuth();
  const [rows, setRows] = useState<Herb[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<HerbForm>(blank);
  const [busy, setBusy] = useState(false);

  const reload = async () => { if (supplier) setRows(await fetchHerbsBySupplier(supplier.id)); };
  useEffect(() => { reload(); }, [supplier]);
  if (!supplier || !user) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const openNew = () => { setForm({ ...blank }); setOpen(true); };
  const openEdit = (h: Herb) => { setForm({ id: h.id, slug: h.slug, name: h.name, local: h.local ?? "", price: h.price, availability: h.availability, stock: h.stock, description: h.description, image_url: h.image_url }); setOpen(true); };

  const del = async (h: Herb) => {
    if (!confirm(`Delete ${h.name}?`)) return;
    const { error } = await supabase.from("herbs").delete().eq("id", h.id);
    if (error) return toast.error(error.message);
    toast.success("Herb removed."); reload();
  };

  const onFile = async (file: File) => {
    try { const url = await uploadImage("herb-images", user.id, file); setForm((f) => ({ ...f, image_url: url })); toast.success("Image uploaded."); }
    catch (e: any) { toast.error(e.message ?? "Upload failed"); }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name) return toast.error("Name required.");
    const slug = form.slug || slugify(form.name);
    setBusy(true);
    const payload = {
      supplier_id: supplier.id, name: form.name, slug, local: form.local || null,
      price: Number(form.price) || 0, availability: form.availability, stock: Number(form.stock) || 0,
      description: form.description, image_url: form.image_url,
    };
    const { error } = form.id
      ? await supabase.from("herbs").update(payload).eq("id", form.id)
      : await supabase.from("herbs").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(form.id ? "Herb updated." : "Herb added.");
    setOpen(false); reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">My herbs</h1>
          <p className="text-sm text-muted-foreground">Manage your inventory and availability.</p>
        </div>
        <Button className="rounded-full" onClick={openNew}><Plus className="h-4 w-4" /> Add new herb</Button>
      </div>
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">No herbs yet. Add your first one.</TableCell></TableRow>}
            {rows.map((h) => (
              <TableRow key={h.id}>
                <TableCell><img src={resolveHerbImage(h.image_url, h.slug)} alt="" className="h-12 w-12 rounded-xl object-cover" /></TableCell>
                <TableCell className="font-medium">{h.name}</TableCell>
                <TableCell>₹{h.price}</TableCell>
                <TableCell><Badge variant="secondary" className="rounded-full">{h.availability}</Badge></TableCell>
                <TableCell>{h.stock}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(h)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => del(h)}><Trash2 className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{form.id ? "Edit herb" : "Add herb"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-1.5"><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
              <div className="grid gap-1.5"><Label>Local name</Label><Input value={form.local} onChange={(e) => setForm({ ...form, local: e.target.value })} /></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="grid gap-1.5"><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} /></div>
              <div className="grid gap-1.5"><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} /></div>
              <div className="grid gap-1.5"><Label>Availability</Label>
                <Select value={form.availability} onValueChange={(v) => setForm({ ...form, availability: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In stock">In stock</SelectItem>
                    <SelectItem value="Low stock">Low stock</SelectItem>
                    <SelectItem value="Pre-order">Pre-order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-1.5"><Label>Description</Label><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div className="grid gap-1.5">
              <Label>Image</Label>
              <div className="flex items-center gap-3">
                {form.image_url && <img src={form.image_url} alt="" className="h-16 w-16 rounded-xl object-cover" />}
                <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} className="text-sm" />
                {form.image_url && <Button type="button" size="icon" variant="ghost" onClick={() => setForm({ ...form, image_url: null })}><X className="h-4 w-4" /></Button>}
              </div>
            </div>
            <Button type="submit" disabled={busy} className="mt-2 rounded-full">{busy ? "Saving…" : (form.id ? "Save changes" : "Add herb")}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

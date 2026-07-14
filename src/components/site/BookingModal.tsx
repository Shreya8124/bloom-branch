import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { nurseries, type Herb } from "@/data/mock";
import { CheckCircle2 } from "lucide-react";

const SLOTS = ["09:00 AM","10:30 AM","12:00 PM","02:00 PM","04:30 PM","06:00 PM"];

export function BookingModal({ herb, open, onOpenChange }: { herb: Herb; open: boolean; onOpenChange: (o: boolean) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    nurseryId: herb.nurseryId,
    date: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    slot: SLOTS[0], notes: "",
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast.error("Please fill in name, phone and email.");
      return;
    }
    setSubmitted(true);
    toast.success("Pickup reserved! Confirmation sent.");
  };

  const close = (o: boolean) => {
    onOpenChange(o);
    if (!o) setTimeout(() => setSubmitted(false), 300);
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-lg">
        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-semibold">You're all set!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your <b>{herb.name}</b> is reserved for <b>{form.date}</b> at <b>{form.slot}</b>.
            </p>
            <p className="mt-4 rounded-2xl bg-secondary p-3 text-xs text-muted-foreground">
              No online payment required. Please pay directly at the nursery.
            </p>
            <Button className="mt-6 w-full rounded-full" onClick={() => close(false)}>Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Book pickup — {herb.name}</DialogTitle>
              <DialogDescription>Reserve your plant. Pay at the nursery when you collect.</DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="grid gap-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="grid gap-1.5">
                <Label>Nursery</Label>
                <Select value={form.nurseryId} onValueChange={(v) => setForm({ ...form, nurseryId: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{nurseries.map((n) => <SelectItem key={n.id} value={n.id}>{n.name} — {n.city}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </div>
                <div className="grid gap-1.5">
                  <Label>Time slot</Label>
                  <Select value={form.slot} onValueChange={(v) => setForm({ ...form, slot: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{SLOTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea id="notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
              </div>
              <Button type="submit" className="mt-2 w-full rounded-full">Confirm Pickup</Button>
              <p className="text-center text-[11px] text-muted-foreground">No online payment required. Please pay directly at the nursery.</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
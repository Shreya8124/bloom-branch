import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { fetchBookingsForSupplier } from "@/lib/queries";
import type { Booking } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/supplier/bookings")({ component: Bookings });

function Bookings() {
  const { supplier } = useAuth();
  const [rows, setRows] = useState<Booking[]>([]);
  const reload = async () => { if (supplier) setRows(await fetchBookingsForSupplier(supplier.id)); };
  useEffect(() => { reload(); }, [supplier]);
  if (!supplier) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const update = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Booking ${status.toLowerCase()}.`); reload();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Bookings</h1>
        <p className="text-sm text-muted-foreground">Accept, complete, or cancel customer pickup reservations.</p>
      </div>
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Plant</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && <TableRow><TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">No bookings yet.</TableCell></TableRow>}
            {rows.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.customer_name}</TableCell>
                <TableCell>{b.herb_name}</TableCell>
                <TableCell>{b.date} · {b.slot}</TableCell>
                <TableCell className="text-muted-foreground">{b.phone}</TableCell>
                <TableCell>
                  <Badge className="rounded-full" variant={b.status === "Completed" ? "default" : b.status === "Cancelled" ? "destructive" : "secondary"}>{b.status}</Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => update(b.id, "Accepted")}>Accept</Button>
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => update(b.id, "Completed")}>Complete</Button>
                  <Button size="sm" variant="ghost" className="rounded-full" onClick={() => update(b.id, "Cancelled")}>Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

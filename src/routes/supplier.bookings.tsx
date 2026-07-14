import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bookings as seed, type Booking } from "@/data/mock";

export const Route = createFileRoute("/supplier/bookings")({ component: Bookings });

function Bookings() {
  const [rows, setRows] = useState<Booking[]>(seed);
  const update = (id: string, status: Booking["status"]) => {
    setRows((r) => r.map((b) => (b.id === id ? { ...b, status } : b)));
    toast.success(`Booking ${status.toLowerCase()}.`);
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
            {rows.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.customer}</TableCell>
                <TableCell>{b.herb}</TableCell>
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
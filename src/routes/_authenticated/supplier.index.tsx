import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf, CalendarCheck, Clock, Package } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { fetchBookingsForSupplier, fetchHerbsBySupplier } from "@/lib/queries";
import type { Booking, Herb } from "@/lib/types";

export const Route = createFileRoute("/_authenticated/supplier/")({
  component: Dashboard,
});

function Dashboard() {
  const { supplier } = useAuth();
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    if (!supplier) return;
    fetchHerbsBySupplier(supplier.id).then(setHerbs).catch(() => {});
    fetchBookingsForSupplier(supplier.id).then(setBookings).catch(() => {});
  }, [supplier]);

  if (!supplier) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const today = new Date().toISOString().slice(0, 10);
  const stats = [
    { icon: Leaf, label: "Total herbs", value: herbs.length },
    { icon: CalendarCheck, label: "Today's bookings", value: bookings.filter((b) => b.date === today).length },
    { icon: Clock, label: "Upcoming pickups", value: bookings.filter((b) => b.date >= today && b.status !== "Cancelled").length },
    { icon: Package, label: "Inventory in stock", value: herbs.filter((h) => h.availability === "In stock").length },
  ];
  const upcoming = bookings.filter((b) => b.date >= today).slice(0, 6);
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl border bg-card p-5 shadow-sm">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary"><s.icon className="h-5 w-5" /></span>
            <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-3xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border bg-card p-6 shadow-sm">
        <h2 className="font-display text-xl font-semibold">Upcoming pickups</h2>
        <div className="mt-4 divide-y">
          {upcoming.length === 0 && <p className="py-4 text-sm text-muted-foreground">No upcoming bookings yet.</p>}
          {upcoming.map((b) => (
            <div key={b.id} className="flex items-center justify-between py-3 text-sm">
              <div>
                <p className="font-medium">{b.customer_name}</p>
                <p className="text-xs text-muted-foreground">{b.herb_name} · {b.date} · {b.slot}</p>
              </div>
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{b.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

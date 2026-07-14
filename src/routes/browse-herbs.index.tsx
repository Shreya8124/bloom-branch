import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HerbCard } from "@/components/site/HerbCard";
import { fetchHerbs, fetchSuppliers } from "@/lib/queries";
import type { Herb, Supplier } from "@/lib/types";

export const Route = createFileRoute("/browse-herbs/")({
  head: () => ({
    meta: [
      { title: "Browse Herbs — KitchenBloom" },
      { name: "description", content: "Explore kitchen herb plants from trusted local nurseries. Search, filter and reserve your pickup." },
      { property: "og:title", content: "Browse Herbs — KitchenBloom" },
      { property: "og:description", content: "Search kitchen herbs by nursery, city and availability." },
    ],
  }),
  component: BrowseHerbs,
});

function BrowseHerbs() {
  const [q, setQ] = useState("");
  const [availability, setAvailability] = useState("all");
  const [nursery, setNursery] = useState("all");
  const [city, setCity] = useState("all");
  const [herbs, setHerbs] = useState<Herb[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  useEffect(() => {
    Promise.all([fetchHerbs(), fetchSuppliers()]).then(([h, s]) => { setHerbs(h); setSuppliers(s); });
  }, []);

  const supplierById = useMemo(() => new Map(suppliers.map((s) => [s.id, s])), [suppliers]);
  const cities = useMemo(() => Array.from(new Set(suppliers.map((n) => n.city).filter(Boolean))).sort(), [suppliers]);

  const filtered = useMemo(() => herbs.filter((h) => {
    if (q && !`${h.name} ${h.local ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (availability !== "all" && h.availability !== availability) return false;
    if (nursery !== "all" && h.supplier_id !== nursery) return false;
    if (city !== "all") {
      const n = supplierById.get(h.supplier_id);
      if (n?.city !== city) return false;
    }
    return true;
  }), [herbs, supplierById, q, availability, nursery, city]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Browse</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">Every herb, every nursery.</h1>
        <p className="mt-3 text-muted-foreground">Search across our partner nurseries and reserve pickup in seconds.</p>
      </div>

      <div className="sticky top-16 z-30 mb-8 grid gap-3 rounded-3xl border bg-background/85 p-4 shadow-sm backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Tulsi, Mint…" className="pl-9 rounded-full" />
        </div>
        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger className="rounded-full"><SelectValue placeholder="Availability" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All availability</SelectItem>
            <SelectItem value="In stock">In stock</SelectItem>
            <SelectItem value="Low stock">Low stock</SelectItem>
            <SelectItem value="Pre-order">Pre-order</SelectItem>
          </SelectContent>
        </Select>
        <Select value={nursery} onValueChange={setNursery}>
          <SelectTrigger className="rounded-full"><SelectValue placeholder="Nursery" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All nurseries</SelectItem>
            {suppliers.map((n) => <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="rounded-full"><SelectValue placeholder="City" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border bg-card p-16 text-center text-muted-foreground">No herbs match your filters. Try broadening your search.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((h, i) => <HerbCard key={h.id} herb={h} supplier={supplierById.get(h.supplier_id)} index={i} />)}
        </div>
      )}
    </div>
  );
}

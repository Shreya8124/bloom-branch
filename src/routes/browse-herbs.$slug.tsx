import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Droplet, MapPin, Scissors, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/site/BookingModal";
import { fetchHerbBySlug, fetchSuppliers } from "@/lib/queries";
import { resolveHerbImage } from "@/lib/images";
import type { Herb, Supplier } from "@/lib/types";

export const Route = createFileRoute("/browse-herbs/$slug")({
  loader: async ({ params }) => {
    const herb = await fetchHerbBySlug(params.slug);
    if (!herb) throw notFound();
    return { herb };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.herb.name} — KitchenBloom` },
      { name: "description", content: loaderData.herb.description },
      { property: "og:title", content: `${loaderData.herb.name} — KitchenBloom` },
      { property: "og:description", content: loaderData.herb.description },
      ...(loaderData.herb.image_url ? [{ property: "og:image", content: loaderData.herb.image_url }] : []),
    ] : [{ title: "Herb — KitchenBloom" }],
  }),
  component: HerbDetail,
  errorComponent: ({ error }) => <div className="p-8 text-center text-muted-foreground">Couldn't load herb: {error.message}</div>,
  notFoundComponent: () => <div className="p-16 text-center text-muted-foreground">Herb not found.</div>,
});

function HerbDetail() {
  const { herb } = Route.useLoaderData() as { herb: Herb };
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  useEffect(() => { fetchSuppliers().then(setSuppliers).catch(() => {}); }, []);
  const nursery = suppliers.find((s) => s.id === herb.supplier_id);

  const care = herb.care ?? {};

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/browse-herbs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All herbs
      </Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-[2.5rem] bg-secondary">
          <img src={resolveHerbImage(herb.image_url, herb.slug)} alt={herb.name} className="h-full w-full object-cover" />
        </motion.div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">{herb.availability}</Badge>
            {herb.pickup && <Badge className="rounded-full">Pickup available</Badge>}
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold">{herb.name}</h1>
          {herb.local && <p className="mt-1 text-lg text-muted-foreground">{herb.local}</p>}
          <p className="mt-4 text-muted-foreground">{herb.description}</p>
          <p className="mt-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Available at Partner Nursery
          </p>
          {nursery && (
            <div className="mt-6 rounded-2xl border bg-card p-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Grown at</p>
              <p className="mt-1 font-display text-lg font-semibold">{nursery.name}</p>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {nursery.city}</p>
            </div>
          )}
          <Button onClick={() => setOpen(true)} size="lg" className="mt-6 rounded-full">Book pickup</Button>
        </div>
      </div>

      {(care.sunlight || care.watering || care.harvest || care.timeline) && (
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {care.sunlight && <div className="rounded-3xl border bg-card p-5"><Sun className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Sunlight</p><p className="mt-1 font-medium">{care.sunlight}</p></div>}
          {care.watering && <div className="rounded-3xl border bg-card p-5"><Droplet className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Watering</p><p className="mt-1 font-medium">{care.watering}</p></div>}
          {care.harvest && <div className="rounded-3xl border bg-card p-5"><Scissors className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Harvest</p><p className="mt-1 font-medium">{care.harvest}</p></div>}
          {care.timeline && <div className="rounded-3xl border bg-card p-5"><Clock className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Timeline</p><p className="mt-1 font-medium">{care.timeline}</p></div>}
        </div>
      )}

      {(herb.benefits.length > 0 || herb.cooking.length > 0) && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {herb.benefits.length > 0 && (
            <div className="rounded-3xl border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">Benefits</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{herb.benefits.map((b) => <li key={b}>• {b}</li>)}</ul>
            </div>
          )}
          {herb.cooking.length > 0 && (
            <div className="rounded-3xl border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">In the kitchen</h3>
              <ul className="mt-3 space-y-1 text-sm text-muted-foreground">{herb.cooking.map((c) => <li key={c}>• {c}</li>)}</ul>
            </div>
          )}
        </div>
      )}

      <BookingModal herb={herb} open={open} onOpenChange={setOpen} />
    </div>
  );
}

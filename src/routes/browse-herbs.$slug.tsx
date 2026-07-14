import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Droplet, MapPin, Scissors, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHerb, getNursery, nurseries } from "@/data/mock";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/browse-herbs/$slug")({
  loader: ({ params }) => {
    const herb = getHerb(params.slug);
    if (!herb) throw notFound();
    return { herb };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.herb.name} — KitchenBloom` },
      { name: "description", content: loaderData.herb.description },
      { property: "og:title", content: `${loaderData.herb.name} — KitchenBloom` },
      { property: "og:description", content: loaderData.herb.description },
      { property: "og:image", content: loaderData.herb.image },
    ] : [{ title: "Herb — KitchenBloom" }],
  }),
  component: HerbDetail,
});

function HerbDetail() {
  const { herb } = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const nursery = getNursery(herb.nurseryId);
  const availableAt = nurseries.filter((n) => n.herbs.includes(herb.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/browse-herbs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All herbs
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-[2.5rem] bg-secondary">
          <img src={herb.image} alt={herb.name} className="h-full w-full object-cover" />
        </motion.div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">{herb.availability}</Badge>
            {herb.pickup && <Badge className="rounded-full">Pickup available</Badge>}
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold">{herb.name}</h1>
          {herb.local && <p className="mt-1 text-lg text-muted-foreground">{herb.local}</p>}
          <p className="mt-4 text-muted-foreground">{herb.description}</p>
          <p className="mt-6 font-display text-4xl font-semibold text-primary">₹{herb.price}</p>
          <div className="mt-6 rounded-2xl border bg-card p-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Sold at</p>
            <p className="mt-1 flex items-center gap-2 font-medium"><MapPin className="h-4 w-4 text-primary" /> {nursery?.name} · {nursery?.city}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full" onClick={() => setOpen(true)}>Book Pickup</Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link to="/nurseries">See nurseries</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-display text-xl font-semibold">Benefits</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {herb.benefits.map((b: string) => <li key={b} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {b}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-display text-xl font-semibold">Cooking uses</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {herb.cooking.map((b: string) => <li key={b} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {b}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-display text-xl font-semibold">Growth timeline</h3>
          <p className="mt-3 text-sm text-muted-foreground">{herb.care.timeline}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-4">
        {[
          { icon: Sun, label: "Sunlight", value: herb.care.sunlight },
          { icon: Droplet, label: "Watering", value: herb.care.watering },
          { icon: Scissors, label: "Harvest", value: herb.care.harvest },
          { icon: Clock, label: "First growth", value: herb.care.timeline.split("·")[0].trim() },
        ].map((c) => (
          <div key={c.label} className="rounded-3xl border bg-secondary/40 p-5">
            <c.icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
            <p className="mt-1 text-sm font-medium">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl font-semibold">Available nurseries</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableAt.length === 0 ? (
            <p className="text-muted-foreground">Currently at {nursery?.name}. More coming soon.</p>
          ) : availableAt.map((n) => (
            <div key={n.id} className="rounded-3xl border bg-card p-5">
              <p className="font-display text-lg font-semibold">{n.name}</p>
              <p className="text-sm text-muted-foreground">{n.city} · {n.hours}</p>
              <p className="mt-3 text-xs text-muted-foreground">{n.address}</p>
            </div>
          ))}
        </div>
      </div>

      <BookingModal herb={herb} open={open} onOpenChange={setOpen} />
    </div>
  );
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplet, Sun, Scissors, Sprout } from "lucide-react";
import { herbs } from "@/data/mock";

export const Route = createFileRoute("/plant-care")({
  head: () => ({
    meta: [
      { title: "Plant Care — KitchenBloom" },
      { name: "description", content: "Watering, sunlight, harvest and grower tips for every kitchen herb on KitchenBloom." },
      { property: "og:title", content: "Plant Care — KitchenBloom" },
      { property: "og:description", content: "Care guides for basil, mint, tulsi, rosemary and more." },
    ],
  }),
  component: PlantCare,
});

function PlantCare() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Plant care</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">Grow like you've done it forever.</h1>
        <p className="mt-3 text-muted-foreground">A short, friendly care guide for every herb we stock.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {herbs.map((h) => (
          <Link key={h.slug} to="/browse-herbs/$slug" params={{ slug: h.slug }}
            className="group grid grid-cols-[120px_1fr] gap-5 rounded-3xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg">
            <div className="aspect-square overflow-hidden rounded-2xl bg-secondary">
              <img src={h.image} alt={h.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-xl font-semibold">{h.name}</h3>
              {h.local && <p className="text-xs text-muted-foreground">{h.local}</p>}
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><Sun className="h-4 w-4 text-primary" /> {h.care.sunlight}</li>
                <li className="flex items-center gap-2"><Droplet className="h-4 w-4 text-primary" /> {h.care.watering}</li>
                <li className="flex items-center gap-2"><Scissors className="h-4 w-4 text-primary" /> Harvest in {h.care.harvest}</li>
                <li className="flex items-center gap-2"><Sprout className="h-4 w-4 text-primary" /> {h.care.timeline}</li>
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
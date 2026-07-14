import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nurseries, herbs } from "@/data/mock";

export const Route = createFileRoute("/nurseries")({
  head: () => ({
    meta: [
      { title: "Our Nurseries — KitchenBloom" },
      { name: "description", content: "Meet the trusted local nurseries growing kitchen herbs in your city." },
      { property: "og:title", content: "Our Nurseries — KitchenBloom" },
      { property: "og:description", content: "Explore partner nurseries across India stocking fresh kitchen herbs." },
    ],
  }),
  component: NurseriesPage,
});

function NurseriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Directory</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">Our nurseries.</h1>
        <p className="mt-3 text-muted-foreground">Every plant on KitchenBloom is grown by a real, local nursery. Say hi.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nurseries.map((n) => {
          const nherbs = herbs.filter((h) => n.herbs.includes(h.slug));
          return (
            <article key={n.id} className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={n.image} alt={n.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold">{n.name}</h3>
                  <span className="flex shrink-0 items-center gap-1 text-sm text-primary">
                    <Star className="h-4 w-4 fill-current" /> {n.rating}
                  </span>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {n.city}</p>
                <p className="text-sm text-muted-foreground">{n.about}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {nherbs.slice(0, 4).map((h) => (
                    <span key={h.slug} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{h.name}</span>
                  ))}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Open {n.hours}</p>
                <Button asChild variant="secondary" className="mt-auto rounded-full">
                  <Link to="/browse-herbs">View herbs</Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
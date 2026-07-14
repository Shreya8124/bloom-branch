import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Sprout, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — KitchenBloom" },
      { name: "description", content: "Our mission is to help every household grow fresh herbs, while helping local nurseries grow their business." },
      { property: "og:title", content: "About KitchenBloom" },
      { property: "og:description", content: "Learn how KitchenBloom connects home cooks with local nurseries." },
    ],
  }),
  component: About,
});

const stats = [
  { value: "500+", label: "Plants listed" },
  { value: "100+", label: "Partner nurseries" },
  { value: "2,000+", label: "Happy gardeners" },
  { value: "10+", label: "Cities" },
];

function About() {
  return (
    <>
      <section className="bloom-gradient">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">About</p>
          <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl">Fresh herbs, everywhere they belong.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            We connect people who love cooking with the local nursery owners who nurture their plants every day.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3">
        {[
          { icon: Sprout, title: "Mission", body: "Help every household grow fresh herbs while helping local nurseries grow their business." },
          { icon: Leaf, title: "Vision", body: "A world where every kitchen has living herbs — and every neighborhood nursery thrives." },
          { icon: Users, title: "Impact", body: "Thousands of home cooks starting their first herb garden; hundreds of nurseries reaching new families." },
        ].map((b) => (
          <div key={b.title} className="rounded-3xl border bg-card p-6 shadow-sm">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><b.icon className="h-5 w-5" /></span>
            <h3 className="mt-4 font-display text-xl font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 rounded-[2.5rem] border bg-secondary/40 p-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-semibold text-primary">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
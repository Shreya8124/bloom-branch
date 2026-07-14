import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sprout, TrendingUp, Users, Wallet, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/become-a-supplier")({
  head: () => ({
    meta: [
      { title: "Become a Supplier — KitchenBloom" },
      { name: "description", content: "List your nursery on KitchenBloom. Reach new customers, accept reservations, and pay zero commission on plant sales." },
      { property: "og:title", content: "Become a Supplier — KitchenBloom" },
      { property: "og:description", content: "Grow your nursery with KitchenBloom. Free to join." },
    ],
  }),
  component: Supplier,
});

function Supplier() {
  return (
    <>
      <section className="bloom-gradient">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">For nurseries</p>
          <h1 className="mt-3 font-display text-5xl font-semibold sm:text-6xl">Your nursery, online in 3 minutes.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            List herbs, accept reservations, and grow your customer base. Zero commission on plant sales.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full"><Link to="/signup">Get started <ArrowRight className="h-4 w-4" /></Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full"><Link to="/login">Supplier login</Link></Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-4">
        {[
          { icon: Users, title: "New customers", body: "Reach families searching for herbs in your area." },
          { icon: Wallet, title: "Zero commission", body: "Keep 100% of what customers pay for plants." },
          { icon: TrendingUp, title: "Real visibility", body: "Your inventory shows up on Google-friendly listings." },
          { icon: Sprout, title: "Easy to manage", body: "A clean dashboard for herbs, bookings, and profile." },
        ].map((b) => (
          <div key={b.title} className="rounded-3xl border bg-card p-6 shadow-sm">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><b.icon className="h-5 w-5" /></span>
            <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
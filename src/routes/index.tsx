import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Heart, MapPin, Sprout, ShoppingBag, Search, Package, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HerbCard } from "@/components/site/HerbCard";
import heroImg from "@/assets/hero-herbs.jpg";
import flatlay from "@/assets/herbs-flatlay.jpg";
import { herbs, growers } from "@/data/mock";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bloom-gradient">
        <img src={heroImg} alt="" aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-2/3 object-cover opacity-90 md:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Leaf className="h-3.5 w-3.5 text-primary" /> Kitchen herbs, from local growers
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Fresh herbs.<br /> Every day.<br />
              <span className="text-primary">Zero effort.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Find kitchen herb plants at trusted nearby nurseries, reserve your pickup slot,
              and grow fresh ingredients right from your home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/browse-herbs">Browse Herbs <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/become-a-supplier">Become a Supplier</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> 100+ nurseries</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> 500+ herbs listed</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Pay at pickup</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why KitchenBloom */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Why KitchenBloom</p>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">A kinder way to buy fresh herbs.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, title: "Find nearby nurseries", desc: "Discover trusted local growers stocking the herbs you cook with every day." },
            { icon: Calendar, title: "Schedule pickup", desc: "Reserve a time slot in seconds. No online payments, no delivery fees." },
            { icon: Sprout, title: "Learn plant care", desc: "Step-by-step guides so every herb thrives on your kitchen windowsill." },
            { icon: Heart, title: "Support local nurseries", desc: "Every reservation helps a small nursery grow — with zero commission on plants." },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-3xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Herbs */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Featured</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Herbs your kitchen will love.</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/browse-herbs">See all herbs <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {herbs.slice(0, 8).map((h, i) => <HerbCard key={h.slug} herb={h} index={i} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">How it works</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">From search to windowsill in 5 steps.</h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-5">
            {[
              { icon: Search, t: "Search herbs" },
              { icon: MapPin, t: "Choose nursery" },
              { icon: Calendar, t: "Book pickup" },
              { icon: ShoppingBag, t: "Collect plant" },
              { icon: Sprout, t: "Grow fresh herbs" },
            ].map((s, i) => (
              <li key={s.t} className="relative rounded-3xl border bg-card p-6 shadow-sm">
                <span className="absolute right-4 top-4 font-display text-3xl font-semibold text-primary/30">{String(i+1).padStart(2,"0")}</span>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><s.icon className="h-5 w-5" /></span>
                <p className="mt-4 font-display text-lg font-semibold">{s.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Founder story */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-2 md:items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem]">
          <img src={flatlay} alt="Assorted potted herbs" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute -bottom-4 -right-4 hidden rounded-3xl border bg-card/90 p-4 shadow-lg backdrop-blur sm:block">
            <p className="font-display text-2xl font-semibold">2,000+</p>
            <p className="text-xs text-muted-foreground">home gardeners started</p>
          </div>
        </motion.div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Our story</p>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Why we started KitchenBloom.</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>KitchenBloom began with a simple observation. Every week, households purchased fresh herbs only to watch them wilt within days. Frequent trips to markets became inconvenient, while many people wanted to grow herbs but didn't know where to begin.</p>
            <p>During conversations with local nursery owners, we discovered another challenge. They stocked healthy herb plants but had almost no online visibility. Customers rarely knew what was available, and nurseries relied entirely on walk-in traffic.</p>
            <p>We realized one digital platform could solve both problems. KitchenBloom was built to connect people who love cooking with local nursery owners who nurture these plants every day.</p>
            <p className="rounded-2xl border bg-secondary/50 p-4 text-foreground">
              <b>Our mission:</b> Help every household grow fresh herbs, while helping local nurseries grow their business.
            </p>
          </div>
        </div>
      </section>

      {/* Meet growers */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Meet our growers</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">The people behind every plant.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {growers.map((g, i) => (
              <motion.figure key={g.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="grid gap-5 rounded-3xl border bg-card p-6 shadow-sm md:grid-cols-[140px_1fr] md:items-center">
                <div className="h-32 w-32 overflow-hidden rounded-2xl md:h-full md:w-full">
                  <img src={g.image} alt={g.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div>
                  <blockquote className="text-sm leading-relaxed text-muted-foreground">"{g.quote}"</blockquote>
                  <figcaption className="mt-4">
                    <p className="font-display font-semibold">{g.name}</p>
                    <p className="text-xs text-muted-foreground">{g.role} · {g.nursery} · {g.city}</p>
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-primary-foreground sm:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <Package className="mb-6 h-8 w-8" />
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">Bring your nursery online in 3 minutes.</h2>
            <p className="mt-4 text-primary-foreground/85">List your herbs, accept reservations, and grow your customer base — with zero commission on plant sales.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/become-a-supplier">Become a Supplier</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <Link to="/login">Supplier Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

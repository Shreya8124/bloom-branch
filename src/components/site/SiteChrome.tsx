import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, Sprout, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Chatbot } from "./Chatbot";
import { useUser, setUser, useHydrated } from "@/lib/auth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/browse-herbs", label: "Browse Herbs" },
  { to: "/nurseries", label: "Our Nurseries" },
  { to: "/plant-care", label: "Plant Care" },
  { to: "/about", label: "About" },
  { to: "/become-a-supplier", label: "Become a Supplier" },
];

function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("kb_theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("kb_theme", next ? "dark" : "light");
  };
  return { dark, toggle };
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
        <Sprout className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        KitchenBloom
      </span>
    </Link>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useDarkMode();
  const user = useUser();
  const hydrated = useHydrated();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all",
      scrolled ? "glass-card border-b" : "bg-background/60 backdrop-blur-md",
    )}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={toggle} className="hidden h-9 w-9 place-items-center rounded-full hover:bg-secondary md:grid">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {hydrated && user ? (
            <>
              <Link to={user.role === "supplier" ? "/supplier" : "/"} className="hidden text-sm font-medium md:inline-block">
                Hi, {user.name.split(" ")[0]}
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setUser(null)} className="hidden md:inline-flex">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden text-sm font-medium hover:underline md:inline-block">Login</Link>
              <Button asChild size="sm" className="hidden md:inline-flex rounded-full">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          <button
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="rounded-lg px-3 py-2 text-sm hover:bg-secondary">{n.label}</Link>
            ))}
            <div className="mt-2 flex gap-2">
              {hydrated && user ? (
                <Button variant="outline" className="flex-1" onClick={() => setUser(null)}>Logout</Button>
              ) : (
                <>
                  <Button variant="outline" asChild className="flex-1"><Link to="/login">Login</Link></Button>
                  <Button asChild className="flex-1"><Link to="/signup">Sign Up</Link></Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            KitchenBloom connects home cooks with trusted local nurseries — so fresh herbs
            live in your kitchen, not in a wilted bag.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/browse-herbs" className="hover:text-foreground">Browse Herbs</Link></li>
            <li><Link to="/nurseries" className="hover:text-foreground">Our Nurseries</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/faqs" className="hover:text-foreground">FAQs</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
            <li><Link to="/become-a-supplier" className="hover:text-foreground">Become a Supplier</Link></li>
          </ul>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground">Ig</a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground">Tw</a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground">Fb</a>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} KitchenBloom. Grown with care.</p>
          <p>Made for home cooks and local growers.</p>
        </div>
      </div>
    </footer>
  );
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inSupplier = pathname.startsWith("/supplier") && pathname !== "/supplier/signup";
  return (
    <div className="flex min-h-screen flex-col">
      {!inSupplier && <Navbar />}
      <main className="flex-1">{children}</main>
      {!inSupplier && <Footer />}
      {!inSupplier && <Chatbot />}
    </div>
  );
}
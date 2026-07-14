import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LayoutDashboard, Leaf, CalendarCheck, User, LogOut, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth, signOut } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/supplier")({
  head: () => ({ meta: [{ title: "Supplier Dashboard — KitchenBloom" }, { name: "robots", content: "noindex" }] }),
  component: SupplierLayout,
});

const items = [
  { to: "/supplier", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/supplier/herbs", label: "My Herbs", icon: Leaf },
  { to: "/supplier/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/supplier/profile", label: "Profile", icon: User },
];

function SupplierLayout() {
  const nav = useNavigate();
  const { supplier, loading } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (!loading && !supplier) {
      // Not a supplier account — send home
      nav({ to: "/" });
    }
  }, [loading, supplier, nav]);

  return (
    <div className="grid min-h-screen bg-secondary/30 md:grid-cols-[260px_1fr]">
      <aside className="hidden border-r bg-sidebar text-sidebar-foreground md:flex md:flex-col">
        <Link to="/" className="flex items-center gap-2 border-b p-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Sprout className="h-5 w-5" /></span>
          <span className="font-display text-lg font-semibold">KitchenBloom</span>
        </Link>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((i) => {
            const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
            return (
              <Link key={i.to} to={i.to as "/supplier"} className={cn("flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground")}>
                <i.icon className="h-4 w-4" /> {i.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={async () => { await signOut(); nav({ to: "/" }); }} className="m-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </aside>
      <div>
        <header className="flex items-center justify-between border-b bg-background/80 px-6 py-4 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Supplier</p>
            <p className="font-display text-lg font-semibold">{supplier?.name ?? "Your Nursery"}</p>
          </div>
          <nav className="flex gap-1 md:hidden">
            {items.map((i) => (
              <Link key={i.to} to={i.to as "/supplier"} className="rounded-full p-2 hover:bg-secondary"><i.icon className="h-4 w-4" /></Link>
            ))}
          </nav>
        </header>
        <div className="p-6"><Outlet /></div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { fetchSupplierByUserId } from "./queries";
import type { Supplier } from "./types";

export type AuthState = {
  loading: boolean;
  user: User | null;
  session: Session | null;
  supplier: Supplier | null;
};

export function useAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ loading: true, user: null, session: null, supplier: null });

  useEffect(() => {
    let alive = true;
    async function load(session: Session | null) {
      if (!alive) return;
      const user = session?.user ?? null;
      let supplier: Supplier | null = null;
      if (user) {
        try { supplier = await fetchSupplierByUserId(user.id); } catch { supplier = null; }
      }
      if (!alive) return;
      setState({ loading: false, user, session, supplier });
    }
    supabase.auth.getSession().then(({ data }) => load(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => { load(session); });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  return state;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}

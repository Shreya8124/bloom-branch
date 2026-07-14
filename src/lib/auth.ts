import { useEffect, useState } from "react";

const KEY = "kb_auth";

export type StoredUser = {
  role: "customer" | "supplier";
  email: string;
  name: string;
  nursery?: string;
};

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}

export function setUser(u: StoredUser | null) {
  if (typeof window === "undefined") return;
  if (u) localStorage.setItem(KEY, JSON.stringify(u));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("kb-auth"));
}

export function useUser(): StoredUser | null {
  const [u, setU] = useState<StoredUser | null>(null);
  useEffect(() => {
    setU(getUser());
    const h = () => setU(getUser());
    window.addEventListener("kb-auth", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("kb-auth", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return u;
}

export function useHydrated() {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
}
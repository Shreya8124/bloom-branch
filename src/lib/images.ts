import basil from "@/assets/herb-basil.jpg";
import mint from "@/assets/herb-mint.jpg";
import tulsi from "@/assets/herb-tulsi.jpg";
import coriander from "@/assets/herb-coriander.jpg";
import curry from "@/assets/herb-curry.jpg";
import fenugreek from "@/assets/herb-fenugreek.jpg";
import rosemary from "@/assets/herb-rosemary.jpg";
import thyme from "@/assets/herb-thyme.jpg";
import oregano from "@/assets/herb-oregano.jpg";
import lemongrass from "@/assets/herb-lemongrass.jpg";
import nursery1 from "@/assets/nursery-1.jpg";
import nursery2 from "@/assets/nursery-2.jpg";
import nursery3 from "@/assets/nursery-3.jpg";
import nursery4 from "@/assets/nursery-4.jpg";
import nursery5 from "@/assets/nursery-5.jpg";
import nursery6 from "@/assets/nursery-6.jpg";
import fallbackHerb from "@/assets/herbs-flatlay.jpg";

const HERB_FALLBACK: Record<string, string> = {
  basil, mint, tulsi, coriander, "curry-leaves": curry, fenugreek, rosemary, thyme, oregano, lemongrass,
};

const SUPPLIER_FALLBACK: Record<string, string> = {
  "green-roots": nursery1,
  "urban-greens": nursery2,
  "naturenest": nursery3,
  "leaf-life": nursery4,
  "sunleaf": nursery5,
  "kitchen-grove": nursery6,
};

export function resolveHerbImage(url: string | null | undefined, slug?: string | null) {
  if (url && url.length > 0) return url;
  if (slug && HERB_FALLBACK[slug]) return HERB_FALLBACK[slug];
  return fallbackHerb;
}

export function resolveSupplierImage(url: string | null | undefined, slug?: string | null) {
  if (url && url.length > 0) return url;
  if (slug && SUPPLIER_FALLBACK[slug]) return SUPPLIER_FALLBACK[slug];
  return nursery1;
}
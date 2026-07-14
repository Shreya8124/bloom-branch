export type Supplier = {
  id: string;
  user_id: string | null;
  slug: string | null;
  name: string;
  city: string;
  address: string;
  hours: string;
  about: string;
  rating: number;
  image_url: string | null;
};

export type HerbCare = {
  sunlight?: string;
  watering?: string;
  harvest?: string;
  mistakes?: string[];
  timeline?: string;
  tips?: string[];
};

export type Herb = {
  id: string;
  supplier_id: string;
  slug: string;
  name: string;
  local: string | null;
  image_url: string | null;
  price: number;
  availability: string;
  pickup: boolean;
  description: string;
  benefits: string[];
  cooking: string[];
  care: HerbCare;
  stock: number;
};

export type Booking = {
  id: string;
  customer_id: string | null;
  supplier_id: string;
  herb_id: string | null;
  customer_name: string;
  phone: string;
  email: string | null;
  herb_name: string;
  date: string;
  slot: string;
  notes: string | null;
  status: string;
  created_at: string;
};

-- Suppliers (nurseries)
CREATE TABLE public.suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  slug text UNIQUE,
  name text NOT NULL,
  city text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  hours text NOT NULL DEFAULT '',
  about text NOT NULL DEFAULT '',
  rating numeric NOT NULL DEFAULT 4.7,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.suppliers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.suppliers TO authenticated;
GRANT ALL ON public.suppliers TO service_role;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Suppliers are viewable by everyone" ON public.suppliers FOR SELECT USING (true);
CREATE POLICY "Suppliers insert own row" ON public.suppliers FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Suppliers update own row" ON public.suppliers FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Suppliers delete own row" ON public.suppliers FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Herbs
CREATE TABLE public.herbs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id uuid NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  slug text NOT NULL,
  name text NOT NULL,
  local text,
  image_url text,
  price numeric NOT NULL DEFAULT 0,
  availability text NOT NULL DEFAULT 'In stock',
  pickup boolean NOT NULL DEFAULT true,
  description text NOT NULL DEFAULT '',
  benefits text[] NOT NULL DEFAULT '{}',
  cooking text[] NOT NULL DEFAULT '{}',
  care jsonb NOT NULL DEFAULT '{}'::jsonb,
  stock int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (supplier_id, slug)
);
CREATE INDEX herbs_supplier_id_idx ON public.herbs(supplier_id);
CREATE INDEX herbs_slug_idx ON public.herbs(slug);
GRANT SELECT ON public.herbs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.herbs TO authenticated;
GRANT ALL ON public.herbs TO service_role;
ALTER TABLE public.herbs ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_supplier_owner(_supplier_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.suppliers s WHERE s.id = _supplier_id AND s.user_id = auth.uid())
$$;

CREATE POLICY "Herbs viewable by everyone" ON public.herbs FOR SELECT USING (true);
CREATE POLICY "Suppliers manage own herbs insert" ON public.herbs FOR INSERT TO authenticated WITH CHECK (public.is_supplier_owner(supplier_id));
CREATE POLICY "Suppliers manage own herbs update" ON public.herbs FOR UPDATE TO authenticated USING (public.is_supplier_owner(supplier_id)) WITH CHECK (public.is_supplier_owner(supplier_id));
CREATE POLICY "Suppliers manage own herbs delete" ON public.herbs FOR DELETE TO authenticated USING (public.is_supplier_owner(supplier_id));

-- Customers
CREATE TABLE public.customers (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.customers TO authenticated;
GRANT ALL ON public.customers TO service_role;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Customers view own" ON public.customers FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Customers insert own" ON public.customers FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "Customers update own" ON public.customers FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

-- Bookings
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  supplier_id uuid NOT NULL REFERENCES public.suppliers(id) ON DELETE CASCADE,
  herb_id uuid REFERENCES public.herbs(id) ON DELETE SET NULL,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  herb_name text NOT NULL,
  date date NOT NULL,
  slot text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX bookings_supplier_id_idx ON public.bookings(supplier_id);
CREATE INDEX bookings_customer_id_idx ON public.bookings(customer_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT INSERT ON public.bookings TO anon;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Customer views own bookings" ON public.bookings FOR SELECT TO authenticated USING (customer_id = auth.uid());
CREATE POLICY "Supplier views own bookings" ON public.bookings FOR SELECT TO authenticated USING (public.is_supplier_owner(supplier_id));
CREATE POLICY "Supplier updates own bookings" ON public.bookings FOR UPDATE TO authenticated USING (public.is_supplier_owner(supplier_id)) WITH CHECK (public.is_supplier_owner(supplier_id));

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER suppliers_touch BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER herbs_touch BEFORE UPDATE ON public.herbs FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Storage buckets are created via storage tool separately; policies added here.

# Plan: KitchenBloom on Lovable Cloud

## 1. Import the uploaded app
- Copy the extracted `kitchen-bloom-iimu-main` source into the project (routes, components, assets, styles, hooks), preserving the existing `.git`, `src/routeTree.gen.ts`, and Lovable integration files.
- Install any missing deps declared in the uploaded `package.json`.

## 2. Enable Lovable Cloud
- Turn on Cloud so Supabase (Postgres + Auth + Storage) is provisioned.
- Adds `src/integrations/supabase/*` clients and the managed `_authenticated` layout.

## 3. Database schema (migration)
Tables in `public`:
- `suppliers` — `id uuid PK = auth.users.id`, name, city, address, hours, about, rating, image_url, created_at.
- `herbs` — `id uuid PK`, `supplier_id → suppliers.id`, slug, name, local, image_url, price numeric, availability text, pickup bool, description, benefits text[], cooking text[], care jsonb, created_at. Unique (supplier_id, slug).
- `customers` — `id uuid PK = auth.users.id`, name, phone.
- `bookings` — `id uuid PK`, customer_id uuid null, supplier_id uuid, herb_id uuid null, customer_name, phone, date, slot, status text default 'Pending', created_at.

Grants + RLS:
- `suppliers`: `SELECT` to anon + authenticated; `INSERT/UPDATE` where `id = auth.uid()`.
- `herbs`: `SELECT` to anon + authenticated; `INSERT/UPDATE/DELETE` where `supplier_id = auth.uid()`.
- `customers`: `SELECT/INSERT/UPDATE` where `id = auth.uid()`.
- `bookings`: `INSERT` to anon + authenticated (open booking flow); `SELECT` where `customer_id = auth.uid()` OR `supplier_id = auth.uid()`; supplier can `UPDATE` own bookings' status.

## 4. Storage
- Create public buckets `supplier-images` and `herb-images` via the storage tool.
- RLS on `storage.objects`: public read; write/update/delete only when the first path segment equals `auth.uid()`.

## 5. Auth
- Replace `src/lib/auth.ts` (localStorage stub) with a Supabase-backed hook using `onAuthStateChange` + `getSession`.
- Rewrite `/login` and `/signup`: email/password. Signup collects role (customer or supplier) and, for suppliers, nursery name + city. On success insert the corresponding `suppliers` or `customers` row (id = user.id).
- Google sign-in through the Lovable broker as an optional secondary button.
- Sign-out clears the cache and returns to home.

## 6. Seeding
- Insert the 6 nurseries and 10 herbs from `src/data/mock.ts` into `suppliers` / `herbs` using deterministic UUIDs so the public site has content immediately. Supplier rows are seeded without an auth user; real suppliers register later. Herb `image_url` initially points to the bundled asset URLs uploaded to storage (or the CDN paths shipped in the repo).

## 7. Rewire customer-facing pages
Replace `src/data/mock.ts` imports with Supabase queries (via TanStack Query, `useSuspenseQuery` + loader `ensureQueryData`):
- `/` (index), `/browse-herbs`, `/browse-herbs/$slug`, `/nurseries`, and the booking modal.
- `BookingModal` writes to `bookings` via `supabase.from('bookings').insert(...)`.

## 8. Supplier dashboard (`/supplier/*`) — under `_authenticated`
Move `supplier.*` routes under `src/routes/_authenticated/supplier.*` so the managed gate protects them. Each page loads the current supplier row and:
- `supplier.profile` — edit name/city/address/hours/about, upload profile image to `supplier-images/{userId}/…`, save public URL to `suppliers.image_url`.
- `supplier.herbs` — list/add/edit/delete herbs; upload herb image to `herb-images/{userId}/…`; edit price, stock (`availability`), description, benefits/cooking.
- `supplier.bookings` — list bookings for the supplier, update status.
- `supplier.index` — summary counts.

## 9. Verification
- Build passes; hit `/`, `/browse-herbs`, `/nurseries` and confirm they render from Supabase.
- Sign up as a supplier, edit profile, add a herb, then confirm it appears on the public browse page (proving the "no code changes for new suppliers" requirement).

## Notes
- The app calls sellers "nurseries" in the UI; the DB table is `suppliers` per the request. UI copy stays as "nurseries".
- Existing `nurseries` UI card fields map onto `suppliers` columns 1:1.
- No payment/order logic — bookings only, as in the current app.

Approve to proceed and I'll start with steps 1–4 in one batch.

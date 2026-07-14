
-- Fix function search paths
ALTER FUNCTION public.touch_updated_at() SET search_path = public;

-- Restrict execute on helper function to authenticated only
REVOKE EXECUTE ON FUNCTION public.is_supplier_owner(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_supplier_owner(uuid) TO authenticated;

-- Replace the always-true bookings insert policy with a mild sanity guard
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(customer_name) > 0
    AND length(phone) > 0
    AND supplier_id IS NOT NULL
    AND (customer_id IS NULL OR customer_id = auth.uid())
  );

-- Storage policies for the two buckets
CREATE POLICY "Public read supplier images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'supplier-images');
CREATE POLICY "Owner upload supplier images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'supplier-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Owner update supplier images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'supplier-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Owner delete supplier images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'supplier-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Public read herb images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'herb-images');
CREATE POLICY "Owner upload herb images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'herb-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Owner update herb images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'herb-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Owner delete herb images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'herb-images' AND (storage.foldername(name))[1] = auth.uid()::text);

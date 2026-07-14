
CREATE OR REPLACE FUNCTION public.is_supplier_owner(_supplier_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.suppliers s WHERE s.id = _supplier_id AND s.user_id = auth.uid())
$$;

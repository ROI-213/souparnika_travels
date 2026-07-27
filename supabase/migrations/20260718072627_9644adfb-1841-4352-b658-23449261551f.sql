ALTER TABLE public.packages
  ADD COLUMN IF NOT EXISTS available_months text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS suggested_vehicles text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS max_travellers integer,
  ADD COLUMN IF NOT EXISTS min_travellers integer;
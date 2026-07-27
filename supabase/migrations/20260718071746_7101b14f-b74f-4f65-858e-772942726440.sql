
ALTER TABLE public.fleets
  ADD COLUMN IF NOT EXISTS model text,
  ADD COLUMN IF NOT EXISTS min_km integer,
  ADD COLUMN IF NOT EXISTS per_km_rate integer,
  ADD COLUMN IF NOT EXISTS driver_allowance integer,
  ADD COLUMN IF NOT EXISTS additional_charges text,
  ADD COLUMN IF NOT EXISTS terms text,
  ADD COLUMN IF NOT EXISTS available_local boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS available_outstation boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS gallery text[] NOT NULL DEFAULT '{}'::text[];

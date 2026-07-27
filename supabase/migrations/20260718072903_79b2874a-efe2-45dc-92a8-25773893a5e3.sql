ALTER TABLE public.packages
  ADD COLUMN IF NOT EXISTS ending_point text,
  ADD COLUMN IF NOT EXISTS gallery text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS important_info text[] DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS booking_terms text;
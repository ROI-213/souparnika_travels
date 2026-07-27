
ALTER TABLE public.testimonials
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS package_used text,
  ADD COLUMN IF NOT EXISTS travel_date date,
  ADD COLUMN IF NOT EXISTS is_video boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS video_thumbnail text,
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS service_category text;

ALTER TABLE public.testimonials ALTER COLUMN is_approved SET DEFAULT false;

GRANT INSERT ON public.testimonials TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit testimonials" ON public.testimonials;
CREATE POLICY "Public can submit testimonials" ON public.testimonials
  FOR INSERT TO anon, authenticated
  WITH CHECK (is_approved = false);
